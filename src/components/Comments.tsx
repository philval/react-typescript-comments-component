import { useEffect, useState } from "react";
import Comment from "./Comment";
import NewCommentForm from "./NewCommentForm";

import { IComments } from "./CommentsInterface";
import { IComment } from "./CommentsInterface";

// recursive function to find a comment by ID
export function findCommentByID(
  comments: IComment[],
  commentID: number
): IComment | null {
  for (const comment of comments) {
    if (comment.id === commentID) {
      return comment;
    }

    if (comment.replies && comment.replies.length > 0) {
      const reply = findCommentByID(comment.replies, commentID);
      if (reply) {
        return reply;
      }
    }
  }
  return null; // not found so iterate again
}

export default function Comments(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<Array<IComments>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // await sleep(1000);
        // could fail in many modes, and would need error handling
        const res = await fetch("./data.json", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        });

        const data = await res.json();
        setComments(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  function addNewComment(comment: string): void {
    const newComment: IComment = {
      id: Date.now(), // milliseconds, not necessarily unique
      content: comment,
      createdAt: "today", // TODO use UNIX timestamp
      score: 0,
      user: {
        image: {
          png: "./images/avatars/image-juliusomo.png",
          webp: "./images/avatars/image-juliusomo.webp"
        },
        username: "juliusomo"
      },
      replies: []
    };

    setComments((prevComments: IComments[]): IComments[] => {
      return [
        {
          ...prevComments[0],
          comments: [...prevComments[0].comments, newComment]
        }
      ];
    });
  }

  function addNewReply(comment: string, commentID: number): void {
    console.log("comment text:", comment, "commentID to update:", commentID);
    const newReply: IComment = {
      id: Date.now(), // milliseconds, not necessarily unique
      content: comment,
      createdAt: "today", // TODO use UNIX timestamp
      score: 0,
      user: {
        image: {
          png: "./images/avatars/image-juliusomo.png",
          webp: "./images/avatars/image-juliusomo.webp"
        },
        username: "juliusomo"
      },
      replies: []
    };

    setComments((prevComments: IComments[]): IComments[] => {
      const updatedComments = [...prevComments];

      // new reply never mutates existing state
      findCommentByID(updatedComments[0].comments, commentID)?.replies?.push(
        newReply
      );
      // console.log("updatedComments:", JSON.stringify(updatedComments, null, 2));

      return updatedComments;
    });
  }

  return (
    <>
      <div>
        {comments.length !== 0 &&
          comments[0].comments.map((comment: IComment) => (
            <Comment
              key={comment.id}
              comment={comment}
              addNewReply={addNewReply}
            />
          ))}
      </div>
      <NewCommentForm addNewComment={addNewComment} />
    </>
  );
}
