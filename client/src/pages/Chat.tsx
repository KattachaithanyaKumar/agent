import { SendOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useEffect, useRef, useState } from "react";
import type { Agent } from "./Home";
import { useParams } from "react-router-dom";

interface ChatMessage {
  id: number;
  content: string;
}

const Chat = () => {
  const [config, setConfig] = useState<Agent | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);

  useEffect(() => {
    if (!id) return;

    let ignore = false;
    fetch(`http://localhost:3000/api/config/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to get agent: ${res.status}`);
        }

        return res.json() as Promise<{ config: Agent }>;
      })
      .then((data) => {
        if (!ignore) setConfig(data.config);
      })
      .catch((err) => console.error(err));

    return () => {
      ignore = true;
    };
  }, [id]);

  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const content = draft.trim();
    if (!content) return;

    setMessages((currentMessages) => [
      ...currentMessages,
      { id: Date.now(), content },
    ]);
    setDraft("");
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="fixed left-0 top-0 z-10 flex w-full items-center border-b border-gray-200 bg-white px-6 py-5 sm:px-10">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-gray-900">
            {config?.title ?? "Agent chat"}
          </h1>
          {config?.description && (
            <p className="mt-1 text-sm text-gray-600">{config.description}</p>
          )}
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-6 pt-28">
        <section
          aria-label="Messages"
          aria-live="polite"
          className="flex flex-1 flex-col gap-4 overflow-y-auto py-8"
        >
          {messages.length === 0 ? (
            <p className="m-auto text-center text-sm text-gray-500">
              Send a message to start the conversation.
            </p>
          ) : (
            messages.map((message) => (
              <div key={message.id} className="flex justify-end">
                <p className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-sm bg-gray-900 px-4 py-3 text-sm leading-6 text-white sm:max-w-[70%]">
                  {message.content}
                </p>
              </div>
            ))
          )}
          <div
            ref={lastMessageRef}
            aria-hidden="true"
            className="h-30 shrink-0"
          />
        </section>

        <form
          onSubmit={handleSendMessage}
          className="sticky bottom-0 border-t border-gray-200 bg-gray-50 py-4"
        >
          <label htmlFor="chat-message" className="sr-only">
            Message
          </label>
          <div className="flex items-end gap-3 rounded-xl border border-gray-300 bg-white p-2 shadow-sm focus-within:border-gray-500">
            <Input.TextArea
              id="chat-message"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onPressEnter={(event) => {
                if (!event.shiftKey) {
                  event.preventDefault();
                  event.currentTarget.form?.requestSubmit();
                }
              }}
              placeholder="Write a message..."
              autoSize={{ minRows: 1, maxRows: 5 }}
              variant="borderless"
              className="focus:shadow-none border-none outline-none"
            />
            <Button
              type="primary"
              htmlType="submit"
              icon={<SendOutlined />}
              aria-label="Send message"
              disabled={!draft.trim()}
            />
          </div>
          <p className="mt-2 text-center text-xs text-gray-500">
            Enter to send · Shift+Enter for a new line
          </p>
        </form>
      </main>
    </div>
  );
};

export default Chat;
