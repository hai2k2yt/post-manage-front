export type SignUpFormState = {
  data: {
    name?: string
    email?: string
    password?: string
  }
  errors: {
    name?: string[]
    email?: string[]
    password?: string[]
  }
  message?: string
} | undefined

export type CreateCommentFormState =
  | {
  data?: {
    content?: string;
    postId?: number;
  };
  errors?: {
    content?: string[];
  };
  message?: string;
  ok?: boolean;
  open?: boolean;
}
  | undefined;

export type PostFormState = {
  data?: {
    title?: string
    content?: string
    thumbnail?: File | null
    tag?: string
    published?: string
  }
  errors?: {
    title?: string
    content?: string
    thumbnail?: string
    tags?: string
    isPublished?: string
  }
  message?: string
  ok?: boolean
} | undefined