const { network, getNamedAccounts, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
const { VOTING_PERIOD, VOTING_DELAY, QUORUM_PERCENTAGE } = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log, get } = deployments
    const { deployer } = await getNamedAccounts()
    log("-----------------------------")
    const governanceToken = await get("GovernanceToken") // two different ways. get and ethers.getContract
    const timeLock = await get("TimeLock")
    log("Deploying Governor Contract...")
    const governorContract = await deploy("GovernorContract", {
        from: deployer,
        log: true,
        args: [governanceToken.address, timeLock.address, VOTING_DELAY, VOTING_PERIOD, QUORUM_PERCENTAGE],
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(governorContract.address, [])
    }
}
