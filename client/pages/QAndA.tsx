import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import QuestionSubmissionForm from "@/components/QuestionSubmissionForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ChevronLeft,
  HelpCircle,
  Heart,
  Home,
  Dna,
  DollarSign,
  AlertTriangle,
  MessageSquare,
  Users,
} from "lucide-react";

export default function QAndA() {
  const qaData = {
    care: {
      title: "Care & Husbandry",
      icon: Heart,
      questions: [
        {
          question: "What size enclosure does a Tokay gecko need?",
          answer:
            "Adult Tokay geckos need a minimum of 40-gallon tall terrarium (18x18x24 inches), but larger is always better. They are arboreal and need vertical space for climbing. A 4-foot tall enclosure is ideal.",
        },
        {
          question: "What temperature and humidity do Tokay geckos require?",
          answer:
            "Daytime temperatures should be 78-82°F (26-28°C) with a basking spot of 85-88°F (29-31°C). Nighttime temperatures can drop to 72-75°F (22-24°C). Humidity should be maintained at 60-80%. Use a hygrometer to monitor levels.",
        },
        {
          question: "What do Tokay geckos eat?",
          answer:
            "Tokay geckos are insectivores. Feed them crickets, roaches, mealworms, waxworms, and silkworms. Adults should eat every 2-3 days, juveniles every day. Dust insects with calcium powder and use calcium with D3 once per week.",
        },
        {
          question: "Do Tokay geckos need UVB lighting?",
          answer:
            "While not strictly required since they're nocturnal, low-level UVB lighting (5-7%) can be beneficial for calcium absorption and overall health. Provide a 12-hour light cycle and ensure they have hiding spots to escape the light.",
        },
        {
          question: "How often should I clean the enclosure?",
          answer:
            "Spot clean waste immediately. Replace water every few days or when dirty. Deep clean the entire enclosure monthly, replacing substrate and disinfecting decorations. Regular maintenance prevents bacterial and fungal issues.",
        },
        {
          question: "Can I handle my Tokay gecko?",
          answer:
            "Tokay geckos are known for being defensive and can deliver a strong bite. Handle minimally and only when necessary. If you must handle them, use gloves and approach slowly from the side. Many Tokays never become truly tame.",
        },
      ],
    },
    housing: {
      title: "Housing & Setup",
      icon: Home,
      questions: [
        {
          question: "What substrate should I use?",
          answer:
            "Paper towels, topsoil mix, or cypress mulch work well. Avoid loose substrates like sand or wood chips that can cause impaction if ingested. For bioactive setups, use organic topsoil mixed with play sand.",
        },
        {
          question: "What decorations should I include?",
          answer:
            "Provide sturdy branches, cork bark, fake or live plants, and multiple hiding spots. Tokays love to climb and need horizontal and vertical surfaces. Include both humid and dry hiding areas.",
        },
        {
          question: "Do I need a water dish?",
          answer:
            "Yes, provide a shallow water dish for drinking and humidity. Many Tokays prefer to drink water droplets from misting rather than standing water. Change water regularly to prevent bacterial growth.",
        },
        {
          question: "How many hiding spots do they need?",
          answer:
            "Provide at least 2-3 hiding spots: one on the warm side, one on the cool side, and one humid hide. This allows the gecko to thermoregulate while feeling secure. More hiding spots are always better.",
        },
        {
          question: "Can I keep live plants in the enclosure?",
          answer:
            "Yes! Live plants help maintain humidity and provide natural beauty. Safe options include pothos, sansevieria (snake plant), bromeliads, and ficus. Ensure plants are pesticide-free and properly rooted.",
        },
        {
          question: "What heating equipment do I need?",
          answer:
            "Use a ceramic heat emitter or heat panel for ambient temperature. Under-tank heaters can provide localized warmth. Always use thermostats to control temperatures and prevent overheating.",
        },
      ],
    },
    genetics: {
      title: "Genetics & Breeding",
      icon: Dna,
      questions: [
        {
          question: "At what age do Tokay geckos reach sexual maturity?",
          answer:
            "Tokay geckos typically reach sexual maturity at 12-18 months of age. Proper development and overall health are more important indicators than just age alone.",
        },
        {
          question: "How do dominant and recessive genes work?",
          answer:
            "Dominant genes (like Normal) only need one copy to express. Recessive genes (like Patternless) need two copies. Co-dominant genes express with one copy and show enhanced traits with two copies.",
        },
        {
          question: "What does 'het' mean in gecko breeding?",
          answer:
            "'Het' means heterozygous - carrying one copy of a recessive gene without showing it visually. A 'het Granite' gecko looks normal but carries the Granite gene and can produce Granite offspring.",
        },
        {
          question: "How many eggs do Tokay geckos lay?",
          answer:
            "Tokay geckos typically lay 2 hard-shelled eggs every 4-6 weeks during breeding season. A healthy female can lay 8-12 clutches per year. Eggs take 60-90 days to hatch at proper temperatures.",
        },
      ],
    },
    buying: {
      title: "Buying & Selling",
      icon: DollarSign,
      questions: [
        {
          question: "How much does a Tokay gecko cost?",
          answer:
            "Normal Tokays: $50-150. Common morphs: $200-500. Rare morphs: $500-1500+. Super rare morphs: $1500-3000+. Prices vary by quality, genetics, and breeder reputation. Factor in setup costs ($300-800).",
        },
        {
          question: "What should I look for when buying a Tokay gecko?",
          answer:
            "Look for clear eyes, healthy weight, good body condition, clean vent, and active behavior. Avoid geckos with stuck shed, parasites, or lethargy. Ask for feeding records and health guarantees.",
        },
        {
          question: "Where should I buy a Tokay gecko?",
          answer:
            "Reputable breeders, reptile expos, and established pet stores. Avoid impulse purchases from poor conditions. Research the seller, ask questions, and request references from previous customers.",
        },
        {
          question: "What questions should I ask a breeder?",
          answer:
            "Ask about genetics, parents' lineage, feeding schedule, health history, and breeding goals. Reputable breeders will be happy to share information and educate buyers about proper care.",
        },
        {
          question: "What questions should I ask a breeder?",
          answer:
            "Ask about genetics, parents' lineage, feeding schedule, health history, and breeding goals. Reputable breeders will be happy to share information and educate buyers about proper care.",
        },
      ],
    },
    health: {
      title: "Health & Veterinary",
      icon: AlertTriangle,
      questions: [
        {
          question: "What are common health problems in Tokay geckos?",
          answer:
            "Common issues include metabolic bone disease (MBD), respiratory infections, parasites, stuck shed, and stress-related problems. Proper husbandry prevents most health issues.",
        },
        {
          question: "What are signs of illness in Tokay geckos?",
          answer:
            "Watch for lethargy, loss of appetite, weight loss, difficulty shedding, mouth rot, mites, labored breathing, or changes in behavior. Early intervention is key to successful treatment.",
        },
        {
          question: "What should I do if my gecko stops eating?",
          answer:
            "Check temperatures, humidity, and stress factors first. Ensure proper heating and lighting cycles. If the gecko continues refusing food for more than 2 weeks, consult a veterinarian.",
        },
      ],
    },
  };

  const [activeTab, setActiveTab] = useState("care");
  const [showQuestionForm, setShowQuestionForm] = useState(false);

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
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Find answers to common questions about Tokay gecko care, genetics,
            buying, and health
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
            {Object.entries(qaData).map(([key, category]) => {
              const IconComponent = category.icon;
              return (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="flex items-center gap-2 text-xs md:text-sm"
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="hidden sm:inline">{category.title}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {Object.entries(qaData).map(([key, category]) => (
            <TabsContent key={key} value={key}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <category.icon className="h-5 w-5" />
                    {category.title}
                    <Badge variant="outline">
                      {category.questions.length} FAQs
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((qa, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                          <div className="flex items-start gap-2">
                            <HelpCircle className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                            {qa.question}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed pl-6">
                          {qa.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Contact Info */}
        <Card className="mt-12 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-0">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Feel free to reach out to our
              community or submit your question for future FAQ updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline">Join Community Forum</Button>
              <Button>Submit a Question</Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Tips */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center p-6">
            <Heart className="h-8 w-8 mx-auto mb-3 text-red-500" />
            <h3 className="font-semibold mb-2">New Owner Tip</h3>
            <p className="text-sm text-muted-foreground">
              Start with proper setup before bringing your gecko home. Having
              everything ready reduces stress for both you and your new pet.
            </p>
          </Card>
          <Card className="text-center p-6">
            <Dna className="h-8 w-8 mx-auto mb-3 text-blue-500" />
            <h3 className="font-semibold mb-2">Breeding Tip</h3>
            <p className="text-sm text-muted-foreground">
              Always prioritize animal health over specific morphs. Healthy,
              well-cared-for geckos produce the best offspring.
            </p>
          </Card>
          <Card className="text-center p-6">
            <AlertTriangle className="h-8 w-8 mx-auto mb-3 text-orange-500" />
            <h3 className="font-semibold mb-2">Emergency Tip</h3>
            <p className="text-sm text-muted-foreground">
              Find an exotic vet before you need one. Having emergency contact
              information ready can save your gecko's life.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
