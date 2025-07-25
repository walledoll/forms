import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import React from 'react';

export const enum LoginProps{
  createUser,
  Login
}

export default function Login(state: LoginProps){
  switch(state){
    case LoginProps.createUser:
      return( 
        <React.Fragment>
          <CardHeader>Create User</CardHeader>
          <CardContent>
            
          </CardContent>
        </React.Fragment>
        )    
    case LoginProps.Login: 
      return(
        <React.Fragment>
          <CardHeader>Login</CardHeader>
          <CardContent>
            
          </CardContent>
        </React.Fragment>

    )
  } 



  return(
    <Card>
    </Card>
  )
}
