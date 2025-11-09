import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ArrowRight, ArrowLeft, X, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { buildCreateProjectTransaction, submitTransaction } from "@/lib/sorobanClient";
import { freighterWallet } from "@/lib/walletConnect";
import { getExplorerUrl } from "@/config/contracts";

interface ProjectFormData {
  name: string;
  symbol: string;
  totalSupply: string;
  decimals: number;
  description: string;
  twitterUrl: string;
  telegramUrl: string;
  websiteUrl: string;
  airdropPercent: number;
  creatorPercent: number;
  liquidityPercent: number;
  minimumLiquidity: string;
  hasVesting: boolean;
  vestingPeriodDays: number;
  participationPeriodDays: number;
}

interface CreateProjectWizardProps {
  onClose: () => void;
  walletAddress?: string;
  currentUserId?: string;
}

const RocketIcon = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="rocketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#FF6B00', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#FFA366', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path
      d="M100 20 L120 80 L140 100 L120 120 L100 180 L80 120 L60 100 L80 80 Z"
      fill="url(#rocketGradient)"
    />
    <circle cx="100" cy="60" r="8" fill="#FFF" />
    <path
      d="M70 120 Q60 140 50 160"
      stroke="#FF8533"
      strokeWidth="3"
      fill="none"
      opacity="0.6"
    />
    <path
      d="M130 120 Q140 140 150 160"
      stroke="#FF8533"
      strokeWidth="3"
      fill="none"
      opacity="0.6"
    />
  </svg>
);

const SettingsIcon = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="settingsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#FF6B00', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#FFA366', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <circle cx="100" cy="100" r="30" fill="url(#settingsGradient)" />
    <g>
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <rect
          key={i}
          x="95"
          y="50"
          width="10"
          height="25"
          fill="#FF8533"
          transform={`rotate(${angle} 100 100)`}
        />
      ))}
    </g>
    <circle cx="100" cy="100" r="15" fill="#1A1A1A" />
  </svg>
);

const LaunchIcon = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="launchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#FF6B00', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#FFA366', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <circle
      cx="100"
      cy="100"
      r="50"
      stroke="url(#launchGradient)"
      strokeWidth="4"
      fill="none"
    />
    <circle cx="100" cy="100" r="40" fill="url(#launchGradient)" />
    <path
      d="M100 60 L110 90 L140 90 L115 110 L125 140 L100 120 L75 140 L85 110 L60 90 L90 90 Z"
      fill="#FFF"
    />
  </svg>
);

