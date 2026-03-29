import { useState, useCallback } from "react"
import { Upload, X, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface ImageUploaderProps {
  onAnalyze: (file: File, imageUrl: string) => void
  isAnalyzing: boolean
}

export function ImageUploader({ onAnalyze, isAnalyzing }: ImageUploaderProps) {
  const [dragOver, setDragOver] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)

  const handleFile = (f: File) => {
    const url = URL.createObjectURL(f)
    setPreview(url)
    setFile(f)
    // Auto-start analysis on file select for a smoother flow maybe?
    // Actually let's stick to the button to match user intent
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const f = e.dataTransfer.files[0]
    if (f && f.type.startsWith("image/")) handleFile(f)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) handleFile(f)
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPreview(null)
    setFile(null)
  }

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto px-4">
      <AnimatePresence mode="wait">
        {!preview ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full text-center space-y-6 pt-12 pb-8"
          >
            <div className="space-y-3">
              <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
                Medical Image Analysis
              </h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
                Upload a medical image to receive an AI-powered classification with visual heatmaps and natural language explanations of the model's reasoning.
              </p>
            </div>

            <div className="pt-8">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 left-0 text-left">
                INPUT IMAGE
              </h3>
              <div
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onClick={() => document.getElementById("file-input")?.click()}
                className={cn(
                  "relative group w-full aspect-[2.5/1] rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center cursor-pointer",
                  dragOver
                    ? "bg-blue-50/50 border-blue-400 border-solid ring-4 ring-blue-100"
                    : "bg-slate-50/30 border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                )}
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-slate-100 group-hover:bg-white shadow-sm transition-colors mb-4">
                  <Upload className="w-7 h-7 text-slate-400 group-hover:text-blue-500 transition-colors" />
                </div>
                <div className="space-y-1">
                  <p className="text-xl font-semibold text-slate-900">Drop medical image here</p>
                  <p className="text-slate-400">Skin lesion, X-ray, or CT scan • PNG, JPG</p>
                </div>
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full space-y-4 pt-4"
          >
             <div className="text-left">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">
                INPUT IMAGE
              </h3>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl group aspect-video max-h-[400px]">
              <img
                src={preview}
                alt="Upload preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button
                  onClick={handleClear}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium border border-white/20 transition-all"
                >
                  <X className="w-4 h-4 mr-2 inline" />
                  Replace Image
                </button>
              </div>
              
              {isAnalyzing && (
                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex flex-col items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-2xl flex flex-col items-center gap-3">
                    <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                    <p className="text-slate-900 font-bold tracking-tight">Analyzing with AI...</p>
                  </div>
                </div>
              )}
            </div>

            {!isAnalyzing && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                id="analyze-btn"
                onClick={() => file && onAnalyze(file, preview)}
                className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-lg shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-2 mt-4"
              >
                Start AI Analysis
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
