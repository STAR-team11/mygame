import AppHeader from '../AppHeader'

export default function AppHeaderExample() {
  return (
    <AppHeader 
      onMenuClick={() => console.log('Menu clicked')}
      onConnectWallet={() => console.log('Connect wallet clicked')}
    />
  )
}
