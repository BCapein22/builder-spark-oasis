import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface GeckoCardProps {
  name: string;
  genetics: string;
  description: string;
  traits: string[];
  image?: string;
}

export default function GeckoCard({
  name,
  genetics,
  description,
  traits,
  image,
}: GeckoCardProps) {
  return (
    <Card className="group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden cursor-pointer">
      {image ? (
        <img
          src={image}
          alt={name}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
            name === "Nightmare" ? "min-h-[500px]" : ""
          } ${name === "Paradox" ? "pb-12 mx-auto" : ""}`}
        />
      ) : (
        <div className="aspect-[6/5] bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 relative overflow-hidden">
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-primary via-secondary to-accent rounded-full opacity-60" />
          </div>
        </div>
      )}

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
