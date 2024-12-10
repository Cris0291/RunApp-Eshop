"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check, AlertTriangle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ProductResponseDto } from "../features/profiles/creationcenter/contracts"

interface StatusPopupProps {
  status: 'success' | 'failure'
  message: string
  actionLabel: string
  onAction: (link: string) => void
  autoCloseDelay?: number
}

export default function StatusPopup({
  status,
  message,
  actionLabel,
  onAction,
  autoCloseDelay = 15000
}: StatusPopupProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, autoCloseDelay)

    return () => clearTimeout(timer)
  }, [autoCloseDelay])

  const handleClose = () => {
    setIsVisible(false)
  }

  const bgColor = status === 'success' ? 'bg-green-500' : 'bg-red-500'
  const hoverColor = status === 'success' ? 'hover:bg-green-600' : 'hover:bg-red-600'
  const icon = status === 'success' ? <Check className="w-6 h-6 mr-2" /> : <AlertTriangle className="w-6 h-6 mr-2" />

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <div className={`rounded-lg shadow-lg overflow-hidden max-w-lg w-full ${status === 'failure' ? 'bg-red-500' : 'bg-white'}`}>
            <div className={`flex items-center justify-between p-4 ${bgColor} text-white`}>
              <div className="flex items-center">
                {icon}
                <span className="font-semibold">{status === 'success' ? 'Success' : 'Failure'}</span>
              </div>
              <button
                onClick={handleClose}
                className={`text-white ${status === 'success' ? 'hover:text-green-100' : 'hover:text-red-100'} transition-colors`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className={`p-4 ${status === 'failure' ? 'text-white' : 'text-gray-800'}`}>
              <p className="mb-4">{message}</p>
              <Button
                onClick={() => {
                  onAction("Images")
                  setIsVisible(false)
                }}
                className={`w-full ${status === 'success' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-white text-red-500 hover:bg-red-100'} text-black`}
              >
                {actionLabel}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}