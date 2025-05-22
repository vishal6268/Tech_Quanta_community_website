import router from "./router/AppRoutes";
import {RouterProvider} from "react-router-dom";


function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
