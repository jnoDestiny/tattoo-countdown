'use client'

interface CountdownDisplayProps {
  daysLeft: number
  hoursLeft: number
  minutesLeft: number
  secondsLeft: number
}

export function CountdownDisplay({ daysLeft, hoursLeft, minutesLeft, secondsLeft }: CountdownDisplayProps) {
  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center mx-4">
      <div className="text-8xl font-bold text-white font-orbitron tracking-wider">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-xl text-gray-300 font-orbitron mt-2 uppercase tracking-wider">
        {label}
      </div>
    </div>
  )

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-white font-orbitron mb-8 tracking-wider">
        Until I get a chainsaw tattoo'd on my body
      </h1>
      
      <div className="flex justify-center items-center">
        <TimeUnit value={daysLeft} label="Days" />
        <div className="text-6xl font-bold text-red-500 font-orbitron mx-4">:</div>
        <TimeUnit value={hoursLeft} label="Hours" />
        <div className="text-6xl font-bold text-red-500 font-orbitron mx-4">:</div>
        <TimeUnit value={minutesLeft} label="Minutes" />
        <div className="text-6xl font-bold text-red-500 font-orbitron mx-4">:</div>
        <TimeUnit value={secondsLeft} label="Seconds" />
      </div>
    </div>
  )
} 