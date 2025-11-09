import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { WALLET_CONFIG, StellarWalletId } from '@/lib/walletProviders';
import { Info, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface WalletModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onWalletSelect?: (walletId: StellarWalletId) => void;
}

export default function WalletModal({ open, onOpenChange, onWalletSelect }: WalletModalProps) {
  const handleWalletClick = (walletId: StellarWalletId, available: boolean, installUrl?: string) => {
    if (!available) return;
    
    if (onWalletSelect) {
      onWalletSelect(walletId);
      onOpenChange(false);
    } else if (installUrl) {
      window.open(installUrl, '_blank');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Connect Wallet</DialogTitle>
          <DialogDescription>
            Choose your preferred Stellar wallet to connect
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
          {Object.entries(WALLET_CONFIG).map(([walletId, config]) => {
            const isAvailable = config.available;
            
            return (
              <Card
                key={walletId}
                className={`relative p-4 transition-all cursor-pointer border-card-border ${
                  isAvailable
                    ? 'hover-elevate active-elevate hover:border-primary/50'
                    : 'opacity-50 cursor-not-allowed'
                }`}
                onClick={() => handleWalletClick(walletId as StellarWalletId, isAvailable, config.installUrl)}
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="text-4xl">{config.icon}</div>
                  <div className="font-semibold text-sm">{config.name}</div>
                  {!isAvailable && (
                    <Badge variant="secondary" className="text-xs">
                      Not Available
                    </Badge>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-sm mb-2">What is a Wallet?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A wallet is a secure digital tool that allows you to store, send, and receive cryptocurrency on the Stellar network. 
                It keeps your private keys safe and lets you interact with blockchain applications. 
                Choose a wallet provider above to get started.
              </p>
              <Button
                variant="link"
                className="px-0 h-auto mt-2 text-primary hover:text-primary/80"
                onClick={() => window.open('https://www.stellar.org/ecosystem/wallets', '_blank')}
              >
                Learn more about wallets
                <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
