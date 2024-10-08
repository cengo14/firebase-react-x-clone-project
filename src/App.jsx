import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import FeedPage from "./pages/feed";
import Protected from "./components/protected";

const App = () => {
  return (
    <div className="bg-black text-white h-screen">
      <BrowserRouter>
        <Routes>
          <Route element={<Protected />}>
            <Route path="/" element={<LoginPage />} />
            <Route path="/feed" element={<FeedPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
