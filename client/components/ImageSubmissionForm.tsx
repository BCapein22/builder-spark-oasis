import { useState, useRef, useCallback } from "react";
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
import { Separator } from "@/components/ui/separator";
import { X, Upload, Mail, Crop, RotateCw, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

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
  const [showCropper, setShowCropper] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>("");
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [croppedImageFile, setCroppedImageFile] = useState<File | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

      // Load image for cropping
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
        setShowCropper(true);
        setFormData({ ...formData, imageFile: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const { width, height } = e.currentTarget;
      const crop = centerCrop(
        makeAspectCrop(
          {
            unit: "%",
            width: 90,
          },
          1, // aspect ratio 1:1 for square crop
          width,
          height,
        ),
        width,
        height,
      );
      setCrop(crop);
    },
    [],
  );

  const getCroppedImage = useCallback(
    async (
      image: HTMLImageElement,
      crop: PixelCrop,
      fileName: string,
    ): Promise<File> => {
      const canvas = canvasRef.current;
      if (!canvas) throw new Error("Canvas not found");

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context not found");

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      canvas.width = crop.width * scaleX;
      canvas.height = crop.height * scaleY;

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        canvas.width,
        canvas.height,
      );

      return new Promise((resolve) => {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const file = new File([blob], fileName, { type: "image/jpeg" });
              resolve(file);
            }
          },
          "image/jpeg",
          0.9,
        );
      });
    },
    [],
  );

  const handleCropComplete = async () => {
    if (!completedCrop || !imgRef.current || !formData.imageFile) return;

    try {
      const croppedFile = await getCroppedImage(
        imgRef.current,
        completedCrop,
        `cropped_${formData.imageFile.name}`,
      );
      setCroppedImageFile(croppedFile);
      setFormData({ ...formData, imageFile: croppedFile });
      setShowCropper(false);
      toast({
        title: "Image cropped successfully",
        description: "Your image has been cropped and is ready for submission",
      });
    } catch (error) {
      toast({
        title: "Cropping failed",
        description: "There was an error cropping your image",
        variant: "destructive",
      });
    }
  };

  const resetImage = () => {
    setImageSrc("");
    setShowCropper(false);
    setCrop(undefined);
    setCompletedCrop(undefined);
    setCroppedImageFile(null);
    setFormData({ ...formData, imageFile: null });
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
    (formData.imageFile || croppedImageFile);

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
              {(formData.imageFile || croppedImageFile) && (
                <div className="mt-2 space-y-2">
                  <p className="text-sm text-green-600">
                    ✓ Selected: {(croppedImageFile || formData.imageFile)?.name}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowCropper(true)}
                      className="flex items-center gap-1"
                    >
                      <Crop className="h-3 w-3" />
                      {croppedImageFile ? "Re-crop" : "Crop Image"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={resetImage}
                      className="flex items-center gap-1"
                    >
                      <X className="h-3 w-3" />
                      Remove
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Image Cropper Modal */}
          {showCropper && imageSrc && (
            <div className="space-y-4">
              <Separator />
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Crop className="h-5 w-5" />
                Crop Your Image
              </h3>
              <Card className="p-4">
                <div className="max-h-96 overflow-auto">
                  <ReactCrop
                    crop={crop}
                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                    onComplete={(c) => setCompletedCrop(c)}
                    aspect={1} // Square crop
                    minWidth={100}
                    minHeight={100}
                  >
                    <img
                      ref={imgRef}
                      alt="Crop preview"
                      src={imageSrc}
                      onLoad={onImageLoad}
                      className="max-w-full h-auto"
                    />
                  </ReactCrop>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-sm text-muted-foreground">
                    Drag to select the area you want to keep. Square crop
                    recommended for gallery.
                  </p>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowCropper(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      onClick={handleCropComplete}
                      disabled={!completedCrop}
                      className="flex items-center gap-1"
                    >
                      <Download className="h-3 w-3" />
                      Apply Crop
                    </Button>
                  </div>
                </div>
              </Card>
              <canvas
                ref={canvasRef}
                style={{ display: "none" }}
                className="max-w-full h-auto"
              />
            </div>
          )}

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
