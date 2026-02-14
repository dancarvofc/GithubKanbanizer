import create from 'zustand'

type State = {
  username: string
  setUsername: (s: string) => void
}

export const useStore = create<State>((set) => ({
  username: '',
  setUsername: (s) => set({ username: s })
}))
