import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Home } from "./pages/Home";
import { Session } from "./pages/Session";
import { CreateProd } from "./pages/CreateProd";
import { UpdadeProd } from "./pages/UpdadeProd";
import { Login } from './pages/Login'
import { useEffect, useState } from 'react';
import { verify } from "./data/api";

function Router() {
  const [user, setUser] = useState()

  useEffect(() => {
    (async () => {
      setUser(await verify().then(e => e.data));
    })()
  }, [])
  
  
  if (!user) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login setUser ={setUser}/>} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/session' element={<Session />} />
        <Route path='/create' element={<CreateProd />} />
        <Route path='/update' element={<UpdadeProd />} />
        <Route path="/*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
