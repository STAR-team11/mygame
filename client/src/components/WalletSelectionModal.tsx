import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Wallet, Triangle, Radio, Diamond, Rabbit, Flower2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface WalletOption {
  id: string;
  name: string;
  Icon: LucideIcon;
  available: boolean;
}

interface WalletSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectWallet: (walletId: string) => void;
}

const WALLETS: WalletOption[] = [
  { id: "freighter", name: "Freighter", Icon: Wallet, available: true },
  { id: "albedo", name: "Albedo", Icon: Triangle, available: false },
  { id: "xbull", name: "xBull", Icon: Radio, available: false },
  { id: "lobstr", name: "LOBSTR", Icon: Diamond, available: false },
  { id: "rabet", name: "Rabet", Icon: Rabbit, available: false },
  { id: "hana", name: "Hana Wallet", Icon: Flower2, available: false },
];

export default function WalletSelectionModal({ isOpen, onClose, onSelectWallet }: WalletSelectionModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">Connect a Wallet</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              data-testid="button-close-wallet-modal"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-2 py-4">
          {WALLETS.map((wallet) => (
            <Button
              key={wallet.id}
              variant="ghost"
              className={`w-full justify-between h-auto py-4 px-4 ${
                !wallet.available ? 'opacity-50 cursor-not-allowed' : 'hover-elevate'
              }`}
              onClick={() => wallet.available && onSelectWallet(wallet.id)}
              disabled={!wallet.available}
              data-testid={`button-wallet-${wallet.id}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <wallet.Icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-lg font-medium">{wallet.name}</span>
              </div>
              {!wallet.available && (
                <Badge variant="secondary" className="text-xs">
                  Not available
                </Badge>
              )}
            </Button>
          ))}
        </div>
        
        <div className="border-t border-border pt-4">
          <p className="text-sm text-muted-foreground text-center">
            <strong>What is a Wallet?</strong>
          </p>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Wallets are used to send, receive, and store the keys you use to sign blockchain transactions.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
