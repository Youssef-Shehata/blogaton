-- Add followers table
CREATE TABLE followers (
  followerId VARCHAR NOT NULL,
  followeeId VARCHAR NOT NULL,

  FOREIGN KEY (followerId) REFERENCES users (id),
  FOREIGN KEY (followeeId) REFERENCES users (id),
  PRIMARY KEY (followerId, followeeId)
);
