import { useParams, Link, Navigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ChevronLeft,
  Dna,
  Heart,
  Thermometer,
  Droplets,
  Ruler,
  DollarSign,
  Users,
  Calendar,
} from "lucide-react";

export default function MorphDetail() {
  const { morphName } = useParams<{ morphName: string }>();

  const morphDetails = {
    normal: {
      name: "Normal (Wild-type)",
      genetics: "Dominant",
      description:
        "The natural appearance of Tokay geckos featuring a vibrant blue base color with distinctive red or orange spots. This is the foundation morph from which all others derive.",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2F6d0d3ee54f3c412f9928072512e55cb2",
      traits: [
        "Blue base",
        "Red/orange spots",
        "White baring",
        "Robust pattern",
      ],
      rarity: "Common",
      detailed: {
        genetics:
          'The normal tokay gecko displays the wild-type coloration that has evolved over millions of years. This dominant trait means that breeding a normal gecko with any morph will typically produce normal-appearing offspring, though they may be "Het" for recessive traits.',
        breeding:
          "Normal tokays are excellent breeding stock and are often used to outcross with morphs to maintain genetic diversity. They typically reach sexual maturity at 12-18 months and can live 15-20 years in captivity.",
        care: "Hardy and adaptable, normal tokays require temperatures of 78-82°F (26-28°C) during the day with nighttime drops to 72-75°F (22-24°C). Humidity should be maintained at 60-80%.",
        size: "Adult males: 12-14 inches (30-36 cm), Adult females: 10-12 inches (25-30 cm)",
        temperament:
          "Known for their defensive nature and loud vocalizations. Can become tame with patient handling but are naturally territorial.",

        availability:
          "Widely available from most reptile breeders and pet stores.",
        history:
          "The foundation of all tokay gecko morphs, representing the natural coloration found throughout Southeast Asia.",
      },
    },
    "reduced-pattern": {
      name: "Reduced Pattern",
      genetics: "Co-dominant",
      description:
        "An incomplete dominant morph characterized by a blue head, green body, and significantly reduced spotting. Often displays minimal to no spots with prominent white baring.",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2F1aed7186737543d29a875edc372db330",
      traits: ["Blue head", "Green body", "Reduced spots", "White baring"],
      rarity: "Uncommon",
      detailed: {
        genetics:
          "Incomplete dominant inheritance means one copy produces a visible effect, while two copies (super form) may produce even more dramatic pattern reduction. Breeding two reduced patterns can yield Patternless (BHG).",
        breeding:
          "When breeding reduced pattern to normal, expect 50% reduced pattern offspring. Reduced pattern to reduced pattern breeding can produce super reduced forms with even less pattern.",
        care: "Same care requirements as normal tokays, though some breeders report reduced pattern morphs may be slightly more docile.",
        size: "Similar to normal tokays - males 12-14 inches, females 10-12 inches",
        temperament:
          "Often reported to be calmer than normal tokays, though individual variation exists.",

        availability:
          "Available from specialized gecko breeders, more common than rare morphs but less available than normals.",
        history:
          "One of the first consistently reproduced tokay morphs, helping establish the foundation for modern tokay gecko breeding.",
      },
    },
    "patternless-bhg": {
      name: "Patternless (BHG)",
      genetics: "Co-dominant",
      description:
        "Blue Headed Green Patternless results in a solid-colored gecko with a distinctive blue head and green body, completely lacking the typical spot pattern.",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2Fdc77533129d0486d824831476e243821",
      traits: ["Blue head", "Green body", "No spots", "Solid coloration"],
      rarity: "Rare",
      detailed: {
        genetics:
          "Co-Dominant trait meaning only one copy of the morph needs to be present to yield visual outcome.",
        breeding:
          "Known to be easier to produce since they are more commonly available and only one parent needs to carry the trait.",
        care: "Standard tokay care with attention to UV lighting to maintain proper Health and coloration.",
        size: "Slightly smaller than normals on average - males 10-13 inches, females 9-11 inches",
        temperament:
          "Generally calmer than wild-types, though still capable of defensive behavior.",
        availability: "Limited availability from specialized breeders only.",
        history:
          "Developed through selective breeding programs focusing on pattern reduction, representing a significant breakthrough in tokay genetics.",
      },
    },
    "powder-blue-patternless": {
      name: "Powder Blue Patternless",
      genetics: "Recessive",
      description:
        "A stunning recessive morph displaying an ice blue coloration across both head and body, creating a uniform, ethereal appearance without any pattern.",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2F62f46a51c9f248dd8fb3ff292311d9b4",
      traits: [
        "Ice blue coloration",
        "No pattern",
        "Uniform color",
        "Striking appearance",
      ],
      rarity: "Rare",
      detailed: {
        genetics:
          "Recessive trait that produces uniform ice-blue coloration. Due to crossbreeding with BHG lines, pure powder blues are becoming rarer.",
        breeding:
          "Both parents must carry the gene. Breeding two powder blues produces 100% powder blue offspring, though crossing with BHG can muddy the bloodlines.",
        care: "Requires careful temperature regulation as pale morphs can be more sensitive to thermal stress. Optimal range 76-80°F.",
        size: "Often slightly smaller than normals, males 10-12 inches, females 9-10 inches",
        temperament:
          "Reported to be among the calmest tokay morphs, with reduced defensive behavior.",
        availability:
          "Very limited, mostly from specialized collectors and breeders.",
        history:
          "A color variant that emerged from patternless breeding projects, highly prized for its unique ice-blue appearance.",
      },
    },
    granite: {
      name: "Granite",
      genetics: "Recessive Progressive",
      description:
        "Features a dark gray or charcoal base with black spots resembling granite stone. This is a progressive trait where offspring may appear normal at hatching and develop the granite appearance over time.",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2F5e1bda61479e478eaff84daaa180614a",
      traits: [
        "Dark gray base",
        "Black spots",
        "Progressive trait",
        "Granite-like texture",
      ],
      rarity: "Super Rare",
      detailed: {
        genetics:
          "Progressive recessive trait that develops over 6 months to 2 years. Hatchlings often appear normal but gradually transform into the granite pattern.",
        breeding:
          "Extremely challenging to reproduce consistently. Even granite x granite pairings don't guarantee granite offspring, making this one of the most unpredictable morphs.",
        care: "Standard care with attention to stress reduction during color development phase.",
        size: "Normal size range, though development may be slightly slower",
        temperament:
          "No significant temperament differences reported from normal tokays.",
        availability:
          "Extremely rare, only available from a few specialized breeders worldwide.",
        history:
          "One of the most mysterious tokay morphs, with genetics still not fully understood despite years of breeding attempts.",
      },
    },
    "super-red": {
      name: "Super Red",
      genetics: "Dominant",
      description:
        "A dominant morph producing geckos with intensely vibrant red coloration, ranging from deep crimson to bright orange-red spots with enhanced color saturation.",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2F0e613898ad864e4b9c382323a7854f4b",
      traits: [
        "Intense red spots",
        "Enhanced saturation",
        "Variable intensity",
        "Vibrant appearance",
      ],
      rarity: "Rare",
      detailed: {
        genetics:
          "Co-dominant trait where one copy produces enhanced red coloration, and two copies (super form) can produce even more intense reds or unique color combinations.",
        breeding:
          "Super red x normal produces 50% super red offspring. Super red x super red can produce super forms with exceptional coloration.",
        care: "Standard tokay care with attention to diet quality to maintain vibrant colors. High-quality feeder insects and calcium supplementation recommended.",
        size: "Normal size range for tokays",
        temperament:
          "No significant behavioral differences from normal tokays.",
        availability:
          "Available from several breeders but still considered uncommon.",
        history:
          "Developed through selective breeding for enhanced red pigmentation, representing successful line breeding for color intensity.",
      },
    },
    platinum: {
      name: "Platinum",
      genetics: "Recessive",
      description:
        "A recessive trait featuring a silver base coloration with yellow spots, accompanied by distinctive platinum-colored eyes that give this morph its name.",
      image:
        "https://images.pexels.com/photos/5475202/pexels-photo-5475202.jpeg",
      traits: [
        "Silver base",
        "Yellow spots",
        "Platinum eyes",
        "Metallic appearance",
      ],
      rarity: "Super Rare",
      detailed: {
        genetics:
          "Simple recessive trait first produced by Joshua Carson in 2014. The metallic silver appearance is caused by altered chromatophore development.",
        breeding:
          "Both parents must carry the gene. Platinum x platinum produces 100% platinum offspring with consistent metallic appearance.",
        care: "May require slightly different lighting to maintain proper coloration. Some breeders use full-spectrum LED lighting.",
        size: "Often slightly smaller than normals, particularly females",
        temperament:
          "Generally calmer than wild-types, though individual variation exists.",
        availability:
          "Very limited, available only from a few specialized breeders.",
        history:
          "A breakthrough morph that demonstrated the potential for unique coloration genes in tokay geckos, inspiring further breeding projects.",
      },
    },
    "candy-dot": {
      name: "Candy Dot",
      genetics: "Recessive",
      description:
        "A recessive morph where spots align in uniform patterns resembling candy dots. Notable for the absence of white baring and eyes that range from dark to completely black.",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2F1486ff8f3dc449ec8843041f426a36b2",
      traits: [
        "Aligned spots",
        "No white baring",
        "Dark/black eyes",
        "Uniform pattern",
      ],
      rarity: "Rare",
      detailed: {
        genetics:
          "Recessive trait affecting both pattern arrangement and pigmentation. The uniform spot alignment is unique among tokay morphs.",
        breeding:
          "Standard recessive breeding applies - both parents must carry the gene for visual offspring.",
        care: "Standard tokay care, though the dark eyes may indicate slightly different light sensitivity.",
        size: "Normal size range",
        temperament: "No significant temperament differences reported.",
        availability: "Limited availability from specialized breeders.",
        history:
          "Named for the distinctive uniform spot pattern that resembles candy dots arranged in rows.",
      },
    },
    diablo: {
      name: "Diablo",
      genetics: "Recessive",
      description:
        "Features a beautiful lavender base coloration with yellow spots and distinctive black eyes. Unlike some morphs, Diablo retains the characteristic white baring.",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2F1dad7f014b544e299a1c73a0dd4d40af",
      traits: [
        "Lavender base",
        "Yellow spots",
        "Black eyes",
        "White baring retained",
      ],
      rarity: "Super Rare",
      detailed: {
        genetics:
          "Simple recessive trait requiring both parents to carry the gene for offspring to display the distinctive characteristics.",
        breeding:
          "Simple recessive requiring both parents to carry the gene. Still very limited breeding stock available.",
        care: "Standard tokay care with attention to maintaining proper humidity for color development.",
        size: "Normal size range",
        temperament: "Limited data due to rarity, but similar to other morphs.",
        availability:
          "Extremely rare, only available from a few breeders worldwide.",
        history:
          "One of the newest morphs to be established, representing the cutting edge of tokay gecko genetics.",
      },
    },
    "green-galaxy": {
      name: "Green Galaxy",
      genetics: "Combo Morph",
      description:
        "Not a true morph but an 'odd ball' resulting from specific breeding combinations. Displays a green body, blue head, and notably reduced spot size creating a unique appearance.",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2Fdc56379e226949a18315bd69b0030b1b",
      traits: ["Green body", "Blue head", "Reduced spot size", "Combo result"],
      rarity: "Uncommon",
      detailed: {
        genetics:
          "Not a single gene trait but rather a combination of multiple genetic factors producing a unique appearance. Difficult to reproduce consistently.",
        breeding:
          "Unpredictable outcomes due to complex genetics. Often appears in lines carrying multiple morph genes.",
        care: "Standard tokay care requirements.",
        size: "Normal size range",
        temperament:
          "No specific temperament traits associated with this combination.",
        availability:
          "Occasionally available from breeders working with multiple morph lines.",
        history:
          "An example of how genetic combinations can produce unexpected and beautiful results in tokay breeding.",
      },
    },
    luna: {
      name: "Luna",
      genetics: "Recessive",
      description:
        "A stunning morph characterized by solid white coloration. Both parents must carry the gene to produce Luna offspring.",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2F14bfc223d5a44b5fbd6755237a2abc58",
      traits: [
        "Solid white coloration",
        "Extremely rare",
        "Striking appearance",
        "Leucistic trait",
      ],
      rarity: "Super Rare",
      detailed: {
        genetics:
          "Leucistic gene causing white coloration while retaining eye pigmentation. Different from albinism which affects all pigments.",
        breeding:
          "Simple recessive requiring both parents to carry the gene. Extremely limited breeding stock makes this one of the rarest morphs.",
        care: "Requires specialized care. UV lighting must be carefully managed, and temperature regulation is critical.",
        size: "Often smaller than normals due to genetic factors",
        temperament:
          "Generally calmer, possibly due to vision differences caused by the mutation.",
        availability:
          "Extremely rare, only available from a few specialized breeders.",
        history:
          "Represents one of the most dramatic color mutations possible in tokay geckos, prized for its ethereal white appearance.",
      },
    },
    ghost: {
      name: "Ghost",
      genetics: "Recessive",
      description:
        "Features a faded, smoky appearance with reduced dark pigmentation. As a Recessive trait, Both parents needs to carry the gene for offspring to exhibit the ghostly coloration.",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2F4ea564ada4694527851cc7854af0c657",
      traits: [
        "Faded appearance",
        "Reduced pigmentation",
        "Smoky coloration",
        "Color variability",
      ],
      rarity: "Uncommon",
      detailed: {
        genetics:
          "Recessive trait resulting in faded or washed-out appearance. Color intensity can vary between individuals.",
        breeding:
          "Both parents must carry the gene for visual ghost offspring. Het x het produces 25% visual ghosts.",
        care: "Standard tokay care, though some report increased light sensitivity due to reduced pigmentation.",
        size: "Normal size range",
        temperament: "Often reported as calmer than normal tokays.",
        availability: "Moderately available from gecko breeders.",
        history:
          "A morph that demonstrates how pigmentation genes can create subtle but striking visual effects.",
      },
    },
    nightmare: {
      name: "Nightmare",
      genetics: "Recessive",
      description:
        "A distinctive recessive morph featuring a dark base color (black or deep brown) with contrasting light spots or patterns, creating a striking 'nightmarish' appearance.",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2Fd7aadac7b8ce4e2aaf388671a89e5b32",
      traits: [
        "Dark base color",
        "Light contrasting spots",
        "Striking appearance",
        "Variable pattern",
      ],
      rarity: "Rare",
      detailed: {
        genetics:
          "May be a combination of multiple genes rather than a single mutation. Line breeding has been used to establish and maintain the dark coloration.",
        breeding:
          "Inconsistent outcomes suggest complex genetics. Breeding nightmare to nightmare doesn't guarantee nightmare offspring.",
        care: "Standard tokay care requirements.",
        size: "Normal size range",
        temperament: "No specific temperament traits reported for this morph.",
        availability: "Limited availability from specialized breeders.",
        history:
          "Named for its dramatic dark appearance, this morph showcases the potential for line breeding to establish unique traits.",
      },
    },
    paradox: {
      name: "Paradox",
      genetics: "Recessive",
      description:
        "A distinct recessive morph featuring unique and variable patterns that create a striking appearance. Each Paradox individual displays its own characteristic pattern combinations, making this morph highly sought after.",
      image:
        "https://images.pexels.com/photos/5475192/pexels-photo-5475192.jpeg",
      traits: [
        "Variable patterns",
        "Unique appearance",
        "Recessive trait",
        "Individual variation",
      ],
      rarity: "Super Rare",
      detailed: {
        genetics:
          "Simple recessive trait that produces unique pattern variations. Both parents must carry the Paradox gene for visual offspring.",
        breeding:
          "Standard recessive breeding applies - both parents must carry the gene. Each Paradox individual shows unique pattern characteristics.",
        care: "Standard tokay care requirements with no special considerations needed.",
        size: "Normal tokay size range",
        temperament: "No specific temperament differences from other morphs.",
        availability:
          "Rare, available from specialized breeders working with this unique morph.",
        history:
          "A distinct morph that demonstrates the beautiful pattern variations possible within tokay gecko genetics.",
      },
    },
    axanthic: {
      name: "Axanthic",
      genetics: "Recessive",
      description:
        "Characterized by the reduction or absence of yellow and red pigments, resulting in predominantly gray or silver coloration with black spots. Both parents must carry the axanthic gene.",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2F6d0d3ee54f3c412f9928072512e55cb2",
      traits: [
        "Gray/silver base",
        "No yellow/red pigments",
        "Black spots",
        "Monochrome appearance",
      ],
      rarity: "Rare",
      detailed: {
        genetics:
          "Simple recessive trait affecting xanthophore pigment cells, eliminating yellow and red pigments while retaining other colors.",
        breeding:
          "Standard recessive breeding - both parents must carry the gene for visual axanthic offspring.",
        care: "Standard tokay care. The reduced pigmentation may make them slightly more sensitive to bright lighting.",
        size: "Normal size range",
        temperament:
          "No significant temperament differences from normal tokays.",
        availability: "Limited availability from specialized gecko breeders.",
        history:
          "A classic color mutation that demonstrates how individual pigment cell types can be selectively affected by genetic changes.",
      },
    },
    "shooting-star": {
      name: "Shooting Star",
      genetics: "Recessive",
      description:
        "A distinctive recessive morph where spots align in a straight line down the gecko's back, resembling shooting stars or candy dots. Features solid black eyes and a unique linear pattern that sets it apart from other morphs.",
      image:
        "https://images.pexels.com/photos/5475192/pexels-photo-5475192.jpeg",
      traits: [
        "Linear spot alignment",
        "Solid black eyes",
        "Straight-line pattern",
        "Distinctive appearance",
      ],
      rarity: "Super Rare",
      detailed: {
        genetics:
          "Recessive trait that affects spot pattern formation, causing spots to align in linear formations down the spine. Both parents must carry the gene for offspring to display this pattern.",
        breeding:
          "As a recessive trait, breeding two Shooting Star geckos will produce 100% Shooting Star offspring. Breeding a Shooting Star to a normal will produce 100% het Shooting Star offspring.",
        care: "Standard tokay gecko care requirements. The unique pattern does not affect their husbandry needs or overall health.",
        size: "Normal adult size range: males 12-14 inches, females 10-12 inches",
        temperament:
          "Typical tokay temperament - territorial and vocal but can become manageable with patient handling.",
        availability:
          "Very limited availability from specialized morph breeders. Long waiting lists are common.",
        history:
          "A relatively recent morph discovery in the tokay gecko breeding community. The linear pattern formation represents a unique genetic expression affecting spot placement and alignment.",
      },
    },
    blueberry: {
      name: "Blueberry",
      genetics: "Recessive",
      description:
        "A distinctive recessive morph characterized by black splotches on their feet and lacking the typical large red spots found in normal tokays.",
      image:
        "https://images.pexels.com/photos/5475192/pexels-photo-5475192.jpeg",
      traits: [
        "Black foot splotches",
        "No large red spots",
        "Unique coloration",
        "Recessive trait",
      ],
      rarity: "Rare",
      detailed: {
        genetics:
          "Simple recessive trait. Both parents must carry the gene for offspring to display the Blueberry characteristics.",
        breeding:
          "Standard recessive breeding applies - breeding two Blueberry geckos produces 100% Blueberry offspring.",
        care: "Standard tokay gecko care requirements. The foot coloration and reduced red spotting do not affect their care needs.",
        size: "Normal adult size range: males 12-14 inches, females 10-12 inches",
        temperament:
          "No specific temperament differences from normal tokays. Typical territorial and vocal behavior.",
        availability:
          "Limited availability from specialized breeders, particularly those working with Asian bloodlines.",
        history:
          "Represents one of the distinctive morphs originating from Southeast Asian breeding programs with unique foot coloration patterns.",
      },
    },
    "carmel-albino": {
      name: "Carmel Albino",
      genetics: "Recessive",
      description:
        "A distinctive albino morph with reduced melanistic pigmentation displaying a beautiful caramel hue. This recessive trait requires both parents to carry the gene for expression.",
      image:
        "https://images.pexels.com/photos/2968965/pexels-photo-2968965.jpeg",
      traits: [
        "Caramel coloration",
        "Light pigmentation",
        "Recessive trait",
        "Pale appearance",
      ],
      rarity: "Super Rare",
      detailed: {
        genetics:
          "Simple recessive mutation resulting in reduced dark pigmentation and characteristic caramel coloration. Both parents must carry the albino gene.",
        breeding:
          "Standard recessive breeding - both parents must be homozygous recessive or heterozygous carriers. Breeding two Carmel Albinos produces 100% Carmel Albino offspring.",
        care: "Requires specialized care. UV lighting must be carefully managed and temperature regulation is critical for health.",
        size: "Normal adult size range: males 12-14 inches, females 10-12 inches",
        temperament:
          "No specific temperament differences from normal tokays, though may be slightly more sensitive to bright lighting.",
        availability:
          "Very limited availability from specialized albino breeders. Long waiting lists common.",
        history:
          "Represents one of the classic albino mutations in tokay geckos, prized for its warm caramel coloration and rarity.",
      },
    },
    "t-plus-albino": {
      name: "T+ Albino",
      genetics: "Recessive",
      description:
        "A pale albino morph with caramel coloration and brown/gray tones.",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F82fbf18842f94c9ca6227973b7bf690c%2F86d76b2137c646819d6432e7c391f1ca",
      traits: [
        "Caramel background",
        "Brown/gray tones",
        "Pale coloration",
        "Light pigmentation",
      ],
      rarity: "Super Rare",
      detailed: {
        genetics:
          "Recessive albino mutation. Unlike T- albinos, T+ shows lighter but not completely absent pigmentation.",
        breeding:
          "Must avoid crossing with T- albinos as this produces double heterozygous offspring that appear normal. Breed T+ with T+ for consistent results.",
        care: "Requires careful lighting management due to reduced pigmentation. Standard tokay temperatures but monitor for light sensitivity.",
        size: "Normal adult size range: males 12-14 inches, females 10-12 inches",
        temperament:
          "Typical tokay behavior, though may show increased light sensitivity affecting activity patterns.",
        availability:
          "Extremely rare, available only from specialized albino breeding programs.",
        history:
          "Distinguished from T- albinos by partial tyrosinase function, representing a unique genetic pathway in tokay gecko albinism.",
      },
    },
    "t-minus-albino": {
      name: "T- Albino",
      genetics: "Recessive",
      description:
        "An extreme albino morph featuring pale coloration and distinctive red irises.",
      image:
        "https://images.pexels.com/photos/6788326/pexels-photo-6788326.jpeg",
      traits: [
        "Pale coloration",
        "Red irises",
        "Light appearance",
        "Extreme albinism",
      ],
      rarity: "Super Rare",
      detailed: {
        genetics:
          "Complete recessive mutation. Most extreme form of albinism in tokay geckos.",
        breeding:
          "Must breed T- with T- only. Crossing with T+ albinos produces normal-appearing double heterozygous offspring, diluting the bloodline.",
        care: "Requires most intensive care of all morphs. Specialized UV filtering and temperature control essential.",
        size: "Normal adult size range: males 12-14 inches, females 10-12 inches",
        temperament:
          "May be more docile due to light sensitivity. Require low-light environments and careful handling.",
        availability:
          "Rarest of all tokay morphs. Available only from dedicated T- albino breeding programs.",
        history:
          "Represents the most extreme albino mutation in tokay geckos. Critical to maintain pure T- lines without T+ contamination.",
      },
    },
  };

  const slug = morphName?.toLowerCase().replace(/\s+/g, "-");
  const morph = slug ? morphDetails[slug as keyof typeof morphDetails] : null;

  if (!morph) {
    return <Navigate to="/morphs" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link to="/morphs" className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back to Morph Guide
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {morph.name}
            </h1>
            <div className="flex items-center gap-4 mb-6">
              <Badge variant="outline" className="text-lg px-4 py-2">
                {morph.genetics}
              </Badge>
              <Badge
                className={`text-lg px-4 py-2 ${
                  morph.rarity === "Common"
                    ? "bg-gray-100 text-gray-800"
                    : morph.rarity === "Uncommon"
                      ? "bg-green-100 text-green-800"
                      : morph.rarity === "Rare"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-purple-100 text-purple-800"
                }`}
              >
                {morph.rarity}
              </Badge>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {morph.description}
            </p>
          </div>

          <div className="relative">
            <img
              src={morph.image}
              alt={morph.name}
              className="w-full h-80 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Traits */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Dna className="h-5 w-5" />
              Key Traits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {morph.traits.map((trait, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-sm px-3 py-1"
                >
                  {trait}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Dna className="h-5 w-5" />
                Genetics & Breeding
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Genetics</h4>
                <p className="text-sm text-muted-foreground">
                  {morph.detailed.genetics}
                </p>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2">Breeding Information</h4>
                <p className="text-sm text-muted-foreground">
                  {morph.detailed.breeding}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Care & Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Thermometer className="h-4 w-4" />
                  Temperature & Environment
                </h4>
                <p className="text-sm text-muted-foreground">
                  {morph.detailed.care}
                </p>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Ruler className="h-4 w-4" />
                  Size
                </h4>
                <p className="text-sm text-muted-foreground">
                  {morph.detailed.size}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Temperament & Behavior
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {morph.detailed.temperament}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Market Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Availability</h4>
                <p className="text-sm text-muted-foreground">
                  {morph.detailed.availability}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* History */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              History & Development
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {morph.detailed.history}
            </p>
          </CardContent>
        </Card>

        {/* Related Morphs */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Related Morphs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/morphs">View All Morphs</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
