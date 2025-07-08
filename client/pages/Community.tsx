import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronLeft,
  Users,
  MessageSquare,
  TrendingUp,
  Search,
  PlusCircle,
  Eye,
  MessageCircle,
  User,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

export default function Community() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const forumCategories = [
    {
      id: "general",
      name: "General Discussion",
      description: "General tokay gecko topics and casual conversation",
      icon: MessageSquare,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: "care",
      name: "Care & Husbandry",
      description: "Housing, feeding, temperature, humidity, and health",
      icon: Users,
      color: "bg-green-100 text-green-600",
    },
    {
      id: "breeding",
      name: "Breeding & Genetics",
      description:
        "Breeding projects, genetics questions, and morph discussions",
      icon: TrendingUp,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: "photos",
      name: "Photos & Videos",
      description: "Show off your geckos and share amazing photos",
      icon: Eye,
      color: "bg-pink-100 text-pink-600",
    },
    {
      id: "projects",
      name: "Breeding Projects",
      description: "Long-term breeding goals and project updates",
      icon: TrendingUp,
      color: "bg-indigo-100 text-indigo-600",
    },
  ];

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", loginEmail);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup attempt:", signupUsername, signupEmail);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <Navigation />

      <div className="container py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link to="/qa" className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back to Q&A
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Community Forum
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with fellow tokay gecko enthusiasts, share knowledge, and
            grow together as a community
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">0</div>
              <div className="text-sm text-muted-foreground">Members</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-secondary">0</div>
              <div className="text-sm text-muted-foreground">Posts</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-accent">0</div>
              <div className="text-sm text-muted-foreground">Topics</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">0</div>
              <div className="text-sm text-muted-foreground">Online Now</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Forum Content */}
          <div className="lg:col-span-2">
            <div className="w-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Forum Categories</h2>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search forum..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button className="flex items-center gap-2">
                    <PlusCircle className="h-4 w-4" />
                    New Topic
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {forumCategories.map((category) => {
                  const IconComponent = category.icon;
                  const isExpanded = expandedCategories.includes(category.id);
                  const ChevronIcon = isExpanded ? ChevronDown : ChevronRight;

                  return (
                    <div key={category.id}>
                      <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div
                            className="flex items-start gap-4 cursor-pointer"
                            onClick={() => toggleCategory(category.id)}
                          >
                            <div className={`p-3 rounded-lg ${category.color}`}>
                              <IconComponent className="h-6 w-6" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-semibold text-lg">
                                      {category.name}
                                    </h3>
                                    <ChevronIcon className="h-5 w-5 text-muted-foreground" />
                                  </div>
                                  <p className="text-muted-foreground text-sm mb-3">
                                    {category.description}
                                  </p>
                                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span>0 topics</span>
                                    <span>0 posts</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {isExpanded && (
                        <div className="ml-6 mt-2 space-y-2">
                          <Card className="border-l-4 border-l-primary/20">
                            <CardContent className="p-4 text-center text-muted-foreground">
                              No topics yet. Be the first to start a discussion!
                            </CardContent>
                          </Card>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Authentication */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Join the Community
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>
                  <TabsContent value="login" className="space-y-3 mt-4">
                    <form onSubmit={handleLogin} className="space-y-3">
                      <Input
                        placeholder="Email"
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                      />
                      <Input
                        type="password"
                        placeholder="Password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                      />
                      <Button type="submit" className="w-full">
                        Sign In
                      </Button>
                    </form>
                  </TabsContent>
                  <TabsContent value="signup" className="space-y-3 mt-4">
                    <form onSubmit={handleSignup} className="space-y-3">
                      <Input
                        placeholder="Username"
                        value={signupUsername}
                        onChange={(e) => setSignupUsername(e.target.value)}
                        required
                      />
                      <Input
                        type="email"
                        placeholder="Email"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        required
                      />
                      <Input
                        type="password"
                        placeholder="Password"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        required
                      />
                      <Input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      <Button type="submit" className="w-full">
                        Create Account
                      </Button>
                      <p className="text-xs text-muted-foreground text-center">
                        By signing up, you agree to our Terms of Service
                      </p>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Forum Rules */}
            <Card>
              <CardHeader>
                <CardTitle>Forum Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>• Be respectful to all community members</div>
                <div>• Keep discussions relevant to tokay geckos</div>
                <div>• No spam or self-promotion</div>
                <div>• Use appropriate categories for posts</div>
                <div>• Share knowledge and help others learn</div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  Read Full Guidelines
                </Button>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  asChild
                >
                  <Link to="/morphs">Morph Guide</Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  asChild
                >
                  <Link to="/genetics">Genetics Calculator</Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  asChild
                >
                  <Link to="/breeders">Breeder Directory</Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  asChild
                >
                  <Link to="/gallery">Photo Gallery</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
