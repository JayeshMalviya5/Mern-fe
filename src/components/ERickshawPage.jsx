import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Battery, Zap, Users, Star, ArrowRight, IndianRupee, ShieldCheck } from "lucide-react";
import erickshawsData from "../data/erickshaws.json";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const ERickshawPage = () => {
  return (
    <section className="flex-1 w-full min-h-[calc(100vh-72px)] bg-slate-950 px-6 py-12 lg:py-20 relative">
      {/* Background ambient lighting - Emerald theme for EVs */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[150px] pointer-events-none" />

      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="mb-16">
          <Link to="/" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-2 mb-6 w-fit font-medium transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" /> Back to Dashboard
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
                Premium E-Rickshaws
              </h1>
              <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
                Eco-friendly, cost-effective, and spacious. Perfect for local commutes, city tours, and short-distance group travel.
              </p>
            </div>
            <div className="flex items-center gap-2 text-slate-300 bg-slate-900 border border-white/10 px-4 py-2 rounded-full h-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium">{erickshawsData.length} EVs Available</span>
            </div>
          </div>
        </motion.div>

        {/* EV Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {erickshawsData.map((ev) => (
            <motion.div key={ev.id} variants={itemVariants} className="group">
              <div className="bg-slate-900 border border-white/10 rounded-3xl overflow-hidden hover:border-emerald-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-900/20 h-full flex flex-col">
                
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-slate-800">
                  <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider">
                    {ev.brand}
                  </div>
                  <div className="absolute top-4 right-4 z-10 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold text-emerald-400">
                    {ev.availability}
                  </div>
                  <img 
                    src={ev.image} 
                    alt={ev.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out opacity-90 group-hover:opacity-100"
                  />
                  {/* Image Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                </div>

                {/* Content Container */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                        {ev.name}
                      </h3>
                      <div className="flex items-center gap-1 text-yellow-500 text-sm font-medium">
                        <Star className="w-4 h-4 fill-yellow-500" />
                        {ev.rating} <span className="text-slate-500 font-normal">({ev.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-white/5">
                    <div className="flex flex-col items-center justify-center text-slate-400 gap-1">
                      <Battery className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                      <span className="text-xs font-medium">{ev.batteryRange}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center text-slate-400 gap-1 border-x border-white/5">
                      <Zap className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                      <span className="text-xs font-medium">{ev.chargeTime}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center text-slate-400 gap-1">
                      <Users className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                      <span className="text-xs font-medium">{ev.seats} Seats</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="mb-8 flex-1">
                    <ul className="space-y-2">
                      {ev.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-slate-400 border-b border-white/5 pb-2 last:border-0 last:pb-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                    <div>
                      <p className="text-xs text-slate-500 font-medium mb-1">Starting from</p>
                      <div className="flex items-baseline gap-1">
                        <IndianRupee className="w-5 h-5 text-white" />
                        <span className="text-3xl font-bold text-white tracking-tight">{ev.pricePerHour}</span>
                        <span className="text-slate-500 text-sm">/hr</span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => alert(`Booking flow for ${ev.name} will be implemented next!`)}
                      className="bg-white hover:bg-emerald-50 text-slate-900 px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 group/btn hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95"
                    >
                      Book Now
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>

                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ERickshawPage;
