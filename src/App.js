import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./style/theme";
const Landing = lazy(() => import("./page/Landing"));
const CreateLaptop = lazy(() => import("./page/CreateLaptop"));
const ViewLaptopDetails = lazy(() => import("./page/ViewLaptopDetails"));
const ViewLaptops = lazy(() => import("./page/ViewLaptops"));

function App() {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;
