import { Button, Card } from "antd";
import { useState } from "react";
import CreateAgentModal, {
  type CreateAgentFormValues,
} from "../components/CreateAgentModal";

const Home = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleSubmit = (data: CreateAgentFormValues) => {
    console.log(data);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex w-full items-center border-b border-gray-200 bg-white px-6 py-5 sm:px-10">
        <h1 className="text-xl font-semibold tracking-tight text-gray-900">
          AI Agents
        </h1>
      </header>

      <main className="mx-auto w-full max-w-7xl px-6 py-10 sm:px-10 sm:py-14">
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-gray-500">
            Agent workspace
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
            Build an agent for your workflow
          </h2>
          <p className="mt-2 max-w-2xl text-gray-600">
            Create focused AI assistants that can take on specific tasks and
            help your team get work done.
          </p>
        </div>

        <div className="grid grid-cols-6 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="h-full rounded-xl border-gray-200 shadow-sm">
            <div className="flex h-full flex-col items-start">
              <div className="mb-5 flex size-12 items-center justify-center rounded-lg bg-gray-100 text-2xl font-light text-gray-700">
                +
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Create a new agent
              </h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-gray-600">
                Give your agent a name, define what it should do, and tailor its
                instructions to the way you work. You can refine it as your
                needs change.
              </p>
              <Button
                type="primary"
                className="mt-6"
                onClick={() => setShowModal(true)}
              >
                Create agent
              </Button>
            </div>
          </Card>
        </div>
      </main>

      {showModal && (
        <CreateAgentModal
          open={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default Home;
