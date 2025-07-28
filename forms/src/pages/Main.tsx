import { getUsers, useAuthMe, useLogout } from '@/app/hooks/useUsers';
import { Button } from '@/shared/ui/button';
import UserTable from '@/widgets/UserTable'
import { useNavigate } from 'react-router-dom';

export default function Main() {
  const {error:authError} = useAuthMe();
  const navigate = useNavigate();
  if(authError){
    navigate('/login');
  }

  const {isSuccess} = useLogout({
    
  });

  const handleClick = () => {
    if(isSuccess){
        navigate('/login');
    }
  }

  const {data, error: getError, isLoading} = getUsers();
  if(getError){
    throw new Error('Could not get users');
  }
  if (isLoading) {
    return <div>Loading users...</div>; // Show loading state
  }
  return (
    <div>
        <UserTable users={data}/>
        <Button onClick={handleClick}>Log out</Button>
    </div>
  )
}
