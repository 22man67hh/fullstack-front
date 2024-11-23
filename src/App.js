import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Navbar from './Component/Navbar';
import Home from './Component/Home';
import {BrowserRouter as Router,Routes,Route}from "react-router-dom";
import Adduser from './User/Adduser';
import Edituser from './User/Edituser';
import Viewuser from './User/Viewuser';
function App() {
  return (
    <div>
<Router>
<Navbar/>
<Routes>
<Route exact path="/" element ={<Home/>}/>
<Route exact path="/adduser" element ={<Adduser/>}/>
<Route exact path="/edituser/:id" element ={<Edituser/>}/>
<Route exact path="/viewuser/:id" element ={<Viewuser/>}/>
</Routes>
</Router>
    </div>
  );
}

export default App;
