import { useGoogleLogin } from "@react-oauth/google";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { googleAuth } from "./api";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("User_info_");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const validemail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return regex.test(email);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validemail(email)) {
      setError("Please enter a valid Gmail address.");
      return;
    }

    const userObj = {
      name: name,
      email: email,
      image: "",
      token: "manual-login-totken",
    };

    localStorage.setItem("User_info_", JSON.stringify(userObj));
    setUser(userObj);
    navigate("/");
    console.log("User info saved:", userObj);
  };
  const response = async (authResult) => {
    try {
      if (authResult["code"]) {
        const result = await googleAuth(authResult["code"]);
        const { email, name, image } = result.data.user;
        const token = result.data.token;
        const obj = { email, name, image, token };
        localStorage.setItem("User_info_", JSON.stringify(obj));
        console.log("result.data.user---", result.data.user);
        console.log(token);
        setUser(obj);
        navigate("/");
      }
      console.log(authResult);
    } catch (error) {
      console.error("Error while requesting google code:", error);
    }
  };
  const GoogleLogin = useGoogleLogin({
    onSuccess: response,
    onError: response,
    flow: "auto-code",
  });

  if (user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
          <h2 className="text-2xl font-semibold mb-4">Welcome, {user.name}!</h2>
          <p className="text-gray-600 mb-2">Email: {user.email}</p>
          {user.image && (
            <img
              src={user.image}
              alt="Profile"
              className="w-20 h-20 rounded-full mx-auto mt-4"
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <p className="text-gray-600 mb-6">Sign in using Google or manually</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        <p className="m-3">or</p>
        <div className=" w-50 my-4 ml-15 text-gray-500 border-1 border-black p-1 rounded-sm">
          <button onClick={GoogleLogin}>Login with Google</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
