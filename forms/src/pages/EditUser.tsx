import { getUserById } from '@/app/hooks/useUsers'
import { User } from '@/entities/model/users';
import UserEdit from '@/widgets/UserEdit';
import { useParams } from 'react-router-dom';

export default function EditUser() {
  const {id} = useParams();
  const {data: user, error, isLoading} = getUserById(Number(id));
  if(error){
    throw new Error('Get user error');
  }
  if(isLoading){
    return <div>Loading...</div>
  }
  return (
    <div>
        <UserEdit {...user as User}/>
    </div>
  )
}
