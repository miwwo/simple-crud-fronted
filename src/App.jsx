import './App.css'
import ListUserComponent from "./components/ListUserComponent.jsx";
import HeaderComponent from "./components/HeaderComponent.jsx";
import FooterComponent from "./components/FooterComponent.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import UserComponent from "./components/UserComponent.jsx";

function App() {

  return (
    <>
        <BrowserRouter>
            <HeaderComponent />
            <Routes>
                <Route path='/' element={<ListUserComponent />}></Route>
                <Route path='/users' element={<ListUserComponent />}></Route>
                <Route path='/add-user' element={<UserComponent />}></Route>
                <Route path='/update-user/:id' element={<UserComponent />}></Route>
                <Route path='/delete-user/:id' element={<UserComponent />}></Route>
            </Routes>
            <FooterComponent />
        </BrowserRouter>
    </>
  )
}

export default App
