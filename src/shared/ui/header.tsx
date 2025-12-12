
import { LogOut } from 'lucide-react';
import { Button } from './button';

interface HeaderProps{
    onClick: () => void;
}

export default function Header({onClick}: HeaderProps) {
  return (
    <div className='w-[95vw] flex px-[5em] items-center h-[5em] justify-between'>
        <h1>Admin Panel</h1>
        <Button onClick={onClick}><LogOut/></Button>
    </div>
  )
}
