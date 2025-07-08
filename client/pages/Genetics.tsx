import { useState, useMemo } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  Calculator,
  BookOpen,
  Lightbulb,
  Dna,
  Heart,
  Info,
} from "lucide-react";

interface Morph {
  name: string;
  genetics: "Dominant" | "Recessive" | "Co-dominant" | "Incomplete Dominant";
  symbol: string;
  description: string;
}

interface BreedingResult {
  genotype: string;
  phenotype: string;
  percentage: number;
  description: string;
}

export default function Genetics() {
  const [parent1Morph, setParent1Morph] = useState<string>("");
  const [parent2Morph, setParent2Morph] = useState<string>("");
  const [parent1Het, setParent1Het] = useState<string[]>([]);
  const [parent2Het, setParent2Het] = useState<string[]>([]);

  const morphs: Morph[] = [
    {
      name: "Normal (Wild-type)",
      genetics: "Dominant",
      symbol: "N",
      description: "The natural appearance - dominant over all morphs",
    },
    {
      name: "Reduced Pattern",
      genetics: "Incomplete Dominant",
      symbol: "RP",
      description: "Blue head, green body, reduced spots",
    },
    {
      name: "Patternless (BHG)",
      genetics: "Recessive",
      symbol: "p",
      description: "Blue head, green body, no spots",
    },
    {
      name: "Powder Blue",
      genetics: "Recessive",
      symbol: "pb",
      description: "Ice blue coloration throughout",
    },
    {
      name: "Granite",
      genetics: "Recessive",
      symbol: "g",
      description: "Dark gray base with black spots (progressive)",
    },
    {
      name: "Super Red",
      genetics: "Dominant",
      symbol: "SR",
      description: "Enhanced red coloration",
    },
    {
      name: "Platinum",
      genetics: "Recessive",
      symbol: "pt",
      description: "Silver base with yellow spots",
    },
    {
      name: "Ghost",
      genetics: "Recessive",
      symbol: "gh",
      description: "Faded, smoky appearance",
    },
    {
      name: "Axanthic",
      genetics: "Recessive",
      symbol: "ax",
      description: "Absence of yellow/red pigments",
    },
    {
      name: "Luna",
      genetics: "Recessive",
      symbol: "l",
      description: "White coloration with blue eyes",
    },
    {
      name: "Shooting Star",
      genetics: "Recessive",
      symbol: "ss",
      description: "Linear spot alignment resembling shooting stars",
    },
    {
      name: "Nightmare",
      genetics: "Recessive",
      symbol: "nm",
      description: "Dark base with contrasting light spots",
    },
  ];

  const calculateBreeding = useMemo((): BreedingResult[] => {
    if (!parent1Morph || !parent2Morph) return [];

    const parent1 = morphs.find((m) => m.name === parent1Morph);
    const parent2 = morphs.find((m) => m.name === parent2Morph);

    if (!parent1 || !parent2) return [];

    const results: BreedingResult[] = [];

    // Check if either parent is a patternless morph
    const isPatternless = (morph: Morph) =>
      morph.name === "Patternless (BHG)" ||
      morph.name === "Powder Blue Patternless";

    // Special handling for patternless morphs
    if (isPatternless(parent1) && parent2.genetics === "Dominant") {
      // Patternless x Normal = 50/50 split
      results.push(
        {
          genotype: parent1.symbol,
          phenotype: parent1.name,
          percentage: 50,
          description: `50% ${parent1.name}`,
        },
        {
          genotype: "N",
          phenotype: "Normal",
          percentage: 50,
          description: "50% normal",
        },
      );
    } else if (isPatternless(parent2) && parent1.genetics === "Dominant") {
      // Normal x Patternless = 50/50 split
      results.push(
        {
          genotype: parent2.symbol,
          phenotype: parent2.name,
          percentage: 50,
          description: `50% ${parent2.name}`,
        },
        {
          genotype: "N",
          phenotype: "Normal",
          percentage: 50,
          description: "50% normal",
        },
      );
    } else if (
      parent1.name === "Patternless (BHG)" &&
      parent2.name === "Powder Blue Patternless"
    ) {
      // BHG x Powder Blue = 75% BHG, 25% Powder Blue
      results.push(
        {
          genotype: "p",
          phenotype: "Patternless (BHG)",
          percentage: 75,
          description: "75% BHG Patternless",
        },
        {
          genotype: "pb",
          phenotype: "Powder Blue Patternless",
          percentage: 25,
          description: "25% Powder Blue Patternless",
        },
      );
    } else if (
      parent1.name === "Powder Blue Patternless" &&
      parent2.name === "Patternless (BHG)"
    ) {
      // Powder Blue x BHG = 75% BHG, 25% Powder Blue
      results.push(
        {
          genotype: "p",
          phenotype: "Patternless (BHG)",
          percentage: 75,
          description: "75% BHG Patternless",
        },
        {
          genotype: "pb",
          phenotype: "Powder Blue Patternless",
          percentage: 25,
          description: "25% Powder Blue Patternless",
        },
      );
    } else if (
      isPatternless(parent1) &&
      isPatternless(parent2) &&
      parent1.name === parent2.name
    ) {
      // Same patternless x Same patternless
      results.push({
        genotype: parent1.symbol,
        phenotype: parent1.name,
        percentage: 100,
        description: `All offspring will be ${parent1.name}`,
      });
    } else if (
      parent1.genetics === "Dominant" &&
      parent2.genetics === "Dominant"
    ) {
      // Normal x Normal
      results.push({
        genotype: "NN",
        phenotype: "Normal",
        percentage: 100,
        description: "All offspring will be normal appearing",
      });
    } else if (
      parent1.genetics === "Recessive" &&
      parent2.genetics === "Recessive" &&
      parent1.name === parent2.name &&
      !isPatternless(parent1)
    ) {
      // Same recessive x Same recessive (non-patternless)
      results.push({
        genotype: `${parent1.symbol}${parent1.symbol}`,
        phenotype: parent1.name,
        percentage: 100,
        description: `All offspring will be visual ${parent1.name}`,
      });
    } else if (
      (parent1.genetics === "Dominant" &&
        parent2.genetics === "Recessive" &&
        !isPatternless(parent2)) ||
      (parent1.genetics === "Recessive" &&
        parent2.genetics === "Dominant" &&
        !isPatternless(parent1))
    ) {
      // Normal x Recessive morph (non-patternless)
      const recessiveParent =
        parent1.genetics === "Recessive" ? parent1 : parent2;
      results.push({
        genotype: `N${recessiveParent.symbol}`,
        phenotype: `Normal (Het ${recessiveParent.name})`,
        percentage: 100,
        description: `All offspring will appear normal but carry the ${recessiveParent.name} gene`,
      });
    } else if (
      parent1.genetics === "Recessive" &&
      parent2.genetics === "Recessive" &&
      parent1.name !== parent2.name &&
      !isPatternless(parent1) &&
      !isPatternless(parent2)
    ) {
      // Different recessive morphs (non-patternless)
      results.push({
        genotype: `N${parent1.symbol} N${parent2.symbol}`,
        phenotype: `Normal (Het ${parent1.name}, Het ${parent2.name})`,
        percentage: 100,
        description: `All offspring will appear normal but carry both recessive genes`,
      });
    } else if (
      parent1.genetics === "Co-dominant" &&
      parent2.genetics === "Dominant"
    ) {
      // Co-dominant x Normal
      results.push(
        {
          genotype: `${parent1.symbol}N`,
          phenotype: parent1.name,
          percentage: 50,
          description: `50% ${parent1.name}`,
        },
        {
          genotype: "NN",
          phenotype: "Normal",
          percentage: 50,
          description: "50% normal",
        },
      );
    } else if (
      parent1.genetics === "Co-dominant" &&
      parent2.genetics === "Co-dominant" &&
      parent1.name === parent2.name
    ) {
      // Same co-dominant x Same co-dominant
      results.push(
        {
          genotype: `${parent1.symbol}${parent1.symbol}`,
          phenotype: parent1.name,
          percentage: 25,
          description: `25% ${parent1.name} (homozygous)`,
        },
        {
          genotype: `${parent1.symbol}N`,
          phenotype: parent1.name,
          percentage: 50,
          description: `50% normal ${parent1.name}`,
        },
        {
          genotype: "NN",
          phenotype: "Normal",
          percentage: 25,
          description: "25% normal",
        },
      );
    } else if (
      parent1.genetics === "Incomplete Dominant" &&
      parent2.genetics === "Dominant"
    ) {
      // Incomplete dominant x Normal
      results.push(
        {
          genotype: `${parent1.symbol}N`,
          phenotype: parent1.name,
          percentage: 50,
          description: `50% ${parent1.name}`,
        },
        {
          genotype: "NN",
          phenotype: "Normal",
          percentage: 50,
          description: "50% normal",
        },
      );
    } else if (
      parent1.genetics === "Incomplete Dominant" &&
      parent2.genetics === "Incomplete Dominant" &&
      parent1.name === parent2.name
    ) {
      // Same incomplete dominant x Same incomplete dominant
      results.push(
        {
          genotype: `${parent1.symbol}${parent1.symbol}`,
          phenotype: parent1.name,
          percentage: 25,
          description: `25% ${parent1.name} (homozygous - more dramatic expression)`,
        },
        {
          genotype: `${parent1.symbol}N`,
          phenotype: parent1.name,
          percentage: 50,
          description: `50% ${parent1.name}`,
        },
        {
          genotype: "NN",
          phenotype: "Normal",
          percentage: 25,
          description: "25% normal",
        },
      );
    } else {
      // Default case for complex genetics
      results.push({
        genotype: "Variable",
        phenotype: "Complex genetics",
        percentage: 100,
        description:
          "Complex inheritance pattern - consult detailed breeding charts for specific outcomes",
      });
    }

    return results;
  }, [parent1Morph, parent2Morph, parent1Het, parent2Het]);

  const resetCalculator = () => {
    setParent1Morph("");
    setParent2Morph("");
    setParent1Het([]);
    setParent2Het([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
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
            Understanding inheritance patterns and breeding outcomes for Tokay
            gecko morphs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Breeding Calculator */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Breeding Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Parent 1 */}
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">Parent 1</Label>
                    <div>
                      <Label htmlFor="parent1">Visual Morph</Label>
                      <Select
                        value={parent1Morph}
                        onValueChange={setParent1Morph}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select morph" />
                        </SelectTrigger>
                        <SelectContent>
                          {morphs.map((morph) => (
                            <SelectItem key={morph.name} value={morph.name}>
                              {morph.name} ({morph.genetics})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Parent 2 */}
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">Parent 2</Label>
                    <div>
                      <Label htmlFor="parent2">Visual Morph</Label>
                      <Select
                        value={parent2Morph}
                        onValueChange={setParent2Morph}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select morph" />
                        </SelectTrigger>
                        <SelectContent>
                          {morphs.map((morph) => (
                            <SelectItem key={morph.name} value={morph.name}>
                              {morph.name} ({morph.genetics})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={resetCalculator}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    Reset
                  </Button>
                </div>

                {/* Results */}
                {calculateBreeding.length > 0 && (
                  <div className="space-y-4">
                    <Separator />
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Dna className="h-5 w-5" />
                      Breeding Results
                    </h3>
                    <div className="space-y-3">
                      {calculateBreeding.map((result, index) => (
                        <Card
                          key={index}
                          className="p-4 bg-gradient-to-r from-primary/5 to-accent/5"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <Badge
                                variant="secondary"
                                className="font-mono text-sm"
                              >
                                {result.genotype}
                              </Badge>
                              <span className="font-semibold">
                                {result.phenotype}
                              </span>
                            </div>
                            <Badge
                              variant="outline"
                              className="text-lg font-bold"
                            >
                              {result.percentage}%
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {result.description}
                          </p>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Genetics Guide */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Genetics Guide
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-primary mb-2">Dominant</h4>
                  <p className="text-sm text-muted-foreground">
                    Only one copy needed to express the trait. Normal is
                    dominant over all morphs.
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold text-secondary mb-2">
                    Recessive
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Two copies needed to express the trait. Both parents must
                    carry the gene.
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold text-accent mb-2">
                    Co-dominant
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    One copy expresses the trait, two copies create enhanced
                    expression.
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold text-orange-600 mb-2">
                    Incomplete Dominant
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    One copy shows partial expression, two copies show full
                    expression.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Breeding Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Heart className="h-4 w-4 text-red-500 mt-0.5" />
                  <p className="text-sm">
                    Always prioritize animal health over specific morphs
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-blue-500 mt-0.5" />
                  <p className="text-sm">
                    Keep detailed breeding records for genetic tracking
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Dna className="h-4 w-4 text-green-500 mt-0.5" />
                  <p className="text-sm">
                    Outcross regularly to maintain genetic diversity
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Morph Reference */}
        <Card>
          <CardHeader>
            <CardTitle>Morph Genetics Reference</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {morphs.map((morph) => (
                <Card key={morph.name} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-sm">{morph.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {morph.genetics}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="font-mono text-xs">
                      {morph.symbol}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {morph.description}
                  </p>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-800 mb-2">
                  Important Disclaimer
                </h3>
                <p className="text-sm text-yellow-700">
                  This calculator provides basic genetic predictions based on
                  simple Mendelian inheritance. Tokay gecko genetics can be
                  complex, and actual results may vary due to polygenic traits,
                  environmental factors, and incomplete understanding of some
                  morphs. Always consult with experienced breeders and maintain
                  detailed breeding records.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
