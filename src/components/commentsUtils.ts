import { IComment } from "./CommentsInterface";

// top level comments only
export function sortComments(comments: IComment[]): IComment[] {
  return structuredClone(comments).sort((a, b) => b.score - a.score);
}

// recursive function to find the highest ID
export function getHighestID(comments: IComment[]): number {
  let highestID = 0;

  for (const comment of comments) {
    if (comment.id > highestID) {
      highestID = comment.id;
    }

    if (comment.replies.length > 0) {
      const replyID = getHighestID(comment.replies);
      if (replyID > highestID) {
        highestID = replyID;
      }
    }
  }
  return highestID;
}

// recursive function
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

// recursive function
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

// recursive function
export function deleteCommentByID(
  comments: IComment[],
  commentID: number
): IComment[] {
  let index = 0;
  for (const comment of comments) {
    if (comment.id === commentID) {
      comments.splice(index, 1);
      return comments;
    }

    if (comment.replies.length > 0) {
      comment.replies = deleteCommentByID(comment.replies, commentID);
    }
    index++;
  }
  return comments;
}

// recursive function
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

// recursive function
export function updateCommentScoreByID(
  comments: IComment[],
  commentID: number,
  vote: number
): IComment[] | null {
  for (const comment of comments) {
    if (comment.id === commentID) {
      comment.score = comment.score + vote;
      return comments;
    }
    if (comment.replies.length > 0) {
      const updatedComments = updateCommentScoreByID(
        comment.replies,
        commentID,
        vote
      );
      if (updatedComments) {
        return updatedComments;
      }
    }
  }
  return null;
}
