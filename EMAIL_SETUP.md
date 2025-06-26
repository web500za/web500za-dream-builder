# Email Setup Guide

This guide will help you connect your form to your Gmail account using EmailJS.

## Security Features Implemented

Your form now includes several spam protection measures:

### 🛡️ Rate Limiting
- **3 submissions per email per 24 hours** - Prevents spam from the same email
- Uses localStorage to track submissions
- User-friendly error messages with remaining time

### 📧 Enhanced Email Validation
- Validates email format and structure
- Blocks common temporary email services (10minutemail, tempmail, etc.)
- Blocks test domains (test.com, example.com, etc.)
- Blocks suspicious patterns (very short usernames with numbers)

### 🤖 Bot Protection
- **Honeypot field** - Hidden field that bots fill out but humans don't see
- Form validation for minimum content length
- Real-time validation feedback

### ✅ Content Validation
- First name must be at least 2 characters
- Project description must be at least 10 characters
- All fields are trimmed and sanitized

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/) and sign up for a free account
2. The free plan allows 200 emails per month, which should be plenty for starting out

## Step 2: Add Gmail Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" from the list
4. Connect your Gmail account (web500za@gmail.com)
5. Give it a name like "Gmail Service"
6. Copy the **Service ID** (you'll need this)

## Step 3: Create Email Template

1. Go to "Email Templates" in your EmailJS dashboard
2. Click "Create New Template"
3. Use this template:

**Subject:** New Website Request from {{from_name}}

**Body:**
```
Hi there,

You have a new website request:

Name: {{from_name}}
Email: {{from_email}}
Project Description: {{project_description}}

Images: {{image_urls}}

You can reply directly to this email to respond to {{from_name}}.

Best regards,
Your Website
```

4. Save the template and copy the **Template ID**

## Step 4: Get Your Public Key

1. Go to "Account" → "API Keys" in your EmailJS dashboard
2. Copy your **Public Key**

## Step 5: Update Your Code

Replace the placeholder values in `src/lib/emailService.ts`:

```typescript
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // Replace with your Service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Replace with your Template ID
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Replace with your Public Key
```

## Step 6: Test the Form

1. Run your development server: `npm run dev`
2. Fill out the form and submit
3. Check your Gmail inbox (web500za@gmail.com) for the email

## Alternative: Environment Variables (Recommended for Production)

For better security, create a `.env` file in your project root:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

Then update `src/lib/emailService.ts`:

```typescript
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
```

## Troubleshooting

- **Emails not sending**: Check that all IDs are correct and your Gmail account is properly connected
- **Template variables not working**: Make sure the variable names in your template match exactly ({{from_name}}, {{from_email}}, etc.)
- **Rate limiting**: Free plan has 200 emails/month limit
- **Rate limit errors**: Users will see friendly messages about waiting time
- **Validation errors**: Form shows specific error messages for each field

## Security Notes

- The public key is safe to expose in frontend code
- EmailJS handles the email sending securely
- Your Gmail credentials are stored securely on EmailJS servers
- Rate limiting is client-side but effective for most spam
- Honeypot field catches most automated bots
- Email validation blocks common spam patterns

## Next Steps

Once this is working, you might want to:
1. Customize the email template with your branding
2. Add spam protection (EmailJS has built-in features)
3. Set up email notifications for yourself
4. Consider upgrading to a paid plan if you expect high volume
5. Monitor spam patterns and adjust validation rules if needed 