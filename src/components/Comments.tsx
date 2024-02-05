import { useEffect, useState } from "react";
import Comment from "./Comment";
import NewCommentForm from "./NewCommentForm";

import { IComments, IComment, IUser } from "./CommentsInterface";

// recursive function to find the highest ID
function getNewID(comments: IComment[]): number {
  let highestID = 0;

  for (const comment of comments) {
    if (comment.id > highestID) {
      highestID = comment.id;
    }

    if (comment.replies.length > 0) {
      const replyID = getNewID(comment.replies);
      if (replyID > highestID) {
        highestID = replyID;
      }
    }
  }

  return highestID;
}

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
  return null;
}

// recursive function to delete comment by ID
export function deleteCommentByID(
  comments: IComment[],
  commentID: number
): IComment[] {
  for (let i = 0; i < comments.length; i++) {
    if (comments[i].id === commentID) {
      comments.splice(i, 1);
      return comments;
    }

    if (comments[i].replies.length > 0) {
      comments[i].replies = deleteCommentByID(comments[i].replies, commentID);
    }
  }

  return comments;
}

// recursive function to edit comment by ID
export function editCommentByID(
  comments: IComment[],
  commentID: number,
  newContent: string
): IComment[] | null {
  for (const comment of comments) {
    if (comment.id === commentID) {
      comment.content = newContent;
      return comments;
    }
    if (comment.replies.length > 0) {
      const updatedComments = editCommentByID(
        comment.replies,
        commentID,
        newContent
      );
      if (updatedComments) {
        return updatedComments;
      }
    }
  }
  return null;
}

export default function Comments(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState({} as IUser);
  const [comments, setComments] = useState<Array<IComments>>([]);
  const [newID, setNewID] = useState<number>(0); // ID for next comment/reply

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
        setCurrentUser(data[0].currentUser);
        setComments(data);
        setNewID(getNewID(data[0].comments) + 1);
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
      user: currentUser,
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

  function addNewReply(commentText: string, commentID: number): void {
    console.log(
      "comment text:",
      commentText,
      "commentID to update:",
      commentID
    );
    const newReply: IComment = {
      id: newID,
      content: commentText,
      createdAt: "today", // TODO use UNIX timestamp
      score: 0,
      replyingTo: findCommentByID(comments[0].comments, commentID)?.user
        .username,
      user: currentUser,
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

  function deleteComment(commentID: number): void {
    setComments((prevComments: IComments[]): IComments[] => {
      const updatedComments = [...prevComments];
      // mutates after spreading
      deleteCommentByID(updatedComments[0].comments, commentID);
      return updatedComments;
    });
  }

  function editComment(commentID: number, content: string): void {
    setComments((prevComments: IComments[]): IComments[] => {
      const updatedComments = [...prevComments];
      // mutates after spreading
      editCommentByID(updatedComments[0].comments, commentID, content);
      return updatedComments;
    });
  }

  return (
    <>
      <div>
        {comments.length > 0 &&
          comments[0].comments.map((comment: IComment) => (
            <Comment
              key={comment.id}
              currentUser={currentUser}
              comment={comment}
              addNewReply={addNewReply}
              deleteComment={deleteComment}
              editComment={editComment}
            />
          ))}
      </div>
      <NewCommentForm addNewComment={addNewComment} />
    </>
  );
}