export default function CreateProjectWizard({ onClose, walletAddress, currentUserId }: CreateProjectWizardProps) {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [warnings, setWarnings] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<ProjectFormData>({
    name: "",
    symbol: "",
    totalSupply: "",
    decimals: 7,
    description: "",
    twitterUrl: "",
    telegramUrl: "",
    websiteUrl: "",
    airdropPercent: 40,
    creatorPercent: 30,
    liquidityPercent: 30,
    minimumLiquidity: "500",
    hasVesting: false,
    vestingPeriodDays: 180,
    participationPeriodDays: 7,
  });

  const createProjectMutation = useMutation({
    mutationFn: async (data: ProjectFormData & { walletAddress: string }) => {
      const network = await freighterWallet.getFreighterNetwork();
      const placeholderTokenAddress = "GBGTK4RQSA3XRJLOW7MX3FJBFPXZVFZLZXUK2WVQXG3DFI5NBVSAMPLE";
      
      const unsignedXDR = await buildCreateProjectTransaction(
        data.walletAddress,
        {
          name: data.name,
          symbol: data.symbol,
          tokenAddress: placeholderTokenAddress,
          totalSupply: data.totalSupply,
          airdropPercent: data.airdropPercent,
          creatorPercent: data.creatorPercent,
          liquidityPercent: data.liquidityPercent,
          minimumLiquidity: data.minimumLiquidity,
          participationPeriodDays: data.participationPeriodDays,
          hasVesting: data.hasVesting,
          vestingPeriodDays: data.vestingPeriodDays,
        },
        network
      );
      
      const signedXDR = await freighterWallet.signTransaction(unsignedXDR);
      const { hash } = await submitTransaction(signedXDR);
      
      const res = await apiRequest("POST", "/api/projects/create", {
        ...data,
        txHash: hash,
      });
      const result = await res.json();
      
      return { ...result, txHash: hash, network };
    },
    onSuccess: (data: { name: string; txHash: string; network: 'testnet' | 'mainnet' }) => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      if (currentUserId) {
        queryClient.invalidateQueries({ queryKey: ["/api/users", currentUserId, "projects"] });
      }
      queryClient.invalidateQueries({ queryKey: ["/api/stats/global"] });
      
      toast({
        title: "🚀 Token Launched Successfully!",
        description: `${data.name} is now live on Stellar blockchain`,
      });
      onClose();
    },
    onError: (error: any) => {
      const errorMessage = error?.details?.[0]?.message || error?.error || error?.message || "Failed to create project";
      toast({
        title: "Launch Failed",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (warnings[field]) {
      setWarnings((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handlePercentChange = (field: 'airdropPercent' | 'creatorPercent' | 'liquidityPercent', value: string) => {
    const numValue = parseInt(value) || 0;
    const clampedValue = Math.max(0, Math.min(100, numValue));
    setFormData((prev) => ({ ...prev, [field]: clampedValue }));
  };

  const validateStep = (currentStep: number): void => {
    const newWarnings: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.name.trim()) newWarnings.name = "Token name is recommended";
      if (!formData.symbol.trim()) newWarnings.symbol = "Symbol is recommended";
      if (!formData.totalSupply || parseFloat(formData.totalSupply) <= 0) {
        newWarnings.totalSupply = "Valid total supply is recommended";
      }
      if (!formData.description.trim()) newWarnings.description = "Description is recommended";
    }

    if (currentStep === 2) {
      const total = formData.airdropPercent + formData.creatorPercent + formData.liquidityPercent;
      if (total !== 100) {
        newWarnings.allocation = "Total allocation should equal 100%";
      }
    }

    if (currentStep === 3) {
      if (!formData.minimumLiquidity || parseFloat(formData.minimumLiquidity) < 500) {
        newWarnings.minimumLiquidity = "Minimum 500 XLM is recommended";
      }
    }

    setWarnings(newWarnings);
  };

  const handleNext = () => {
    validateStep(step);
    setStep(step + 1);
  };

  const handleSubmit = () => {
    if (!walletAddress) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    validateStep(3);
    createProjectMutation.mutate({
      ...formData,
      walletAddress,
    });
  };

  const totalPercent = formData.airdropPercent + formData.creatorPercent + formData.liquidityPercent;

  const steps = [
    { number: 1, title: "Basic Info", icon: RocketIcon },
    { number: 2, title: "Tokenomics", icon: SettingsIcon },
    { number: 3, title: "Launch Config", icon: LaunchIcon },
  ];

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-4xl my-8">
        <Card className="relative border-card-border bg-card/95 backdrop-blur">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-10 p-2 rounded-lg hover-elevate active-elevate-2"
            aria-label="Close"
            data-testid="button-close"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>

          <div className="p-4 sm:p-6 md:p-10">
            <div className="mb-6 md:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-orange-400 to-primary bg-clip-text text-transparent mb-2">
                Launch Your Token
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                Deploy on Stellar in 3 simple steps
              </p>
            </div>

            <div className="mb-6 md:mb-10">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                {steps.map((s, idx) => (
                  <div key={s.number} className="flex items-center flex-1">
                    <div className="flex flex-col items-center gap-1 md:gap-2">
                      <div
                        className={`relative w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center border-2 transition-all ${
                          step >= s.number 
                            ? "bg-gradient-to-br from-primary to-orange-400 border-primary" 
                            : "bg-secondary border-border"
                        }`}
                      >
                        <span className="text-base sm:text-lg md:text-xl font-bold text-white">
                          {s.number}
                        </span>
                      </div>
                      <span className={`text-xs md:text-sm font-medium hidden sm:block ${
                        step >= s.number ? "text-primary" : "text-muted-foreground"
                      }`}>
                        {s.title}
                      </span>
                    </div>
                    {idx < steps.length - 1 && (
                      <div className="flex-1 h-0.5 mx-1 sm:mx-2 md:mx-4 bg-border relative">
                        <div
                          className={`h-full bg-gradient-to-r from-primary to-orange-400 transition-all ${
                            step > s.number ? 'w-full' : 'w-0'
                          }`}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <Progress value={(step / 3) * 100} className="h-1.5" />
            </div>

            <div className="mb-6 md:mb-8">
              <div className="min-h-[300px] md:min-h-[400px]">
                {step === 1 && (
                  <div className="space-y-4 md:space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-medium">
                            Token Name <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="name"
                            placeholder="e.g., Stellar Token"
                            value={formData.name}
                            onChange={(e) => updateField("name", e.target.value)}
                            className="h-12 bg-input border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                            data-testid="input-token-name"
                          />
                          {warnings.name && (
                            <p className="text-xs text-orange-500 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {warnings.name}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="symbol" className="text-sm font-medium">
                            Symbol <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="symbol"
                            placeholder="e.g., STR"
                            value={formData.symbol}
                            onChange={(e) => updateField("symbol", e.target.value.toUpperCase())}
                            className="h-12 bg-input border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                            data-testid="input-token-symbol"
                          />
                          {warnings.symbol && (
                            <p className="text-xs text-orange-500 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {warnings.symbol}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="supply" className="text-sm font-medium">
                            Total Supply <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="supply"
                            type="number"
                            placeholder="1000000"
                            value={formData.totalSupply}
                            onChange={(e) => updateField("totalSupply", e.target.value)}
                            className="h-12 bg-input border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                            data-testid="input-total-supply"
                          />
                          {warnings.totalSupply && (
                            <p className="text-xs text-orange-500 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {warnings.totalSupply}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="decimals" className="text-sm font-medium">
                            Decimals
                          </Label>
                          <Input
                            id="decimals"
                            type="number"
                            value={formData.decimals}
                            onChange={(e) => updateField("decimals", parseInt(e.target.value))}
                            className="h-12 bg-input border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                            data-testid="input-decimals"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-sm font-medium">
                          Description <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                          id="description"
                          placeholder="Describe your token project..."
                          value={formData.description}
                          onChange={(e) => updateField("description", e.target.value)}
                          rows={4}
                          className="bg-input border-border focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                          data-testid="input-description"
                        />
                        {warnings.description && (
                          <p className="text-xs text-orange-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {warnings.description}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="twitter" className="text-xs text-muted-foreground">
                            Twitter
                          </Label>
                          <Input
                            id="twitter"
                            placeholder="https://twitter.com/..."
                            value={formData.twitterUrl}
                            onChange={(e) => updateField("twitterUrl", e.target.value)}
                            className="h-10 text-sm bg-input border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                            data-testid="input-twitter"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="telegram" className="text-xs text-muted-foreground">
                            Telegram
                          </Label>
                          <Input
                            id="telegram"
                            placeholder="https://t.me/..."
                            value={formData.telegramUrl}
                            onChange={(e) => updateField("telegramUrl", e.target.value)}
                            className="h-10 text-sm bg-input border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                            data-testid="input-telegram"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="website" className="text-xs text-muted-foreground">
                            Website
                          </Label>
                          <Input
                            id="website"
                            placeholder="https://..."
                            value={formData.websiteUrl}
                            onChange={(e) => updateField("websiteUrl", e.target.value)}
                            className="h-10 text-sm bg-input border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                            data-testid="input-website"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6 md:space-y-8">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="airdrop" className="text-sm font-medium">Airdrop Allocation</Label>
                          <div className="relative">
                            <Input
                              id="airdrop"
                              type="number"
                              min="0"
                              max="100"
                              value={formData.airdropPercent}
                              onChange={(e) => handlePercentChange("airdropPercent", e.target.value)}
                              className="h-12 bg-input border-border focus:border-primary focus:ring-2 focus:ring-primary/20 pr-8"
                              data-testid="input-airdrop"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Community distribution</p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="creator" className="text-sm font-medium">Creator Allocation</Label>
                          <div className="relative">
                            <Input
                              id="creator"
                              type="number"
                              min="0"
                              max="100"
                              value={formData.creatorPercent}
                              onChange={(e) => handlePercentChange("creatorPercent", e.target.value)}
                              className="h-12 bg-input border-border focus:border-primary focus:ring-2 focus:ring-primary/20 pr-8"
                              data-testid="input-creator"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Team & development</p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="liquidity" className="text-sm font-medium">Liquidity Pool</Label>
                          <div className="relative">
                            <Input
                              id="liquidity"
                              type="number"
                              min="0"
                              max="100"
                              value={formData.liquidityPercent}
                              onChange={(e) => handlePercentChange("liquidityPercent", e.target.value)}
                              className="h-12 bg-input border-border focus:border-primary focus:ring-2 focus:ring-primary/20 pr-8"
                              data-testid="input-liquidity"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                          </div>
                          <p className="text-xs text-muted-foreground">DEX liquidity</p>
                        </div>
                      </div>

                      <div className={`p-4 md:p-6 rounded-md border ${
                        totalPercent === 100 
                          ? "bg-primary/5 border-primary/30" 
                          : "bg-orange-500/5 border-orange-500/30"
                      }`}>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-medium">Total Allocation</span>
                          <Badge 
                            variant={totalPercent === 100 ? "default" : "secondary"}
                            className="text-base px-3 md:px-4 py-1"
                          >
                            {totalPercent}%
                          </Badge>
                        </div>
                        {totalPercent !== 100 && warnings.allocation && (
                          <p className="text-xs text-orange-500 flex items-center gap-1 mt-2">
                            <AlertCircle className="w-3 h-3" />
                            {warnings.allocation}
                          </p>
                        )}
                        {totalPercent === 100 && (
                          <p className="text-xs text-primary mt-2">
                            Perfect! Your tokenomics are balanced
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-4 md:space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="minLiquidity" className="text-sm font-medium">
                          Initial Liquidity (XLM) <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="minLiquidity"
                          type="number"
                          placeholder="500"
                          value={formData.minimumLiquidity}
                          onChange={(e) => updateField("minimumLiquidity", e.target.value)}
                          className="h-12 bg-input border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                          data-testid="input-min-liquidity"
                        />
                        {warnings.minimumLiquidity ? (
                          <p className="text-xs text-orange-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {warnings.minimumLiquidity}
                          </p>
                        ) : (
                          <p className="text-xs text-muted-foreground">
                            Minimum 500 XLM recommended for liquidity lock
                          </p>
                        )}
                      </div>

                      <div className="p-6 bg-secondary/50 rounded-xl border border-border space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="vesting" className="text-sm font-medium cursor-pointer">
                              Enable Team Vesting
                            </Label>
                            <p className="text-xs text-muted-foreground mt-1">
                              Lock team tokens with time-based release schedule
                            </p>
                          </div>
                          <Switch
                            id="vesting"
                            checked={formData.hasVesting}
                            onCheckedChange={(checked) => updateField("hasVesting", checked)}
                            className="data-[state=checked]:bg-primary"
                            data-testid="switch-vesting"
                          />
                        </div>

                        {formData.hasVesting && (
                          <div className="space-y-2 pt-4 border-t border-border">
                            <Label htmlFor="vestingDays" className="text-sm font-medium">
                              Vesting Period (Days)
                            </Label>
                            <Input
                              id="vestingDays"
                              type="number"
                              value={formData.vestingPeriodDays}
                              onChange={(e) => updateField("vestingPeriodDays", parseInt(e.target.value))}
                              className="h-10 bg-input border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                              data-testid="input-vesting-days"
                            />
                            <p className="text-xs text-muted-foreground">
                              Tokens will be locked and released gradually over this period
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="participationDays" className="text-sm font-medium">
                          Participation Period (Days)
                        </Label>
                        <Input
                          id="participationDays"
                          type="number"
                          min={3}
                          max={15}
                          value={formData.participationPeriodDays}
                          onChange={(e) => updateField("participationPeriodDays", parseInt(e.target.value) || 7)}
                          className="h-12 bg-input border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                          data-testid="input-participation"
                        />
                        <p className="text-xs text-muted-foreground">
                          How long users can participate in the airdrop (3-15 days)
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={step === 1 ? onClose : () => setStep(step - 1)}
                disabled={createProjectMutation.isPending}
                className="border-border"
                data-testid="button-back"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                {step === 1 ? "Cancel" : "Back"}
              </Button>

              <Button
                onClick={step === 3 ? handleSubmit : handleNext}
                disabled={createProjectMutation.isPending}
                className="bg-gradient-to-r from-primary to-orange-400 hover:from-primary/90 hover:to-orange-400/90"
                data-testid="button-next"
              >
                {step === 3 ? (
                  createProjectMutation.isPending ? (
                    <>
                      <div className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Launching...
                    </>
                  ) : (
                    "Launch Token"
                  )
                ) : (
                  <>
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
