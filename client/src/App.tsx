import { ConfigProvider } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#000",
        },
        components: {
          Select: {
            optionActiveBg: "#f3f4f6",
            optionSelectedBg: "#e5e7eb",
            optionSelectedColor: "#111827",
          },
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
