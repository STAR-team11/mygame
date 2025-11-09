import { useState } from 'react'
import BottomNav from '../BottomNav'

export default function BottomNavExample() {
  const [activeTab, setActiveTab] = useState('launch')
  
  return (
    <div className="relative h-32">
      <BottomNav 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  )
}
