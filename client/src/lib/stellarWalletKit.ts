import { getPublicKey, isConnected, requestAccess, setAllowed, signTransaction } from "@stellar/freighter-api";

export interface WalletOption {
  id: string;
  name: string;
  available: boolean;
}

export class StellarWalletManager {
  async connectFreighter(): Promise<string | null> {
    try {
      const connected = await isConnected();
      if (!connected) {
        await requestAccess();
      }
      
      const publicKey = await getPublicKey();
      return publicKey;
    } catch (error) {
      console.error("Freighter connection error:", error);
      throw error;
    }
  }

  async signTransaction(xdr: string, network: string): Promise<string> {
    try {
      const signedXDR = await signTransaction(xdr, {
        network,
        networkPassphrase: network === "TESTNET" 
          ? "Test SDF Network ; September 2015"
          : "Public Global Stellar Network ; September 2015",
      });
      return signedXDR;
    } catch (error) {
      console.error("Transaction signing error:", error);
      throw error;
    }
  }

  async getPublicKey(): Promise<string> {
    try {
      return await getPublicKey();
    } catch (error) {
      console.error("Get public key error:", error);
      throw error;
    }
  }

  async isConnected(): Promise<boolean> {
    try {
      return await isConnected();
    } catch (error) {
      return false;
    }
  }
}

export const walletManager = new StellarWalletManager();
