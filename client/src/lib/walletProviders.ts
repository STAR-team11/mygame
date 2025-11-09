export interface WalletProvider {
  id: string;
  name: string;
  icon: string;
  installUrl?: string;
  isInstalled: () => boolean | Promise<boolean>;
  isConnected: () => Promise<boolean>;
  connect: () => Promise<string>;
  disconnect: () => void;
  getPublicKey: () => Promise<string | null>;
  signTransaction: (xdr: string) => Promise<string>;
  getNetwork: () => Promise<string>;
  setNetwork: (network: 'testnet' | 'mainnet') => void;
}

export const STELLAR_WALLETS = {
  FREIGHTER: 'freighter',
  ALBEDO: 'albedo',
  XBULL: 'xbull',
  RABET: 'rabet',
  LOBSTR: 'lobstr',
  HANA: 'hana',
  KLEVER: 'klever',
} as const;

export type StellarWalletId = typeof STELLAR_WALLETS[keyof typeof STELLAR_WALLETS];

export const WALLET_CONFIG: Record<StellarWalletId, { name: string; icon: string; installUrl?: string; available: boolean }> = {
  [STELLAR_WALLETS.FREIGHTER]: {
    name: 'Freighter',
    icon: '🚀',
    installUrl: 'https://www.freighter.app/',
    available: true,
  },
  [STELLAR_WALLETS.ALBEDO]: {
    name: 'Albedo',
    icon: '🔷',
    installUrl: 'https://albedo.link/',
    available: true,
  },
  [STELLAR_WALLETS.XBULL]: {
    name: 'xBull',
    icon: '🐂',
    installUrl: 'https://xbull.app/',
    available: true,
  },
  [STELLAR_WALLETS.RABET]: {
    name: 'Rabet',
    icon: '🐰',
    available: false,
  },
  [STELLAR_WALLETS.LOBSTR]: {
    name: 'LOBSTR',
    icon: '🦞',
    available: false,
  },
  [STELLAR_WALLETS.HANA]: {
    name: 'Hana Wallet',
    icon: '🌸',
    available: false,
  },
  [STELLAR_WALLETS.KLEVER]: {
    name: 'Klever Wallet',
    icon: '▶️',
    available: false,
  },
};
