import { Networks } from '@stellar/stellar-sdk';

export type NetworkType = 'testnet' | 'mainnet';

export interface FreighterAPI {
  isConnected: () => Promise<boolean>;
  getPublicKey: () => Promise<string>;
  signTransaction: (xdr: string, options?: {
    network?: string;
    networkPassphrase?: string;
  }) => Promise<string>;
  getNetwork: () => Promise<string>;
  isAllowed: () => Promise<boolean>;
  setAllowed: () => Promise<void>;
}

declare global {
  interface Window {
    freighter?: FreighterAPI;
  }
}

export class FreighterWallet {
  private network: NetworkType = 'testnet';

  isInstalled(): boolean {
    return typeof window !== 'undefined' && window.freighter !== undefined;
  }

  async isConnected(): Promise<boolean> {
    if (!this.isInstalled()) {
      return false;
    }
    try {
      return await window.freighter!.isConnected();
    } catch (error) {
      console.error('Error checking connection:', error);
      return false;
    }
  }

  async connect(): Promise<string> {
    if (!this.isInstalled()) {
      throw new Error('Freighter wallet is not installed');
    }

    try {
      const isAllowed = await window.freighter!.isAllowed();
      if (!isAllowed) {
        await window.freighter!.setAllowed();
      }

      const publicKey = await window.freighter!.getPublicKey();
      if (!publicKey) {
        throw new Error('Failed to get public key from Freighter');
      }

      return publicKey;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to connect to Freighter: ${error.message}`);
      }
      throw new Error('Failed to connect to Freighter');
    }
  }

  async getPublicKey(): Promise<string | null> {
    if (!this.isInstalled()) {
      return null;
    }

    try {
      const publicKey = await window.freighter!.getPublicKey();
      return publicKey || null;
    } catch (error) {
      console.error('Error getting public key:', error);
      return null;
    }
  }

  async signTransaction(xdr: string): Promise<string> {
    if (!this.isInstalled()) {
      throw new Error('Freighter wallet is not installed');
    }

    try {
      const networkPassphrase = this.network === 'testnet'
        ? Networks.TESTNET
        : Networks.PUBLIC;

      const signedXdr = await window.freighter!.signTransaction(xdr, {
        network: this.network,
        networkPassphrase,
      });

      if (!signedXdr) {
        throw new Error('Failed to sign transaction');
      }

      return signedXdr;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to sign transaction: ${error.message}`);
      }
      throw new Error('Failed to sign transaction');
    }
  }

  setNetwork(network: NetworkType): void {
    this.network = network;
  }

  getNetwork(): NetworkType {
    return this.network;
  }

  getNetworkPassphrase(): string {
    return this.network === 'testnet' ? Networks.TESTNET : Networks.PUBLIC;
  }

  async getFreighterNetwork(): Promise<NetworkType> {
    if (!this.isInstalled()) {
      return 'testnet';
    }

    try {
      const network = await window.freighter!.getNetwork();
      if (network.toLowerCase().includes('public') || network.toLowerCase().includes('mainnet')) {
        return 'mainnet';
      }
      return 'testnet';
    } catch (error) {
      console.error('Error getting Freighter network:', error);
      return 'testnet';
    }
  }

  getFreighterInstallUrl(): string {
    return 'https://www.freighter.app/';
  }

  disconnect(): void {
    this.network = 'testnet';
  }
}

export const freighterWallet = new FreighterWallet();
