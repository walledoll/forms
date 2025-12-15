import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import NewUser from "@/pages/NewUser";
import Main from "@/pages/Main";
import EditUser from "@/pages/EditUser";


function App() {
  
const client = new  QueryClient();
  return (
    <>
    <QueryClientProvider client={client}>
      
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/' element={<Main/>}/>
          <Route path='/users/new' element={<NewUser/>} />
          <Route path='/users/:id' element={<EditUser/>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
    </>
  )
}

export default App
