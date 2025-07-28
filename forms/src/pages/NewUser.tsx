import { useAuthMe } from '@/app/hooks/useUsers';
import UserNew from '@/widgets/UserNew'
import { useNavigate } from 'react-router-dom';


export default function NewUser() {
  const {error:authError, isLoading} = useAuthMe();
  const navigate = useNavigate();
  if(isLoading){
    return <div>Checking some issues...</div>
  }
  if(authError){
    navigate('/login');
  }
  return (
    <div className='flex justify-center items-center h-[100vh]'>
      <UserNew/>
    </div>
  )
}
