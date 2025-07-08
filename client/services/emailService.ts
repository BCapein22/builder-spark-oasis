interface EmailData {
  to: string;
  subject: string;
  body: string;
  attachments?: File[];
}

export class EmailService {
  private static readonly SENDER_EMAIL = "capien.exotics@gmail.com";
  private static readonly RECIPIENT_EMAIL = "brian@royalunionpets.com";

  static async sendEmail(data: EmailData): Promise<boolean> {
    try {
      // Create email content
      const emailContent = {
        from: this.SENDER_EMAIL,
        to: data.to || this.RECIPIENT_EMAIL,
        subject: data.subject,
        body: data.body,
        timestamp: new Date().toISOString(),
      };

      // Log the email for development (in production, this would use a real email service)
      console.log("📧 Email Service - Sending Email:");
      console.log("From:", emailContent.from);
      console.log("To:", emailContent.to);
      console.log("Subject:", emailContent.subject);
      console.log("Body:", emailContent.body);
      console.log("Timestamp:", emailContent.timestamp);

      if (data.attachments && data.attachments.length > 0) {
        console.log(
          "Attachments:",
          data.attachments.map((f) => f.name),
        );
      }

      // In a real application, you would integrate with an email service like:
      // - EmailJS
      // - SendGrid
      // - AWS SES
      // - Nodemailer with SMTP

      // For now, simulate the email sending
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Store email in localStorage for development tracking
      const sentEmails = JSON.parse(localStorage.getItem("sentEmails") || "[]");
      sentEmails.push({
        ...emailContent,
        attachmentCount: data.attachments?.length || 0,
      });
      localStorage.setItem("sentEmails", JSON.stringify(sentEmails));

      return true;
    } catch (error) {
      console.error("Email sending failed:", error);
      return false;
    }
  }

  static async sendNewMemberNotification(
    username: string,
    email: string,
  ): Promise<boolean> {
    const subject = `New Member Signup - ${username}`;
    const body = `
New member has joined GekkoGuide:

Username: ${username}
Email: ${email}
Join Date: ${new Date().toLocaleString()}
Registration IP: [Development Mode]

Total Members: ${JSON.parse(localStorage.getItem("users") || "[]").length}

---
Sent automatically from GekkoGuide
    `.trim();

    return this.sendEmail({
      to: this.RECIPIENT_EMAIL,
      subject,
      body,
    });
  }

  static async sendPhotoSubmission(
    formData: any,
    imageFile?: File,
  ): Promise<boolean> {
    const subject = `New Photo Submission - ${formData.morph} by ${formData.name}`;
    const body = `
New photo submission for GekkoGuide Gallery:

Submitter Information:
- Name: ${formData.name}
- Email: ${formData.email}

Gecko Information:
- Gecko Name: ${formData.geckoName || "Not specified"}
- Morph: ${formData.morph}
- Description: ${formData.description}

Image File: ${imageFile?.name || "No image attached"}
File Size: ${imageFile ? (imageFile.size / 1024 / 1024).toFixed(2) + " MB" : "N/A"}

Submission Date: ${new Date().toLocaleString()}

---
Submitted via GekkoGuide Gallery
    `.trim();

    return this.sendEmail({
      to: this.RECIPIENT_EMAIL,
      subject,
      body,
      attachments: imageFile ? [imageFile] : undefined,
    });
  }

  static async sendForumTopicNotification(
    topicData: any,
    authorUsername: string,
  ): Promise<boolean> {
    const subject = `New Forum Topic - "${topicData.title}"`;
    const body = `
New topic created in GekkoGuide Community Forum:

Topic: ${topicData.title}
Category: ${topicData.categoryId}
Author: ${authorUsername}
Content: ${topicData.content}

Created: ${new Date().toLocaleString()}

---
Sent automatically from GekkoGuide Forum
    `.trim();

    return this.sendEmail({
      to: this.RECIPIENT_EMAIL,
      subject,
      body,
    });
  }

  static async sendQuestionSubmission(questionData: any): Promise<boolean> {
    const subject = `New Q&A Question - ${questionData.category}`;
    const body = `
New question submitted to GekkoGuide Q&A:

Category: ${questionData.category}
Question: ${questionData.question}
Name: ${questionData.name}
Email: ${questionData.email}

Submitted: ${new Date().toLocaleString()}

---
Submitted via GekkoGuide Q&A
    `.trim();

    return this.sendEmail({
      to: this.RECIPIENT_EMAIL,
      subject,
      body,
    });
  }

  // Utility method to view sent emails in development
  static getSentEmails(): any[] {
    return JSON.parse(localStorage.getItem("sentEmails") || "[]");
  }

  static clearSentEmails(): void {
    localStorage.removeItem("sentEmails");
  }
}
