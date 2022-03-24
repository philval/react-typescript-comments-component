import { useEffect, useState } from "react";
import Comment from "./Comment";
import NewCommentForm from "./NewCommentForm";

import { IComments } from "./CommentsInterface";
import { IComment } from "./CommentsInterface";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Comments(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Array<IComments>>([]);

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
        setData(data);
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
    return <div>"Loading..."</div>;
  }

  return (
    <>
      <div>
        {data.length !== 0 &&
          data[0].comments.map((comment: IComment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
      </div>
      <NewCommentForm />
    </>
  );
}
