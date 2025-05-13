// src/App.jsx
import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router/AppRoutes";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
