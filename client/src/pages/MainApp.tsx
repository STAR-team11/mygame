import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useWallet } from "@/contexts/WalletContext";
import AppHeader from "@/components/AppHeader";
import Sidebar from "@/components/Sidebar";
import ProjectCard from "@/components/ProjectCard";
import CreateProjectWizard from "@/components/CreateProjectWizard";
import MintPoints from "@/components/MintPoints";
import GlobalStats from "@/components/GlobalStats";
import Dashboard from "@/components/Dashboard";
import Documentation from "@/components/Documentation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { FaTwitter, FaTelegram, FaDiscord } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { User, Project } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function MainApp() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("launch");
  const [showCreateWizard, setShowCreateWizard] = useState(false);
  const { toast } = useToast();
  const { publicKey: walletAddress, isConnected } = useWallet();

  const referralCode = new URLSearchParams(window.location.search).get("ref");

  const { data: currentUser } = useQuery<User | null>({
    queryKey: ["/api/users/me", walletAddress],
    enabled: !!walletAddress,
    queryFn: async () => {
      if (!walletAddress) return null;
      const res = await fetch(`/api/users/me?walletAddress=${encodeURIComponent(walletAddress)}`);
      if (!res.ok) return null;
      return res.json();
    },
  });

  const { data: referrals = [] } = useQuery<User[]>({
    queryKey: ["/api/users", currentUser?.id, "referrals"],
    enabled: !!currentUser?.id,
  });

  const { data: projects = [], isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
    queryFn: async () => {
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error("Failed to fetch projects");
      return res.json();
    },
  });

  const connectWalletMutation = useMutation({
    mutationFn: async (data: { walletAddress: string; referralCode?: string }) => {
      const res = await apiRequest("POST", "/api/auth/connect", data);
      return res.json();
    },
    onSuccess: (user: User) => {
      queryClient.invalidateQueries({ queryKey: ["/api/users/me"] });
    },
    onError: (error) => {
      toast({
        title: "Connection Failed",
        description: error instanceof Error ? error.message : "Failed to connect wallet",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (walletAddress && isConnected && !currentUser) {
      connectWalletMutation.mutate({
        walletAddress,
        referralCode: referralCode || undefined,
      });
    }
  }, [walletAddress, isConnected]);

  return (
    <div className="min-h-screen bg-background">
      <AppHeader
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
      />

      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="container mx-auto px-6 py-8 pb-8">
        {activeTab === "launch" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">Token Launches</h2>
                <p className="text-muted-foreground">
                  Participate in active token launches with STAR points
                </p>
              </div>
              <Button
                onClick={() => setShowCreateWizard(true)}
                data-testid="button-create-project"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Project
              </Button>
            </div>

            {projectsLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No active projects yet</p>
                <Button
                  onClick={() => setShowCreateWizard(true)}
                  data-testid="button-create-first-project"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create First Project
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    walletAddress={walletAddress}
                    currentUserId={currentUser?.id}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "mint" && currentUser && (
          <MintPoints 
            currentPoints={currentUser.starPoints} 
            walletAddress={walletAddress}
            currentUserId={currentUser.id}
          />
        )}

        {activeTab === "global" && <GlobalStats />}

        {activeTab === "dashboard" && currentUser && (
          <Dashboard
            user={{
              id: currentUser.id,
              walletAddress: currentUser.walletAddress,
              starPoints: currentUser.starPoints,
              referralCode: currentUser.referralCode,
            }}
            referrals={referrals}
          />
        )}

        {activeTab === "docs" && <Documentation />}

        {activeTab === "join" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Join Our Community</h2>
              <p className="text-muted-foreground">
                Connect with us on social media and stay updated
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Button
                variant="outline"
                className="h-32 flex-col gap-4 hover-elevate"
                onClick={() => window.open("https://twitter.com", "_blank")}
                data-testid="button-join-twitter"
              >
                <FaTwitter className="h-12 w-12 text-primary" />
                <span className="text-lg font-semibold">Twitter</span>
              </Button>

              <Button
                variant="outline"
                className="h-32 flex-col gap-4 hover-elevate"
                onClick={() => window.open("https://t.me", "_blank")}
                data-testid="button-join-telegram"
              >
                <FaTelegram className="h-12 w-12 text-primary" />
                <span className="text-lg font-semibold">Telegram</span>
              </Button>

              <Button
                variant="outline"
                className="h-32 flex-col gap-4 hover-elevate"
                onClick={() => window.open("https://discord.com", "_blank")}
                data-testid="button-join-discord"
              >
                <FaDiscord className="h-12 w-12 text-primary" />
                <span className="text-lg font-semibold">Discord</span>
              </Button>
            </div>
          </div>
        )}
      </main>

      {showCreateWizard && (
        <CreateProjectWizard
          onClose={() => setShowCreateWizard(false)}
          walletAddress={walletAddress}
          currentUserId={currentUser?.id}
        />
      )}
    </div>
  );
}
