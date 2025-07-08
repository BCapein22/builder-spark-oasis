import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useForumData } from "@/hooks/useLocalStorage";
import { EmailService } from "@/services/emailService";
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
  LogOut,
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
  const [showNewTopic, setShowNewTopic] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [newTopicContent, setNewTopicContent] = useState("");
  const [newTopicCategory, setNewTopicCategory] = useState("general");

  const { user, login, signup, logout, isAuthenticated, memberCount } =
    useAuth();
  const { getTopicsByCategory, addTopic } = useForumData();
  const { toast } = useToast();
  const navigate = useNavigate();

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
    if (!loginEmail || !loginPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const success = await login(loginEmail, loginPassword);
    if (success) {
      toast({
        title: "Success",
        description: "Logged in successfully!",
      });
      setLoginEmail("");
      setLoginPassword("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      toast({
        title: "Error",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !signupUsername ||
      !signupEmail ||
      !signupPassword ||
      !confirmPassword
    ) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (signupPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    const success = await signup(signupUsername, signupEmail, signupPassword);
    if (success) {
      toast({
        title: "Success",
        description: "Account created successfully!",
      });

      // Send email notification about new member
      try {
        await EmailService.sendNewMemberNotification(
          signupUsername,
          signupEmail,
        );
      } catch (error) {
        console.error("Failed to send email notification:", error);
      }

      setSignupUsername("");
      setSignupEmail("");
      setSignupPassword("");
      setConfirmPassword("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      toast({
        title: "Error",
        description: "Username or email already exists",
        variant: "destructive",
      });
    }
  };

  const handleTopicClick = (topicId: string, categoryId: string) => {
    navigate(`/community/${categoryId}/${topicId}`);
  };

  const handleCreateTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicTitle.trim() || !newTopicContent.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (!isAuthenticated || !user) {
      toast({
        title: "Error",
        description: "You must be logged in to create topics",
        variant: "destructive",
      });
      return;
    }

    try {
      const topic = addTopic({
        title: newTopicTitle.trim(),
        categoryId: newTopicCategory,
        author: user.username,
        posts: [],
        isPinned: false,
        isHot: false,
      });

      // Add initial post
      addPost({
        content: newTopicContent.trim(),
        author: user.username,
        topicId: topic.id,
        categoryId: newTopicCategory,
      });

      // Send email notification about new topic
      try {
        await EmailService.sendForumTopicNotification(
          {
            title: newTopicTitle.trim(),
            categoryId: newTopicCategory,
            content: newTopicContent.trim(),
          },
          user.username,
        );
      } catch (error) {
        console.error("Failed to send topic notification:", error);
      }

      toast({
        title: "Success",
        description: "Topic created successfully!",
      });

      setNewTopicTitle("");
      setNewTopicContent("");
      setShowNewTopic(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create topic",
        variant: "destructive",
      });
    }
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
              <div className="text-2xl font-bold text-primary">
                {memberCount}
              </div>
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
              <div className="text-2xl font-bold text-green-600">
                {isAuthenticated ? 1 : 0}
              </div>
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
                  {isAuthenticated && (
                    <Button
                      className="flex items-center gap-2"
                      onClick={() => {
                        setShowNewTopic(true);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      <PlusCircle className="h-4 w-4" />
                      New Topic
                    </Button>
                  )}
                </div>
              </div>

              {/* New Topic Form */}
              {showNewTopic && isAuthenticated && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Create New Topic</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleCreateTopic} className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Category</label>
                        <select
                          value={newTopicCategory}
                          onChange={(e) => setNewTopicCategory(e.target.value)}
                          className="w-full mt-1 p-2 border rounded-md"
                        >
                          {forumCategories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">
                          Topic Title
                        </label>
                        <Input
                          placeholder="Enter topic title..."
                          value={newTopicTitle}
                          onChange={(e) => setNewTopicTitle(e.target.value)}
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Content</label>
                        <Textarea
                          placeholder="Write your topic content..."
                          value={newTopicContent}
                          onChange={(e) => setNewTopicContent(e.target.value)}
                          rows={4}
                          className="mt-1"
                          required
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          type="submit"
                          className="flex items-center gap-2"
                        >
                          <PlusCircle className="h-4 w-4" />
                          Create Topic
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowNewTopic(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-4">
                {forumCategories.map((category) => {
                  const IconComponent = category.icon;
                  const isExpanded = expandedCategories.includes(category.id);
                  const ChevronIcon = isExpanded ? ChevronDown : ChevronRight;
                  const categoryTopics = getTopicsByCategory(category.id);

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
                                    <span>{categoryTopics.length} topics</span>
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
                          {categoryTopics.length === 0 ? (
                            <Card className="border-l-4 border-l-primary/20">
                              <CardContent className="p-4 text-center text-muted-foreground">
                                No topics yet. Be the first to start a
                                discussion!
                              </CardContent>
                            </Card>
                          ) : (
                            categoryTopics.map((topic) => (
                              <Card
                                key={topic.id}
                                className="hover:shadow-sm transition-shadow cursor-pointer border-l-4 border-l-primary/20"
                                onClick={() =>
                                  handleTopicClick(topic.id, category.id)
                                }
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
                                        {new Date(
                                          topic.lastActivity,
                                        ).toLocaleDateString()}
                                        {topic.author && (
                                          <span className="ml-2">
                                            • by {topic.author}
                                          </span>
                                        )}
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
                            ))
                          )}
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
            {isAuthenticated ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Welcome Back!
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="font-semibold">{user?.username}</p>
                    <p className="text-sm text-muted-foreground">
                      {user?.role}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Joined{" "}
                      {user?.joinDate
                        ? new Date(user.joinDate).toLocaleDateString()
                        : "Recently"}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full flex items-center gap-2"
                    onClick={() => {
                      logout();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            ) : (
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
            )}

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
