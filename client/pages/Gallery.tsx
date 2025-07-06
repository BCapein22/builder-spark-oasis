import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import ImageSubmissionForm from "@/components/ImageSubmissionForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

export default function Gallery() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const imagesPerPage = 25;

  // Sample gallery images - in production these would come from a database or API
  const galleryImages = [
    {
      id: 1,
      url: "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2Fdb47718a45a84a57888fb732572b0b29",
      title: "Super Red Male",
      morph: "Super Red",
      photographer: "Breeder Submission",
    },
    {
      id: 2,
      url: "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2F1f2646c07ddf4895a97aed2a00605a86",
      title: "Green Galaxy Female",
      morph: "Green Galaxy",
      photographer: "Community Member",
    },
    {
      id: 3,
      url: "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2F14bfc223d5a44b5fbd6755237a2abc58",
      title: "Luna Morph",
      morph: "Luna",
      photographer: "Professional",
    },
    {
      id: 4,
      url: "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2Fd7aadac7b8ce4e2aaf388671a89e5b32",
      title: "Nightmare Pattern",
      morph: "Nightmare",
      photographer: "Breeder Submission",
    },
    {
      id: 5,
      url: "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2F62f46a51c9f248dd8fb3ff292311d9b4",
      title: "Patternless BHG",
      morph: "Patternless (BHG)",
      photographer: "Community Member",
    },
  ];

  // Only use the actual tokay gecko morph images - no placeholders
  const allImages = galleryImages;

  const allImages = [...galleryImages, ...placeholderImages];
  const totalPages = Math.ceil(allImages.length / imagesPerPage);

  const startIndex = (currentPage - 1) * imagesPerPage;
  const currentImages = allImages.slice(startIndex, startIndex + imagesPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <Navigation />

      <div className="container py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Tokay Gecko Gallery
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A curated collection of stunning Tokay gecko photographs showcasing
            the beauty and diversity of different morphs
          </p>
        </div>

        {/* Gallery Stats */}
        <div className="flex justify-center items-center gap-8 mb-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {allImages.length}
            </div>
            <div className="text-sm text-muted-foreground">Total Images</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary">
              {totalPages}
            </div>
            <div className="text-sm text-muted-foreground">Pages</div>
          </div>
        </div>

        {/* Page Navigation */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className="w-10 h-10"
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12">
          {currentImages.map((image) => (
            <Card
              key={image.id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm"
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                {/* Overlay Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white font-semibold text-sm mb-1">
                    {image.title}
                  </h3>
                  <Badge variant="secondary" className="text-xs">
                    {image.morph}
                  </Badge>
                </div>
              </div>

              {/* Image Info */}
              <div className="p-4">
                <h3 className="font-semibold text-sm mb-1 truncate">
                  {image.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-2">
                  by {image.photographer}
                </p>
                <Badge variant="outline" className="text-xs">
                  {image.morph}
                </Badge>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-center items-center gap-4">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous Page
          </Button>

          <span className="text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            variant="outline"
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="flex items-center gap-2"
          >
            Next Page
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Gallery Info */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-0">
            <h2 className="text-2xl font-bold mb-4">Share Your Photos</h2>
            <p className="text-muted-foreground mb-6">
              Have stunning photos of your Tokay geckos? We'd love to feature
              them in our gallery! Submit your high-quality images to showcase
              the beauty of these incredible creatures.
            </p>
            <Button
              size="lg"
              onClick={() => setShowSubmissionForm(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Submit Photos
            </Button>
          </Card>
        </div>

        {/* Image Submission Form */}
        <ImageSubmissionForm
          isOpen={showSubmissionForm}
          onClose={() => setShowSubmissionForm(false)}
        />
      </div>
    </div>
  );
}
