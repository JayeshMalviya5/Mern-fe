import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const getStoredUsers = () => {
  try {
    return JSON.parse(localStorage.getItem("users") || "[]");
  } catch {
    return [];
  }
};

const LoginPage = ({ mode = "login" }) => {
  const isSignup = mode === "signup";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const updateField = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const validate = () => {
    const { name, email, password, confirmPassword } = formData;
    if (!email || !password || (isSignup && !name)) {
      return "Please fill all required fields.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Please enter a valid email address.";
    }

    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }

    if (isSignup && password !== confirmPassword) {
      return "Password and confirm password must match.";
    }

    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const users = getStoredUsers();
      const { name, email, password } = formData;
      const existingUser = users.find((u) => u.email === email);

      if (isSignup) {
        if (existingUser) {
          setError("User already exists. Please login instead.");
          setLoading(false);
          return;
        }

        users.push({ name, email, password });
        localStorage.setItem("users", JSON.stringify(users));
      } else if (!existingUser || existingUser.password !== password) {
        setError("Invalid email or password.");
        setLoading(false);
        return;
      }

      const currentUser = isSignup ? { name, email } : { name: existingUser.name, email };
      localStorage.setItem("token", `auth-${Date.now()}`);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      setLoading(false);
      navigate("/");
    }, 400);
  };

  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2 text-center">
          {isSignup ? "Create account" : "Welcome back"}
        </h2>
        <p className="text-center text-gray-600 mb-6">
          {isSignup ? "Sign up to start renting vehicles." : "Login to continue to your dashboard."}
        </p>

        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={updateField("name")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-600"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={updateField("email")}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-600"
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={updateField("password")}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-600"
          />
          {isSignup && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={updateField("confirmPassword")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-600"
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Please wait..." : isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="text-sm text-center mt-5 text-gray-600">
          {isSignup ? "Already have an account?" : "New user?"}{" "}
          <Link to={isSignup ? "/login" : "/signup"} className="text-blue-600 font-semibold">
            {isSignup ? "Login" : "Create one"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
