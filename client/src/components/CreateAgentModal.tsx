import { Form, Input, Modal, Select } from "antd";

export interface CreateAgentFormValues {
  name: string;
  instructions: string;
  tools: string[];
}

interface CreateAgentModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateAgentFormValues) => void;
}

const CreateAgentModal = ({
  open,
  onClose,
  onSubmit,
}: CreateAgentModalProps) => {
  const [form] = Form.useForm<CreateAgentFormValues>();

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      title="Create Agent"
    >
      <Form form={form} layout="vertical" className="mt-6" onFinish={onSubmit}>
        <Form.Item
          name="name"
          label="Agent name"
          rules={[{ required: true, message: "Please enter an agent name" }]}
        >
          <Input size="large" placeholder="e.g. Support assistant" />
        </Form.Item>
        <Form.Item
          name="instructions"
          label="Instructions"
          rules={[
            { required: true, message: "Please enter agent instructions" },
          ]}
        >
          <Input.TextArea
            size="large"
            placeholder="Describe what this agent should do"
            rows={4}
          />
        </Form.Item>
        <Form.Item name="tools" label="Tools">
          <Select
            mode="multiple"
            size="large"
            placeholder="Select tools for this agent"
            classNames={{ popup: { root: "agent-tools-dropdown" } }}
            options={[
              { label: "Web search", value: "web_search" },
              { label: "File access", value: "file_access" },
              { label: "Code execution", value: "code_execution" },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateAgentModal;
