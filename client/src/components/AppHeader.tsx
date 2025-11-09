import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, Wifi } from "lucide-react";
import WalletConnectButton from "@/components/WalletConnectButton";
import { useWallet } from "@/contexts/WalletContext";

interface AppHeaderProps {
  onMenuClick: () => void;
}

export default function AppHeader({ onMenuClick }: AppHeaderProps) {
  const { network } = useWallet();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-20 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            data-testid="button-menu"
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-3">
            <svg
              className="w-8 h-8"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="headerStarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF6B00" />
                  <stop offset="100%" stopColor="#FFA366" />
                </linearGradient>
              </defs>
              <path
                d="M50 5 L61 39 L97 39 L68 61 L79 95 L50 73 L21 95 L32 61 L3 39 L39 39 Z"
                fill="url(#headerStarGradient)"
              />
            </svg>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">
              STAR
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="hidden sm:flex items-center gap-1">
            <Wifi className="h-3 w-3" />
            {network === 'testnet' ? 'Testnet' : 'Mainnet'}
          </Badge>
          <WalletConnectButton />
        </div>
      </div>
    </header>
  );
}
