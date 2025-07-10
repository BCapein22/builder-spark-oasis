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

interface BreedingRecord {
  id: string;
  parent1: {
    name: string;
    morph: string;
    hets: string[];
  };
  parent2: {
    name: string;
    morph: string;
    hets: string[];
  };
  date: string;
  generation: number;
  offspring?: BreedingRecord[];
  notes?: string;
}

interface LineBreedingAnalysis {
  inbreedingCoefficient: number;
  commonAncestors: string[];
  generationsSeparated: number;
  riskLevel: "Low" | "Moderate" | "High" | "Very High";
  recommendations: string[];
}

export default function Genetics() {
  const [parent1Morph, setParent1Morph] = useState<string>("");
  const [parent2Morph, setParent2Morph] = useState<string>("");
  const [parent1Het, setParent1Het] = useState<string[]>([]);
  const [parent2Het, setParent2Het] = useState<string[]>([]);

  // Line breeding tracking state
  const [breedingRecords, setBreedingRecords] = useState<BreedingRecord[]>([]);
  const [parent1Name, setParent1Name] = useState<string>("");
  const [parent2Name, setParent2Name] = useState<string>("");
  const [parent1Id, setParent1Id] = useState<string>("");
  const [parent2Id, setParent2Id] = useState<string>("");
  const [showLineBreeding, setShowLineBreeding] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<string>("");

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
      symbol: "rp",
      description: "Blue head, green body, reduced spots",
    },
    {
      name: "Patternless (BHG)",
      genetics: "Co-dominant",
      symbol: "p",
      description: "Blue head, green body, no spots",
    },
    {
      name: "Powder Blue",
      genetics: "Co-dominant",
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
      symbol: "LN",
      description: "Solid white coloration",
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
    {
      name: "Blueberry",
      genetics: "Recessive",
      symbol: "bb",
      description: "Black foot splotches without large red spots",
    },
    {
      name: "Carmel Albino",
      genetics: "Recessive",
      symbol: "ca",
      description: "Caramel coloration",
    },
    {
      name: "T+ Albino",
      genetics: "Recessive",
      symbol: "t+",
      description: "Pale caramel coloration",
    },
    {
      name: "T- Albino",
      genetics: "Recessive",
      symbol: "t-",
      description: "Pale coloration with red irises",
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
          phenotype: "Patternless (BHG)",
          percentage: 25,
          description: `25% Patternless (BHG)`,
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
    setParent1Name("");
    setParent2Name("");
    setParent1Id("");
    setParent2Id("");
  };

  const saveBreedingRecord = () => {
    if (!parent1Morph || !parent2Morph || !parent1Name || !parent2Name) return;

    const newRecord: BreedingRecord = {
      id: Date.now().toString(),
      parent1: {
        name: parent1Name,
        morph: parent1Morph,
        hets: parent1Het,
      },
      parent2: {
        name: parent2Name,
        morph: parent2Morph,
        hets: parent2Het,
      },
      date: new Date().toLocaleDateString(),
      generation: calculateGeneration(),
    };

    setBreedingRecords((prev) => [...prev, newRecord]);
  };

  const calculateGeneration = (): number => {
    // Find the highest generation from parent lineages + 1
    let maxGen = 0;

    if (parent1Id) {
      const parent1Record = breedingRecords.find((r) => r.id === parent1Id);
      if (parent1Record) maxGen = Math.max(maxGen, parent1Record.generation);
    }

    if (parent2Id) {
      const parent2Record = breedingRecords.find((r) => r.id === parent2Id);
      if (parent2Record) maxGen = Math.max(maxGen, parent2Record.generation);
    }

    return maxGen + 1;
  };

  const analyzeLineBreeding = (): LineBreedingAnalysis | null => {
    if (!parent1Id || !parent2Id) return null;

    const parent1Record = breedingRecords.find((r) => r.id === parent1Id);
    const parent2Record = breedingRecords.find((r) => r.id === parent2Id);

    if (!parent1Record || !parent2Record) return null;

    // Simple analysis - check for common ancestors
    const commonAncestors = findCommonAncestors(parent1Record, parent2Record);
    const generationsSeparated = Math.abs(
      parent1Record.generation - parent2Record.generation,
    );

    let inbreedingCoefficient = 0;
    let riskLevel: "Low" | "Moderate" | "High" | "Very High" = "Low";
    let recommendations: string[] = [];

    if (commonAncestors.length > 0) {
      inbreedingCoefficient = 0.25 * commonAncestors.length; // Simplified calculation

      if (generationsSeparated <= 1) {
        riskLevel = "Very High";
        recommendations.push("Not recommended - too closely related");
        recommendations.push("Consider outcrossing to unrelated bloodlines");
      } else if (generationsSeparated <= 2) {
        riskLevel = "High";
        recommendations.push("High risk - monitor offspring carefully");
        recommendations.push("Consider genetic diversity in future pairings");
      } else if (generationsSeparated <= 3) {
        riskLevel = "Moderate";
        recommendations.push("Moderate risk - acceptable with caution");
        recommendations.push("Track health and fertility in offspring");
      } else {
        riskLevel = "Low";
        recommendations.push("Low risk - good genetic diversity");
      }
    } else {
      recommendations.push("No known common ancestors - excellent outcross");
      recommendations.push("This pairing will increase genetic diversity");
    }

    return {
      inbreedingCoefficient,
      commonAncestors,
      generationsSeparated,
      riskLevel,
      recommendations,
    };
  };

  const findCommonAncestors = (
    record1: BreedingRecord,
    record2: BreedingRecord,
  ): string[] => {
    // Simplified ancestor tracking - in real implementation would trace full pedigree
    const ancestors1 = [record1.parent1.name, record1.parent2.name];
    const ancestors2 = [record2.parent1.name, record2.parent2.name];

    return ancestors1.filter((ancestor) => ancestors2.includes(ancestor));
  };

  const availableParents = breedingRecords.map((record) => ({
    id: record.id,
    name: `${record.parent1.name} x ${record.parent2.name} offspring`,
    generation: record.generation,
  }));

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

        {/* Line Breeding Toggle */}
        <div className="mb-6 text-center">
          <Button
            onClick={() => setShowLineBreeding(!showLineBreeding)}
            variant={showLineBreeding ? "default" : "outline"}
            className="flex items-center gap-2"
          >
            <Heart className="h-4 w-4" />
            {showLineBreeding ? "Hide" : "Show"} Line Breeding Tracker
          </Button>
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
                    {showLineBreeding && (
                      <div>
                        <Label htmlFor="parent1Name">Parent 1 Name</Label>
                        <input
                          type="text"
                          value={parent1Name}
                          onChange={(e) => setParent1Name(e.target.value)}
                          className="w-full px-3 py-2 border rounded-md"
                          placeholder="Enter parent name"
                        />
                      </div>
                    )}
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
                    {showLineBreeding && availableParents.length > 0 && (
                      <div>
                        <Label htmlFor="parent1Lineage">
                          Lineage (Optional)
                        </Label>
                        <Select value={parent1Id} onValueChange={setParent1Id}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select lineage" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">No lineage</SelectItem>
                            {availableParents.map((parent) => (
                              <SelectItem key={parent.id} value={parent.id}>
                                Gen {parent.generation}: {parent.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>

                  {/* Parent 2 */}
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">Parent 2</Label>
                    {showLineBreeding && (
                      <div>
                        <Label htmlFor="parent2Name">Parent 2 Name</Label>
                        <input
                          type="text"
                          value={parent2Name}
                          onChange={(e) => setParent2Name(e.target.value)}
                          className="w-full px-3 py-2 border rounded-md"
                          placeholder="Enter parent name"
                        />
                      </div>
                    )}
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
                    {showLineBreeding && availableParents.length > 0 && (
                      <div>
                        <Label htmlFor="parent2LineAge">
                          Lineage (Optional)
                        </Label>
                        <Select value={parent2Id} onValueChange={setParent2Id}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select lineage" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">No lineage</SelectItem>
                            {availableParents.map((parent) => (
                              <SelectItem key={parent.id} value={parent.id}>
                                Gen {parent.generation}: {parent.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
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
                  {showLineBreeding && (
                    <Button
                      onClick={saveBreedingRecord}
                      disabled={
                        !parent1Morph ||
                        !parent2Morph ||
                        !parent1Name ||
                        !parent2Name
                      }
                      className="flex items-center gap-2"
                    >
                      <Heart className="h-4 w-4" />
                      Save Breeding Record
                    </Button>
                  )}
                </div>

                {/* Line Breeding Analysis */}
                {showLineBreeding && analyzeLineBreeding() && (
                  <div className="space-y-4">
                    <Separator />
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Info className="h-5 w-5" />
                      Line Breeding Analysis
                    </h3>
                    {(() => {
                      const analysis = analyzeLineBreeding()!;
                      return (
                        <Card className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold">Risk Level:</span>
                              <Badge
                                variant={
                                  analysis.riskLevel === "Low"
                                    ? "default"
                                    : analysis.riskLevel === "Moderate"
                                      ? "secondary"
                                      : analysis.riskLevel === "High"
                                        ? "destructive"
                                        : "destructive"
                                }
                              >
                                {analysis.riskLevel}
                              </Badge>
                            </div>
                            <div>
                              <span className="font-semibold">
                                Inbreeding Coefficient:
                              </span>
                              <span className="ml-2">
                                {(analysis.inbreedingCoefficient * 100).toFixed(
                                  1,
                                )}
                                %
                              </span>
                            </div>
                            <div>
                              <span className="font-semibold">
                                Generations Separated:
                              </span>
                              <span className="ml-2">
                                {analysis.generationsSeparated}
                              </span>
                            </div>
                            {analysis.commonAncestors.length > 0 && (
                              <div>
                                <span className="font-semibold">
                                  Common Ancestors:
                                </span>
                                <div className="ml-2 text-sm">
                                  {analysis.commonAncestors.join(", ")}
                                </div>
                              </div>
                            )}
                            <div>
                              <span className="font-semibold">
                                Recommendations:
                              </span>
                              <ul className="ml-2 text-sm space-y-1">
                                {analysis.recommendations.map((rec, index) => (
                                  <li
                                    key={index}
                                    className="flex items-start gap-2"
                                  >
                                    <span className="text-primary">•</span>
                                    {rec}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </Card>
                      );
                    })()}
                  </div>
                )}

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

        {/* Breeding Records History */}
        {showLineBreeding && breedingRecords.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Breeding Records ({breedingRecords.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {breedingRecords.map((record) => (
                  <Card
                    key={record.id}
                    className="p-4 bg-gradient-to-r from-primary/5 to-accent/5"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Gen {record.generation}</Badge>
                        <span className="font-semibold">
                          {record.parent1.name} × {record.parent2.name}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {record.date}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">
                          ♂ {record.parent1.name}:
                        </span>
                        <div className="ml-2">
                          <Badge variant="secondary" className="text-xs mr-1">
                            {record.parent1.morph}
                          </Badge>
                          {record.parent1.hets.map((het, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs mr-1"
                            >
                              Het {het}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">
                          ♀ {record.parent2.name}:
                        </span>
                        <div className="ml-2">
                          <Badge variant="secondary" className="text-xs mr-1">
                            {record.parent2.morph}
                          </Badge>
                          {record.parent2.hets.map((het, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs mr-1"
                            >
                              Het {het}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

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
