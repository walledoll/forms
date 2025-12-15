import { useAuthMe, useLogout, useGetUsers } from "@/app/hooks/useUsers";
import Navbar from "@/shared/ui/navbar";
import Header from "@/widgets/Header";
import UserTable from "@/widgets/UserTable";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const { error: authError } = useAuthMe();
  const { mutate: logout } = useLogout();
  const { data, error: getError, isPending } = useGetUsers();

  const navigate = useNavigate();

  if (authError) {
    navigate('/login');
    return null;
  }

  if (getError) {
    throw new Error('Could not get users');
  }

  if (isPending) {
    return <div>Checking some issues...</div>;
  }

  const handleClick = () => {
    logout();
  };

  const handleCreateClick = () => {
    navigate('/users/new');
  };

  return (
    <>
      <div className="flex">
        <Navbar onClick={handleCreateClick} />
        <div>
          <Header onClick={handleClick} />
          <UserTable users={data} />
        </div>
      </div>
    </>
  );
}