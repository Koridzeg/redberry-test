import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./style/theme";
import { FirstStep, SecondStep } from "./page/CreateLaptop/CreateLaptop";
const Landing = lazy(() => import("./page/Landing"));
const CreateLaptop = lazy(() => import("./page/CreateLaptop"));
const ViewLaptopDetails = lazy(() => import("./page/ViewLaptopDetails"));
const ViewLaptops = lazy(() => import("./page/ViewLaptops"));
const Success = lazy(() => import("./page/Success"));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<div>...loading</div>}>
        <Router>
          <Routes>
            <Route path="/">
              <Route index element={<Landing />} />
              <Route path="create" element={<CreateLaptop />}>
                <Route path="1" element={<FirstStep />} />
                <Route path="2" element={<SecondStep />} />
                <Route path="success" element={<Success />} />
              </Route>
              <Route path="laptops">
                <Route index element={<ViewLaptopDetails />} />
                <Route path=":laptop_id" element={<ViewLaptops />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;