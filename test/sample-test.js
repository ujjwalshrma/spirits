const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("Spirits", function() {
  it("Should mint and transfer an NFT to someone", async function() {
    const Spirits = await ethers.getContractFactory("Spirits")
    const spirits = await Spirits.deploy()
    await spirits.deployed()

    const recipent = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    const metadataURI = 'cid/test.png'

    let balance = await spirits.balanceOf(recipent)
    expect(balance).to.equal(0)

    const newlyMintedToken = await spirits.payToMint(recipent, metadataURI, { value: ethers.utils.parseEther('0.05') })
  })
})
