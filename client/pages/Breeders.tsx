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
      rating: 5,
      image:
        "https://images.pexels.com/photos/2364787/pexels-photo-2364787.jpeg",
    },
    {
      name: "Cocoa Tokay",
      location: "South Korea",
      rating: 5,
      image: "https://images.pexels.com/photos/751689/pexels-photo-751689.jpeg",
    },
    {
      name: "Gekko and Gecko",
      location: "USA",
      rating: 5,
      image:
        "https://images.pexels.com/photos/5475202/pexels-photo-5475202.jpeg",
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
          {featuredBreeders.map((breeder, index) => {
            const slug = breeder.name.toLowerCase().replace(/\s+/g, "-");
            return (
              <Link to={`/breeders/${slug}`} key={index}>
                <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={breeder.image}
                      alt={breeder.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {breeder.name}
                        </CardTitle>
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
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                    >
                      View Details
                      <ChevronLeft className="h-4 w-4 ml-2 rotate-180" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
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
