import { lazy, Suspense, useEffect, useState } from "react";
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
  const [,setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  },[]);

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
                <Route index element={<ViewLaptops />} />
                <Route path=":laptop_id" element={<ViewLaptopDetails />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
