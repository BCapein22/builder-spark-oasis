import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { ChevronRight, BookOpen, Dna, Users, Star } from "lucide-react";

export default function Index() {
  const features = [
    {
      icon: BookOpen,
      title: "Comprehensive Morph Guide",
      description:
        "Detailed information on all known Tokay gecko morphs, from common to super rare varieties.",
    },
    {
      icon: Dna,
      title: "Genetics Calculator",
      description:
        "Understand inheritance patterns and predict offspring outcomes with our breeding calculator.",
    },
    {
      icon: Users,
      title: "Breeder Network",
      description:
        "Connect with reputable breeders and learn from their expertise and breeding programs.",
    },
    {
      icon: Star,
      title: "Latest Discoveries",
      description:
        "Stay updated with the newest morph discoveries and breeding breakthroughs.",
    },
  ];

  const popularMorphs = [
    {
      name: "Reduced Pattern",
      rarity: "Uncommon",
      color: "bg-gradient-to-r from-gecko-blue to-gecko-green",
    },
    {
      name: "Patternless",
      rarity: "Rare",
      color: "bg-gradient-to-r from-gecko-green to-gecko-blue",
    },
    {
      name: "Granite",
      rarity: "Super Rare",
      color: "bg-gradient-to-r from-gray-600 to-gray-800",
    },
    {
      name: "Super Red",
      rarity: "Rare",
      color: "bg-gradient-to-r from-gecko-orange to-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-secondary/10 to-accent/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
        <div className="container relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Tokay Gecko Morph Guide
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Your comprehensive resource for understanding Gekko gekko genetics,
            morphs, and breeding
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link to="/morphs">
                Explore Morphs <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8"
            >
              <Link to="/genetics">Learn Genetics</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-background to-muted/20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Know
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From basic genetics to advanced breeding strategies, we've got you
              covered
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Morphs Preview */}
      <section className="py-24 px-4 bg-gradient-to-br from-muted/40 via-primary/5 to-accent/5">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Popular Morphs
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover some of the most sought-after Tokay gecko morphs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {popularMorphs.map((morph, index) => (
              <Link to="/morphs" key={index}>
                <Card className="group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden cursor-pointer">
                  <div className={`h-32 ${morph.color} relative`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  </div>
                  <CardHeader className="text-center">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {morph.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {morph.rarity}
                    </p>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg">
              <Link to="/morphs">
                View All Morphs <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container">
          <Card className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-0">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join our community of Tokay gecko enthusiasts and breeders.
                Learn, share, and discover together.
              </p>
              <Button asChild size="lg" className="text-lg px-8">
                <Link to="/morphs">Get Started</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4 bg-muted/30">
        <div className="container text-center">
          <div className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            GekkoGuide
          </div>
          <p className="text-muted-foreground mb-4">
            Your trusted source for Tokay gecko morph information and genetics
          </p>
          <p className="text-sm text-muted-foreground">
            Built with data from leading breeders and the reptile community
          </p>
        </div>
      </footer>
    </div>
  );
}
