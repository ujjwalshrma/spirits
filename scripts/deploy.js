const hre = require("hardhat");

async function main() {
  const Spirits = await hre.ethers.getContractFactory("Spirits");
  const spirits = await Spirits.deploy();

  await spirits.deployed();

  console.log("Spirits deployed to:", spirits.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
