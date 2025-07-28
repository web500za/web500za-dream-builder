import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendEmail, validateEmail } from "@/lib/emailService";
import { cn } from "@/lib/utils";
import "./HeroSection.css";

// Add Cloudinary upload helper
const CLOUDINARY_UPLOAD_PRESET = "web500za customers";
const CLOUDINARY_CLOUD_NAME = "drma7031k";
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

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

interface ExpandingHeroFormProps {
  triggerTextareaGlow?: boolean;
  onEmailSent?: () => void;
}

export function ExpandingHeroForm({ triggerTextareaGlow = false, onEmailSent }: ExpandingHeroFormProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [projectDescription, setProjectDescription] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showAttachments, setShowAttachments] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [textareaGlow, setTextareaGlow] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploadStatus, setUploadStatus] = useState<("idle" | "uploading" | "failed" | "done")[]>(["idle", "idle", "idle"]);
  const [uploadError, setUploadError] = useState<string[]>(["", "", ""]);
  const [uploadProgress, setUploadProgress] = useState<number[]>([0, 0, 0]);
  const [rejectedFileError, setRejectedFileError] = useState("");
  const [dotCount, setDotCount] = useState(0);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const MAX_TOTAL_SIZE = 50 * 1024 * 1024;

  // Animated placeholder dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount(prev => (prev + 1) % 4);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Generate previews when images change
  useEffect(() => {
    if (attachments.length === 0) {
      setImagePreviews([]);
      return;
    }
    const urls = attachments.filter(Boolean).map(img => URL.createObjectURL(img));
    setImagePreviews(urls);
    return () => urls.forEach(url => URL.revokeObjectURL(url));
  }, [attachments]);

  // Handle external trigger for textarea glow
  useEffect(() => {
    if (triggerTextareaGlow) {
      textareaRef.current?.focus();
      setTextareaGlow(true);
      setTimeout(() => setTextareaGlow(false), 2000);
    }
  }, [triggerTextareaGlow]);

  const handleTextareaFocus = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      // Small delay to ensure smooth animation
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProjectDescription(e.target.value);
    if (!isExpanded && e.target.value.length > 0) {
      setIsExpanded(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!projectDescription.trim()) {
      toast({
        title: "Missing information",
        description: "Please describe your website idea.",
        variant: "destructive"
      });
      return;
    }

    if (!validateEmail(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.set("from_name", `${firstName} ${lastName}`.trim() || email.split('@')[0] || 'Customer');
      formData.set("from_email", email);
      formData.set("project_description", projectDescription);
      formData.set("phone", phone || '');
      formData.set("image_url_1", imageUrls[0] || '');
      formData.set("image_url_2", imageUrls[1] || '');
      formData.set("image_url_3", imageUrls[2] || '');
      
      await sendEmail(formData);
      
      // Reset form
      setProjectDescription("");
      setEmail("");
      setPhone("");
      setFirstName("");
      setLastName("");
      setShowAttachments(false);
      setAttachments([]);
      setImageUrls([]);
      setImagePreviews([]);
      setIsExpanded(false);
      
      onEmailSent?.();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send. Please try again.",
        variant: "destructive"
      });
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
    } catch (err) {
      // Remove the file from the slot and show error
      const newAttachmentsFail = [...attachments];
      newAttachmentsFail[slotIdx] = undefined;
      setAttachments(newAttachmentsFail);
      const newImageUrls = [...imageUrls];
      newImageUrls[slotIdx] = "";
      setImageUrls(newImageUrls);
      newUploadStatus[slotIdx] = "failed";
      setUploadStatus([...newUploadStatus]);
      newUploadError[slotIdx] = err instanceof Error ? err.message : "Upload failed, try again";
      setUploadError([...newUploadError]);
      newProgress[slotIdx] = 0;
      setUploadProgress([...newProgress]);
    }
  };

  const handleRemoveAttachment = (idx: number) => {
    const newAttachments = [...attachments];
    newAttachments[idx] = undefined;
    setAttachments(newAttachments);
    const newImageUrls = [...imageUrls];
    newImageUrls[idx] = "";
    setImageUrls(newImageUrls);
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
    setRejectedFileError("");
  };

  const dots = '.'.repeat(dotCount);
  const spaces = '\u00A0'.repeat(3 - dotCount);
  const placeholder = `What website do you need${dots}${spaces}`;

  return (
    <form onSubmit={handleSubmit} ref={formRef} className="w-full max-w-4xl mx-auto">
      {/* Initial Textarea - Clean and Minimal */}
      <div className="relative mb-6">
        <Textarea
          ref={textareaRef}
          value={projectDescription}
          onChange={handleTextareaChange}
          onFocus={handleTextareaFocus}
          placeholder={placeholder}
          className={cn(
            "minimal-textarea w-full text-lg md:text-xl px-6 md:px-8 py-6 md:py-8 pr-16 md:pr-20 placeholder:text-brand-text-muted/70 text-brand-text-dark focus:outline-none focus:ring-0 min-h-[120px] md:min-h-[140px] resize-none leading-relaxed",
            textareaGlow && 'textarea-focus-glow'
          )}
          rows={isExpanded ? 4 : 3}
        />
        
        {/* Submit button - always visible */}
        <Button
          type="submit"
          size="icon"
          disabled={isSubmitting || !projectDescription.trim()}
          className="absolute right-3 md:right-4 bottom-3 md:bottom-4 h-11 w-11 md:h-12 md:w-12 bg-brand-green hover:bg-brand-green-light text-white rounded-2xl shadow-lg transition-all duration-300 hover:scale-110 disabled:opacity-50"
        >
          {isSubmitting ? (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
          ) : (
            <ArrowUp className="h-4 w-4 md:h-5 md:w-5 text-white" />
          )}
        </Button>
      </div>

      {/* Expanded Form Fields */}
      <div className={cn(
        "expanding-form-container overflow-hidden transition-all duration-500 ease-in-out",
        isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="space-y-6 bg-white/95 backdrop-blur-md border-2 border-brand-green/20 rounded-2xl p-6 shadow-lg">
          
          {/* Name Fields */}
          <div className="form-field grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-brand-text-dark mb-2">
                First Name
              </label>
              <Input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border-brand-green/30 focus:border-brand-green rounded-xl transition-all duration-300"
                placeholder="Your first name"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-brand-text-dark mb-2">
                Last Name
              </label>
              <Input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border-brand-green/30 focus:border-brand-green rounded-xl transition-all duration-300"
                placeholder="Your last name"
              />
            </div>
          </div>

          {/* Contact Fields */}
          <div className="form-field grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-brand-text-dark mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-brand-green/30 focus:border-brand-green rounded-xl transition-all duration-300"
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-brand-text-dark mb-2">
                Phone Number
              </label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border-brand-green/30 focus:border-brand-green rounded-xl transition-all duration-300"
                placeholder="Optional"
              />
            </div>
          </div>

          {/* Attachments Section */}
          <div className="form-field">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-brand-text-dark">
                Attachments
              </label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowAttachments(!showAttachments)}
                className="text-brand-green hover:text-brand-green-light"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Images
              </Button>
            </div>
            
            {showAttachments && (
              <div className="space-y-4">
                <p className="text-sm text-brand-text-muted">
                  Upload up to 3 images to strengthen your brief (50MB total)
                </p>
                <div className="flex gap-4 justify-start">
                  {[0, 1, 2].map((slotIdx) => {
                    const file = attachments[slotIdx];
                    return file ? (
                      <div key={slotIdx} className="relative w-20 h-20 flex items-center justify-center bg-brand-green/10 border-2 border-brand-green/30 rounded-lg shadow-sm overflow-hidden">
                        {uploadStatus[slotIdx] === "uploading" && (
                          <>
                            <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
                              <div className="animate-spin rounded-full h-6 w-6 border-2 border-brand-green border-t-transparent"></div>
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
                        <button
                          type="button"
                          onClick={() => handleRemoveAttachment(slotIdx)}
                          className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg transition-colors"
                          aria-label="Remove file"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ) : (
                      <label key={slotIdx} className="w-20 h-20 flex flex-col items-center justify-center border-2 border-dashed border-brand-green/30 rounded-lg cursor-pointer hover:bg-brand-green/5 transition-all">
                        <Plus className="h-6 w-6 text-brand-green mb-1" />
                        <span className="text-xs text-brand-green">Add</span>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/jpg"
                          className="hidden"
                          onChange={e => handleSlotFileChange(e, slotIdx)}
                          aria-label="Upload picture"
                        />
                      </label>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between text-xs text-brand-text-muted">
                  <span>{attachments.filter(Boolean).length} of 3 attached</span>
                  <span>{((MAX_TOTAL_SIZE - attachments.filter(Boolean).reduce((acc, f) => acc + (f ? f.size : 0), 0)) / 1024 / 1024).toFixed(2)} MB left</span>
                </div>
                {rejectedFileError && <div className="text-xs text-red-600 font-medium">{rejectedFileError}</div>}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="form-field pt-4">
            <Button
              type="submit"
              disabled={isSubmitting || !projectDescription.trim() || !validateEmail(email)}
              className="w-full bg-brand-green hover:bg-brand-green-light text-white py-3 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Sending your brief...</span>
                </div>
              ) : (
                "Send My Brief"
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}