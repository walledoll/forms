import { useLogin } from "@/app/hooks/useUsers";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@radix-ui/react-label";
import React, { useState } from 'react';

export type LoginProps = "createUser" | "Login"

export default function Login({state}: {state:LoginProps}){
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const login = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login.mutate({email, password});
  } 

  const renderFields = (state: LoginProps) => {
    switch(state){
      case "Login":
        return( 
          <React.Fragment>
            <CardHeader className="text-center">Welcome Back!</CardHeader>
            <CardContent >
              <form className="grid grid-cols-1 gap-3" onSubmit={handleSubmit}>
                <div>
                  <Label>Email</Label>
                  <Input onChange={e => setEmail(e.target.value)} type="email"></Input>
                </div>
                <div>
                  <Label>Password</Label>
                  <Input onChange={e => setPass(e.target.value)} type="password"></Input>
                </div>
                <Button type="submit">Login</Button>
              </form>
            
            </CardContent>
          </React.Fragment>
          )    
      case "createUser": 
        return(
          <React.Fragment>
            <CardHeader>Login</CardHeader>
            <CardContent>
              
            </CardContent>
          </React.Fragment>

      )
    } 
  }


  return(
    <Card>
      {renderFields(state)}
    </Card>
  )
}
