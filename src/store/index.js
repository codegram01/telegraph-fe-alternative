import { initAuth } from "./auth"

export const initStore = async () => {
    await initAuth();
}