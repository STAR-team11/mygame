import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useWallet } from '@/contexts/WalletContext';
import { Wallet, ExternalLink, Copy, LogOut, Network } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { freighterWallet } from '@/lib/walletConnect';
import WalletSelectionModal from './WalletSelectionModal';

export default function WalletConnectButton() {
  const { publicKey, isConnected, isInstalled, connecting, connect, disconnect, network, setNetwork } = useWallet();
  const { toast } = useToast();
  const [showWalletModal, setShowWalletModal] = useState(false);

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const copyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey);
      toast({
        title: 'Address Copied',
        description: 'Wallet address copied to clipboard',
      });
    }
  };

  if (!isInstalled) {
    return (
      <Button
        variant="outline"
        onClick={() => window.open(freighterWallet.getFreighterInstallUrl(), '_blank')}
        data-testid="button-install-freighter"
      >
        <ExternalLink className="mr-2 h-4 w-4" />
        Install Freighter
      </Button>
    );
  }

  const handleWalletSelect = async (walletId: string) => {
    setShowWalletModal(false);
    if (walletId === 'freighter') {
      await connect();
    } else {
      toast({
        title: 'Wallet Not Available',
        description: `${walletId} integration coming soon`,
        variant: 'destructive',
      });
    }
  };

  if (!isConnected) {
    return (
      <>
        <Button
          onClick={() => setShowWalletModal(true)}
          disabled={connecting}
          data-testid="button-connect-wallet"
        >
          <Wallet className="mr-2 h-4 w-4" />
          {connecting ? 'Connecting...' : 'Connect Wallet'}
        </Button>
        <WalletSelectionModal
          isOpen={showWalletModal}
          onClose={() => setShowWalletModal(false)}
          onSelectWallet={handleWalletSelect}
        />
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" data-testid="button-wallet-menu">
          <Wallet className="mr-2 h-4 w-4" />
          {publicKey && truncateAddress(publicKey)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Wallet</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={copyAddress} data-testid="menu-copy-address">
          <Copy className="mr-2 h-4 w-4" />
          Copy Address
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setNetwork(network === 'testnet' ? 'mainnet' : 'testnet')}
          data-testid="menu-switch-network"
        >
          <Network className="mr-2 h-4 w-4" />
          Switch to {network === 'testnet' ? 'Mainnet' : 'Testnet'}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={disconnect} data-testid="menu-disconnect">
          <LogOut className="mr-2 h-4 w-4" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
