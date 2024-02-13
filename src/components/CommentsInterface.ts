interface IComment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: IUser;
  replies: IComment[];
  replyingTo?: string;
}

interface IUser {
  image: IImage;
  username: string;
}

interface IImage {
  png: string;
  webp: string;
}

export type { IComment, IUser };

// https://stackoverflow.com/questions/37263357/how-to-declare-and-import-typescript-interfaces-in-a-separate-file/60343829

// https://dev.to/davidarmendariz/typescript-interface-file-name-conventions-3n0c
