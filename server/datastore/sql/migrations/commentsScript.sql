CREATE TABLE comments (
   commentId VARCHAR NOT NULL PRIMARY KEY ,
   userId VARCHAR NOT NULL,
   postId VARCHAR NOT NULL, 
   comment VARCHAR NOT NULL,
   FOREIGN KEY (userId) REFERENCES users(id),
   FOREIGN KEY (postId) REFERENCES posts(id)
);