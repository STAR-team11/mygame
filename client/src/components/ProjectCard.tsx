import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Timer, Users, Lock, CheckCircle2, Coins, TrendingUp, ExternalLink } from "lucide-react";
import { type Project } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { buildParticipateTransaction, submitTransaction } from "@/lib/sorobanClient";
import { freighterWallet } from "@/lib/walletConnect";
import { getExplorerUrl } from "@/config/contracts";

interface ProjectCardProps {
  project: Project;
  walletAddress?: string;
  currentUserId?: string;
}

export default function ProjectCard({ project, walletAddress, currentUserId }: ProjectCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [starPoints, setStarPoints] = useState("");
  const { toast } = useToast();

  const daysRemaining = Math.ceil(
    (new Date(project.endsAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const participateMutation = useMutation({
    mutationFn: async (data: { walletAddress: string; starPoints: number }) => {
      // Step 1: Build Soroban transaction
      const network = await freighterWallet.getFreighterNetwork();
      
      // For on-chain project ID, use the local project ID for now
      const onChainProjectId = parseInt(project.id);
      
      const unsignedXDR = await buildParticipateTransaction(
        data.walletAddress,
        onChainProjectId,
        data.starPoints,
        network
      );
      
      // Step 2: Sign with Freighter wallet
      const signedXDR = await freighterWallet.signTransaction(unsignedXDR);
      
      // Step 3: Submit to Stellar network
      const { hash } = await submitTransaction(signedXDR);
      
      // Step 4: Update local database
      const res = await apiRequest("POST", `/api/projects/${project.id}/participate`, {
        ...data,
        txHash: hash,
      });
      const result = await res.json();
      
      return { ...result, txHash: hash, network };
    },
    onSuccess: (data: { participation: { starPointsUsed: number }; burned: number; toCreator: number; txHash: string; network: 'testnet' | 'mainnet' }) => {
      queryClient.invalidateQueries({ queryKey: ["/api/users/me"] });
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats/global"] });
      if (currentUserId) {
        queryClient.invalidateQueries({ queryKey: ["/api/users", currentUserId, "participations"] });
      }
      if (project.creatorId) {
        queryClient.invalidateQueries({ queryKey: ["/api/users", project.creatorId, "projects"] });
      }
      
      const explorerUrl = getExplorerUrl(data.network, 'tx', data.txHash);
      
      toast({
        title: "Participation Successful!",
        description: (
          <div className="space-y-2">
            <p>Participated with {data.participation.starPointsUsed} STAR points! {data.burned} burned, {data.toCreator} to creator</p>
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
      setDialogOpen(false);
      setStarPoints("");
    },
    onError: (error: any) => {
      toast({
        title: "Participation Failed",
        description: error?.message || "Failed to participate in project. Check your STAR points balance.",
        variant: "destructive",
      });
    },
  });

  const handleParticipate = () => {
    if (!walletAddress) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    const points = parseFloat(starPoints);
    if (isNaN(points) || points <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid positive number",
        variant: "destructive",
      });
      return;
    }

    participateMutation.mutate({
      walletAddress: walletAddress!,
      starPoints: points,
    });
  };

  return (
    <>
      <Card className="p-6 hover-elevate transition-all duration-300 border-card-border" data-testid={`card-project-${project.id}`}>
        <div className="flex items-start gap-4 mb-4">
          {project.logoUrl ? (
            <img 
              src={project.logoUrl} 
              alt={project.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {project.symbol.charAt(0)}
              </span>
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold mb-1 truncate" data-testid={`text-project-name-${project.id}`}>
              {project.name}
            </h3>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" data-testid={`badge-symbol-${project.id}`}>
                ${project.symbol}
              </Badge>
              <Badge 
                variant={daysRemaining > 0 ? "default" : "secondary"}
                data-testid={`badge-status-${project.id}`}
              >
                {daysRemaining > 0 ? `${daysRemaining}d left` : "Ended"}
              </Badge>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {project.description}
        </p>
        
        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Timer className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Time Left</div>
              <div className="font-medium">{daysRemaining > 0 ? `${daysRemaining}d` : 'Ended'}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Users className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Airdrop</div>
              <div className="font-medium">{project.airdropPercent}%</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Lock className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Liquidity</div>
              <div className="font-medium">{project.minimumLiquidity} XLM</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <CheckCircle2 className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Supply</div>
              <div className="font-medium">{Number(project.totalSupply).toLocaleString()}</div>
            </div>
          </div>
        </div>
        
        <Button 
          className="w-full" 
          onClick={handleParticipate}
          disabled={daysRemaining <= 0 || !walletAddress}
          data-testid={`button-participate-${project.id}`}
        >
          {!walletAddress ? "Connect Wallet First" : "Participate with STAR Points"}
        </Button>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent data-testid="dialog-participate">
          <DialogHeader>
            <DialogTitle>Participate in {project.name}</DialogTitle>
            <DialogDescription>
              Enter the amount of STAR points you want to use. 50% will be burned, 50% goes to the creator.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="starPoints">STAR Points Amount</Label>
              <Input
                id="starPoints"
                type="number"
                placeholder="Enter amount"
                value={starPoints}
                onChange={(e) => setStarPoints(e.target.value)}
                min="0"
                step="0.1"
                data-testid="input-star-points"
              />
            </div>
            {starPoints && parseFloat(starPoints) > 0 && (
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Breakdown:</p>
                <p>• Burned: {(parseFloat(starPoints) * 0.5).toFixed(2)} STAR</p>
                <p>• To Creator: {(parseFloat(starPoints) * 0.5).toFixed(2)} STAR</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              disabled={participateMutation.isPending}
              data-testid="button-cancel"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={participateMutation.isPending || !starPoints || parseFloat(starPoints) <= 0}
              data-testid="button-confirm-participate"
            >
              {participateMutation.isPending ? "Processing..." : "Participate"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
