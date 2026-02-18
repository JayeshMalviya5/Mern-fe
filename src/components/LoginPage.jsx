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
    <section className="min-h-[calc(100vh-72px)] overflow-y-auto bg-slate-950 px-4 py-10 md:py-16">
      <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900/70 backdrop-blur">
        <div className="grid lg:grid-cols-2">
          <aside className="relative p-8 md:p-10 bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 text-white">
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_right,_#ffffff_0%,_transparent_55%)]" />
            <div className="relative z-10">
              <p className="inline-flex text-xs tracking-[0.25em] uppercase bg-white/20 px-3 py-1 rounded-full mb-5">
                Rent Your Ride
              </p>
              <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3">
                {isSignup ? "Start your rental journey today" : "Welcome back to smarter rentals"}
              </h1>
              <p className="text-white/90 mb-7">
                Book bikes, cars and e-rickshaws in minutes with transparent pricing and trusted listings.
              </p>

              <ul className="space-y-3">
                {highlights.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm md:text-base">
                    <span className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="p-8 md:p-10 bg-white">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              {isSignup ? "Create your account" : "Login to your account"}
            </h2>
            <p className="text-slate-500 mb-6">
              {isSignup ? "Join now and rent from premium vehicle partners." : "Continue to manage and book your rides."}
            </p>

            {error && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignup && (
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={updateField("name")}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}

              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={updateField("email")}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={updateField("password")}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {isSignup && (
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={updateField("confirmPassword")}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-slate-900 text-white py-3 font-semibold hover:bg-slate-800 transition disabled:bg-slate-400"
              >
                {loading ? "Please wait..." : isSignup ? "Create Account" : "Login"}
              </button>
            </form>

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
    </section>
  );
};

export default LoginPage;
