import { ImageOff } from 'lucide-react'

interface NoImagePlaceholderProps {
  width?: string
  height?: string
  text?: string
}

export default function NoImagePlaceholder({
  width = "100%",
  height = "200px",
  text = "No image available"
}: NoImagePlaceholderProps) {
  return (
    <div 
      style={{ width}}
      className="bg-gray-200 flex flex-col items-center justify-center text-gray-500 rounded-md overflow-hidden"
    >
      <ImageOff className="w-4 h-4 mb-2" />
      <p className="text-sm font-medium">{text}</p>
    </div>
  )
}