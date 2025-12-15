import { User } from '@/entities/model/users'
import UserItem from '@/entities/ui/UserItem'
import { Table, TableHead, TableHeader, TableRow, TableBody } from '@/shared/ui/table'

type UserTableProps = {
  users: User[];
}

export default function UserTable({ users }: UserTableProps) {
  return (
    <Table className="w-[95vw]">
      
      <TableHeader>
        <TableRow>
          <TableHead>Fullname</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Birthdate</TableHead>
          <TableHead>Employment</TableHead>
          <TableHead>User Agreement</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </TableBody>

    </Table>
  )
}
