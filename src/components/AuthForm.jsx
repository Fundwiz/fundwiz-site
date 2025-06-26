import React, { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isReset, setIsReset] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isReset) {
        // Password reset flow
        await sendPasswordResetEmail(auth, email);
        toast.success("Password reset link sent! Check your inbox.");
      } else if (isLogin) {
        // Login flow
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Logged in successfully!");
        navigate("/analytics");
      } else {
        // Sign up flow
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success("Account created and logged in!");
        navigate("/analytics");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success("Logged in with Google!");
      navigate("/analytics");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h2 className="text-xl font-semibold mb-4 text-center">
        {isReset ? "Reset Password" : isLogin ? "Login" : "Sign Up"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {!isReset && (
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={isLogin || !isLogin}
          />
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {isReset ? "Send Reset Link" : isLogin ? "Login" : "Sign Up"}
        </button>
      </form>

      <div className="mt-4 text-center space-y-2">
        {!isReset && (
          <p className="text-sm">
            {isLogin ? (
              <button
                className="text-blue-600 hover:underline"
                onClick={() => {
                  setIsLogin(false);
                  setIsReset(false);
                }}
              >
                Create an account
              </button>
            ) : (
              <button
                className="text-blue-600 hover:underline"
                onClick={() => {
                  setIsLogin(true);
                  setIsReset(false);
                }}
              >
                Already have an account?
              </button>
            )}
          </p>
        )}
        {!isReset && (
          <button
            className="text-sm text-blue-600 hover:underline"
            onClick={() => {
              setIsReset(true);
              setIsLogin(true);
            }}
          >
            Forgot Password?
          </button>
        )}
        {isReset && (
          <button
            className="text-sm text-blue-600 hover:underline"
            onClick={() => {
              setIsReset(false);
              setIsLogin(true);
            }}
          >
            Back to Login
          </button>
        )}
      </div>

      {!isReset && (
        <div className="mt-6 text-center">
          <p className="text-sm mb-2 text-gray-500">or</p>
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-white border py-2 rounded text-gray-700 hover:bg-gray-100 flex items-center justify-center transition"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Continue with Google
          </button>
        </div>
      )}
    </div>
  );
}
