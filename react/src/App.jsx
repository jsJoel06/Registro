import { Route, Routes } from "react-router"
import Index from "./pages/Index"
import Form from "./pages/Form"
import FormEdit from "./pages/FormEdit"

function App() {


  return (
    <>
    <Routes>
      <Route path="/" element={<Index/>}/>
      <Route path="/agregar" element={<Form/>}/>
      <Route path="/editar/:nombre" element={<FormEdit/>}/>
    </Routes>
    
    </>
  )
}

export default App
