import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useForumData, ForumTopic, ForumPost } from "@/hooks/useLocalStorage";
import { useToast } from "@/hooks/use-toast";
import {
  ChevronLeft,
  MessageSquare,
  Clock,
  Send,
  Pin,
  Flame,
  User,
  Trash2,
} from "lucide-react";

export default function TopicDetail() {
  const { categoryId, topicId } = useParams<{
    categoryId: string;
    topicId: string;
  }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { topics, getTopicPosts, addPost, deleteTopic } = useForumData();
  const { toast } = useToast();

  const [topic, setTopic] = useState<ForumTopic | null>(null);
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!categoryId || !topicId) {
      navigate("/community");
      return;
    }

    const foundTopic = topics.find((t) => t.id === topicId);
    if (!foundTopic) {
      navigate("/community");
      return;
    }

    setTopic(foundTopic);
    setPosts(getTopicPosts(topicId));
  }, [topicId, categoryId, topics, navigate, getTopicPosts]);

  const handleSubmitMessage = async () => {
    if (!newMessage.trim() || !isAuthenticated || !user || !topic) return;

    setIsSubmitting(true);
    try {
      const post = await addPost({
        content: newMessage.trim(),
        author: user.username,
        topicId: topic.id,
        categoryId: topic.categoryId,
      });

      setPosts((prev) => [...prev, post]);
      setNewMessage("");
    } catch (error) {
      console.error("Error submitting message:", error);
    }
    setIsSubmitting(false);
  };

  const getCategoryName = (categoryId: string) => {
    const categories: Record<string, string> = {
      general: "General Discussion",
      care: "Care & Husbandry",
      breeding: "Breeding & Genetics",
      photos: "Photos & Videos",
      projects: "Breeding Projects",
    };
    return categories[categoryId] || "Unknown Category";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDeleteTopic = () => {
    if (!topic || !user) return;

    // Confirm deletion
    if (
      window.confirm(
        "Are you sure you want to delete this topic? This action cannot be undone.",
      )
    ) {
      try {
        deleteTopic(topic.id);
        toast({
          title: "Topic deleted",
          description: "The topic has been successfully deleted.",
        });
        navigate("/community");
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete the topic. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  if (!topic) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
        <Navigation />
        <div className="container py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Topic Not Found</h1>
            <Button asChild>
              <Link to="/community">Back to Community</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <Navigation />

      <div className="container py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link to="/community" className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back to Community
            </Link>
          </Button>
        </div>

        {/* Topic Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">
                    {getCategoryName(topic.categoryId)}
                  </Badge>
                  {topic.isPinned && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      <Pin className="h-3 w-3" />
                      Pinned
                    </Badge>
                  )}
                  {topic.isHot && (
                    <Badge
                      variant="destructive"
                      className="flex items-center gap-1"
                    >
                      <Flame className="h-3 w-3" />
                      Hot
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-2xl">{topic.title}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    {topic.replies} replies
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Created {formatDate(topic.createdAt)}
                  </div>
                  {topic.author && (
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      by {topic.author}
                    </div>
                  )}
                </div>
              </div>
              {/* Delete button - only show to topic author */}
              {isAuthenticated && user && topic.author === user.username && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDeleteTopic}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Topic
                </Button>
              )}
            </div>
          </CardHeader>
        </Card>

        {/* Posts */}
        <div className="space-y-4 mb-6">
          {posts.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  No messages yet. Be the first to reply!
                </p>
              </CardContent>
            </Card>
          ) : (
            posts.map((post, index) => (
              <Card key={post.id}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        <User className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold">{post.author}</span>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(post.timestamp)}
                        </span>
                        {index === 0 && (
                          <Badge variant="secondary" className="text-xs">
                            Original Post
                          </Badge>
                        )}
                      </div>
                      <div className="prose prose-sm max-w-none">
                        <p className="whitespace-pre-wrap">{post.content}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Reply Form */}
        {isAuthenticated ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Post a Reply
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  placeholder="Write your reply..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    Posting as{" "}
                    <span className="font-semibold">{user?.username}</span>
                  </p>
                  <Button
                    onClick={handleSubmitMessage}
                    disabled={!newMessage.trim() || isSubmitting}
                    className="flex items-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    {isSubmitting ? "Posting..." : "Post Reply"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-semibold mb-2">Join the Discussion</h3>
              <p className="text-muted-foreground mb-4">
                Sign in to post replies and join the conversation
              </p>
              <Button asChild>
                <Link to="/community">Sign In</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
