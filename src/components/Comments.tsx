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

    if (comment.replies.length > 0) {
      const reply = findCommentByID(comment.replies, commentID);
      if (reply) {
        return reply;
      }
    }
  }
  return null;
}

// recursive function to add Reply by ID
export function addReplyByID(
  comments: IComment[],
  commentID: number,
  newReply: IComment
): IComment[] | null {
  for (const comment of comments) {
    if (comment.id === commentID) {
      comment.replies.push(newReply);
      return comments;
    }

    if (comment.replies.length > 0) {
      const updatedComments = addReplyByID(
        comment.replies,
        commentID,
        newReply
      );
      if (updatedComments) {
        return updatedComments;
      }
    }
  }
  return null; // not found so iterate again
}

export default function Comments(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<Array<IComments>>([]);
  const [newID, setNewID] = useState<number>(5); // ID for next comment/reply

  useEffect(() => {
    const fetchData = async () => {
      try {
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
      id: newID,
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

    setNewID(newID + 1);
  }

  function addNewReply(comment: string, commentID: number): void {
    console.log("comment text:", comment, "commentID to update:", commentID);
    const newReply: IComment = {
      id: newID,
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
      // mutates after spreading
      addReplyByID(updatedComments[0].comments, commentID, newReply);
      return updatedComments;
    });

    setNewID(newID + 1);
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
