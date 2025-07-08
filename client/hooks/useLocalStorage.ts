import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}

// Email notification service
export const sendEmail = async (
  to: string,
  subject: string,
  body: string,
): Promise<boolean> => {
  try {
    // In a real application, this would connect to an email service
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return true;
  } catch (error) {
    console.error("Email sending failed:", error);
    return false;
  }
};

export interface ForumPost {
  id: string;
  content: string;
  author: string;
  timestamp: string;
  topicId: string;
  categoryId: string;
}

export interface ForumTopic {
  id: string;
  title: string;
  categoryId: string;
  author: string;
  posts: ForumPost[];
  createdAt: string;
  lastActivity: string;
  isPinned: boolean;
  isHot: boolean;
  replies: number;
}

export const useForumData = () => {
  const [topics, setTopics] = useLocalStorage<ForumTopic[]>("forumTopics", []);
  const [posts, setPosts] = useLocalStorage<ForumPost[]>("forumPosts", []);

  const addTopic = (
    topic: Omit<ForumTopic, "id" | "createdAt" | "lastActivity" | "replies">,
  ) => {
    const newTopic: ForumTopic = {
      ...topic,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      replies: 0,
      posts: [],
    };
    setTopics((prev) => [...prev, newTopic]);
    return newTopic;
  };

  const addPost = (post: Omit<ForumPost, "id" | "timestamp">) => {
    const newPost: ForumPost = {
      ...post,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };

    setPosts((prev) => [...prev, newPost]);

    // Update topic's last activity and reply count
    setTopics((prev) =>
      prev.map((topic) =>
        topic.id === post.topicId
          ? {
              ...topic,
              lastActivity: newPost.timestamp,
              replies: topic.replies + 1,
            }
          : topic,
      ),
    );

    return newPost;
  };

  const getTopicPosts = (topicId: string) => {
    return posts
      .filter((post) => post.topicId === topicId)
      .sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
      );
  };

  const getTopicsByCategory = (categoryId: string) => {
    return topics
      .filter((topic) => topic.categoryId === categoryId)
      .sort(
        (a, b) =>
          new Date(b.lastActivity).getTime() -
          new Date(a.lastActivity).getTime(),
      );
  };

  const deleteTopic = (topicId: string) => {
    // Remove the topic
    setTopics((prev) => prev.filter((topic) => topic.id !== topicId));

    // Remove all posts related to this topic
    setPosts((prev) => prev.filter((post) => post.topicId !== topicId));
  };

  const getTopic = (topicId: string) => {
    return topics.find((topic) => topic.id === topicId);
  };

  const clearAllTopics = () => {
    setTopics([]);
    setPosts([]);
  };

  return {
    topics,
    posts,
    addTopic,
    addPost,
    getTopicPosts,
    getTopicsByCategory,
    incrementViews,
    deleteTopic,
    getTopic,
    clearAllTopics,
  };
};
