import React, { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // ✅ Toast import

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Logged in successfully!");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success("Account created and logged in!");
      }
      navigate("/analytics");
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
        {isLogin ? "Login" : "Sign Up"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>

      <button
        className="text-sm mt-3 text-blue-600 underline"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "Create an account" : "Already have an account?"}
      </button>

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
    </div>
  );
}
