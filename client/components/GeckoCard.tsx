import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface GeckoCardProps {
  name: string;
  genetics: string;
  description: string;
  traits: string[];
  image?: string;
  rarity?: "Common" | "Uncommon" | "Rare" | "Super Rare";
}

const rarityColors = {
  Common: "bg-gray-100 text-gray-800",
  Uncommon: "bg-green-100 text-green-800",
  Rare: "bg-blue-100 text-blue-800",
  "Super Rare": "bg-purple-100 text-purple-800",
};

export default function GeckoCard({
  name,
  genetics,
  description,
  traits,
  image,
  rarity = "Common",
}: GeckoCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="aspect-video bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 relative overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-primary via-secondary to-accent rounded-full opacity-60" />
          </div>
        )}
        <div className="absolute top-3 right-3">
          <Badge className={rarityColors[rarity]}>{rarity}</Badge>
        </div>
      </div>

      <CardHeader className="space-y-2">
        <CardTitle className="text-xl font-bold">{name}</CardTitle>
        <Badge variant="outline" className="w-fit">
          {genetics}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>

        <div className="flex flex-wrap gap-2">
          {traits.map((trait, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {trait}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
