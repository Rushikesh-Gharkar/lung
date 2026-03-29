import { useState } from "react";
import SpecialistMap from "@/components/SpecialistMap";
import HeatmapCanvas from "@/components/HeatmapCanvas";
import type { HeatmapRegion } from "@/components/HeatmapCanvas";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  ChevronLeft,
  Brain,
  ListFilter,
  Lightbulb,
  Wind,
  Scan,
  AlertTriangle,
  CheckCircle2,
  Stethoscope,
} from "lucide-react";

export interface AnalysisResult {
  originalImageUrl: string;
  heatmapImageUrl?: string; // Kept as optional for backward compatibility
  label: string;
  confidence: number;
  severity: "low" | "moderate" | "high";
  explanation: string;
  keyFindings: string[];
  differentials: { label: string; confidence: number }[];
  featureWeights: { name: string; weight: number; color: string }[];
  scanType?: "chest_xray" | "lung_ct" | "skin_cancer";
  regions: HeatmapRegion[];
}

interface ResultsViewProps {
  result: AnalysisResult;
  onReset: () => void;
}

export function ResultsView({ result, onReset }: ResultsViewProps) {
  const isNormal = result.severity === "low";
  const [showHeatmap, setShowHeatmap] = useState(!isNormal);

  // Dynamic Styles based on Severity
  const severityStyles = {
    high: {
      bg: "bg-red-50",
      border: "border-red-100",
      progress: "bg-red-500",
      text: "text-red-600",
      dot: "bg-red-400",
      icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
    },
    moderate: {
      bg: "bg-orange-50",
      border: "border-orange-100",
      progress: "bg-orange-500",
      text: "text-orange-600",
      dot: "bg-orange-400",
      icon: <AlertTriangle className="w-5 h-5 text-orange-500" />,
    },
    low: {
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      progress: "bg-emerald-500",
      text: "text-emerald-600",
      dot: "bg-emerald-400",
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    },
  };

  const active = severityStyles[result.severity] || severityStyles.low;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-4 py-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: SCAN & HEATMAP */}
        <div className="lg:col-span-5 space-y-6">
          <button
            onClick={onReset}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors text-sm font-bold"
          >
            <ChevronLeft className="w-4 h-4" /> Upload different image
          </button>

          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black aspect-square border border-slate-200">
            <img
              src={result.originalImageUrl}
              className="absolute inset-0 w-full h-full object-cover"
              alt="Diagnostic Scan"
            />
            {/* The Heatmap Canvas Overlay */}
            <HeatmapCanvas regions={result.regions || []} show={showHeatmap} />

            {!isNormal && (
              <button
                onClick={() => setShowHeatmap(!showHeatmap)}
                className="absolute top-4 right-4 z-30 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 shadow-xl flex items-center gap-2 hover:bg-white transition-all active:scale-95"
              >
                {showHeatmap ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5" /> Hide Heatmap
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" /> Show Heatmap
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: ANALYSIS & FEATURES */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Classification Card */}
          <div className="p-6 bg-white border rounded-2xl shadow-sm space-y-6">
            <div className="flex justify-between items-start">
              <div className="space-y-4">
                {/* Dynamic Scan Type Badge */}
                {result.scanType === "lung_ct" ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-[10px] font-bold uppercase tracking-widest">
                    <Scan className="w-3 h-3" /> Lung CT Screening
                  </span>
                ) : result.scanType === "skin_cancer" ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-[10px] font-bold uppercase tracking-widest">
                    <Stethoscope className="w-3 h-3" /> Dermoscopy Analysis
                  </span>
                ) : result.scanType === "chest_xray" ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-[10px] font-bold uppercase tracking-widest">
                    <Wind className="w-3 h-3" /> Chest X-Ray Analysis
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-[10px] font-bold uppercase tracking-widest">
                    <AlertTriangle className="w-3 h-3" /> Unknown Scan Type
                  </span>
                )}

                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${active.bg}`}>
                    {active.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {result.label}
                  </h2>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-2xl font-black ${active.text}`}>
                  {result.confidence.toFixed(1)}%
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                  Confidence
                </p>
              </div>
            </div>

            {/* Differential Diagnoses (Progress Bars) */}
            <div className="pt-4 border-t border-slate-50 space-y-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Differential Diagnoses
              </p>
              <div className="space-y-3">
                {result.differentials?.map((diff, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-600">
                      <span>{diff.label}</span>
                      <span>{diff.confidence}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${diff.confidence}%` }}
                        className={`h-full ${diff.confidence > 50 ? active.progress : "bg-slate-300"}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Explanation & Clinical Features */}
          <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-tight">
                  <Brain className="w-4 h-4" /> Reasoning
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {result.explanation}
                </p>
              </div>

              {/* Clinical Features List */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm uppercase tracking-tight">
                  <ListFilter className="w-4 h-4" /> Clinical Features
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {result.keyFindings?.map((finding, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-xs text-slate-600 bg-slate-50 p-2 rounded-lg"
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${active.dot}`}
                      />
                      <span>{finding}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommendation Footer */}
            <div
              className={`p-6 border-t ${active.bg} ${active.border} flex items-start gap-3`}
            >
              <Lightbulb className={`w-5 h-5 shrink-0 ${active.text}`} />
              <div>
                <h4
                  className={`text-xs font-bold uppercase mb-1 ${active.text}`}
                >
                  Recommendation
                </h4>
                <p
                  className={`text-xs font-medium leading-relaxed ${active.text}`}
                >
                  {result.scanType === "lung_ct"
                    ? result.label === "Malignant"
                      ? "Urgent clinical evaluation is strongly recommended. This result warrants immediate specialist review, CT-guided biopsy, and staging workup. Do not delay consultation with a pulmonologist or oncologist."
                      : result.label === "Benign"
                        ? "Follow-up imaging in 3–6 months is advised to monitor the identified nodule for any changes in size or morphology. Specialist review is recommended."
                        : "No immediate action required. Routine annual screening is recommended for high-risk individuals (age 50+, smoker). Consult your physician for further guidance."
                    : result.scanType === "skin_cancer"
                      ? result.label === "Malignant"
                        ? "Urgent dermatological consultation is required. This lesion shows high-risk features and necessitates a physical examination and likely biopsy. Do not attempt to remove or treat the lesion yourself."
                        : "While this screening indicates a benign pattern, you should continue to monitor for any changes in size, shape, or color (ABCDE criteria). Consult a professional if any evolution is noted."
                      : result.label === "Pneumonia"
                        ? "Clinical correlation with symptoms and laboratory findings is advised. Antibiotic or antiviral therapy may be indicated based on the clinical presentation. Physician review is required."
                        : "No immediate action required based on this screening result. Routine follow-up as recommended by your physician. This tool does not replace clinical examination."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* THE MAP COMPONENT */}
      <div className="mt-10 mb-8">
        <SpecialistMap
          recommendedSpecialist={
            result.scanType === "skin_cancer"
              ? "Dermatologist"
              : isNormal
                ? "General Physician"
                : "Pulmonologist"
          }
        />
      </div>
    </motion.div>
  );
}
