export type GetPostsRequest = {
  id: string;
  content: string;
  government: {
    id: string;
    country: string;
    icon: string;
  };
}[];
