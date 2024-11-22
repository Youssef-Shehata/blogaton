-- Add indexes for faster fetching of comments
CREATE INDEX idx_comments_postId ON comments (postId);
CREATE INDEX idx_comments_userId ON comments (userId);

-- Add indexes for faster fetching of likes
CREATE INDEX idx_likes_postId ON likes (postId);
CREATE INDEX idx_likes_userId ON likes (userId);

-- Add indexes for faster fetching of posts
CREATE INDEX idx_posts_userId ON posts (userId);
CREATE INDEX idx_posts_postedAt ON posts (postedAt);
