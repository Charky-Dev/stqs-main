import {type Dispatch, type SetStateAction, createContext } from "react"

// Context to hold the agent token
export const AgentTokenContext = createContext("none");

// Context to hold the page view token
export const PageViewContext = createContext<[string, Dispatch<SetStateAction<string>>]>(["none", () => "aa"]);
