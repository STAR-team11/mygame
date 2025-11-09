export const SOROBAN_RPC_URL = "https://soroban-testnet.stellar.org";

// Placeholder contract addresses - will be replaced after deployment
export const STAR_TOKEN_CONTRACT_ID = "CBGTK4RQSA3XRJLOW7MX3FJBFPXZVFZLZXUK2WVQXG3DFI5NBVSAMPLE";
export const TOKEN_LAUNCH_CONTRACT_ID = "CCGTK4RQSA3XRJLOW7MX3FJBFPXZVFZLZXUK2WVQXG3DFI5NBVSAMPLE";

// Stellar Explorer URLs
export const TESTNET_EXPLORER_BASE = "https://stellar.expert/explorer/testnet";
export const PUBLIC_EXPLORER_BASE = "https://stellar.expert/explorer/public";

export function getExplorerUrl(network: 'testnet' | 'mainnet', type: 'tx' | 'contract', id: string): string {
  const base = network === 'testnet' ? TESTNET_EXPLORER_BASE : PUBLIC_EXPLORER_BASE;
  return `${base}/${type}/${id}`;
}
