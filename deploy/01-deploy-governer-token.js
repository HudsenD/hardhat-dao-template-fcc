const { network, getNamedAccounts, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    log("-----------------------------")
    log("Deploying Token")
    const governanceToken = await deploy("GovernanceToken", {
        from: deployer,
        log: true,
        args: [],
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    await delegate(governanceToken.address, deployer)
    log("Delegated!")

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(governanceToken.address, [])
    }
}

const delegate = async (governanceTokenAddress, delegatedAccount) => {
    const governanceToken = await ethers.getContract("GovernanceToken")
    const tx = await governanceToken.delegate(delegatedAccount)
    await tx.wait(1)
    console.log(`Checkpoints ${await governanceToken.numCheckpoints(delegatedAccount)}`)
}
