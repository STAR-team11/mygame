import MintPoints from '../MintPoints'

export default function MintPointsExample() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <MintPoints
        currentPoints={5000}
        walletAddress="GEXAMPLEWALLETADDRESS1234567890ABCDEFGHIJKLMNOPQRSTUV"
      />
    </div>
  )
}
