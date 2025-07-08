// Utility to reset forum data - for development use
export const resetForumData = () => {
  localStorage.removeItem("forumTopics");
  localStorage.removeItem("forumPosts");
  console.log("Forum data reset - all topics and posts cleared");
};

// Execute reset immediately for this deployment
if (typeof window !== "undefined") {
  resetForumData();
}
