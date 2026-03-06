import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  Lock, 
  User, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Loader2, 
  AlertCircle 
} from "lucide-react";
import axiosClient from "../lib/axiosClient";

const highlights = [
  "Instant booking confirmation",
  "Verified vehicle partners",
  "Affordable daily rentals",
];

const LoginPage = ({ mode = "login" }) => {
  const isSignup = mode === "signup";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "USER",
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
    // Clear error when user starts typing
    if (error) setError("");
  };

  const validate = () => {
    const { name, email, password, confirmPassword, role } = formData;

    if (!email || !password || (isSignup && (!name || !role))) {
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

    if (isSignup && !["ADMIN", "USER"].includes(role)) {
      return "Please select a valid role.";
    }

    return "";
  };

  const submitAuthRequest = async () => {
    const payload = isSignup
      ? {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }
      : {
          email: formData.email,
          password: formData.password,
        };

    const endpoint = isSignup ? "/register" : "/login";

    const response = await axiosClient.post(endpoint, payload);
    return response.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const data = await submitAuthRequest();
      const token = data.token || data.accessToken;
      const user = data.user || {
        name: formData.name,
        email: formData.email,
        role: formData.role,
      };

      if (!token) {
        setError("Login failed: token not returned by server.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Authentication failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const formVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.3 } }
  };

  return (
    <section className="min-h-[calc(100vh-72px)] overflow-y-auto bg-slate-950 px-4 py-4 md:py-8 flex items-center justify-center relative">
      {/* Background ambient light effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-600/20 blur-[120px] pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 bg-slate-900/60 backdrop-blur-xl"
      >
        <div className="grid lg:grid-cols-2 lg:min-h-[550px]">
          {/* Left Side - Brand/Marketing */}
          <aside className="relative p-6 md:p-10 overflow-hidden flex flex-col justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 opacity-90" />
            
            {/* Animated Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_10%,transparent_100%)]" />

            <div className="relative z-10 text-white">
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase bg-white/10 border border-white/20 px-4 py-1.5 rounded-full mb-8 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                Rent Your Ride
              </motion.div>
              
              <motion.h1 
                variants={itemVariants} 
                className="text-3xl md:text-4xl font-extrabold leading-[1.1] mb-4 tracking-tight"
              >
                {isSignup ? (
                  <>Start your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200">rental journey</span> today.</>
                ) : (
                  <>Welcome back to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200">smarter rentals.</span></>
                )}
              </motion.h1>
              
              <motion.p variants={itemVariants} className="text-blue-100 text-base mb-8 leading-relaxed font-light">
                Book bikes, cars and e-rickshaws in minutes with transparent pricing and trusted local partners.
              </motion.p>

              <motion.ul variants={itemVariants} className="space-y-3">
                {highlights.map((item, idx) => (
                  <motion.li 
                    key={item} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (idx * 0.1) }}
                    className="flex items-center gap-4 text-white/90 font-medium"
                  >
                    <div className="h-8 w-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0 shadow-inner">
                      <CheckCircle2 className="w-4 h-4 text-cyan-300" />
                    </div>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </aside>

          {/* Right Side - Form */}
          <div className="p-6 md:p-10 lg:p-12 bg-white/5 backdrop-blur-md relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                variants={formVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="h-full flex flex-col justify-center"
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-1 tracking-tight">
                    {isSignup ? "Create account" : "Sign in"}
                  </h2>
                  <p className="text-sm text-slate-400">
                    {isSignup ? "Join now and rent from premium partners." : "Enter your details to access your account."}
                  </p>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400 flex items-center gap-3"
                    >
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <p>{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <AnimatePresence>
                    {isSignup && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="relative group"
                      >
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={formData.name}
                          onChange={updateField("name")}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-11 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all hover:bg-white/10"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={updateField("email")}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-11 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all hover:bg-white/10"
                    />
                  </div>

                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                    <input
                      type="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={updateField("password")}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-11 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all hover:bg-white/10"
                    />
                  </div>

                  <AnimatePresence>
                    {isSignup && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4"
                      >
                        <div className="relative group">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                          <input
                            type="password"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={updateField("confirmPassword")}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-11 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all hover:bg-white/10"
                          />
                        </div>

                        <div className="relative group">
                          <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors z-10" />
                          <select
                            value={formData.role}
                            onChange={updateField("role")}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-11 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all hover:bg-white/10 appearance-none cursor-pointer"
                          >
                            <option value="USER" className="bg-slate-900 text-white py-2">Renter (USER)</option>
                            <option value="ADMIN" className="bg-slate-900 text-white py-2">Partner (ADMIN)</option>
                          </select>
                          {/* Custom select arrow overlay since appearance-none hides it */}
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                            ▼
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-3 font-bold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Authenticating...
                      </>
                    ) : (
                      <>
                        {isSignup ? "Create Account" : "Sign In"}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </motion.button>
                </form>

                <p className="text-sm text-center mt-6 text-slate-400">
                  {isSignup ? "Already have an account?" : "Don't have an account yet?"}{" "}
                  <Link 
                    to={isSignup ? "/login" : "/signup"} 
                    className="text-blue-400 font-semibold hover:text-blue-300 hover:underline underline-offset-4 transition-all"
                  >
                    {isSignup ? "Sign in here" : "Create one now"}
                  </Link>
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default LoginPage;
