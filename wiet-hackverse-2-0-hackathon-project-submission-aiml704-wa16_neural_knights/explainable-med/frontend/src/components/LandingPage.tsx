import { motion } from "framer-motion";
import {
  Brain,
  Shield,
  Zap,
  Users,
  ArrowRight,
  Activity,
  Laptop,
  Microscope,
} from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden bg-slate-50/50">
        <motion.div
          className="max-w-6xl mx-auto flex flex-col items-center text-center space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-wider"
          >
            <Activity className="w-3 h-3" />
            Next Generation Diagnostic AI
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight max-w-4xl leading-tight"
          >
            Transparency & Interpretability in{" "}
            {/* FIXED: Gradient text and forces it to stay on one line */}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 whitespace-nowrap">
              Medical AI
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg text-slate-500 max-w-2xl leading-relaxed"
          >
            Bridge the "Black Box" gap in clinical AI. Our platform provides not
            just accurate diagnostics, but the visual and textual reasoning
            behind every decision.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 justify-center pt-4"
          >
            {/* FIXED: Gradient Button */}
            <button
              onClick={onGetStarted}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-600/20 transition-all flex items-center gap-2 group active:scale-95"
            >
              Get Started for Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* How It Works - FIXED: Added the ID here for the smooth scroll! */}
      <section id="how-it-works" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              How MediSense Works
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Three simple steps to bridge human expertise with artificial
              intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <Laptop className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                1. Upload Image
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Upload CT scans, X-rays, or skin lesion photos directly through
                our secure, HIPAA-compliant gateway.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                2. AI Interpretation
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Our XAI core classifies the image while generating saliency maps
                to highlight exactly where the model is looking.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                <Microscope className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                3. Human Validation
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Review automated reasoning and feature importance to validate
                findings before finalizing clinical reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-24 px-6 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="bg-blue-500 w-[500px] h-[500px] blur-[150px] rounded-full absolute -top-48 -left-24" />
          <div className="bg-emerald-500 w-[400px] h-[400px] blur-[120px] rounded-full absolute bottom-0 right-0" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold tracking-tight">
                Built for the future of clinical medicine.
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">
                      Radiologists & Oncologists
                    </h4>
                    <p className="text-slate-400 text-sm">
                      Reduce cognitive load and minimize oversight with
                      AI-assisted focus areas.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">
                      Healthcare Institutions
                    </h4>
                    <p className="text-slate-400 text-sm">
                      Standardize diagnostic reporting with explainable audit
                      trails for AI outcomes.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Researchers</h4>
                    <p className="text-slate-400 text-sm">
                      Deep dive into model behaviors with Grad-CAM and saliency
                      visualizations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 shadow-2xl">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400/50" />
                    <span className="w-3 h-3 rounded-full bg-amber-400/50" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400/50" />
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">
                    Diagnostic Interface
                  </span>
                </div>
                <div className="h-64 rounded-xl bg-slate-800/50 border border-white/5 flex items-center justify-center overflow-hidden">
                  <div className="text-slate-600 font-mono text-xs text-center p-4">
                    // Saliency computation ... <br />
                    [92.4% Probability Detected] <br />
                    Applying Grad-CAM filter ...
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-2 rounded-full bg-white/10" />
                  <div className="h-2 rounded-full bg-white/10" />
                  <div className="h-2 rounded-full bg-white/10" />
                  <div className="h-2 rounded-full bg-emerald-500/50 w-3/4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
