import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Upload, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageSubmissionFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageSubmissionForm({
  isOpen,
  onClose,
}: ImageSubmissionFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    geckoName: "",
    morph: "",
    description: "",
    imageFile: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const morphOptions = [
    "Normal (Wild-type)",
    "Reduced Pattern",
    "Patternless (BHG)",
    "Powder Blue Patternless",
    "Granite",
    "Super Red",
    "Platinum",
    "Candy Dot",
    "Diablo",
    "Green Galaxy",
    "Luna",
    "Ghost",
    "Nightmare",
    "Paradox",
    "Axanthic",
    "Other/Unknown",
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 10MB",
          variant: "destructive",
        });
        return;
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }

      setFormData({ ...formData, imageFile: file });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create email content
      const emailSubject = `New Tokay Gecko Image Submission from ${formData.name}`;
      const emailBody = `
New image submission for GekkoGuide Gallery:

Submitter Information:
- Name: ${formData.name}
- Email: ${formData.email}

Gecko Information:
- Gecko Name: ${formData.geckoName}
- Morph: ${formData.morph}
- Description: ${formData.description}

Please check the attached image file.

---
Submitted via GekkoGuide Gallery
      `.trim();

      // Create FormData for the submission
      const formDataToSend = new FormData();
      formDataToSend.append("to", "Brian@royalunionpets");
      formDataToSend.append("subject", emailSubject);
      formDataToSend.append("body", emailBody);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("geckoName", formData.geckoName);
      formDataToSend.append("morph", formData.morph);
      formDataToSend.append("description", formData.description);

      if (formData.imageFile) {
        formDataToSend.append("image", formData.imageFile);
      }

      // For now, we'll simulate the submission since we need a backend for actual email sending
      // In production, this would send to your API endpoint
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call

      toast({
        title: "Submission sent!",
        description:
          "Your image has been submitted for review. Thank you for contributing to our gallery!",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        geckoName: "",
        morph: "",
        description: "",
        imageFile: null,
      });

      onClose();
    } catch (error) {
      toast({
        title: "Submission failed",
        description:
          "There was an error submitting your image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.name &&
    formData.email &&
    formData.morph &&
    formData.description &&
    formData.imageFile;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Submit Your Tokay Gecko Photo
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Your Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Your Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
          </div>

          {/* Gecko Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Gecko Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="geckoName">Gecko Name (Optional)</Label>
                <Input
                  id="geckoName"
                  value={formData.geckoName}
                  onChange={(e) =>
                    setFormData({ ...formData, geckoName: e.target.value })
                  }
                  placeholder="What do you call this gecko?"
                />
              </div>
              <div>
                <Label htmlFor="morph">Morph Type *</Label>
                <Select
                  value={formData.morph}
                  onValueChange={(value) =>
                    setFormData({ ...formData, morph: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select morph type" />
                  </SelectTrigger>
                  <SelectContent>
                    {morphOptions.map((morph) => (
                      <SelectItem key={morph} value={morph}>
                        {morph}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="description">Photo Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Describe the photo, any special characteristics, breeding information, or interesting details about this gecko..."
                rows={4}
                required
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Photo Upload</h3>
            <div>
              <Label htmlFor="image">Select Image *</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                Accepted formats: JPG, PNG, GIF. Max size: 10MB. High-quality
                images preferred.
              </p>
              {formData.imageFile && (
                <p className="text-sm text-green-600 mt-2">
                  ✓ Selected: {formData.imageFile.name}
                </p>
              )}
            </div>
          </div>

          {/* Submission Info */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-800">
                    Submission Process
                  </p>
                  <p className="text-blue-700">
                    Your photo and information will be sent to
                    Brian@royalunionpets for review. High-quality images that
                    meet our guidelines will be featured in the gallery with
                    proper attribution.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  Submitting...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  Submit Photo
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
