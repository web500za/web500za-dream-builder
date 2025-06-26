import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_ro91mud'; // Updated by user
const EMAILJS_TEMPLATE_ID = 'template_24c6cew'; // Provided by user
const EMAILJS_PUBLIC_KEY = 'oD5OBOHE23lePaczJ'; // Provided by user

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const MAX_SUBMISSIONS_PER_DAY = 3; // Maximum submissions per email per day

export interface EmailData {
  firstName: string;
  email: string;
  projectDescription: string;
  attachments?: File[];
}

// Enhanced email validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return false;
  
  // Additional checks for common spam patterns
  const spamPatterns = [
    /^[a-z]{1,2}\d{1,3}@/, // Very short usernames with numbers
    /@(10minutemail|tempmail|guerrillamail|mailinator)\./, // Temporary email services
    /@(test|example|invalid)\./, // Test domains
  ];
  
  return !spamPatterns.some(pattern => pattern.test(email.toLowerCase()));
};

// Rate limiting using localStorage
export const checkRateLimit = (email: string): { allowed: boolean; remainingTime?: number } => {
  const storageKey = `email_submissions_${email.toLowerCase()}`;
  const now = Date.now();
  
  try {
    const stored = localStorage.getItem(storageKey);
    if (!stored) {
      // First submission for this email
      localStorage.setItem(storageKey, JSON.stringify({
        count: 1,
        firstSubmission: now,
        lastSubmission: now
      }));
      return { allowed: true };
    }
    
    const data = JSON.parse(stored);
    const timeSinceFirst = now - data.firstSubmission;
    
    // Reset if 24 hours have passed
    if (timeSinceFirst > RATE_LIMIT_WINDOW) {
      localStorage.setItem(storageKey, JSON.stringify({
        count: 1,
        firstSubmission: now,
        lastSubmission: now
      }));
      return { allowed: true };
    }
    
    // Check if within daily limit
    if (data.count >= MAX_SUBMISSIONS_PER_DAY) {
      const remainingTime = RATE_LIMIT_WINDOW - timeSinceFirst;
      return { allowed: false, remainingTime };
    }
    
    // Update submission count
    localStorage.setItem(storageKey, JSON.stringify({
      count: data.count + 1,
      firstSubmission: data.firstSubmission,
      lastSubmission: now
    }));
    
    return { allowed: true };
  } catch (error) {
    console.error('Rate limit check failed:', error);
    // If localStorage fails, allow submission but log the error
    return { allowed: true };
  }
};

// Format remaining time for user-friendly display
export const formatRemainingTime = (milliseconds: number): string => {
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} and ${minutes} minute${minutes > 1 ? 's' : ''}`;
  }
  return `${minutes} minute${minutes > 1 ? 's' : ''}`;
};

export const sendEmail = async (data: EmailData): Promise<void> => {
  // Validate email first
  if (!validateEmail(data.email)) {
    throw new Error('Please enter a valid email address.');
  }
  
  // Check rate limiting
  const rateLimitCheck = checkRateLimit(data.email);
  if (!rateLimitCheck.allowed) {
    const remainingTime = formatRemainingTime(rateLimitCheck.remainingTime!);
    throw new Error(`Too many submissions. Please try again in ${remainingTime}.`);
  }
  
  // Validate other fields
  if (!data.firstName.trim() || data.firstName.trim().length < 2) {
    throw new Error('Please enter a valid first name.');
  }
  
  if (!data.projectDescription.trim() || data.projectDescription.trim().length < 10) {
    throw new Error('Please provide a more detailed project description (at least 10 characters).');
  }
  
  try {
    const templateParams: any = {
      to_email: 'web500za@gmail.com',
      from_name: data.firstName.trim(),
      from_email: data.email.toLowerCase().trim(),
      project_description: data.projectDescription.trim(),
      reply_to: data.email.toLowerCase().trim(),
    };
    const sendParams: any = {
      ...templateParams,
    };
    if (data.attachments && data.attachments.length > 0) {
      sendParams.attachments = data.attachments;
    }
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      sendParams,
      EMAILJS_PUBLIC_KEY
    );
    if (response.status !== 200) {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Email sending failed:', error);
    if (error instanceof Error) {
      throw error; // Re-throw validation errors
    }
    throw new Error('Failed to send email. Please try again.');
  }
};

// Initialize EmailJS (call this in your main App component)
export const initEmailJS = () => {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}; 