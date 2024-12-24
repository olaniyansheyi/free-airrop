const hre = require("hardhat");

async function main() {
  const freeAirdrop = await hre.ethers.deployContract("FreeAirdrop");

  await freeAirdrop.waitForDeployment();

  console.log(`deployed to ${freeAirdrop.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
