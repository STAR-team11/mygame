import GlobalStats from '../GlobalStats'

export default function GlobalStatsExample() {
  return (
    <div className="p-6">
      <GlobalStats
        totalUsers={12548}
        dailyActiveUsers={3421}
        activeProjects={87}
        totalPointsMinted={1245000}
      />
    </div>
  )
}
