import { useEffect, useState } from "react";
import { IComment, IUser } from "./CommentsInterface";
import Comment from "./Comment";
import NewCommentForm from "./NewCommentForm";

import {
  sortComments,
  getHighestID,
  findCommentByID,
  addReplyByID,
  deleteCommentByID,
  editCommentByID,
  updateCommentScoreByID
} from "./commentsUtils";

export default function Comments(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState({} as IUser);
  const [comments, setComments] = useState<Array<IComment>>([]);
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
        setComments(data[0].comments);
        setNewID(getHighestID(data[0].comments) + 1);
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
      createdAt: new Date().toISOString(),
      score: 0,
      user: currentUser,
      replies: []
    };

    setComments((prevComments: IComment[]): IComment[] => {
      const copiedComments = structuredClone(prevComments);
      const addedComment = [...copiedComments, newComment];
      // order of comments may change
      const sortedComments = addedComment.sort((a, b) => b.score - a.score);
      return sortedComments;
    });

    setNewID(newID + 1);
  }

  function addNewReply(commentText: string, commentID: number): void {
    const newReply: IComment = {
      id: newID,
      content: commentText,
      createdAt: new Date().toISOString(),
      score: 0,
      replyingTo: findCommentByID(comments, commentID)?.user.username,
      user: currentUser,
      replies: []
    };

    setComments((prevComments: IComment[]): IComment[] => {
      const updatedComments = structuredClone(prevComments);
      addReplyByID(updatedComments, commentID, newReply);
      return updatedComments;
    });

    setNewID(newID + 1);
  }

  function deleteComment(commentID: number): void {
    setComments((prevComments: IComment[]): IComment[] => {
      const updatedComments = structuredClone(prevComments);
      deleteCommentByID(updatedComments, commentID);
      return sortComments(updatedComments); // order of comments may change
    });
  }

  function editComment(commentID: number, content: string): void {
    setComments((prevComments: IComment[]): IComment[] => {
      const updatedComments = structuredClone(prevComments);
      editCommentByID(updatedComments, commentID, content);
      return updatedComments;
    });
  }

  function updateScore(commentID: number, vote: number): void {
    setComments((prevComments: IComment[]): IComment[] => {
      const updatedComments = structuredClone(prevComments);
      updateCommentScoreByID(updatedComments, commentID, vote);
      return sortComments(updatedComments); // order of comments may change
    });
  }

  return (
    <>
      <div>
        {comments.length > 0 &&
          comments.map((comment: IComment) => (
            <Comment
              key={comment.id}
              currentUser={currentUser}
              comment={comment}
              addNewReply={addNewReply}
              deleteComment={deleteComment}
              editComment={editComment}
              updateScore={updateScore}
            />
          ))}
      </div>
      <NewCommentForm addNewComment={addNewComment} currentUser={currentUser} />
    </>
  );
}
