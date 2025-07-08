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
  Clock,
  Search,
  PlusCircle,
  Star,
  Eye,
  MessageCircle,
  User,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

export default function Community() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const forumCategories = [
    {
      id: "general",
      name: "General Discussion",
      description: "General tokay gecko topics and casual conversation",
      topics: 156,
      posts: 0,
      icon: MessageSquare,
      color: "bg-blue-100 text-blue-600",
      latestPost: {
        title: "New to tokay geckos - advice needed!",
        time: "2 hours ago",
      },
      categoryTopics: [
        {
          title: "New to tokay geckos - advice needed!",
          replies: 0,
          views: 0,
          time: "2 hours ago",
          isPinned: false,
          isHot: false,
        },
        {
          title: "Welcome new members!",
          replies: 0,
          views: 0,
          time: "1 day ago",
          isPinned: true,
          isHot: false,
        },
        {
          title: "Share your gecko stories",
          replies: 0,
          views: 0,
          time: "3 days ago",
          isPinned: false,
          isHot: false,
        },
      ],
    },
    {
      id: "care",
      name: "Care & Husbandry",
      description: "Housing, feeding, temperature, humidity, and health",
      topics: 243,
      posts: 0,
      icon: Users,
      color: "bg-green-100 text-green-600",
      latestPost: {
        title: "Best substrate for bioactive setup?",
        time: "4 hours ago",
      },
      categoryTopics: [
        {
          title: "Best substrate for bioactive setup?",
          replies: 0,
          views: 0,
          time: "4 hours ago",
          isPinned: false,
          isHot: true,
        },
        {
          title: "Temperature requirements help",
          replies: 0,
          views: 0,
          time: "6 hours ago",
          isPinned: false,
          isHot: false,
        },
        {
          title: "Feeding schedule questions",
          replies: 0,
          views: 0,
          time: "1 day ago",
          isPinned: false,
          isHot: false,
        },
      ],
    },
    {
      id: "breeding",
      name: "Breeding & Genetics",
      description:
        "Breeding projects, genetics questions, and morph discussions",
      topics: 189,
      posts: 0,
      icon: TrendingUp,
      color: "bg-purple-100 text-purple-600",
      latestPost: {
        title: "Reduced Pattern x Reduced Pattern results",
        time: "6 hours ago",
      },
      categoryTopics: [
        {
          title: "Reduced Pattern x Reduced Pattern results",
          replies: 0,
          views: 0,
          time: "6 hours ago",
          isPinned: false,
          isHot: false,
        },
        {
          title: "Understanding genetics basics",
          replies: 0,
          views: 0,
          time: "12 hours ago",
          isPinned: false,
          isHot: false,
        },
        {
          title: "Morph identification help",
          replies: 0,
          views: 0,
          time: "2 days ago",
          isPinned: false,
          isHot: false,
        },
      ],
    },
    {
      id: "marketplace",
      name: "Marketplace",
      description: "Buy, sell, and trade tokay geckos and supplies",
      topics: 98,
      posts: 0,
      icon: Star,
      color: "bg-orange-100 text-orange-600",
      latestPost: {
        title: "WTS: Het Luna female",
        time: "1 day ago",
      },
      categoryTopics: [
        {
          title: "WTS: Het Luna female",
          replies: 0,
          views: 0,
          time: "1 day ago",
          isPinned: false,
          isHot: false,
        },
        {
          title: "Looking for breeding pairs",
          replies: 0,
          views: 0,
          time: "2 days ago",
          isPinned: false,
          isHot: false,
        },
        {
          title: "Equipment for sale",
          replies: 0,
          views: 0,
          time: "3 days ago",
          isPinned: false,
          isHot: false,
        },
      ],
    },
    {
      id: "photos",
      name: "Photos & Videos",
      description: "Show off your geckos and share amazing photos",
      topics: 321,
      posts: 0,
      icon: Eye,
      color: "bg-pink-100 text-pink-600",
      latestPost: {
        title: "My new Granite finally showing colors!",
        time: "3 hours ago",
      },
      categoryTopics: [
        {
          title: "My new Granite finally showing colors!",
          replies: 0,
          views: 0,
          time: "3 hours ago",
          isPinned: false,
          isHot: true,
        },
        {
          title: "Beautiful morph collection",
          replies: 0,
          views: 0,
          time: "8 hours ago",
          isPinned: false,
          isHot: false,
        },
        {
          title: "Setup photos showcase",
          replies: 0,
          views: 0,
          time: "1 day ago",
          isPinned: false,
          isHot: false,
        },
      ],
    },
    {
      id: "projects",
      name: "Breeding Projects",
      description: "Long-term breeding goals and project updates",
      topics: 67,
      posts: 0,
      icon: TrendingUp,
      color: "bg-indigo-100 text-indigo-600",
      latestPost: {
        title: "Year 3 of my Albino project update",
        time: "12 hours ago",
      },
      categoryTopics: [
        {
          title: "Year 3 of my Albino project update",
          replies: 0,
          views: 0,
          time: "12 hours ago",
          isPinned: false,
          isHot: false,
        },
        {
          title: "Luna breeding project goals",
          replies: 0,
          views: 0,
          time: "1 day ago",
          isPinned: false,
          isHot: false,
        },
        {
          title: "Long-term breeding strategies",
          replies: 0,
          views: 0,
          time: "2 days ago",
          isPinned: false,
          isHot: false,
        },
      ],
    },
  ];

  const recentTopics = [
    {
      title: "Help! My tokay hasn't eaten in a week",
      category: "Care & Husbandry",
      replies: 0,
      views: 0,
      lastActivity: "1 hour ago",
      isPinned: false,
      isHot: true,
    },
    {
      title: "📌 Welcome to the Tokay Gecko Community!",
      category: "General Discussion",
      replies: 0,
      views: 0,
      lastActivity: "2 days ago",
      isPinned: true,
      isHot: false,
    },
    {
      title: "Amazing Luna morph photos - check this out!",
      category: "Photos & Videos",
      replies: 0,
      views: 0,
      lastActivity: "3 hours ago",
      isPinned: false,
      isHot: true,
    },
    {
      title: "Breeding calculator accuracy question",
      category: "Breeding & Genetics",
      replies: 0,
      views: 0,
      lastActivity: "5 hours ago",
      isPinned: false,
      isHot: false,
    },
    {
      title: "ISO: Carmel Albino het",
      category: "Marketplace",
      replies: 0,
      views: 0,
      lastActivity: "8 hours ago",
      isPinned: false,
      isHot: false,
    },
  ];

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
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
              <div className="text-2xl font-bold text-primary">1,274</div>
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
              <div className="text-2xl font-bold text-accent">1,074</div>
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
            <Tabs defaultValue="categories" className="w-full">
              <div className="flex items-center justify-between mb-6">
                <TabsList>
                  <TabsTrigger value="categories">Categories</TabsTrigger>
                  <TabsTrigger value="recent">Recent Topics</TabsTrigger>
                </TabsList>
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

              <TabsContent value="categories" className="space-y-4">
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
                                    <span>{category.topics} topics</span>
                                    <span>{category.posts} posts</span>
                                  </div>
                                </div>
                                <div className="text-right text-sm">
                                  <div className="font-medium">
                                    {category.latestPost.title}
                                  </div>
                                  <div className="text-muted-foreground">
                                    {category.latestPost.time}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {isExpanded && (
                        <div className="ml-6 mt-2 space-y-2">
                          {category.categoryTopics.map((topic, index) => (
                            <Card
                              key={index}
                              className="hover:shadow-sm transition-shadow cursor-pointer border-l-4 border-l-primary/20"
                            >
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      {topic.isPinned && (
                                        <Badge
                                          variant="secondary"
                                          className="text-xs"
                                        >
                                          Pinned
                                        </Badge>
                                      )}
                                      {topic.isHot && (
                                        <Badge
                                          variant="destructive"
                                          className="text-xs"
                                        >
                                          Hot
                                        </Badge>
                                      )}
                                      <h4 className="font-medium text-sm">
                                        {topic.title}
                                      </h4>
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      {topic.time}
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                      <MessageCircle className="h-3 w-3" />
                                      {topic.replies}
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Eye className="h-3 w-3" />
                                      {topic.views}
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </TabsContent>

              <TabsContent value="recent" className="space-y-3">
                {recentTopics.map((topic, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {topic.isPinned && (
                              <Badge variant="secondary" className="text-xs">
                                Pinned
                              </Badge>
                            )}
                            {topic.isHot && (
                              <Badge variant="destructive" className="text-xs">
                                Hot
                              </Badge>
                            )}
                            <h4 className="font-medium">{topic.title}</h4>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{topic.category}</span>
                            <span>{topic.lastActivity}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            {topic.replies}
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {topic.views}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
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
                    <Input placeholder="Username or Email" />
                    <Input type="password" placeholder="Password" />
                    <Button className="w-full">Sign In</Button>
                    <p className="text-xs text-muted-foreground text-center">
                      Forgot your password?
                    </p>
                  </TabsContent>
                  <TabsContent value="signup" className="space-y-3 mt-4">
                    <Input placeholder="Username" />
                    <Input type="email" placeholder="Email" />
                    <Input type="password" placeholder="Password" />
                    <Input type="password" placeholder="Confirm Password" />
                    <Button className="w-full">Create Account</Button>
                    <p className="text-xs text-muted-foreground text-center">
                      By signing up, you agree to our Terms of Service
                    </p>
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
