import { AuthService } from "@/api/service/AuthService";
import { UserService } from "@/api/service/UserService";
import NavBar from "@/components/NavBar";
import { ACCESS_TOKEN_NAME } from "@/constant/constants";
import { AuthContext, type AuthState } from "@/context/AuthContext";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useContext<AuthState>(AuthContext);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const authenticate = (result: any) => {
    console.log("accessToken: ", result.accessToken)
    sessionStorage.setItem(ACCESS_TOKEN_NAME, result.accessToken)
    UserService.getUser()
      .then((result: any) => { setUser(result) })
      .then(() => { navigate("/") })
      .catch(() => { setUser(null) })
  }

  // Handles login or registration via email/password
  const handleLocalAuth = async () => {
    setError("");
    if (isRegistering) {
      AuthService.register(name, email, password)
        .then((result: any) => { authenticate(result) })
    }
    else {
      AuthService.login(email, password)
        .then((result: any) => { authenticate(result) })
    }
  };

  // Redirects to the backend Google OAuth endpoint
  const handleGoogleAuth = () => {
    AuthService.google()
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
        <div className="relative bg-white p-6 rounded-md shadow-md w-full max-w-md">
          {/* X Button to return to home */}
          <button
            onClick={() => navigate("/")}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-lg"
          >
            &times;
          </button>
          <h2 className="text-2xl font-bold mb-4 text-center">
            {isRegistering ? "Register" : "Login"}
          </h2>
          {isRegistering && (
            <input
              type="text"
              placeholder="Name"
              className="border-b p-2 w-full mb-4"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="border-b p-2 w-full mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border-b p-2 w-full mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-600 mb-2">{error}</p>}
          <button
            onClick={handleLocalAuth}
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded w-full mb-4"
          >
            {isRegistering ? "Register" : "Login"}
          </button>
          <button
            onClick={handleGoogleAuth}
            className="bg-red-500 hover:bg-red-600 text-white p-3 rounded w-full mb-4"
          >
            Sign in with Google
          </button>
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-blue-500 underline block text-center"
          >
            {isRegistering ? "Switch to Login" : "Switch to Register"}
          </button>
        </div>
      </div>
    </>
  );
};

export default AuthPage;