import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import useAuth from "../hooks/useAuth";
import logoImage from "../assets/vite.svg";
import { Loader2 } from "lucide-react";

const Login = () => {
  const { loading, handleGoogleLoginSuccess } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-white px-4 sm:px-6">
      <div className="bg-blue-100 p-6 sm:p-8 rounded-xl shadow-xl w-full max-w-sm sm:max-w-md flex flex-col items-center space-y-6">
        <h1 className="text-3xl sm:text-xl font-extrabold text-blue-800">
          Welcome to MeetMate
        </h1>
        <img
          src={logoImage}
          alt="Fox and Cat Logo"
          className="w-36 sm:w-48 object-contain hover:scale-105 transition-transform duration-300"
        />
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="animate-spin text-4xl text-blue-500" />
          </div>
        ) : (
          <>
            <p className="text-base sm:text-lg text-blue-900 text-center">
              Sign in with Google
            </p>
            <div className="w-full flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={() => console.log("Login Failed")}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
