// Utility to reset forum data - for development use
export const resetForumData = () => {
  localStorage.removeItem("forumTopics");
  localStorage.removeItem("forumPosts");
  console.log("Forum data reset - all topics and posts cleared");
};

// Call this immediately to reset forum data
resetForumData();
