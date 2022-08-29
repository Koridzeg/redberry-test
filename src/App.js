import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const Landing = lazy(() => import("./page/Landing"));
const CreateLaptop = lazy(() => import("./page/CreateLaptop"));
const ViewLaptopDetails = lazy(() => import("./page/ViewLaptopDetails"));
const ViewLaptops = lazy(() => import("./page/ViewLaptops"));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<Landing />} />
          <Route path="create" element={<CreateLaptop />} />
          <Route path="laptops">
            <Route index element={<ViewLaptopDetails />} />
            <Route path=":laptop_id" element={<ViewLaptops />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;