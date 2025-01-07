const hre = require("hardhat");

async function main() {
  // Deploy the contract
  const freeAirdrop = await hre.ethers.deployContract("FreeAirdrop");

  // Wait for the deployment to complete
  const tx = await freeAirdrop.waitForDeployment();

  console.log(`Contract deployed to: ${freeAirdrop.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
