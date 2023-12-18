import { IComment } from "./CommentsInterface";

const data = [
  {
    currentUser: {
      image: {
        png: "./images/avatars/image-juliusomo.png",
        webp: "./images/avatars/image-juliusomo.webp"
      },
      username: "juliusomo"
    },
    comments: [
      {
        id: 1,
        content: "Comment 1",
        createdAt: "1 month ago",
        score: 12,
        user: {
          image: {
            png: "./images/avatars/image-amyrobson.png",
            webp: "./images/avatars/image-amyrobson.webp"
          },
          username: "amyrobson"
        },
        replies: []
      },
      {
        id: 2,
        content: "Comment 2",
        createdAt: "2 weeks ago",
        score: 5,
        user: {
          image: {
            png: "./images/avatars/image-maxblagun.png",
            webp: "./images/avatars/image-maxblagun.webp"
          },
          username: "maxblagun"
        },
        replies: [
          {
            id: 3,
            content: "Comment 3",
            createdAt: "1 week ago",
            score: 4,
            replyingTo: "maxblagun",
            user: {
              image: {
                png: "./images/avatars/image-ramsesmiron.png",
                webp: "./images/avatars/image-ramsesmiron.webp"
              },
              username: "ramsesmiron"
            }
          },
          {
            id: 4,
            content:
              "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
            createdAt: "2 days ago",
            score: 2,
            replyingTo: "ramsesmiron",
            user: {
              image: {
                png: "./images/avatars/image-juliusomo.png",
                webp: "./images/avatars/image-juliusomo.webp"
              },
              username: "juliusomo"
            },
            replies: [
              {
                id: 5,
                content: "Comment 5",
                createdAt: "1 week ago",
                score: 42,
                replyingTo: "maxblagun",
                user: {
                  image: {
                    png: "./images/avatars/image-ramsesmiron.png",
                    webp: "./images/avatars/image-ramsesmiron.webp"
                  },
                  username: "ramsesmiron"
                }
              }
            ]
          }
        ]
      },
      {
        id: 6,
        content: "Comment 6",
        createdAt: "1 day ago",
        score: 1,
        user: {
          image: {
            png: "./images/avatars/image-amyrobson.png",
            webp: "./images/avatars/image-amyrobson.webp"
          },
          username: "amyrobson"
        },
        replies: []
      },
      {
        id: 7,
        content: "Comment 7",
        createdAt: "1 day ago",
        score: 1,
        user: {
          image: {
            png: "./images/avatars/image-amyrobson.png",
            webp: "./images/avatars/image-amyrobson.webp"
          },
          username: "amyrobson"
        }
      }
    ]
  }
];

import { findCommentByID } from "./Comments";

test("findCommentByID returns the correct comment", () => {
  // Arrange
  const comments = data[0].comments;

  console.log("Test top level comment");
  expect(findCommentByID(comments as IComment[], 1)).toEqual({
    id: 1,
    content: "Comment 1",
    createdAt: "1 month ago",
    score: 12,
    user: {
      image: {
        png: "./images/avatars/image-amyrobson.png",
        webp: "./images/avatars/image-amyrobson.webp"
      },
      username: "amyrobson"
    },
    replies: []
  });

  console.log("Test nested comment");
  expect(findCommentByID(comments as IComment[], 3)).toEqual({
    id: 3,
    content: "Comment 3",
    createdAt: "1 week ago",
    score: 4,
    replyingTo: "maxblagun",
    user: {
      image: {
        png: "./images/avatars/image-ramsesmiron.png",
        webp: "./images/avatars/image-ramsesmiron.webp"
      },
      username: "ramsesmiron"
    }
  });

  console.log("Test nested nested comment");
  expect(findCommentByID(comments as IComment[], 5)).toEqual({
    id: 5,
    content: "Comment 5",
    createdAt: "1 week ago",
    score: 42,
    replyingTo: "maxblagun",
    user: {
      image: {
        png: "./images/avatars/image-ramsesmiron.png",
        webp: "./images/avatars/image-ramsesmiron.webp"
      },
      username: "ramsesmiron"
    }
  });

  console.log("Test level top level comment again");
  expect(findCommentByID(comments as IComment[], 6)).toEqual({
    id: 6,
    content: "Comment 6",
    createdAt: "1 day ago",
    score: 1,
    user: {
      image: {
        png: "./images/avatars/image-amyrobson.png",
        webp: "./images/avatars/image-amyrobson.webp"
      },
      username: "amyrobson"
    },
    replies: []
  });

  console.log("Test for ID that does not exist");
  expect(findCommentByID(comments as IComment[], 42)).toEqual(null);

  console.log("Test for no comments at all");
  const noComments: IComment[] = [];
  expect(findCommentByID(noComments as IComment[], 42)).toEqual(null);
});

export {};
