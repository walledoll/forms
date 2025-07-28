import { TableCell, TableRow } from '@/shared/ui/table'
import { User } from '../model/users'
import { useNavigate } from 'react-router-dom';

type UserProps = {
    user: User;
} 

export default function UserItem({user}: UserProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/users/${user.id}`);
  }

  return (
    <TableRow onClick={handleClick}>
        <TableCell>{user.fullName}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.telephone}</TableCell>
        <TableCell>{user.birthDate}</TableCell>
        <TableCell>{user.userAgreement}</TableCell>
    </TableRow>
  )
}
