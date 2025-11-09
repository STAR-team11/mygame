import CreateProjectWizard from '../CreateProjectWizard'

export default function CreateProjectWizardExample() {
  return (
    <CreateProjectWizard
      onClose={() => console.log('Wizard closed')}
      walletAddress="GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    />
  )
}
