-- Add comments table
CREATE TABLE If Not EXISTS comments(
  id        VARCHAR NOT NULL PRIMARY KEY,
  postId    VARCHAR NOT NULL,
  userId    VARCHAR NOT NULL,
  content   TEXT NOT NULL,
  createdAt INTEGER NOT NULL,

  FOREIGN KEY (postId) REFERENCES posts (id),
  FOREIGN KEY (userId) REFERENCES users (id)
);

