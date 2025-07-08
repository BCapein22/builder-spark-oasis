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
} from "lucide-react";

export default function Community() {
  const [searchTerm, setSearchTerm] = useState("");

  const forumCategories = [
    {
      id: "general",
      name: "General Discussion",
      description: "General tokay gecko topics and casual conversation",
      topics: 156,
      posts: 2341,
      icon: MessageSquare,
      color: "bg-blue-100 text-blue-600",
      latestPost: {
        title: "New to tokay geckos - advice needed!",
        author: "GeckoNewbie",
        time: "2 hours ago",
      },
    },
    {
      id: "care",
      name: "Care & Husbandry",
      description: "Housing, feeding, temperature, humidity, and health",
      topics: 243,
      posts: 3892,
      icon: Users,
      color: "bg-green-100 text-green-600",
      latestPost: {
        title: "Best substrate for bioactive setup?",
        author: "BioacticeFan",
        time: "4 hours ago",
      },
    },
    {
      id: "breeding",
      name: "Breeding & Genetics",
      description:
        "Breeding projects, genetics questions, and morph discussions",
      topics: 189,
      posts: 1876,
      icon: TrendingUp,
      color: "bg-purple-100 text-purple-600",
      latestPost: {
        title: "Reduced Pattern x Reduced Pattern results",
        author: "MorphBreeder",
        time: "6 hours ago",
      },
    },
    {
      id: "marketplace",
      name: "Marketplace",
      description: "Buy, sell, and trade tokay geckos and supplies",
      topics: 98,
      posts: 567,
      icon: Star,
      color: "bg-orange-100 text-orange-600",
      latestPost: {
        title: "WTS: Het Luna female",
        author: "LunaBreeder",
        time: "1 day ago",
      },
    },
    {
      id: "photos",
      name: "Photos & Videos",
      description: "Show off your geckos and share amazing photos",
      topics: 321,
      posts: 1234,
      icon: Eye,
      color: "bg-pink-100 text-pink-600",
      latestPost: {
        title: "My new Granite finally showing colors!",
        author: "GraniteGuy",
        time: "3 hours ago",
      },
    },
    {
      id: "projects",
      name: "Breeding Projects",
      description: "Long-term breeding goals and project updates",
      topics: 67,
      posts: 445,
      icon: TrendingUp,
      color: "bg-indigo-100 text-indigo-600",
      latestPost: {
        title: "Year 3 of my Albino project update",
        author: "AlbinoChaser",
        time: "12 hours ago",
      },
    },
  ];

  const recentTopics = [
    {
      title: "Help! My tokay hasn't eaten in a week",
      author: "WorriedOwner",
      category: "Care & Husbandry",
      replies: 23,
      views: 156,
      lastActivity: "1 hour ago",
      isPinned: false,
      isHot: true,
    },
    {
      title: "📌 Welcome to the Tokay Gecko Community!",
      author: "ModeratorTeam",
      category: "General Discussion",
      replies: 45,
      views: 892,
      lastActivity: "2 days ago",
      isPinned: true,
      isHot: false,
    },
    {
      title: "Amazing Luna morph photos - check this out!",
      author: "PhotoPro",
      category: "Photos & Videos",
      replies: 18,
      views: 234,
      lastActivity: "3 hours ago",
      isPinned: false,
      isHot: true,
    },
    {
      title: "Breeding calculator accuracy question",
      author: "GeneticsNerd",
      category: "Breeding & Genetics",
      replies: 12,
      views: 89,
      lastActivity: "5 hours ago",
      isPinned: false,
      isHot: false,
    },
    {
      title: "ISO: Carmel Albino het",
      author: "AlbinoCollector",
      category: "Marketplace",
      replies: 5,
      views: 67,
      lastActivity: "8 hours ago",
      isPinned: false,
      isHot: false,
    },
  ];

  const onlineUsers = [
    { name: "GeckoMaster", status: "Active", role: "Breeder" },
    { name: "TokayExpert", status: "Active", role: "Moderator" },
    { name: "NewbieLearner", status: "Active", role: "Member" },
    { name: "MorphHunter", status: "Away", role: "Member" },
    { name: "VetAdvice", status: "Active", role: "Expert" },
  ];

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
              <div className="text-2xl font-bold text-secondary">8,355</div>
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
              <div className="text-2xl font-bold text-green-600">
                {onlineUsers.filter((u) => u.status === "Active").length}
              </div>
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
                  return (
                    <Card
                      key={category.id}
                      className="hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg ${category.color}`}>
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-semibold text-lg mb-1">
                                  {category.name}
                                </h3>
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
                                  by {category.latestPost.author}
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
                            <span>by {topic.author}</span>
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
            {/* Online Users */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Who's Online
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {onlineUsers.map((user, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        user.status === "Active"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{user.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {user.role}
                      </div>
                    </div>
                  </div>
                ))}
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
