import React, { type ReactNode } from "react";
import { useAuth, type User } from "../../contexts/AuthContext";
import GoogleLoginButton from "./GoogleLoginButton";
import Card from "../ui/Card/Card";

interface ProtectedRouteProps {
  children: ReactNode;
  message?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  message = "Please log in to access admin features",
}) => {
  const { isLoggedIn, login } = useAuth();

  const handleLoginSuccess = (user: User, token: string) => {
    login(user, token);
  };

  const handleLoginError = (error: string) => {
    console.error("Login failed:", error);
    alert(error);
  };

  if (!isLoggedIn) {
    return (
      <div className="container">
        <h2>Authentication Required</h2>
        <Card>
          <p>{message}</p>
          <div style={{ marginTop: "16px" }}>
            <GoogleLoginButton
              onSuccess={handleLoginSuccess}
              onError={handleLoginError}
            />
          </div>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
