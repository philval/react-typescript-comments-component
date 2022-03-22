import { useEffect, useState } from "react";
import Comment from "./Comment";
import NewCommentForm from "./NewCommentForm";

import { IComments } from "./CommentsInterface";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Comments(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<IComments[]>([]);

  // TODO useReducer reducer for fetch() state
  // TODO UseFetchComments
  // idle,pending, fulfilled, rejected

  // TODO useReducer for IComments[] state
  // after forms submitted, comment deleted etc i.e. USER INTENTS

  useEffect(() => {
    const fetchData = async () => {
      try {
        await sleep(1000);
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

  // TODO return payload, ststus, error ?? kent ? Tanner ?
  // TODO kent do not using isloading booleans

  if (loading) {
    return <div>"Loading..."</div>;
  }

  return (
    <>
      <div>
        {comments.map((comment: IComments, index: number) => (
          <Comment key={index} comment={comment} />
        ))}
      </div>
      <div>
        <NewCommentForm />
      </div>
    </>
  );
}

// TODO naming of props is confusing
// Maybe switch to "data"
