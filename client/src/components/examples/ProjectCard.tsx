import ProjectCard from '../ProjectCard'

export default function ProjectCardExample() {
  const mockProject = {
    id: '1',
    creatorId: 'creator1',
    name: 'Luna Token',
    symbol: 'LUNA',
    description: 'A revolutionary DeFi token bringing liquidity to the Stellar ecosystem with innovative staking mechanisms.',
    logoUrl: '',
    totalSupply: '1000000000',
    decimals: 7,
    airdropPercent: 40,
    creatorPercent: 30,
    liquidityPercent: 30,
    minimumLiquidity: '500',
    hasVesting: true,
    vestingPeriodDays: 180,
    participationPeriodDays: 7,
    twitterUrl: 'https://twitter.com/lunatoken',
    telegramUrl: '',
    websiteUrl: '',
    contractAddress: 'GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    status: 'active',
    createdAt: new Date(),
    endsAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  }
  
  return (
    <div className="max-w-sm">
      <ProjectCard 
        project={mockProject}
        walletAddress="GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
      />
    </div>
  )
}
