import { Button } from "@/components/ui/button";
import { Boxes, Coins, Globe, LayoutDashboard, FileText, UsersRound, X } from "lucide-react";
import { FaTwitter, FaTelegram, FaDiscord } from "react-icons/fa";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ activeTab, onTabChange, isOpen, onClose }: SidebarProps) {
  const navItems = [
    { id: "launch", label: "Launch", icon: Boxes },
    { id: "mint", label: "Mint Points", icon: Coins },
    { id: "global", label: "Global", icon: Globe },
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "docs", label: "Documentation", icon: FileText },
    { id: "join", label: "Join Us", icon: UsersRound },
  ];
  
  const socialLinks = [
    { icon: FaTwitter, url: "https://twitter.com", label: "Twitter" },
    { icon: FaTelegram, url: "https://t.me", label: "Telegram" },
    { icon: FaDiscord, url: "https://discord.com", label: "Discord" },
  ];
  
  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`
        fixed top-0 left-0 h-full w-72 bg-card/95 backdrop-blur-xl border-r border-border/50 z-50 
        transform transition-transform duration-300 ease-in-out lg:translate-x-0 shadow-2xl
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <svg
                className="w-9 h-9 drop-shadow-lg"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="sidebarStarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF6B00" />
                    <stop offset="100%" stopColor="#FFA366" />
                  </linearGradient>
                </defs>
                <path
                  d="M50 5 L61 39 L97 39 L68 61 L79 95 L50 73 L21 95 L32 61 L3 39 L39 39 Z"
                  fill="url(#sidebarStarGradient)"
                />
              </svg>
              <span className="text-xl font-bold bg-gradient-to-r from-[#FF6B00] to-[#FFA366] bg-clip-text text-transparent">STAR</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="lg:hidden hover:bg-[#FF6B00]/10 transition-colors"
              data-testid="button-close-sidebar"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <nav className="flex-1 space-y-1.5">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={`
                  w-full justify-start text-base font-medium h-12 
                  transition-all duration-200 group
                  ${activeTab === item.id 
                    ? 'bg-gradient-to-r from-[#FF6B00] to-[#FFA366] hover:from-[#FF7B10] hover:to-[#FFB376] text-white shadow-lg shadow-[#FF6B00]/30' 
                    : 'hover:bg-[#FF6B00]/10 hover:text-[#FF6B00] hover:translate-x-1'
                  }
                `}
                onClick={() => {
                  onTabChange(item.id);
                  onClose();
                }}
                data-testid={`button-sidebar-${item.id}`}
              >
                <item.icon className={`mr-3 h-5 w-5 transition-transform ${activeTab === item.id ? '' : 'group-hover:scale-110'}`} />
                {item.label}
              </Button>
            ))}
          </nav>
          
          <div className="border-t border-border/50 pt-6 mt-4">
            <p className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">Follow Us</p>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="icon"
                  onClick={() => window.open(social.url, '_blank')}
                  className="hover:bg-[#FF6B00]/10 hover:text-[#FF6B00] transition-all duration-200 hover:scale-110"
                  data-testid={`button-social-${social.label.toLowerCase()}`}
                >
                  <social.icon className="h-5 w-5" />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
