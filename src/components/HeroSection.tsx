import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { AnimatedInput } from "@/components/AnimatedInput";
import { Send, ChevronDown } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { sendEmail, validateEmail } from "@/lib/emailService";

// Add Cloudinary upload helper
const CLOUDINARY_UPLOAD_PRESET = "web500za customers";
const CLOUDINARY_CLOUD_NAME = "drma7031k";
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

async function uploadToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  const res = await fetch(CLOUDINARY_URL, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Upload failed, try again");
  const data = await res.json();
  return data.secure_url;
}

async function uploadToCloudinaryWithProgress(file: File, slotIdx: number, onProgress: (percent: number) => void, onTimeout: () => void): Promise<string> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    xhr.open("POST", CLOUDINARY_URL);
    xhr.timeout = 30000; // 30 seconds
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        onProgress(percent);
      }
    };
    xhr.ontimeout = () => {
      onTimeout();
      reject(new Error("Upload timed out"));
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);
        resolve(data.secure_url);
      } else {
        reject(new Error("Upload failed, try again"));
      }
    };
    xhr.onerror = () => reject(new Error("Upload failed, try again"));
    xhr.send(formData);
  });
}

export function HeroSection() {
  const [projectDescription, setProjectDescription] = useState("");
  const [isWorkflowOpen, setIsWorkflowOpen] = useState(false);
  const [step, setStep] = useState<"idea" | "details" | "success">("idea");
  const [form, setForm] = useState({
    firstName: "",
    email: ""
  });
  const [honeypot, setHoneypot] = useState(""); // Hidden field to catch bots
  const [formError, setFormError] = useState("");
  const { toast } = useToast();
  const modalContentRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [attachmentError, setAttachmentError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const MAX_TOTAL_SIZE = 50 * 1024 * 1024;
  const [rejectedFileError, setRejectedFileError] = useState("");
  const [uploadStatus, setUploadStatus] = useState<("idle" | "uploading" | "failed" | "done")[]>(["idle", "idle", "idle"]);
  const [uploadError, setUploadError] = useState<string[]>(["", "", ""]);
  const [uploadProgress, setUploadProgress] = useState<number[]>([0, 0, 0]);

  // Launch offer state (for future dynamic spots left)
  const launchSpotsLeft = 5; // Placeholder, can be made dynamic later

  // Scroll modal content into view if keyboard opens (mobile)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && modalContentRef.current) {
        modalContentRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [step]);

  // Generate previews when images change
  useEffect(() => {
    if (images.length === 0) {
      setImagePreviews([]);
      return;
    }
    const urls = images.map(img => URL.createObjectURL(img));
    setImagePreviews(urls);
    return () => urls.forEach(url => URL.revokeObjectURL(url));
  }, [images]);

  // Persist modal step in localStorage only if on quote page
  useEffect(() => {
    if (window.location.hash === "" || window.location.hash === "#quote") {
      localStorage.setItem('quoteModalStep', step);
    }
  }, [step]);

  useEffect(() => {
    if (window.location.hash === "" || window.location.hash === "#quote") {
      const savedStep = localStorage.getItem('quoteModalStep');
      if (savedStep === 'idea' || savedStep === 'details' || savedStep === 'success') {
        setStep(savedStep);
      }
    }
  }, []);

  const handleIdeaSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!projectDescription.trim()) return;
    setStep("details");
  };

  const isEmailValid = validateEmail(form.email);
  const isFormValid = form.firstName.trim().length >= 2 && isEmailValid && projectDescription.trim().length >= 10 && !honeypot;

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check honeypot - if filled, it's likely a bot
    if (honeypot) {
      setFormError("Invalid submission detected.");
      return;
    }
    
    if (!isFormValid) {
      if (!form.firstName.trim() || form.firstName.trim().length < 2) {
        setFormError("Please enter a valid first name (at least 2 characters).");
      } else if (!isEmailValid) {
        setFormError("Please enter a valid email address.");
      } else if (!projectDescription.trim() || projectDescription.trim().length < 10) {
        setFormError("Please provide a more detailed project description (at least 10 characters).");
      }
      return;
    }

    if (imageUrls.filter(Boolean).length !== attachments.filter(Boolean).length) {
      setFormError("Please wait for all images to finish uploading.");
      return;
    }

    setFormError("");
    setIsSubmitting(true);

    try {
      if (formRef.current) {
        const formData = new FormData(formRef.current);
        // Always append all required EmailJS variables, using empty string if missing
        formData.set("from_name", form.firstName || "");
        formData.set("from_email", form.email || "");
        formData.set("project_description", projectDescription || "");
        formData.set("image_url_1", imageUrls[0] || "");
        formData.set("image_url_2", imageUrls[1] || "");
        formData.set("image_url_3", imageUrls[2] || "");
        await sendEmail(formData);
      }
      setStep("success");
      setForm({ firstName: "", email: "" });
      setProjectDescription("");
      setImagePreviews([]);
      setHoneypot("");
      setImageUrls([]);
      setAttachments([]);
    } catch (error) {
      if (error instanceof Error && error.message.includes("EmailJS")) {
        setFormError("Failed to send email. Try again, or use a different email provider like Resend, Mailgun, or SendGrid.");
      } else if (error instanceof Error) {
        setFormError(error.message);
      } else {
        setFormError("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSlotFileChange = async (e: React.ChangeEvent<HTMLInputElement>, slotIdx: number) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    if (file.size > MAX_TOTAL_SIZE) {
      setRejectedFileError("Image too large (max 50MB total)");
      return;
    }
    setRejectedFileError("");
    const newAttachments = [...attachments];
    const currentTotal = newAttachments.filter(Boolean).reduce((acc, f) => acc + (f ? f.size : 0), 0);
    const prevFile = newAttachments[slotIdx];
    const newTotal = currentTotal - (prevFile ? prevFile.size : 0) + file.size;
    if (newTotal > MAX_TOTAL_SIZE) {
      setRejectedFileError("Image too large (max 50MB total)");
      return;
    }
    // Set upload status to uploading
    const newUploadStatus = [...uploadStatus];
    newUploadStatus[slotIdx] = "uploading";
    setUploadStatus(newUploadStatus);
    const newUploadError = [...uploadError];
    newUploadError[slotIdx] = "";
    setUploadError(newUploadError);
    const newProgress = [...uploadProgress];
    newProgress[slotIdx] = 0;
    setUploadProgress(newProgress);
    newAttachments[slotIdx] = file;
    setAttachments(newAttachments);
    setImages(newAttachments.filter(Boolean));
    try {
      const url = await uploadToCloudinaryWithProgress(
        file,
        slotIdx,
        (percent) => {
          const progressArr = [...uploadProgress];
          progressArr[slotIdx] = percent;
          setUploadProgress(progressArr);
        },
        () => {
          // Timeout handler
          const failStatus = [...uploadStatus];
          failStatus[slotIdx] = "failed";
          setUploadStatus(failStatus);
          const failError = [...uploadError];
          failError[slotIdx] = "Upload timed out, try again";
          setUploadError(failError);
        }
      );
      const newImageUrls = [...imageUrls];
      newImageUrls[slotIdx] = url;
      setImageUrls(newImageUrls);
      newUploadStatus[slotIdx] = "done";
      setUploadStatus([...newUploadStatus]);
      newUploadError[slotIdx] = "";
      setUploadError([...newUploadError]);
      newProgress[slotIdx] = 100;
      setUploadProgress([...newProgress]);
      setAttachmentError("");
    } catch (err) {
      // Remove the file from the slot and show error
      const newAttachmentsFail = [...attachments];
      newAttachmentsFail[slotIdx] = undefined;
      setAttachments(newAttachmentsFail);
      setImages(newAttachmentsFail.filter(Boolean));
      setImagePreviews(newAttachmentsFail.filter(Boolean).map(img => URL.createObjectURL(img)));
      const newImageUrls = [...imageUrls];
      newImageUrls[slotIdx] = undefined as any;
      setImageUrls(newImageUrls);
      newUploadStatus[slotIdx] = "failed";
      setUploadStatus([...newUploadStatus]);
      newUploadError[slotIdx] = err instanceof Error ? err.message : "Upload failed, try again";
      setUploadError([...newUploadError]);
      newProgress[slotIdx] = 0;
      setUploadProgress([...newProgress]);
      setAttachmentError("");
    }
  };

  const handleRemoveAttachment = (idx: number) => {
    const newAttachments = [...attachments];
    newAttachments[idx] = undefined;
    setAttachments(newAttachments);
    setImages(newAttachments.filter(Boolean));
    setImagePreviews(newAttachments.filter(Boolean).map(img => URL.createObjectURL(img)));
    const newImageUrls = [...imageUrls];
    newImageUrls[idx] = undefined as any;
    setImageUrls(newImageUrls);
    // If all slots are empty, clear all errors and statuses
    if (newAttachments.filter(Boolean).length === 0) {
      setAttachmentError("");
      setRejectedFileError("");
      setUploadStatus(["idle", "idle", "idle"]);
      setUploadError(["", "", ""]);
      setUploadProgress([0, 0, 0]);
    } else {
      setAttachmentError(""); // Clear error on remove
      setRejectedFileError("");
      // Clear upload status and error for this slot
      const newUploadStatus = [...uploadStatus];
      newUploadStatus[idx] = "idle";
      setUploadStatus(newUploadStatus);
      const newUploadError = [...uploadError];
      newUploadError[idx] = "";
      setUploadError(newUploadError);
      const newUploadProgress = [...uploadProgress];
      newUploadProgress[idx] = 0;
      setUploadProgress(newUploadProgress);
    }
  };

  const priceCards = [
    {
      title: "Simple one-pager",
      price: "From R500",
      description: "Perfect for landing pages, portfolios, or basic business sites"
    },
    {
      title: "With bookings or logins",
      price: "From R1000",
      description: "Interactive features, user accounts, booking systems"
    },
    {
      title: "Something bigger?",
      price: "Custom quote",
      description: "Complex web apps, e-commerce, custom functionality"
    }
  ];

  return (
    <div className="text-center max-w-6xl mx-auto px-4 md:px-6">
      {step === "idea" && (
        <form onSubmit={handleIdeaSubmit} className="mb-6 md:mb-12">
          <div className="relative max-w-5xl mx-auto">
            <AnimatedInput
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              onSubmit={handleIdeaSubmit}
              className="w-full h-20 md:h-20 lg:h-24 xl:h-28 text-lg md:text-lg lg:text-xl xl:text-2xl px-6 md:px-8 lg:px-10 xl:px-12 pr-20 md:pr-24 lg:pr-28 xl:pr-32 bg-white/98 backdrop-blur-md border-2 border-brand-green/20 rounded-2xl md:rounded-3xl shadow-[0_8px_32px_rgba(45,90,61,0.15)] placeholder:text-brand-text-muted text-brand-text-dark focus:outline-none focus:ring-0 focus:shadow-[0_20px_80px_rgba(45,90,61,0.4)] focus:border-brand-green/80 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(45,90,61,0.2)] hover:border-brand-green/30"
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-3 md:right-4 lg:right-6 xl:right-8 top-1/2 -translate-y-1/2 h-16 md:h-14 lg:h-16 xl:h-18 w-16 md:w-14 lg:w-16 xl:w-18 bg-brand-green hover:bg-brand-green-light text-white rounded-xl md:rounded-2xl shadow-xl transition-all duration-300 hover:scale-110"
            >
              <Send className="h-8 md:h-8 lg:h-10 xl:h-12 w-8 md:w-8 lg:w-10 xl:w-12 text-white" />
            </Button>
          </div>
        </form>
      )}
      {step === "details" && (
        <form ref={formRef} onSubmit={handleDetailsSubmit} className="mb-6 md:mb-12 max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 animate-fade-in">
          <label className="block text-sm font-medium text-brand-text-dark mb-1 text-left">Your idea/brief</label>
          <textarea
            name="project_description"
            value={projectDescription}
            onChange={e => setProjectDescription(e.target.value)}
            required
            rows={3}
            className="w-full rounded-lg border border-brand-green/20 px-3 py-2 text-base text-brand-text-dark bg-white focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all"
            placeholder="Describe what you want built..."
          />
          <Input
            name="from_name"
            placeholder="First name*"
            value={form.firstName}
            onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
            required
            autoFocus
          />
          <Input
            name="from_email"
            placeholder="Email address*"
            type="email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            required
          />
          {/* Honeypot field - hidden from users but visible to bots */}
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={e => setHoneypot(e.target.value)}
            style={{
              position: 'absolute',
              left: '-9999px',
              width: '1px',
              height: '1px',
              opacity: 0,
              pointerEvents: 'none'
            }}
            tabIndex={-1}
            autoComplete="off"
          />
          <div>
            <div className="mb-2 text-sm font-medium text-brand-text-dark text-left">Upload up to 3 image attachments of 50mb total to strengthen your brief.</div>
            <div className="flex gap-4 justify-center mb-2">
              {[0, 1, 2].map((slotIdx) => {
                const file = attachments[slotIdx];
                return file ? (
                  <div key={slotIdx} className="relative w-20 h-20 flex items-center justify-center bg-brand-green/10 border-2 border-brand-green/30 rounded-lg shadow-sm overflow-hidden">
                    {uploadStatus[slotIdx] === "uploading" && (
                      <>
                        <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
                          <svg className="animate-spin" width="28" height="28" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="4" fill="none" /></svg>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-2 bg-brand-green/20 z-20">
                          <div className="h-2 bg-brand-green rounded-b-lg transition-all duration-200" style={{ width: `${uploadProgress[slotIdx]}%` }} />
                        </div>
                      </>
                    )}
                    {uploadStatus[slotIdx] === "failed" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10 text-red-600 text-xs font-semibold px-2 text-center">{uploadError[slotIdx]}</div>
                    )}
                    {file.type.startsWith('image') ? (
                      <img src={imagePreviews[slotIdx]} alt={file.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl">📄</span>
                    )}
                    <input
                      type="file"
                      name={`attachment${slotIdx + 1}`}
                      style={{ display: 'none' }}
                      tabIndex={-1}
                      aria-hidden="true"
                      // not used for upload, just for EmailJS form mapping
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveAttachment(slotIdx)}
                      className="absolute top-1 right-1 bg-white/80 rounded-full w-6 h-6 flex items-center justify-center text-red-500 hover:text-red-700 text-lg font-bold shadow"
                      aria-label="Remove file"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <label key={slotIdx} className="w-20 h-20 flex flex-col items-center justify-center border-2 border-dashed border-brand-green/30 rounded-lg cursor-pointer hover:bg-brand-green/5 transition-all">
                    <span className="text-3xl text-brand-green">+</span>
                    <input
                      type="file"
                      name={`attachment${slotIdx + 1}`}
                      accept="image/jpeg,image/png,image/webp,image/jpg"
                      className="hidden"
                      onChange={e => handleSlotFileChange(e, slotIdx)}
                      aria-label="Upload picture"
                    />
                  </label>
                );
              })}
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-brand-text-muted">{attachments.filter(Boolean).length} of 3 attached</span>
              <span className="text-xs text-brand-text-muted">{((MAX_TOTAL_SIZE - attachments.filter(Boolean).reduce((acc, f) => acc + (f ? f.size : 0), 0)) / 1024 / 1024).toFixed(2)} MB left</span>
              {rejectedFileError && <span className="text-xs text-red-600 font-medium">{rejectedFileError}</span>}
            </div>
          </div>
          {formError && <div className="text-red-600 text-sm">{formError}</div>}
          <Button
            type="submit"
            disabled={!isFormValid || uploadStatus.some(s => s === 'uploading') || isSubmitting}
            className="w-full bg-brand-green hover:bg-brand-green-light text-white py-3 text-lg font-semibold rounded-xl shadow-md mt-2 sticky bottom-0 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Let's get building!
          </Button>
          {/* After the submit button, show a footnote if the button is disabled */}
          {(isSubmitting || !isFormValid || uploadStatus.some(s => s === "uploading")) && (
            <div className="mt-2 text-left rounded-lg px-3 py-2"
              style={{
                background: 'rgba(34,197,94,0.08)', // subtle green background
                border: '1px solid #a7f3d0', // light green border
                color: '#166534', // deep green text
                fontSize: '0.92em',
              }}
            >
              {isSubmitting && "Uploading or sending in progress..."}
              {!isSubmitting && uploadStatus.some(s => s === "uploading") && "Please wait for all images to finish uploading or fix attachment errors."}
              {!isSubmitting && !isFormValid && (
                <>
                  {form.firstName.trim().length < 2 && <div>First name must be at least 2 characters.</div>}
                  {!validateEmail(form.email) && <div>Enter a valid email address.</div>}
                  {projectDescription.trim().length < 10 && <div>Description must be at least 10 characters.</div>}
                </>
              )}
            </div>
          )}
        </form>
      )}

      {/* Compelling CTA-driven description */}
      <p className="text-base md:text-lg lg:text-xl text-brand-text-muted mb-6 md:mb-16 max-w-3xl mx-auto leading-relaxed">
        Describe what you need above. I'll receive your idea via e-mail and start crafting and hosting your website or web app for free. Only pay if you love the result, starting from just <span className="font-bold text-brand-green">R500</span>.
      </p>

      {/* Combined How it works & Ideal brief Section */}
      <div className="mb-12 md:mb-16 max-w-4xl mx-auto">
        <Collapsible open={isWorkflowOpen} onOpenChange={setIsWorkflowOpen}>
          <CollapsibleTrigger className="flex items-center justify-center w-full glass-effect rounded-xl md:rounded-2xl p-3 md:p-4 text-brand-text-dark hover:bg-brand-green/5 transition-all duration-300">
            <span className="text-base md:text-lg font-medium mr-2 md:mr-3">FAQs</span>
            <ChevronDown className={`h-4 w-4 md:h-5 md:w-5 transition-transform duration-300 ${isWorkflowOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="glass-effect rounded-xl md:rounded-2xl p-4 md:p-6 mt-3 md:mt-4">
              <div className="space-y-6 md:space-y-8">
                <div>
                  <h4 className="text-brand-text-dark font-semibold mb-3 text-lg">1. How quickly will you respond?</h4>
                  <p className="text-brand-text-muted text-base md:text-lg leading-relaxed">
                    I aim to respond within 24-48hrs with the first iteration, but expect delays on the weekend. I'll email you a quote and start building your site for free—you only pay if you're happy with the result.
                  </p>
                </div>
                <div>
                  <h4 className="text-brand-text-dark font-semibold mb-3 text-lg">2. How does w5z work?</h4>
                  <p className="text-brand-text-muted text-base md:text-lg leading-relaxed">
                    Describe what you need in as much detail as you like. I'll email you a quote, build and host your site for free, and you only pay if you're happy with the result.
                  </p>
                </div>
                <div>
                  <h4 className="text-brand-text-dark font-semibold mb-3 text-lg">3. What makes an ideal brief?</h4>
                  <p className="text-brand-text-muted text-base md:text-lg leading-relaxed">
                    The ideal brief tells me a little about your business, who your website is for, and what you want it to do. The more details, the better—but if you only have a rough idea or just the start of your concept, I'll do my best to fill in the rest. <span className="text-brand-green font-semibold">You don't need to have it all figured out!</span>
                  </p>
                </div>
                <div>
                  <h4 className="text-brand-text-dark font-semibold mb-3 text-lg">4. What happens if I want changes to my site?</h4>
                  <p className="text-brand-text-muted text-base md:text-lg leading-relaxed">
                    I include all reasonable tweaks and adjustments during the build—my goal is that you love the final result! After you sign off and your site is live, any major changes or new features are quoted separately, so you're always in control.
                  </p>
                </div>
                <div>
                  <h4 className="text-brand-text-dark font-semibold mb-3 text-lg">5. Can I get my site's code or move it later?</h4>
                  <p className="text-brand-text-muted text-base md:text-lg leading-relaxed">
                    Yes! If you want to host your site yourself or move it to your own domain in the future, I can provide the code or assist with the transfer for a small, once-off fee.
                  </p>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Pricing Dropdown */}
      <div className="mb-8 md:mb-12 max-w-4xl mx-auto">
        <Collapsible open={isPricingOpen} onOpenChange={setIsPricingOpen}>
          <CollapsibleTrigger className="flex items-center justify-center w-full glass-effect rounded-xl md:rounded-2xl p-3 md:p-4 text-brand-text-dark hover:bg-brand-green/5 transition-all duration-300 mb-2">
            <span className="text-base md:text-lg font-medium mr-2 md:mr-3">Pricing</span>
            <ChevronDown className={`h-4 w-4 md:h-5 md:w-5 transition-transform duration-300 ${isPricingOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="grid md:grid-cols-3 gap-4 md:gap-6 mt-4">
              {priceCards.map((card, index) => (
                <Card key={index} className="glass-effect border-brand-green/20 p-4 md:p-6 hover:scale-105 transition-all duration-300 hover:shadow-xl">
                  <h3 className="text-lg md:text-xl font-semibold text-brand-text-dark mb-2">{card.title}</h3>
                  <p className="text-xl md:text-2xl font-bold text-brand-green mb-3 md:mb-4">{card.price}</p>
                  <p className="text-brand-text-muted text-sm md:text-base">{card.description}</p>
                </Card>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Mobile CTA Button */}
      <div className="mt-8 md:hidden">
        <Button 
          onClick={() => {
            // Scroll to top and focus the input
            window.scrollTo({ top: 0, behavior: 'smooth' });
            // Focus the input after a short delay to allow scroll to complete
            setTimeout(() => {
              const input = document.querySelector('input[type="text"]') as HTMLInputElement;
              if (input) input.focus();
            }, 500);
          }}
          className="w-full bg-brand-green hover:bg-brand-green-light text-white py-4 text-lg font-semibold rounded-2xl shadow-lg transition-all duration-300 hover:scale-105"
        >
          Let's get building
        </Button>
      </div>

      {step === "success" && (
        <div className="flex flex-col items-center justify-center pt-8 pb-4 animate-fade-in">
          <div className="mb-6">
            <svg className="animate-bounce-in" width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="40" r="40" fill="#22c55e"/>
              <path d="M24 42l12 12 20-24" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-brand-green mb-2">Thank you!</h2>
          <p className="text-lg text-brand-text-dark text-center max-w-md">I've received your brief and will aim to respond within <span className="font-semibold">1-2 business days</span>.</p>
        </div>
      )}
    </div>
  );
}