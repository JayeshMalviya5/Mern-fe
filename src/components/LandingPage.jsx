import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Bike, Car, Zap, ArrowRight, ShieldCheck, MapPin, Clock } from "lucide-react";
import { vehicleSections } from "../data";

const iconMap = {
  "bikes": <Bike className="w-10 h-10 text-blue-500 group-hover:text-blue-400 transition-colors" />,
  "cars": <Car className="w-10 h-10 text-amber-500 group-hover:text-amber-400 transition-colors" />,
  "e-rickshaw": <Zap className="w-10 h-10 text-emerald-500 group-hover:text-emerald-400 transition-colors" />
};

const gradientMap = {
  "bikes": "from-blue-500/10 via-blue-500/5 to-transparent border-blue-500/20 hover:border-blue-500/40",
  "cars": "from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/20 hover:border-amber-500/40",
  "e-rickshaw": "from-emerald-500/10 via-emerald-500/5 to-transparent border-emerald-500/20 hover:border-emerald-500/40"
};

const badgeMap = {
  "bikes": "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  "cars": "bg-amber-500/20 text-amber-400 border border-amber-500/30",
  "e-rickshaw": "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const LandingPage = () => {
  return (
    <section className="flex-1 w-full min-h-[calc(100vh-72px)] bg-slate-950 px-6 py-12 lg:py-20 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none" />

      <motion.div 
        className="max-w-6xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center mb-16 space-y-4">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
            Find Your Perfect Ride
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Choose your vehicle category below. We offer flexible hourly and daily rentals across the city with zero hidden fees.
          </p>
        </motion.div>

        {/* Value Props */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-6 md:gap-12 mb-16 text-slate-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <span className="font-medium">Fully Insured</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-indigo-400" />
            <span className="font-medium">50+ City Hubs</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-400" />
            <span className="font-medium">24/7 Support</span>
          </div>
        </motion.div>

        {/* Category Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {vehicleSections.map((section) => (
            <motion.div key={section.id} variants={itemVariants}>
              <Link
                to={section.route}
                className={`group block h-full bg-slate-900 border ${gradientMap[section.id]} rounded-3xl p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-900/20`}
              >
                <div className="flex justify-between items-start mb-8">
                  <div className={`p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 group-hover:scale-110 transition-transform duration-300`}>
                    {iconMap[section.id]}
                  </div>
                  <span className={`${badgeMap[section.id]} text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider`}>
                    Category
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed min-h-[60px]">
                    {section.subtitle}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                    Explore Fleet
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-slate-900 text-slate-400 transition-all duration-300 group-hover:translate-x-1">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default LandingPage;
