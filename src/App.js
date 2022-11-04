import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
}
 from "react-router-dom";
//import Viewworkouts from "./Components/Viewworkouts";
import Addworkouts from "./Components/Addworkouts";
import Viewworkouts from "./Components/Viewworkouts";
import Header from "./Components/Header";
import GraphView from "./Components/GraphView";
// import StartTime from "./components/StartTime";
export default function App() {
  return (
    <BrowserRouter>
    <Header/>
  <Routes>
    <Route path="/" element={<Viewworkouts />} />
    <Route path="add" element={<Addworkouts />} />
    <Route path="graph" element={<GraphView />} />
    {/* <Route path="update/:id" element={<StartTime />} /> */}
  </Routes>
    </BrowserRouter>
  );
}