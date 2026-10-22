import { ConfigProvider } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

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
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
