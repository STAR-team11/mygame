import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Rocket, Coins, TrendingUp, Lock, Users, Zap } from "lucide-react";

export default function Documentation() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-3xl font-bold mb-2">Documentation</h2>
        <p className="text-muted-foreground">
          Complete guide to the STAR platform and tokenomics
        </p>
      </div>

      <Card className="p-8 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
        <div className="flex items-center gap-4 mb-4">
          <svg
            className="w-16 h-16"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="docStarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF6B00" />
                <stop offset="100%" stopColor="#FFA366" />
              </linearGradient>
            </defs>
            <path
              d="M50 5 L61 39 L97 39 L68 61 L79 95 L50 73 L21 95 L32 61 L3 39 L39 39 Z"
              fill="url(#docStarGradient)"
            />
          </svg>
          <div>
            <h3 className="text-2xl font-bold">STR Token</h3>
            <p className="text-muted-foreground">Platform Native Token</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Total Supply</p>
            <p className="text-3xl font-bold">100,000,000 STR</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Distribution</p>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span>Point Holders</span>
                <Badge variant="default">80%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Team & Listing</span>
                <Badge variant="secondary">20%</Badge>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="platform" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="platform">Platform</TabsTrigger>
          <TabsTrigger value="points">STAR Points</TabsTrigger>
          <TabsTrigger value="tokenomics">Tokenomics</TabsTrigger>
        </TabsList>

        <TabsContent value="platform" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <Rocket className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Platform Overview</h3>
                <p className="text-muted-foreground mb-4">
                  STAR is a premium DeFi platform built on Stellar blockchain, enabling users to create and launch tokens with automated liquidity management and fair distribution.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <Zap className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Key Features</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>3-step token creation with smart contract deployment on Stellar testnet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Automated airdrop distribution based on STAR point participation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Liquidity locking with automatic DEX launch after campaign ends</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Optional team vesting mechanisms for long-term alignment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Referral system with multi-level rewards</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">How It Works</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Create Your Token</h4>
                  <p className="text-sm text-muted-foreground">
                    Define token details, supply allocation (airdrop/creator/liquidity), and campaign parameters
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Users Participate</h4>
                  <p className="text-sm text-muted-foreground">
                    Users mint STAR points and participate in your project during the campaign period
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Automatic Launch</h4>
                  <p className="text-sm text-muted-foreground">
                    After campaign ends, tokens are distributed, liquidity is locked, and token launches on DEX
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="points" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <Coins className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">STAR Points System</h3>
                <p className="text-muted-foreground mb-4">
                  STAR points are the participation currency of the platform. Users mint points to participate in token launches.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Minting Points</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <span className="font-medium">Exchange Rate</span>
                <Badge variant="default">1 XLM = 10 STAR</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Convert XLM to STAR points at a fixed 1:10 ratio. Points are used to participate in token launches.
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Participation Mechanics</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">When you participate in a project:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>50% of your STAR points are burned</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>50% go to the project creator</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>You receive a proportional share of the airdrop supply</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Referral System</h3>
            <div className="space-y-3">
              <p className="text-muted-foreground">
                Invite others and earn passive rewards:
              </p>
              <div className="p-3 bg-secondary rounded-lg">
                <p className="font-medium mb-2">You earn 10% of:</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Your referrals' minted STAR points</li>
                  <li>• Your referrals' participation rewards</li>
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="tokenomics" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <TrendingUp className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">STR Tokenomics</h3>
                <p className="text-muted-foreground mb-4">
                  The STR token is the native asset of the STAR platform, distributed to STAR point holders at TGE.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Token Distribution</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Point Holders</span>
                  <Badge variant="default" className="text-lg px-4">80%</Badge>
                </div>
                <div className="h-3 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full w-[80%] bg-gradient-to-r from-primary to-orange-400"></div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  80 million STR tokens distributed proportionally to STAR point holders at TGE
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Team & Listing</span>
                  <Badge variant="secondary" className="text-lg px-4">20%</Badge>
                </div>
                <div className="h-3 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full w-[20%] bg-gradient-to-r from-gray-600 to-gray-500"></div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  20 million STR for team allocation, DEX listing, and operational expenses
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">TGE (Token Generation Event)</h3>
            <p className="text-muted-foreground mb-4">
              At the Token Generation Event, STAR point holders will receive STR tokens based on their point balance.
            </p>
            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm">
                <strong>Example:</strong> If you hold 1% of all STAR points at TGE, you'll receive 1% of 80,000,000 STR (800,000 STR tokens)
              </p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
