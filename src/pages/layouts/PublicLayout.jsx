import { useUser } from "../../hooks/useUser";
import { Outlet } from "react-router-dom";
import NavbarPublic from "../../components/UI/Navbar";
import NavbarLogin from "../../components/UI/NavbarLogin";

const PublicLayout = () => {
  const { user } = useUser();

  return (
    <div className="flex flex-col h-screen">
      {user ? <NavbarLogin /> : <NavbarPublic />}
      <main className="pt-19 h-full overflow-y-auto">
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default PublicLayout;
