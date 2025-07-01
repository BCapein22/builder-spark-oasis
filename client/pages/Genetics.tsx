import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft, Calculator, BookOpen, Lightbulb } from "lucide-react";

export default function Genetics() {
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
            Tokay Gecko Genetics
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Understanding inheritance patterns and breeding outcomes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center p-8">
            <Calculator className="h-12 w-12 mx-auto mb-4 text-primary" />
            <CardTitle className="mb-2">Breeding Calculator</CardTitle>
            <p className="text-muted-foreground text-sm mb-4">
              Calculate potential offspring outcomes based on parent genetics
            </p>
            <Button disabled className="w-full">
              Coming Soon
            </Button>
          </Card>

          <Card className="text-center p-8">
            <BookOpen className="h-12 w-12 mx-auto mb-4 text-secondary" />
            <CardTitle className="mb-2">Genetics Guide</CardTitle>
            <p className="text-muted-foreground text-sm mb-4">
              Learn about dominant, recessive, and co-dominant traits
            </p>
            <Button disabled className="w-full">
              Coming Soon
            </Button>
          </Card>

          <Card className="text-center p-8">
            <Lightbulb className="h-12 w-12 mx-auto mb-4 text-accent" />
            <CardTitle className="mb-2">Breeding Tips</CardTitle>
            <p className="text-muted-foreground text-sm mb-4">
              Expert advice for successful breeding programs
            </p>
            <Button disabled className="w-full">
              Coming Soon
            </Button>
          </Card>
        </div>

        <Card className="p-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              Genetics Section Under Development
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">
              We're working on comprehensive genetics tools and guides. Check
              back soon for breeding calculators, inheritance charts, and expert
              breeding advice.
            </p>
            <Button asChild>
              <Link to="/morphs">Explore Morphs Instead</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
