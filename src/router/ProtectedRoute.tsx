import type { UserDto } from "@/model/UserDto";
import type { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: FC<{ user: UserDto | null }> = ({ user }) => {
    return user ? <Outlet /> : <Navigate to="/login" replace={true} />;
};

export default ProtectedRoute;