import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Database, Users, Rocket, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface GlobalStatsData {
  totalUsers: number;
  dailyActiveUsers: number;
  activeProjects: number;
  totalPointsMinted: number;
}

export default function GlobalStats() {
  const { data, isLoading } = useQuery<GlobalStatsData>({
    queryKey: ["/api/stats/global"],
  });

  const totalUsers = data?.totalUsers || 0;
  const dailyActiveUsers = data?.dailyActiveUsers || 0;
  const activeProjects = data?.activeProjects || 0;
  const totalPointsMinted = data?.totalPointsMinted || 0;

  const stats = [
    {
      label: "Total Users",
      value: totalUsers.toLocaleString(),
      icon: Users,
      color: "from-primary to-orange-400",
    },
    {
      label: "Daily Active Users",
      value: dailyActiveUsers.toLocaleString(),
      icon: TrendingUp,
      color: "from-orange-400 to-primary",
    },
    {
      label: "Active Projects",
      value: activeProjects.toLocaleString(),
      icon: Rocket,
      color: "from-primary to-orange-500",
    },
    {
      label: "Total STAR Points Minted",
      value: totalPointsMinted.toLocaleString(),
      icon: Database,
      color: "from-orange-500 to-primary",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Global Statistics</h2>
        <p className="text-muted-foreground">
          Real-time platform metrics and activity
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          <>
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Skeleton className="h-12 w-12 rounded-lg" />
                </div>
                <Skeleton className="h-10 w-24 mb-2" />
                <Skeleton className="h-4 w-32" />
              </Card>
            ))}
          </>
        ) : (
          stats.map((stat, index) => (
            <Card
              key={stat.label}
              className="p-6 hover-elevate transition-all duration-300"
              data-testid={`card-stat-${index}`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <div
                  className={`text-4xl font-bold mb-1 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                  data-testid={`text-stat-value-${index}`}
                >
                  {stat.value}
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </Card>
          ))
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Platform Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Projects Launched Today</span>
              <span className="font-semibold text-lg">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total Participation</span>
              <span className="font-semibold text-lg">3,456</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total Liquidity Locked</span>
              <span className="font-semibold text-lg">245,000 XLM</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">STR Token Info</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total Supply</span>
              <span className="font-semibold text-lg">100,000,000</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">For Point Holders</span>
              <span className="font-semibold text-lg text-primary">80%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Team & Listing</span>
              <span className="font-semibold text-lg">20%</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
