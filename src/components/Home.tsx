declare let window: any
import placeholder from '../images/placeholder.png'
import React, { useEffect, useState } from 'react'
import WalletBalance from './WalletBalance'

import { ethers } from 'ethers'
import Spirit from '../artifacts/contracts/SpiritsNFT.sol/Spirits.json'

const contractAddress = '0xd59c3eb8dDA4B2B4a5fB6391a036C245132309Ab'

const provider = new ethers.providers.Web3Provider(window.ethereum)

const signer = provider.getSigner()

const contract = new ethers.Contract(contractAddress, Spirit.abi, signer)

interface NFTImageProps {
  getCount: () => void
  tokenId?: string
}

const NFTImage: React.FC<NFTImageProps> = ({ tokenId, getCount }) => {
  const [isMinted, setIsMinted] = useState(false)

  useEffect(() => {
    getMintedStatus()
  }, [isMinted])

  const contentId = 'QmWf9FHYoYMrnpLXUaZ9qvHf1TxXZQPPviLh4eFMa6Ybnu'
  const metadataURI = `${contentId}/${tokenId}.json`

  const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${tokenId}.png`

  const getMintedStatus = async () => {
    const result = await contract.isContentOwned(metadataURI)
    setIsMinted(result)
  }

  const mintToken = async () => {
    const connection = contract.connect(signer)
    const addr = connection.address
    const result = await contract.payToMint(addr, metadataURI, {
      value: ethers.utils.parseEther('0.05'),
    })

    await result.wait()
    getMintedStatus()
    getCount()
  }

  async function getURI() {
    const uri = await contract.tokenURI(tokenId)
    alert(uri)
  }

  return (
    <div>
      <img src={isMinted ? imageURI : placeholder} />
      <div>
        <h3>ID #{tokenId}</h3>
        {!isMinted ? (
          <button onClick={mintToken}>Mint</button>
        ) : (
          <button className="btn taken">Taken!</button>
        )}
      </div>
    </div>
  )
}

const Home: React.FC = () => {
  const [totalMinted, setTotalMinted] = useState(0)

  useEffect(() => {
    if (totalMinted >= 4) return
    getCount()
  }, [])

  const getCount = async () => {
    if (totalMinted >= 3) return
    const count = await contract.count()
    console.log(parseInt(count))
    setTotalMinted(parseInt(count))
  }

  return (
    <div className="home-div-wrapper">
      <WalletBalance />
      <h1>Spirits NFT Collection.</h1>
      <div className="hero-images-div">
        {Array(totalMinted + 1)
          .fill(0)
          .map((_, i) => (
            <div key={i}>
              <NFTImage tokenId={`nft${i + 1}`} getCount={getCount} />
            </div>
          ))}
      </div>
    </div>
  )
}

export default Home
