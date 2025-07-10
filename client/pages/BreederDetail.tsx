import { useParams, Link, Navigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ChevronLeft,
  MapPin,
  Star,
  Globe,
  Calendar,
  Users,
  Award,
} from "lucide-react";

export default function BreederDetail() {
  const { breederName } = useParams<{ breederName: string }>();

  const breederDetails = {
    "bledsoe-exotics": {
      name: "Bledsoe Exotics",
      location: "USA",
      website: "https://bledsoeexotics.com",
      specialization: "High-quality morphs and genetic diversity",
      image:
        "https://images.pexels.com/photos/2364787/pexels-photo-2364787.jpeg",
      description:
        "Bledsoe Exotics is a premier tokay gecko breeder located in the United States, specializing in producing high-quality morphs with exceptional genetic diversity. Known for their commitment to animal health and ethical breeding practices.",
      morphsWorkedWith: [
        "Normal (Wild-type)",
        "Patternless (BHG)",
        "Granite",
        "Super Red",
        "Candy Dot",
        "Ghost",
        "Shooting Star",
        "Blueberry",
        "Carmel Albino",
        "T+ Albino",
        "T- Albino",
      ],
      breedingFocus: [
        "Genetic diversity maintenance",
        "Health-first breeding practices",
        "Morph development and refinement",
        "Line breeding for consistency",
      ],
      achievements: [
        "Established stable breeding lines for multiple morphs",
        "Known for exceptional animal health records",
        "Active in tokay gecko community education",
      ],
      gallery: [
        "https://images.pexels.com/photos/2364787/pexels-photo-2364787.jpeg",
        "https://images.pexels.com/photos/751689/pexels-photo-751689.jpeg",
        "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2F6d0d3ee54f3c412f9928072512e55cb2",
      ],
    },
    "cocoa-tokay": {
      name: "Cocoa Tokay",
      location: "South Korea",
      website: "https://cocoatokay.com",
      specialization: "rare morphs",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2Fcc148cf109ff41c2b37de36a4bb77d21",
      description:
        "Cocoa Tokay is a leading tokay gecko breeder based in South Korea, specializing in maintaining pure bloodlines and developing rare morphs. They are particularly known for their work with Luna.",
      morphsWorkedWith: [
        "Luna",
        "Ghost",
        "Blueberry",
        "Nightmare",
        "Axanthic",
        "Powder Blue Patternless",
        "Shooting Star",
      ],
      breedingFocus: [
        "Rare morph development",
        "Genetic research and documentation",
      ],
      achievements: [
        "First to establish Luna breeding program",
        "Documented multiple new morph discoveries",
        "Pioneer in tokay gecko genetics",
      ],
      gallery: [
        "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2F97430dd350ff4aa78ca7a799eb483bb8",
        "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2Fa1bfad9d36894dcdb5777d16e36d8178",
        "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2F37141c9fc5cb437eb952e4cc6e4e1dab",
      ],
    },
    "gekko-and-gecko": {
      name: "Gekko and Gecko",
      location: "USA",
      website: "https://gekkoandgecko.com",
      specialization:
        "Innovative breeding techniques and new morph development",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2F7d4010b322e4494c8e67d8ec3c02d6c8",
      description:
        "Gekko and Gecko is an innovative breeding facility in the USA focused on developing new morphs.",
      morphsWorkedWith: [
        "Paradox",
        "Candy Dot",
        "Super Red",
        "Granite",
        "Normal (Wild-type)",
      ],
      breedingFocus: [
        "New morph development",
        "Genetic research and innovation",
        "Education and community outreach",
      ],
      achievements: [
        "Successfully produced many morphs through innovative breeding",
      ],
      gallery: [
        "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2F1d698fa4b9e2464bb7b2f33526509572",
        "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2F64a135a05c5b4fb69f65b702b7536e5f",
        "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2F26696dc7f22841529faf67830c298b03",
      ],
    },
  };

  const slug = breederName?.toLowerCase().replace(/\s+/g, "-");
  const breeder = slug
    ? breederDetails[slug as keyof typeof breederDetails]
    : null;

  if (!breeder) {
    return <Navigate to="/breeders" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link to="/breeders" className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back to Breeders
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {breeder.name}
            </h1>
            <div className="flex items-center gap-4 mb-6">
              <Badge
                variant="outline"
                className="text-lg px-4 py-2 flex items-center gap-2"
              >
                <MapPin className="h-4 w-4" />
                {breeder.location}
              </Badge>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
              {breeder.description}
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                {breeder.specialization}
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src={breeder.image}
              alt={breeder.name}
              className="w-full h-80 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Morphs Worked With */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Morphs Worked With
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {breeder.morphsWorkedWith.map((morph, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="justify-center p-2"
                >
                  {morph}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Breeding Focus & Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Breeding Focus</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {breeder.breedingFocus.map((focus, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">{focus}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {breeder.achievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">{achievement}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Gallery */}
        <Card>
          <CardHeader>
            <CardTitle>Gallery</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {breeder.gallery.map((image, index) => (
                <div
                  key={index}
                  className="aspect-square relative overflow-hidden rounded-lg"
                >
                  <img
                    src={image}
                    alt={`${breeder.name} gallery ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card className="mt-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              Interested in Working with {breeder.name}?
            </h3>
            <p className="text-muted-foreground mb-6">
              Connect with this breeder to learn more about their available
              animals and breeding programs.
            </p>
            <Button variant="outline" disabled>
              <Globe className="mr-2 h-4 w-4" />
              Visit Website (Coming Soon)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
