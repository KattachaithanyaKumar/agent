import { Button, Card, Skeleton } from "antd";
import { DeleteOutlined, RobotOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import CreateAgentModal, {
  type CreateAgentFormValues,
} from "../components/CreateAgentModal";
import { useNavigate } from "react-router-dom";

export interface Agent {
  id: string;
  title: string;
  description: string;
}

interface ConfigListResponse {
  configs: Agent[];
}

const fetchAgents = async (): Promise<Agent[]> => {
  const res = await fetch("http://localhost:3000/api/config");
  if (!res.ok) {
    throw new Error(`Failed to fetch agents: ${res.status}`);
  }

  const data: ConfigListResponse = await res.json();
  return data.configs;
};

const Home = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = async (data: CreateAgentFormValues) => {
    try {
      const res = await fetch("http://localhost:3000/api/config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          config: {
            title: data.name,
            description: data.instructions,
            tools: data.tools,
          },
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed to create agent: ${res.status}`);
      }

      setAgents(await fetchAgents());
      setShowModal(false);
    } catch (err) {
      console.error("Failed to create agent", err);
    }
  };

  const handleDeleteConfig = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/config/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error(`Failed to delete agent: ${res.status}`);
      }

      setAgents(await fetchAgents());
    } catch (err) {
      console.error("Failed to delete agent", err);
    }
  };

  const handleLoadAgent = (id: string) => {
    navigate(`/${id}`);
  };

  useEffect(() => {
    let active = true;

    const loadAgents = async () => {
      try {
        const data = await fetchAgents();
        if (active) setAgents(data);
      } catch (err) {
        console.error("Failed to fetch agents", err);
      } finally {
        if (active) setIsLoading(false);
      }
    };

    void loadAgents();

    return () => {
      active = false;
    };
  }, []);

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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="agent-card rounded-xl border-gray-200 shadow-sm">
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

          {isLoading ? (
            Array.from({ length: 3 }, (_, index) => (
              <Card
                key={`agent-skeleton-${index}`}
                className="agent-card rounded-xl border-gray-200 shadow-sm"
              >
                <Skeleton active title paragraph={{ rows: 3 }} />
                <Skeleton.Button active className="mt-6" />
              </Card>
            ))
          ) : (
            <>
              {agents.map((agent) => (
                <Card
                  key={agent.id}
                  className="agent-card rounded-xl border-gray-200 shadow-sm"
                >
                  <div className="flex min-h-64 flex-col items-start">
                    <div
                      aria-hidden="true"
                      className="mb-5 flex size-12 items-center justify-center rounded-lg bg-gray-100 text-2xl text-gray-700"
                    >
                      <RobotOutlined />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {agent.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-6 text-gray-600">
                      {agent.description}
                    </p>
                    <div className="mt-6 flex w-full items-center justify-between">
                      <Button
                        type="primary"
                        onClick={() => handleLoadAgent(agent.id)}
                      >
                        Load Agent
                      </Button>
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        aria-label={`Delete ${agent.title}`}
                        title="Delete agent"
                        onClick={() => handleDeleteConfig(agent.id)}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </>
          )}
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
