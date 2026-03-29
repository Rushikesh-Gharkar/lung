import type { AnalysisResult } from "@/components/ResultsView"

export async function analyzeViaBackend(file: File): Promise<AnalysisResult> {
  const form = new FormData()
  form.append("file", file)

  const res = await fetch("/api/predict", { method: "POST", body: form })
  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(text || `Backend error (${res.status})`)
  }
  return (await res.json()) as AnalysisResult
}

