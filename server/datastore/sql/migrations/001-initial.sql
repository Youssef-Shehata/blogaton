CREATE TABLE users (
  id        VARCHAR NOT NULL PRIMARY KEY,
  firstName VARCHAR NOT NULL,
  lastName  VARCHAR NOT NULL,
  userName  VARCHAR UNIQUE NOT NULL,
  email     VARCHAR UNIQUE NOT NULL,
  password  VARCHAR NOT NULL
);

CREATE TABLE posts (
  id       VARCHAR NOT NULL PRIMARY KEY,
  title    VARCHAR NOT NULL,
  url      VARCHAR UNIQUE NOT NULL,
  userId   VARCHAR NOT NULL,
  postedAt INTEGER NOT NULL,
  likes    INTEGER,
  comments INTEGER

  FOREIGN KEY (userId) REFERENCES users (id)
);

CREATE TABLE likes (
  userId   VARCHAR NOT NULL ,
  postId    VARCHAR NOT NULL,

  FOREIGN KEY (userId) REFERENCES users (id),
  FOREIGN KEY (postId) REFERENCES posts (id)
  PRIMARY KEY (postId , userId)

);

  