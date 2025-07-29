import { Button } from './button'
import { CirclePlus } from 'lucide-react'

interface NavProps{
    onClick: () => void;
}

export default function Navbar({onClick}: NavProps) {
  return (
    <div className='h-[100vh] w-[5vw]  flex justify-center items-center'>
        <Button onClick={onClick}><CirclePlus/></Button>
    </div>
  )
}
