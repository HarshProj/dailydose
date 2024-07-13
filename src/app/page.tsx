"use client"
import { Login } from "./Components/Login";
import { Main } from "./Components/Main";
import { 
  BrowserRouter as Router,
  Route, 
  Routes
} from "react-router-dom"
import { Signup } from "./Components/Signup";
import { Createpost } from "./Components/Createpost";
import { Profile } from "./Components/Profile";
export default function Home() {
  return (
    <> 
    <Router>
      <Routes>

      <Route  path="/" element={<Main/>}/>
      <Route  path="/profile/:id" element={<Profile/>}/>
      <Route element={<Login/>} path="/login"/>
      <Route element={<Signup/>} path="/signup"/>
      <Route element={<Createpost/>} path="/createpost"/>
      </Routes>

    </Router>
    </>
  );
}
