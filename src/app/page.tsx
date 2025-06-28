'use client'

import { useState, useEffect } from 'react'
import { BackgroundSlider } from '@/components/BackgroundSlider'
import { CountdownDisplay } from '@/components/CountdownDisplay'

export default function Home() {
  const [daysLeft, setDaysLeft] = useState(365)
  const [hoursLeft, setHoursLeft] = useState(0)
  const [minutesLeft, setMinutesLeft] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imageCount, setImageCount] = useState(1)

  // Calculate time left until 365 days from now
  useEffect(() => {
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 365)
    
    const calculateTimeLeft = () => {
      const now = new Date()
      const timeDiff = targetDate.getTime() - now.getTime()
      
      if (timeDiff <= 0) {
        setDaysLeft(0)
        setHoursLeft(0)
        setMinutesLeft(0)
        setSecondsLeft(0)
        return
      }
      
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)
      
      setDaysLeft(days)
      setHoursLeft(hours)
      setMinutesLeft(minutes)
      setSecondsLeft(seconds)
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000) // Update every second

    return () => clearInterval(interval)
  }, [])

  // Function to get image count from BackgroundSlider
  const handleImageCountUpdate = (count: number) => {
    setImageCount(count)
  }

  // Cycle through background images every 10 seconds
  useEffect(() => {
    if (imageCount <= 1) return // Don't cycle if only one or no images
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % imageCount)
    }, 10000)

    return () => clearInterval(interval)
  }, [imageCount])

  return (
    <main className="min-h-screen relative overflow-hidden">
      <BackgroundSlider 
        currentIndex={currentImageIndex} 
        onImageCountUpdate={handleImageCountUpdate}
      />
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <CountdownDisplay 
          daysLeft={daysLeft}
          hoursLeft={hoursLeft}
          minutesLeft={minutesLeft}
          secondsLeft={secondsLeft}
        />
      </div>
    </main>
  )
} 