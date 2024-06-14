export interface SessionInterface {
  user: {
    name: string;
    email: string;
    image: string;
    id: string;
  },
  expires: string;
}