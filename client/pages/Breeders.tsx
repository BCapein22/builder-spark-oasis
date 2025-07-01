import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ChevronLeft, ExternalLink, Star, MapPin } from "lucide-react";

export default function Breeders() {
  const featuredBreeders = [
    {
      name: "Bledsoe Exotics",
      location: "USA",
      specialties: ["Reduced Pattern", "Patternless", "Granite"],
      rating: 5,
      description: "Renowned for high-quality morphs and excellent genetics",
    },
    {
      name: "Cocoa Tokay",
      location: "South Korea",
      specialties: ["Super Red", "Candy Dot", "Normal"],
      rating: 5,
      description: "Specializing in vibrant colorations and healthy bloodlines",
    },
    {
      name: "Gekko and Gecko",
      location: "USA",
      specialties: ["Platinum", "Diablo", "Green Galaxy"],
      rating: 4,
      description: "Breeder known for rare morph development",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link to="/" className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Tokay Gecko Breeders
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with reputable breeders and learn from their expertise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredBreeders.map((breeder, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{breeder.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {breeder.location}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < breeder.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {breeder.description}
                </p>
                <div>
                  <p className="text-sm font-medium mb-2">Specialties:</p>
                  <div className="flex flex-wrap gap-2">
                    {breeder.specialties.map((specialty, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button variant="outline" size="sm" disabled className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Website
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="p-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              Breeder Directory Under Development
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">
              We're building a comprehensive directory of reputable Tokay gecko
              breeders. This will include contact information, available morphs,
              and breeding programs. Check back soon!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link to="/morphs">Browse Morphs</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/genetics">Learn Genetics</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-12 p-6 bg-muted/50 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Breeder Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="font-semibold mb-2">When Choosing a Breeder:</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Research their reputation and reviews</li>
                <li>• Ask about health guarantees</li>
                <li>• Verify genetic documentation</li>
                <li>• Inquire about care instructions</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Red Flags to Avoid:</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>• No health records or guarantees</li>
                <li>• Unwillingness to provide references</li>
                <li>• Unusually low prices</li>
                <li>• Poor communication or transparency</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
