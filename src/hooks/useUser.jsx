import { useContext } from "react";
import { UserContext } from "../contexts/ProveedorUsuario";

export const useUser = () => useContext(UserContext);