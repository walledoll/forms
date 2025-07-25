import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";


function App() {
  
const client = new  QueryClient();
  return (
    <>
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/' element={<div/>}/>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
    </>
  )
}

export default App
