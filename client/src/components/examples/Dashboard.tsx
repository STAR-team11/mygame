import Dashboard from '../Dashboard'

export default function DashboardExample() {
  const mockUser = {
    walletAddress: 'GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    starPoints: 15420,
    referralCode: 'STAR123ABC',
    referredBy: undefined,
  }

  return (
    <div className="p-6">
      <Dashboard
        user={mockUser}
        myProjects={[]}
        myParticipations={[]}
        referrals={[
          { walletAddress: 'GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', starPoints: 2500 },
          { walletAddress: 'GBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB', starPoints: 1200 },
        ]}
      />
    </div>
  )
}
