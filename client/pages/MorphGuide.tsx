import { useState } from "react";
import { Link } from "react-router-dom";
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
        "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2F6d0d3ee54f3c412f9928072512e55cb2",
    },
    {
      name: "Reduced Pattern",
      genetics: "Co-dominant",
      description:
        "An incomplete dominant morph characterized by a blue head, green body, and significantly reduced spotting. Often displays minimal to no spots with prominent white baring.",
      traits: ["Blue head", "Green body", "Reduced spots", "White baring"],
      rarity: "Uncommon" as const,
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2F1aed7186737543d29a875edc372db330",
    },
    {
      name: "Patternless (BHG)",
      genetics: "Co-dominant",
      description:
        "Blue Headed Green Patternless results in a solid-colored gecko with a distinctive blue head and green body, completely lacking the typical spot pattern.",
      traits: ["Blue head", "Green body", "No spots", "Solid coloration"],
      rarity: "Rare" as const,
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2Fdc77533129d0486d824831476e243821",
    },
    {
      name: "Powder Blue Patternless",
      genetics: "Recessive",
      description:
        "A stunning recessive morph displaying uniform ice blue coloration across both head and body, creating an ethereal appearance without any pattern. Unlike BHG patternless (blue head, green body), Powder Blue maintains consistent ice-blue coloration throughout.",
      traits: [
        "Ice blue coloration",
        "No pattern",
        "Uniform color",
        "Striking appearance",
      ],
      rarity: "Rare" as const,
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2Fe8f515b1f4d5428d87e8f4ec424a0efb",
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
        "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2F5e1bda61479e478eaff84daaa180614a",
    },
    {
      name: "Super Red",
      genetics: "Dominant",
      description:
        "A dominant morph producing geckos with intensely vibrant red coloration, ranging from deep crimson to bright orange-red spots with enhanced color saturation.",
      traits: [
        "Intense red spots",
        "Enhanced saturation",
        "Variable intensity",
        "Vibrant appearance",
      ],
      rarity: "Rare" as const,
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2F0e613898ad864e4b9c382323a7854f4b",
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
      image: "",
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
        "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2F1486ff8f3dc449ec8843041f426a36b2",
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
        "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2F1dad7f014b544e299a1c73a0dd4d40af",
    },

    {
      name: "Luna",
      genetics: "Recessive",
      description:
        "A stunning morph characterized by solid white coloration. Both parents must carry the gene to produce Luna offspring.",
      traits: [
        "Solid white coloration",
        "Extremely rare",
        "Striking appearance",
        "Leucistic trait",
      ],
      rarity: "Super Rare" as const,
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2Fa1bfad9d36894dcdb5777d16e36d8178",
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
        "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2F4ea564ada4694527851cc7854af0c657",
    },
    {
      name: "Nightmare",
      genetics: "Recessive",
      description:
        "A distinctive recessive morph featuring a dark base color (black or deep brown) with contrasting light spots or patterns, creating a striking 'nightmarish' appearance.",
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
      genetics: "Recessive",
      description:
        "A distinct recessive morph featuring unique and variable patterns that create a striking appearance. Each Paradox individual displays its own characteristic pattern combinations, making this morph highly sought after.",
      traits: [
        "Variable patterns",
        "Unique appearance",
        "Recessive trait",
        "Individual variation",
      ],
      rarity: "Super Rare" as const,
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2F0c8db1cd12134dc8a042d5978f3fe16b",
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
        "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2F938fd48f5d514278b10afd4a0fc5a8b6",
    },
    {
      name: "Shooting Star",
      genetics: "Recessive",
      description:
        "A distinctive recessive morph where spots align in a straight line down the gecko's back, resembling shooting stars. A unique linear pattern that sets it apart from other morphs.",
      traits: [
        "Linear spot alignment",
        "Straight-line pattern",
        "Distinctive appearance",
      ],
      rarity: "Super Rare" as const,
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2F37141c9fc5cb437eb952e4cc6e4e1dab",
    },
    {
      name: "Blueberry",
      genetics: "Recessive",
      description:
        "A distinctive recessive morph characterized by black splotches on their feet and lacking the typical large red spots found in normal tokays.",
      traits: [
        "Black foot splotches",
        "No large red spots",
        "Unique coloration",
        "Recessive trait",
      ],
      rarity: "Rare" as const,
      image:
        "https://images.pexels.com/photos/5475192/pexels-photo-5475192.jpeg",
    },
    {
      name: "Carmel Albino",
      genetics: "Recessive",
      description:
        "A distinctive albino morph displaying a beautiful caramel hue. This recessive trait requires both parents to carry the gene for expression.",
      traits: [
        "Caramel coloration",
        "Light pigmentation",
        "Recessive trait",
        "Pale appearance",
      ],
      rarity: "Super Rare" as const,
      image:
        "https://images.pexels.com/photos/2968965/pexels-photo-2968965.jpeg",
    },
    {
      name: "T+ Albino",
      genetics: "Recessive",
      description:
        "A pale albino morph with caramel coloration and brown/gray tones.",
      traits: ["Brown/gray tones", "Pale coloration", "Light pigmentation"],
      rarity: "Super Rare" as const,
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2F86d76b2137c646819d6432e7c391f1ca",
    },
    {
      name: "T- Albino",
      genetics: "Recessive",
      description:
        "An extreme albino morph featuring pale coloration and distinctive red irises.",
      traits: [
        "Pale coloration",
        "Red irises",
        "Light appearance",
        "Extreme albinism",
      ],
      rarity: "Super Rare" as const,
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2F285f5000887f4635a3a48ca2a1085c79",
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
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
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
          {filteredMorphs.map((morph, index) => {
            // Custom slug mapping for specific morphs
            let slug = morph.name.toLowerCase().replace(/\s+/g, "-");
            if (morph.name === "Normal (Wild-type)") {
              slug = "normal";
            } else if (morph.name === "Patternless (BHG)") {
              slug = "patternless-bhg";
            } else if (morph.name === "T+ Albino") {
              slug = "t-plus-albino";
            } else if (morph.name === "T- Albino") {
              slug = "t-minus-albino";
            }

            return (
              <Link
                key={index}
                to={`/morphs/${slug}`}
                className="group"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <GeckoCard
                  name={morph.name}
                  genetics={morph.genetics}
                  description={morph.description}
                  traits={morph.traits}
                  rarity={morph.rarity}
                  image={morph.image}
                />
              </Link>
            );
          })}
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
