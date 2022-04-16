declare let window: any

import { useState } from 'react'
import { ethers } from 'ethers'

const WalletBalance: React.FC = () => {
  const [balance, setBalance] = useState<any>()

  const getBalance = async () => {
    const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const balance = await provider.getBalance(account)

    setBalance(ethers.utils.formatEther(balance))
  }

  return (
    <div className="wallet-div">
      <h3>{`Your Balance: ${balance ? balance : 'Connect your account to see your balance'} ETH`}</h3>
      <button className='btn' onClick={getBalance}>Show Balance</button>
    </div>
  )
}

export default WalletBalance
