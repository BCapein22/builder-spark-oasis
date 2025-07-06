import { useState } from "react";
import Navigation from "@/components/Navigation";
import GeckoCard from "@/components/GeckoCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";

export default function MorphGuide() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenetics, setSelectedGenetics] = useState<string | null>(null);

  const morphs = [
    {
      name: "Normal (Wild-type)",
      genetics: "Dominant",
      description:
        "The natural appearance of Tokay geckos featuring a vibrant blue base color with distinctive red or orange spots. This is the foundation morph from which all others derive.",
      traits: [
        "Blue base",
        "Red/orange spots",
        "White baring",
        "Robust pattern",
      ],
      rarity: "Common" as const,
      image:
        "https://images.pexels.com/photos/2364787/pexels-photo-2364787.jpeg",
    },
    {
      name: "Reduced Pattern",
      genetics: "Incomplete Dominant",
      description:
        "An incomplete dominant morph characterized by a blue head, green body, and significantly reduced spotting. Often displays minimal to no spots with prominent white baring.",
      traits: ["Blue head", "Green body", "Reduced spots", "White baring"],
      rarity: "Uncommon" as const,
      image:
        "https://images.pexels.com/photos/5475202/pexels-photo-5475202.jpeg",
    },
    {
      name: "Patternless (BHG)",
      genetics: "Recessive",
      description:
        "Blue Headed Green Patternless results in a solid-colored gecko with a distinctive blue head and green body, completely lacking the typical spot pattern.",
      traits: ["Blue head", "Green body", "No spots", "Solid coloration"],
      rarity: "Rare" as const,
      image:
        "https://images.pexels.com/photos/19945875/pexels-photo-19945875.jpeg",
    },
    {
      name: "Powder Blue Patternless",
      genetics: "Recessive",
      description:
        "A stunning recessive morph displaying an ice blue coloration across both head and body, creating a uniform, ethereal appearance without any pattern.",
      traits: [
        "Ice blue coloration",
        "No pattern",
        "Uniform color",
        "Striking appearance",
      ],
      rarity: "Rare" as const,
      image: "https://images.pexels.com/photos/298010/pexels-photo-298010.jpeg",
    },
    {
      name: "Granite",
      genetics: "Recessive Progressive",
      description:
        "Features a dark gray or charcoal base with black spots resembling granite stone. This is a progressive trait where offspring may appear normal at hatching and develop the granite appearance over time.",
      traits: [
        "Dark gray base",
        "Black spots",
        "Progressive trait",
        "Granite-like texture",
      ],
      rarity: "Super Rare" as const,
      image:
        "https://images.pexels.com/photos/6788326/pexels-photo-6788326.jpeg",
    },
    {
      name: "Super Red",
      genetics: "Co-dominant",
      description:
        "A co-dominant morph producing geckos with intensely vibrant red coloration, ranging from deep crimson to bright orange-red spots with enhanced color saturation.",
      traits: [
        "Intense red spots",
        "Enhanced saturation",
        "Variable intensity",
        "Vibrant appearance",
      ],
      rarity: "Rare" as const,
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2Fdb47718a45a84a57888fb732572b0b29",
    },
    {
      name: "Platinum",
      genetics: "Recessive",
      description:
        "A recessive trait featuring a silver base coloration with yellow spots, accompanied by distinctive platinum-colored eyes that give this morph its name.",
      traits: [
        "Silver base",
        "Yellow spots",
        "Platinum eyes",
        "Metallic appearance",
      ],
      rarity: "Super Rare" as const,
      image:
        "https://images.pexels.com/photos/5475202/pexels-photo-5475202.jpeg",
    },
    {
      name: "Candy Dot",
      genetics: "Recessive",
      description:
        "A recessive morph where spots align in uniform patterns resembling candy dots. Notable for the absence of white baring and eyes that range from dark to completely black.",
      traits: [
        "Aligned spots",
        "No white baring",
        "Dark/black eyes",
        "Uniform pattern",
      ],
      rarity: "Rare" as const,
      image:
        "https://images.pexels.com/photos/1875923/pexels-photo-1875923.jpeg",
    },
    {
      name: "Diablo",
      genetics: "Recessive",
      description:
        "Features a beautiful lavender base coloration with yellow spots and distinctive black eyes. Unlike some morphs, Diablo retains the characteristic white baring.",
      traits: [
        "Lavender base",
        "Yellow spots",
        "Black eyes",
        "White baring retained",
      ],
      rarity: "Super Rare" as const,
      image:
        "https://images.pexels.com/photos/32767083/pexels-photo-32767083.jpeg",
    },
    {
      name: "Green Galaxy",
      genetics: "Combo Morph",
      description:
        "Not a true morph but an 'odd ball' resulting from specific breeding combinations. Displays a green body, blue head, and notably reduced spot size creating a unique appearance.",
      traits: ["Green body", "Blue head", "Reduced spot size", "Combo result"],
      rarity: "Uncommon" as const,
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2F1f2646c07ddf4895a97aed2a00605a86",
    },
    {
      name: "Luna",
      genetics: "Recessive",
      description:
        "A stunning morph characterized by solid white coloration with distinctive sapphire blue eyes, resulting from a complete absence of melanin. Both parents must carry the gene to produce Luna offspring.",
      traits: [
        "Solid white coloration",
        "Sapphire blue eyes",
        "No melanin",
        "Extremely rare",
      ],
      rarity: "Super Rare" as const,
      image:
        "https://images.pexels.com/photos/1313252/pexels-photo-1313252.jpeg",
    },
    {
      name: "Ghost",
      genetics: "Recessive",
      description:
        "Features a faded, smoky appearance with reduced dark pigmentation. As a Recessive trait, Both parents needs to carry the gene for offspring to exhibit the ghostly coloration.",
      traits: [
        "Faded appearance",
        "Reduced pigmentation",
        "Smoky coloration",
        "Color variability",
      ],
      rarity: "Uncommon" as const,
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2F14bfc223d5a44b5fbd6755237a2abc58",
    },
    {
      name: "Nightmare",
      genetics: "Line-bred",
      description:
        "A distinctive morph featuring a dark base color (black or deep brown) with contrasting light spots or patterns, creating a striking 'nightmarish' appearance. May be line-bred rather than a single gene trait.",
      traits: [
        "Dark base color",
        "Light contrasting spots",
        "Striking appearance",
        "Variable pattern",
      ],
      rarity: "Rare" as const,
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2F97430dd350ff4aa78ca7a799eb483bb8",
    },
    {
      name: "Paradox",
      genetics: "Complex Multi-gene",
      description:
        "An unpredictable morph displaying a combination of contrasting colors and patterns, often blending elements from different morphs. Each individual is unique due to complex genetic interactions.",
      traits: [
        "Mixed patterns",
        "Unpredictable appearance",
        "Unique individuals",
        "Complex genetics",
      ],
      rarity: "Super Rare" as const,
      image:
        "https://images.pexels.com/photos/5475192/pexels-photo-5475192.jpeg",
    },
    {
      name: "Axanthic",
      genetics: "Recessive",
      description:
        "Characterized by the reduction or absence of yellow and red pigments, resulting in predominantly gray or silver coloration with black spots. Both parents must carry the axanthic gene.",
      traits: [
        "Gray/silver base",
        "No yellow/red pigments",
        "Black spots",
        "Monochrome appearance",
      ],
      rarity: "Rare" as const,
      image:
        "https://images.pexels.com/photos/2968965/pexels-photo-2968965.jpeg",
    },
  ];

  const geneticsTypes = [
    "All",
    "Dominant",
    "Recessive",
    "Co-dominant",
    "Incomplete Dominant",
    "Combo Morph",
  ];

  const filteredMorphs = morphs.filter((morph) => {
    const matchesSearch =
      morph.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      morph.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      morph.traits.some((trait) =>
        trait.toLowerCase().includes(searchTerm.toLowerCase()),
      );

    const matchesGenetics =
      !selectedGenetics ||
      selectedGenetics === "All" ||
      morph.genetics === selectedGenetics;

    return matchesSearch && matchesGenetics;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Tokay Gecko Morph Guide
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive guide to Gekko gekko morphs, their genetics, and
            characteristics. Learn about each morph's inheritance patterns and
            breeding potential.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search morphs, traits, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <div className="flex flex-wrap gap-2">
                {geneticsTypes.map((type) => (
                  <Button
                    key={type}
                    variant={selectedGenetics === type ? "default" : "outline"}
                    size="sm"
                    onClick={() =>
                      setSelectedGenetics(type === "All" ? null : type)
                    }
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredMorphs.length} of {morphs.length} morphs
          </p>
        </div>

        {/* Morphs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMorphs.map((morph, index) => (
            <GeckoCard
              key={index}
              name={morph.name}
              genetics={morph.genetics}
              description={morph.description}
              traits={morph.traits}
              rarity={morph.rarity}
              image={morph.image}
            />
          ))}
        </div>

        {filteredMorphs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🦎</div>
            <h3 className="text-xl font-semibold mb-2">No morphs found</h3>
            <p className="text-muted-foreground text-lg mb-4">
              No morphs match your current search criteria.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedGenetics(null);
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Breeding Notes */}
        <div className="mt-16 p-8 bg-muted/50 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">
            Understanding Tokay Gecko Genetics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="font-semibold mb-2 text-primary">
                Dominant Traits
              </h3>
              <p className="text-muted-foreground mb-4">
                Appear when at least one copy of the gene is present. Only one
                parent needs to carry the trait.
              </p>

              <h3 className="font-semibold mb-2 text-secondary">
                Recessive Traits
              </h3>
              <p className="text-muted-foreground">
                Appear only when two copies of the gene are present. Both
                parents must carry the trait.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-accent">
                Co-dominant Traits
              </h3>
              <p className="text-muted-foreground mb-4">
                Show intermediate expression with one copy and full expression
                with two copies.
              </p>

              <h3 className="font-semibold mb-2 text-gecko-gray">
                Progressive Traits
              </h3>
              <p className="text-muted-foreground">
                Develop over time. Offspring may appear normal at hatching but
                develop the trait as they mature.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
