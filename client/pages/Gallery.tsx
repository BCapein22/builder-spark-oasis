import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import ImageSubmissionForm from "@/components/ImageSubmissionForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";

export default function Gallery() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const imagesPerPage = 25;

  // Gallery images with all morphs from the guide
  const galleryImages = [
    {
      id: 1,
      url: "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2F6d0d3ee54f3c412f9928072512e55cb2",
      title: "Normal Wild-type",
      morph: "Normal (Wild-type)",
    },
    {
      id: 2,
      url: "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2F1aed7186737543d29a875edc372db330",
      title: "Reduced Pattern",
      morph: "Reduced Pattern",
    },
    {
      id: 3,
      url: "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2Fdc77533129d0486d824831476e243821",
      title: "Patternless BHG",
      morph: "Patternless (BHG)",
    },
    {
      id: 4,
      url: "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2Fc1f66d00582145faa715a74535e01788",
      title: "Powder Blue Patternless",
      morph: "Powder Blue Patternless",
    },
    {
      id: 5,
      url: "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2F5e1bda61479e478eaff84daaa180614a",
      title: "Granite Morph",
      morph: "Granite",
      author: "LuckyFootGeckos",
    },
    {
      id: 6,
      url: "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2Fc9bc22750446420397a738136f74bed8",
      title: "Super Red Male",
      morph: "Super Red",
    },
    {
      id: 7,
      url: "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2F1486ff8f3dc449ec8843041f426a36b2",
      title: "Candy Dot Pattern",
      morph: "Candy Dot",
    },
    {
      id: 8,
      url: "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2F1dad7f014b544e299a1c73a0dd4d40af",
      title: "Diablo Morph",
      morph: "Diablo",
    },
    {
      id: 9,
      url: "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2Fdc56379e226949a18315bd69b0030b1b",
      title: "Green Galaxy",
      morph: "Green Galaxy",
    },
    {
      id: 10,
      url: "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2Fa1bfad9d36894dcdb5777d16e36d8178",
      title: "Luna Morph",
      morph: "Luna",
    },
    {
      id: 11,
      url: "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2F4ea564ada4694527851cc7854af0c657",
      title: "Ghost Morph",
      morph: "Ghost",
    },
    {
      id: 12,
      url: "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2F63fedf823f6d4427bb96d5d7b8daa666",
      title: "Nightmare Morph",
      morph: "Nightmare",
    },
    {
      id: 13,
      url: "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2F0c8db1cd12134dc8a042d5978f3fe16b",
      title: "Paradox Pattern",
      morph: "Paradox",
    },
    {
      id: 14,
      url: "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2F37141c9fc5cb437eb952e4cc6e4e1dab",
      title: "Shooting Star",
      morph: "Shooting Star",
    },
    {
      id: 15,
      url: "https://images.pexels.com/photos/5475192/pexels-photo-5475192.jpeg",
      title: "Blueberry Morph",
      morph: "Blueberry",
    },
    {
      id: 16,
      url: "https://images.pexels.com/photos/2968965/pexels-photo-2968965.jpeg",
      title: "Carmel Albino",
      morph: "Carmel Albino",
    },
    {
      id: 17,
      url: "https://images.pexels.com/photos/298010/pexels-photo-298010.jpeg",
      title: "T+ Albino",
      morph: "T+ Albino",
    },
    {
      id: 18,
      url: "https://images.pexels.com/photos/6788326/pexels-photo-6788326.jpeg",
      title: "T- Albino",
      morph: "T- Albino",
    },
  ];

  // Only use the actual tokay gecko morph images - no placeholders
  const allImages = galleryImages;
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
              className="group overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm cursor-pointer"
              onClick={() => setSelectedImage(image)}
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

        {/* Full-size Image Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-[90vw] max-h-[90vh] p-4">
              <Button
                variant="outline"
                size="sm"
                className="absolute top-2 right-2 z-10 bg-white/90 hover:bg-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="absolute bottom-2 left-2 right-2 bg-black/70 text-white p-3 rounded-lg backdrop-blur-sm">
                <h3 className="font-semibold mb-1">{selectedImage.title}</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {selectedImage.morph}
                  </Badge>
                  <span className="text-xs opacity-75">
                    by {selectedImage.photographer}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
