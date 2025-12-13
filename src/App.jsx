import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Dashboard from "./Components/Dashboard";


import Referral from "./Components/Referral";   
import Verified from "./Components/Verified";   
import Tree from "./Components/Tree";          
import Product from "./Components/Products";     

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/home" element={<Dashboard />}>
        
          <Route index element={<Referral />} />
          <Route path="referral" element={<Referral />} />
          <Route path="verified" element={<Verified />} />
          <Route path="tree" element={<Tree />} />
          <Route path="product" element={<Product />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
