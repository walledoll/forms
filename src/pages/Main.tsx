import { getUsers, useAuthMe, useLogout } from '@/app/hooks/useUsers';
import Header from '@/shared/ui/header';
import Navbar from '@/shared/ui/navbar';
import UserTable from '@/widgets/UserTable'
import { useNavigate } from 'react-router-dom';


export default function Main() {
  const {error:authError} = useAuthMe();
  const navigate = useNavigate();
  if(authError){
    navigate('/login');
    return null;
  }

  const {mutate: logout} = useLogout();

  const handleClick = () => {
    logout();
  }

  const handleCreateClick = () => {
    navigate('/users/new');
  }

  const {data, error: getError, isPending} = getUsers();
  if(getError){
    throw new Error('Could not get users');
  }
  if (isPending) {
    return <div>Checking some issues...</div>; // Show loading state
  }
  return (
    <div className='flex'>
        <Navbar onClick={handleCreateClick}></Navbar>
        <div>
          <Header  onClick={handleClick}/>
          <UserTable users={data}/>
        </div>

    </div>
  )
}
