import { User } from '@/entities/model/users'
import UserItem from '@/entities/ui/UserItem'
import { Table, TableCell, TableRow } from '@/shared/ui/table'

type UserTableProps = {
    users: User[];
}

export default function UserTable({users}: UserTableProps) {
  return (
    <Table>
        <TableRow>
            <TableCell>Fullname</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Birthdate</TableCell>
            <TableCell>Agreement</TableCell>
        </TableRow>
        {users.map((user) => <UserItem user={user}></UserItem>)}
    </Table>
  )
}
