"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, Send } from "lucide-react"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diff = (now.getTime() - date.getTime()) / 1000
  if (diff < 10) return "Just now"
  if (diff < 60) return `${Math.floor(diff)}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  // Autofocus input on load
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])

  // Update timestamps every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setMessages((prev) => [...prev])
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isTyping) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }

    try {
      // Call the agent API endpoint
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: userMessage.content,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.answer,
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again.',
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)

    // Auto-resize textarea up to 5 lines
    const textarea = e.target
    textarea.style.height = "auto"
    const scrollHeight = textarea.scrollHeight
    const lineHeight = 22
    const maxHeight = 5 * lineHeight + 24 // 5 lines + padding
    textarea.style.height = Math.min(scrollHeight, maxHeight) + "px"
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-system">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200/50">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center relative">
            <div className="flex items-center gap-3">
              <MessageCircle className="w-6 h-6 text-[#007aff]" />
              <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">AI Assistant</h1>
            </div>
          </div>
          <p className="text-center text-gray-600 mt-2">Posez vos questions et obtenez des réponses instantanées</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="h-[600px] overflow-y-auto px-4 py-6">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 mt-20 animate-in fade-in duration-500">
              <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <MessageCircle className="w-10 h-10 text-gray-400" />
              </div>
              <h2 className="text-xl font-medium mb-2 text-gray-800">Welcome to AI Assistant</h2>
              <p className="text-gray-500 text-sm">Send a message to get started</p>
            </div>
          )}

          <div className="space-y-6">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                } animate-in slide-in-from-bottom-2 ease-out duration-300`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="max-w-[75%] sm:max-w-md">
                  <div
                    className={`px-4 py-3 shadow-sm transition-all duration-200 ${
                      message.role === "user"
                        ? "bg-[#007aff] text-white rounded-[20px] rounded-br-[8px]"
                        : "bg-[#f1f0f0] text-gray-900 rounded-[20px] rounded-bl-[8px]"
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words leading-relaxed text-[15px]">{message.content}</p>
                  </div>
                  <p
                    className={`text-xs text-gray-400 mt-1 px-2 ${
                      message.role === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    {formatRelativeTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start animate-in slide-in-from-bottom-2 ease-out duration-300">
                <div className="max-w-[75%] sm:max-w-md">
                  <div className="bg-[#f1f0f0] text-gray-900 px-4 py-3 rounded-[20px] rounded-bl-[8px] shadow-sm">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.15s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.3s" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-500 ml-1">typing...</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 px-2">Just now</p>
                </div>
              </div>
            )}
          </div>

              <div ref={messagesEndRef} className="h-4" />
            </div>

            {/* Input Bar */}
            <div className="border-t border-gray-200 bg-white">
              <div className="px-4 py-3">
                <form onSubmit={handleSubmit} className="flex items-end gap-3">
                  <div className="flex-1 relative">
                    <Textarea
                      ref={textareaRef}
                      value={input}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      placeholder="Tapez votre message..."
                      className="min-h-[44px] max-h-[120px] resize-none border-gray-300 focus:border-[#007aff] focus:ring-[#007aff]/20 rounded-full px-4 py-3 shadow-sm transition-all duration-200 bg-white text-[15px] placeholder:text-gray-400"
                      disabled={isTyping}
                      rows={1}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className="h-11 w-11 rounded-full bg-[#007aff] hover:bg-[#0056d6] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 flex items-center justify-center"
                  >
                    <Send className="w-4 h-4 text-white" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
