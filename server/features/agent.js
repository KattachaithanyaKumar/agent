import { ChatOllama } from "@langchain/ollama";
import { createAgent } from "langchain";

const llm = new ChatOllama({
  model: "qwen3:8b",
  temperature: 0,
  numCtx: 8192,
});

export const agent = createAgent({
  model: llm,
});
