import { useDeleteUser, useUpdateUser } from "@/app/hooks/useUsers";
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
import { useNavigate, useParams } from "react-router-dom";
import z from "zod";

export const EditUserSchema = z.object({
  name: z.string(),
  surName: z.string(),
  telephone: z.string(),
  email: z.string().email(),
});


type UserSchema = z.infer<typeof EditUserSchema>;

interface UserEditProps{
  user: User,
  onDelete: () => void;
  onCancel: () => void;
  onEdit?: (data: UserSchema) => void;
}

export default function UserEdit({user, onDelete, onCancel, onEdit}: UserEditProps) {

  const {mutateAsync: update} = useUpdateUser();
  const {id} = useParams();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>('10:30:00');

  const {register, handleSubmit, formState} = useForm<UserSchema>(
    {
      resolver: zodResolver(EditUserSchema), 
      mode: 'onSubmit',
      defaultValues: {
        name: user.name,
        surName: user.surName,
        email: user.email,
        telephone: user.telephone,
      }
    }
  )
  console.log("Errors:", formState.errors);


  const combineDateTime = (selectedDate: Date | undefined, selectedTime: string): string | null => {
    if (!selectedDate) return null;
    const [hours, minutes, seconds] = selectedTime.split(':').map(Number);
    const combinedDate = new Date(selectedDate);
    combinedDate.setHours(hours, minutes, seconds, 0);
    return combinedDate.toISOString();  
  };

const onEditSubmit: SubmitHandler<UserSchema> = async (data) => {
  console.log('Form data:', data); // 👈 ЛОГИРУЕМ ДАННЫЕ ИЗ ФОРМЫ

  if (!user?.id) {
    console.error('User ID is missing');
    return;
  }

  const birthDate = combineDateTime(date, time);
  if (!birthDate) {
    console.error('Invalid birth date');
    return;
  }

  const updatedUser: Partial<User> = {
    name: data.name,
    surName: data.surName,
    fullName: data.surName + ' ' + data.name,
    telephone: data.telephone,
    birthDate: birthDate, // ✅ ISO строка
  };

  console.log('Updating user with:', { id: user.id, user: updatedUser }); // 👈 ЛОГИРУЕМ ПАРАМЕТРЫ ДЛЯ UPDATE

  try {
    await update({ id: user.id, user: updatedUser }, {
      onSuccess: () => {
        navigate('/');
      }
    });
    console.log('✅ Update successful');
  } catch (error) {
    console.error('❌ Update failed:', error); // 👈 ВСЕГДА ЛОГИРУЙТЕ ОШИБКИ!
  }
};


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
                    <Input placeholder="example@gmail.com" disabled />
                     
                  </div>
                  <div>
                    <div className="flex gap-4">
                      <div className="flex flex-col gap-3">
                        <Label htmlFor="date-picker" className="px-1">
                          Birth Date
                        </Label>
                        <Popover open={open} onOpenChange={setOpen}>
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
                  <div className="flex justify-around">
                    <Button type="button" onClick={onCancel} variant='outline'>Cancel</Button>
                    {user.id  === "1" ? 
                      <></>:
                      <Button type="button" onClick={onDelete} variant='destructive'>Delete</Button>}
                    <Button  type="submit">Edit</Button>
                  </div>

                </form>
              </CardContent>
    </Card>
  )
}
