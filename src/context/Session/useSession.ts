import { create } from 'zustand';

export interface SessionInterface {
  user: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  },
  expires: string | null | undefined;
}

type Session = {
  session: SessionInterface
}

type Actions = { 
    setSession: (session: SessionInterface) => void
  }


export const useSession = create<Session & Actions>((set) => ({
  session: {} as SessionInterface,
  setSession: (session: SessionInterface) => set({session: session}),
}))