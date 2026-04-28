import * as pdfjsLib from "pdfjs-dist/build/pdf"
import mammoth from "mammoth"

// FIX worker
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"

export const parseResume = async (file) => {

  // ✅ PDF
  if (file.type === "application/pdf") {
    const reader = new FileReader()

    return new Promise((resolve) => {
      reader.onload = async () => {
        const pdf = await pdfjsLib.getDocument({ data: reader.result }).promise
        let text = ""

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i)
          const content = await page.getTextContent()
          text += content.items.map(item => item.str).join(" ")
        }

        resolve(text)
      }

      reader.readAsArrayBuffer(file)
    })
  }

  // ✅ DOCX
  if (file.name.endsWith(".docx")) {
    const arrayBuffer = await file.arrayBuffer()
    const result = await mammoth.extractRawText({ arrayBuffer })
    return result.value
  }

  return ""
}