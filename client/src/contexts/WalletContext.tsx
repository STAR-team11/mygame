import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { freighterWallet, NetworkType } from '@/lib/walletConnect';
import { useToast } from '@/hooks/use-toast';

interface WalletContextType {
  publicKey: string | null;
  network: NetworkType;
  isConnected: boolean;
  isInstalled: boolean;
  connecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  setNetwork: (network: NetworkType) => void;
  signTransaction: (xdr: string) => Promise<string>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [network, setNetworkState] = useState<NetworkType>('testnet');
  const [connecting, setConnecting] = useState(false);
  const { toast } = useToast();

  const isInstalled = freighterWallet.isInstalled();
  const isConnected = publicKey !== null;

  useEffect(() => {
    const checkConnection = async () => {
      if (!isInstalled) return;

      try {
        const connected = await freighterWallet.isConnected();
        if (connected) {
          const key = await freighterWallet.getPublicKey();
          if (key) {
            setPublicKey(key);
          }
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    };

    checkConnection();
  }, [isInstalled]);

  const connect = async () => {
    if (!isInstalled) {
      toast({
        title: 'Freighter Not Installed',
        description: 'Please install the Freighter wallet extension to continue.',
        variant: 'destructive',
      });
      return;
    }

    setConnecting(true);
    try {
      const key = await freighterWallet.connect();
      setPublicKey(key);
      toast({
        title: 'Wallet Connected',
        description: 'Successfully connected to Freighter wallet',
      });
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast({
        title: 'Connection Failed',
        description: error instanceof Error ? error.message : 'Failed to connect wallet',
        variant: 'destructive',
      });
    } finally {
      setConnecting(false);
    }
  };

  const disconnect = () => {
    setPublicKey(null);
    freighterWallet.disconnect();
    toast({
      title: 'Wallet Disconnected',
      description: 'Your wallet has been disconnected',
    });
  };

  const setNetwork = (newNetwork: NetworkType) => {
    setNetworkState(newNetwork);
    freighterWallet.setNetwork(newNetwork);
    toast({
      title: 'Network Changed',
      description: `Switched to ${newNetwork}`,
    });
  };

  const signTransaction = async (xdr: string): Promise<string> => {
    if (!isConnected) {
      throw new Error('Wallet not connected');
    }

    try {
      return await freighterWallet.signTransaction(xdr);
    } catch (error) {
      console.error('Error signing transaction:', error);
      throw error;
    }
  };

  return (
    <WalletContext.Provider
      value={{
        publicKey,
        network,
        isConnected,
        isInstalled,
        connecting,
        connect,
        disconnect,
        setNetwork,
        signTransaction,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
