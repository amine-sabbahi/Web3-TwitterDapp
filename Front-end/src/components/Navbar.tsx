import { useWeb3Context } from '@/context/Web3Context';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const { connectWallet, account, disconnectWallet } = useWeb3Context();

  return (
    <nav className="border-b border-gray-200 bg-blue-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-2xl font-bold text-white">Web3 Twitter</h1>
          </div>
          <div className="flex items-center">
            {!account ? (
              <Button className="bg-white text-blue-500 font-semibold rounded-full px-4 py-2 hover:bg-blue-100" onClick={connectWallet}>
                Connect Wallet
              </Button>
            ) : (
              <div className="flex items-center gap-4">
                <p className="text-sm text-white font-semibold">
                  {account.slice(0, 6)}...{account.slice(-4)}
                </p>
                <Button className="bg-white text-blue-500 font-semibold rounded-full px-4 py-2 hover:bg-blue-100" onClick={disconnectWallet}>
                  Disconnect
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
