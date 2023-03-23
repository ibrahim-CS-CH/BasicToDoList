import './App.css'
import Users from './Pages/Users'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Todo from './Pages/Todo'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Users />}/>
        <Route path='/dashboard' element={<Todo />}/>
        <Route path='*' element={<>Page Not Found</>}/>
      </Routes>
    </BrowserRouter>

  )
}

export default App
