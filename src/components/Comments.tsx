import { useEffect, useState } from "react";
import Comment from "./Comment";
import NewCommentForm from "./NewCommentForm";

import { IComments } from "./CommentsInterface";
import { IComment } from "./CommentsInterface";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Comments(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<Array<IComments>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await sleep(1000);
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
      "user": {
        "image": {
          "png": "./images/avatars/image-juliusomo.png",
          "webp": "./images/avatars/image-juliusomo.webp"
        },
        "username": "juliusomo"
      },
      "replies": []
    }

    setComments((prevComments: IComments[]): IComments[] => {
      return [{ ...prevComments[0], comments: [...prevComments[0].comments, newComment] }];
    });
  }

  return (
    <>
      <div>
        {comments.length !== 0 &&
          comments[0].comments.map((comment: IComment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
      </div>
      <NewCommentForm addNewComment={addNewComment} />
    </>
  );
}
