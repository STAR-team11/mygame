import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExternalLink, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { User } from "@shared/schema";
import { buildMintStarPointsTransaction, submitTransaction } from "@/lib/sorobanClient";
import { freighterWallet } from "@/lib/walletConnect";
import { getExplorerUrl } from "@/config/contracts";

interface MintPointsProps {
  currentPoints: number;
  walletAddress?: string;
  currentUserId?: string;
}

export default function MintPoints({ currentPoints, walletAddress, currentUserId }: MintPointsProps) {
  const [xlmAmount, setXlmAmount] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const starPoints = xlmAmount ? parseFloat(xlmAmount) * 10 : 0;
  const { toast } = useToast();

  const mintMutation = useMutation({
    mutationFn: async (data: { walletAddress: string; xlmAmount: number }) => {
      const network = await freighterWallet.getFreighterNetwork();
      const unsignedXDR = await buildMintStarPointsTransaction(
        data.walletAddress,
        data.xlmAmount,
        network
      );
      
      const signedXDR = await freighterWallet.signTransaction(unsignedXDR);
      const { hash } = await submitTransaction(signedXDR);
      
      const res = await apiRequest("POST", "/api/points/mint", {
        ...data,
        txHash: hash,
      });
      const result = await res.json();
      
      return { ...result, txHash: hash, network };
    },
    onSuccess: (data: { user: User; transaction: { xlmAmount: number; starPointsMinted: number; referrerReward: number; referrerWallet: string | null }; txHash: string; network: 'testnet' | 'mainnet' }) => {
      queryClient.invalidateQueries({ queryKey: ["/api/users/me"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats/global"] });
      if (currentUserId) {
        queryClient.invalidateQueries({ queryKey: ["/api/users", currentUserId, "projects"] });
        queryClient.invalidateQueries({ queryKey: ["/api/users", currentUserId, "participations"] });
      }
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setXlmAmount("");
      
      const explorerUrl = getExplorerUrl(data.network, 'tx', data.txHash);
      
      toast({
        title: "STAR Points Minted!",
        description: (
          <div className="space-y-2">
            <p>Successfully minted {data.transaction.starPointsMinted.toLocaleString()} STAR points from {data.transaction.xlmAmount} XLM{data.transaction.referrerReward > 0 ? `. Your referrer earned ${data.transaction.referrerReward.toLocaleString()} bonus points!` : ""}</p>
            <a 
              href={explorerUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-primary hover:underline"
            >
              View on Stellar Explorer <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        ),
      });
    },
    onError: (error) => {
      toast({
        title: "Minting Failed",
        description: error instanceof Error ? error.message : "Failed to mint STAR points. Check your wallet balance and network connection.",
        variant: "destructive",
      });
    },
  });

  const handleMint = () => {
    if (!walletAddress) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    if (!xlmAmount || parseFloat(xlmAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid XLM amount",
        variant: "destructive",
      });
      return;
    }

    mintMutation.mutate({
      walletAddress,
      xlmAmount: parseFloat(xlmAmount),
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 px-4 sm:px-6 pb-8">
      <div className="text-center pt-4 sm:pt-8">
        <h2 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-orange-400 to-primary bg-clip-text text-transparent">
          Mint STAR Points
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Convert your XLM to STAR points instantly at a 1:10 ratio
        </p>
      </div>

      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-orange-500/30 to-primary/30 rounded-2xl blur-xl opacity-75"></div>
        <Card className="relative border-primary/20 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-orange-500/10 to-transparent rounded-full blur-3xl -z-10"></div>
          
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col items-center mb-8 sm:mb-10">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-orange-500 rounded-full blur-2xl opacity-40 animate-pulse-slow"></div>
                <svg
                  className={`w-24 h-24 sm:w-32 sm:h-32 relative ${showSuccess ? 'animate-success-bounce' : 'animate-float'}`}
                  viewBox="0 0 120 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="coinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F59E0B" />
                      <stop offset="50%" stopColor="#F97316" />
                      <stop offset="100%" stopColor="#EA580C" />
                    </linearGradient>
                    <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FDE047" />
                      <stop offset="50%" stopColor="#FACC15" />
                      <stop offset="100%" stopColor="#F59E0B" />
                    </linearGradient>
                  </defs>
                  <circle cx="60" cy="60" r="50" fill="url(#coinGradient)" opacity="0.9" />
                  <circle cx="60" cy="60" r="42" fill="#1A1A1A" opacity="0.3" />
                  <path
                    d="M60 25 L68 48 L92 48 L73 62 L81 85 L60 71 L39 85 L47 62 L28 48 L52 48 Z"
                    fill="url(#starGradient)"
                    className={showSuccess ? 'animate-star-glow' : ''}
                  />
                </svg>
              </div>

              <div className="text-center space-y-2 mb-6">
                <p className="text-sm sm:text-base text-muted-foreground font-medium">Your Current Balance</p>
                <div className={`text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary via-orange-400 to-orange-500 bg-clip-text text-transparent ${showSuccess ? 'animate-balance-update' : ''}`}>
                  {currentPoints.toLocaleString()}
                </div>
                <p className="text-lg sm:text-xl text-muted-foreground font-semibold">STAR Points</p>
              </div>
            </div>

            <div className="space-y-6 max-w-xl mx-auto">
              <div className="space-y-3">
                <Label htmlFor="xlm-amount" className="text-base font-semibold">Enter XLM Amount</Label>
                <div className="relative">
                  <Input
                    id="xlm-amount"
                    type="number"
                    placeholder="100"
                    value={xlmAmount}
                    onChange={(e) => setXlmAmount(e.target.value)}
                    className="text-xl sm:text-2xl h-14 sm:h-16 pl-4 pr-16 bg-background/50 border-primary/30 focus:border-primary/60 font-semibold"
                    data-testid="input-xlm-amount"
                    disabled={mintMutation.isPending}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold text-lg">
                    XLM
                  </div>
                </div>
              </div>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-primary/20"></div>
                </div>
                <div className="relative flex justify-center">
                  <div className="bg-card px-4 py-2 rounded-full border border-primary/30">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary/10 via-orange-500/10 to-primary/10 rounded-xl p-6 border border-primary/20">
                <p className="text-sm text-muted-foreground text-center mb-2">You will receive</p>
                <div className="text-4xl sm:text-5xl font-bold text-center bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">
                  {starPoints.toLocaleString()}
                </div>
                <p className="text-lg text-center mt-2 text-muted-foreground font-semibold">STAR Points</p>
                <p className="text-xs text-center mt-3 text-muted-foreground">
                  Conversion Rate: 1 XLM = 10 STAR
                </p>
              </div>

              <Button
                onClick={handleMint}
                disabled={!xlmAmount || parseFloat(xlmAmount) <= 0 || mintMutation.isPending}
                className="w-full h-14 sm:h-16 text-lg sm:text-xl font-bold bg-gradient-to-r from-primary via-orange-500 to-primary bg-[length:200%_100%] hover:bg-right transition-all duration-500 shadow-lg shadow-primary/25 hover:shadow-primary/40 disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="button-mint"
              >
                {mintMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    Minting...
                  </>
                ) : (
                  'Mint STAR Points'
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="p-5 sm:p-6 border-primary/10 hover:border-primary/30 transition-colors">
          <div className="space-y-2">
            <h3 className="font-semibold text-base sm:text-lg text-foreground">Participate in Token Launches</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Use your STAR points to back promising projects. 50% supports creators, 50% is burned to maintain value.
            </p>
          </div>
        </Card>

        <Card className="p-5 sm:p-6 border-primary/10 hover:border-primary/30 transition-colors">
          <div className="space-y-2">
            <h3 className="font-semibold text-base sm:text-lg text-foreground">Earn Referral Rewards</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Share your referral code and earn 10% of all STAR points your referrals mint or use for participation.
            </p>
          </div>
        </Card>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.6; }
        }
        @keyframes success-bounce {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.1); }
          50% { transform: scale(0.95); }
          75% { transform: scale(1.05); }
        }
        @keyframes star-glow {
          0%, 100% { filter: drop-shadow(0 0 8px #FDE047); }
          50% { filter: drop-shadow(0 0 20px #FACC15); }
        }
        @keyframes balance-update {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .animate-success-bounce {
          animation: success-bounce 0.6s ease-in-out;
        }
        .animate-star-glow {
          animation: star-glow 1s ease-in-out 3;
        }
        .animate-balance-update {
          animation: balance-update 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
