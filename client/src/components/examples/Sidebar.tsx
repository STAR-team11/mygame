import { useState } from 'react'
import Sidebar from '../Sidebar'

export default function SidebarExample() {
  const [activeTab, setActiveTab] = useState('launch')
  
  return (
    <div className="relative h-screen">
      <Sidebar 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isOpen={true}
        onClose={() => console.log('Close sidebar')}
      />
    </div>
  )
}
