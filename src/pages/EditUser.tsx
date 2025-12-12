import { getUserById, useDeleteUser } from '@/app/hooks/useUsers'
import UserEdit from '@/widgets/UserEdit';
import { useNavigate, useParams } from 'react-router-dom';


export default function EditUser() {
  const {id} = useParams();
  const navigate = useNavigate();
  const del = useDeleteUser();
  const {data: user, error, isPending} = getUserById(id as string);
  if(error){
    throw new Error('Get user error');
  }
  if(isPending){
    return <div>Loading...</div>
  }

  const handleDelete = () => {
    del.mutate(id as string);
    navigate('/');
  }

  return (
    <div>
        <UserEdit user={user} onCancel={() => navigate('/')} onDelete={handleDelete}/>
    </div>
  )
}
