import type { AnalysisResult } from "@/components/ResultsView"

export async function generateHeatmap(imageUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext("2d")!

      ctx.filter = "grayscale(60%) brightness(0.7)"
      ctx.drawImage(img, 0, 0)
      ctx.filter = "none"

      const hotspots = [
        { x: img.width * 0.45, y: img.height * 0.4, radius: img.width * 0.2, intensity: 1.0 },
        { x: img.width * 0.65, y: img.height * 0.45, radius: img.width * 0.15, intensity: 0.7 },
      ]

      hotspots.forEach(({ x, y, radius, intensity }) => {
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
        gradient.addColorStop(0, `rgba(255, 0, 0, ${0.7 * intensity})`)
        gradient.addColorStop(0.3, `rgba(255, 140, 0, ${0.55 * intensity})`)
        gradient.addColorStop(0.6, `rgba(255, 255, 0, ${0.35 * intensity})`)
        gradient.addColorStop(0.85, `rgba(0, 128, 255, ${0.2 * intensity})`)
        gradient.addColorStop(1, "rgba(0, 0, 255, 0)")

        ctx.globalCompositeOperation = "screen"
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.globalCompositeOperation = "source-over"
      resolve(canvas.toDataURL("image/jpeg", 0.95))
    }
    img.onerror = () => resolve(imageUrl)
    img.src = imageUrl
  })
}

export async function analyzeImage(
  imageUrl: string
): Promise<AnalysisResult> {
  await new Promise((r) => setTimeout(r, 2500))

  const heatmapUrl = await generateHeatmap(imageUrl)

  return {
    originalImageUrl: imageUrl,
    heatmapImageUrl: heatmapUrl,
    label: "Lung Mass with Biopsy Needle in situ",
    confidence: 95,
    severity: "high",
    explanation:
      "The CT image clearly demonstrates a large, irregularly shaped, enhancing mass located in the right lung/mediastinum. A thin, linear, hyperdense structure consistent with a biopsy needle is seen traversing the chest wall and penetrating into the center of this mass. The presence of the needle strongly indicates an ongoing or recently performed biopsy procedure to characterize the mass. The mass itself shows heterogeneous enhancement, suggesting a solid and potentially malignant nature, though definitive characterization requires histopathology.",
    keyFindings: [
      "Large, irregularly shaped mass in the right hemithorax/mediastinum",
      "Heterogeneous enhancement of the mass",
      "Biopsy needle traversing the chest wall and entering the mass",
      "Mass appears solid with internal architectural distortion",
      "Adjacent lung parenchyma appears compressed or displaced by the mass",
    ],
    differentials: [
      { label: "Lung Mass with Biopsy Needle in situ", confidence: 95.8 },
      { label: "Mediastinal Mass", confidence: 3.8 },
      { label: "Large Pulmonary Nodule", confidence: 2.8 },
    ],
    featureWeights: [], // Used for different visualizations if needed
  }
}
