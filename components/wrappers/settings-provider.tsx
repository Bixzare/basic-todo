"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { type Settings, defaultSettings } from "@/types/settings"

interface SettingsContextType {
  settings: Settings
  updateSettings: (newSettings: Partial<Settings>) => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

const STORAGE_KEY = "app_settings"

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings)

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const savedSettings = localStorage.getItem(STORAGE_KEY)
        if (savedSettings) {
          const parsedSettings = JSON.parse(savedSettings)
          setSettings(current => ({ ...current, ...parsedSettings }))
        } else {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSettings))
        }
      }
    } catch (error) {
      console.error("Failed to load settings from localStorage:", error)
    }
  }, [])

  // Update settings
  const updateSettings = (newSettings: Partial<Settings>) => {
    const updatedSettings = { ...settings, ...newSettings }
    setSettings(updatedSettings)

    // Save to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSettings))
    } catch (error) {
      console.error("Failed to save settings to localStorage:", error)
    }
  }

  // // Don't render until settings are loaded from storage
  // if (!isLoaded) {
  //   return null
  // }

  return <SettingsContext.Provider value={{ settings, updateSettings }}>{children}</SettingsContext.Provider>
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}

