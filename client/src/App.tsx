import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import AppLayout from './layouts/AppLayout'

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<AppLayout />} >
          {/* ?? */}
        </Route>
      </Routes>
    </>
  )
}

export default App
