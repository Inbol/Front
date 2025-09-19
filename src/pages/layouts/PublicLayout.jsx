import { useUser } from "../../hooks/useUser";
import { Outlet } from "react-router-dom";
import NavbarPublic from "../../components/UI/Navbar";
import NavbarLogin from "../../components/UI/NavbarLogin";

const PublicLayout = () => {
  const { user } = useUser();

  return (
    <div>
      {user ? <NavbarLogin /> : <NavbarPublic />}
      <Outlet></Outlet>
    </div>
  );
};

export default PublicLayout;
