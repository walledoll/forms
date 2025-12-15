import { useLogin } from "@/app/hooks/useUsers";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@radix-ui/react-label";
import {SubmitHandler, useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from "react-router-dom";
import { UserLoginSchema } from "@/app/schema/validation";
import z from "zod";

type LoginSchema = z.infer<typeof UserLoginSchema>;


export type LoginProps = "createUser" | "Login"

export default function Login(){
  const login = useLogin();
  const navigate = useNavigate();

  const loginForm = useForm<LoginSchema>({ resolver: zodResolver(UserLoginSchema), mode: 'onSubmit' });

  const onLoginSubmit: SubmitHandler<LoginSchema> = async (data) => {
    try{
      await login.mutateAsync(data);
      navigate('/');
    }
    catch(error) {
      console.log(error);
      loginForm.setError('root', {
        type: 'manual',
        message: 'Invalid email or password'
      });
    }
  }

  return(
    <Card className="flex justify-center">
      <CardHeader className="text-center">Welcome Back!</CardHeader>
      <CardContent>
        <form className="grid grid-cols-1 gap-3" onSubmit= {loginForm.handleSubmit(onLoginSubmit)}>
          <div>
            <Label>Email</Label>
            <Input placeholder="admin@inno.tech.ru"  {...loginForm.register('email')} type="email" />
            {loginForm.formState.errors.email && 
              <div className="text-red-500 text-sm">{loginForm.formState.errors.email.message}</div>
            }
          </div>
          <div>
            <Label>Password</Label>
            <Input placeholder="admin" {...loginForm.register('password')} type="password" />
            {loginForm.formState.errors.password &&
              <div className="text-red-500 text-sm">{loginForm.formState.errors.password.message}</div>
            }
          </div>
          <Button type="submit">Login</Button>
          {loginForm.formState.errors.root &&
            <div className="text-red-500 text-center text-sm">{loginForm.formState.errors.root.message}</div>
          }
        </form>
      </CardContent>
    </Card>
  )
}
