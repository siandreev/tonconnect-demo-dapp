import {createContext} from "react";

export const BackendTokenContext = createContext<{
    token: string | undefined;
    setToken: ((token: string | undefined) => void) | undefined
}>({
    token: undefined,
    setToken: undefined
})
