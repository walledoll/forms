import { TableCell, TableRow } from '@/shared/ui/table'
import { User } from '../model/users'
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { X } from 'lucide-react';

type UserProps = {
    user: User;
} 

const formatDate = (dateString: string | Date | null | undefined): string => {
  // Если значение отсутствует — возвращаем заглушку
  if (!dateString) {
    return '—'; // или '' / 'Not set'
  }

  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;

  // Проверяем, что дата валидна
  if (isNaN(date.getTime())) {
    console.warn('Invalid date:', dateString);
    return 'Invalid Date';
  }

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default function UserItem({user}: UserProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/users/${user.id}`);
  }

  return (
    <TableRow onClick={handleClick}>
        <TableCell>{user.fullName}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.telephone ? user.telephone : '—'}</TableCell>
        <TableCell>{formatDate(user.birthDate)}</TableCell>
        <TableCell>{user.employment ? <Check/> : <X/>}</TableCell>
        <TableCell>{user.userAgreement ? <Check/> : <X/>}</TableCell>
    </TableRow>
  )
}
