import { useState } from 'react'
import { Mail, X } from 'lucide-react'

interface EmailModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (email: string) => void
  isLoading: boolean
  title?: string
}

export const EmailModal = ({ isOpen, onClose, onSubmit, isLoading, title = "Save Your Data" }: EmailModalProps) => {
  const [email, setEmail] = useState('')

  if (!isOpen) return null

  const handleSubmit = () => {
    if (!email.trim()) return
    onSubmit(email)
    setEmail('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800/95 border border-gray-700 rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-400/10 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-teal-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300 transition-colors p-1 hover:bg-white/10 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6 p-4 bg-teal-400/10 border border-teal-400/20 rounded-lg">
          <p className="text-sm text-teal-300">
            💡 Enter your email to {title === "Load Your Data" ? "load your saved" : "save your custom"} chart values. 
            {title !== "Load Your Data" && " If you have previous data, you'll be asked about overwriting it."}
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent text-white placeholder-gray-500"
            placeholder="your@email.com"
            autoFocus
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 text-gray-300 bg-gray-700/50 border border-gray-600 rounded-lg hover:bg-gray-700 transition-all font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading || !email.trim()}
            className="flex-1 px-4 py-3 bg-teal-400 text-gray-900 rounded-lg hover:bg-teal-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold shadow-lg"
          >
            {isLoading ? 'Processing...' : (title === "Load Your Data" ? 'Load Data' : 'Save Data')}
          </button>
        </div>
      </div>
    </div>
  )
}
