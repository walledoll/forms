import { useUpdateUser } from "@/app/hooks/useUsers";
import { UserSchema } from "@/app/schema/validation";
import { User } from "@/entities/model/users";
import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

type UserSchema = z.infer<typeof UserSchema>;

export default function UserEdit(user: User) {
  const update = useUpdateUser();

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>('10:30:00');

  const {register, handleSubmit, formState} = useForm<UserSchema>(
    {
      resolver: zodResolver(UserSchema), 
      mode: 'onChange',
      defaultValues: {
        name: user.name,
        surName: user.surName,
        email: user.email,
        telephone: user.telephone,
        password: user.password,
        birthDate: user.birthDate
      }
    }
  )

  const combineDateTime = (selectedDate: Date | undefined, selectedTime: string): string | null => {
    if (!selectedDate) return null;
    const [hours, minutes, seconds] = selectedTime.split(':').map(Number);
    const combinedDate = new Date(selectedDate);
    combinedDate.setHours(hours, minutes, seconds, 0);
    return combinedDate.toISOString();  
  };

  const onEditSubmit: SubmitHandler<UserSchema> = async (data) => {
    try{
      const birthDate = combineDateTime(date, time);
      if(!birthDate){
        throw new Error('Wrong date format');
      }
      update.mutate({...data, birthDate});
    }
    catch(error){
      console.log(error);
    }
  }


  return (
    <Card>
       <CardHeader className="text-center">Edit User</CardHeader>
              <CardContent>
                <form className="grid grid-cols-1 gap-3"  onSubmit={handleSubmit(onEditSubmit)}>
                  <div>
                    <Label>Name<span className="text-red-500">*</span></Label>
                    <Input placeholder="Michael" {...register('name')}/>
                    {formState.errors.name &&
                      <div className="text-red-500 text-sm">{formState.errors.name.message}</div>
                    }
                  </div>
                  <div>
                    <Label>Surname<span className="text-red-500">*</span></Label>
                    <Input placeholder="Jackson" {...register('surName')}/>
                     {formState.errors.surName &&
                      <div className="text-red-500 text-sm">{formState.errors.surName.message}</div>
                    }
                  </div>
                  <div>
                    <Label>Email<span className="text-red-500">*</span></Label>
                    <Input placeholder="example@gmail.com" disabled {...register('email')}/>
                     {formState.errors.email &&
                      <div className="text-red-500 text-sm">{formState.errors.email.message}</div>
                    }
                  </div>
                  <div>
                    <div className="flex gap-4">
                      <div className="flex flex-col gap-3">
                        <Label htmlFor="date-picker" className="px-1">
                          Birth Date
                        </Label>
                        <Popover open={open} onOpenChange={setOpen} {...register('birthDate')}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              id="date-picker"
                              className="w-32 justify-between font-normal"
                            >
                              {date ? date.toLocaleDateString() : "Select date"}
                              <ChevronDownIcon />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={date}
                              captionLayout="dropdown"
                              onSelect={(date) => {
                                setDate(date)
                                setOpen(false)
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="flex flex-col gap-3">
                        <Label htmlFor="time-picker" className="px-1">
                          Time
                        </Label>
                        <Input
                          type="time"
                          id="time-picker"
                          step="1"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                        />
                      </div>
                    </div>
                    {formState.errors.birthDate &&
                      <div className="text-red-500 text-sm">{formState.errors.birthDate.message}</div>
                    }
                  </div>
                  <div>
                    <Label>Phone Number<span className="text-red-500">*</span></Label>
                    <Input {...register('telephone')}/>
                      {formState.errors.telephone &&
                        <div className="text-red-500 text-sm">{formState.errors.telephone.message}</div>
                      }
                  </div>
                  <div>
                    <Label >Password<span className="text-red-500">*</span></Label>
                    <Input type="password" disabled/>
                  </div>
                  <Button type="submit">Edit</Button>
                </form>
              </CardContent>
    </Card>
  )
}
