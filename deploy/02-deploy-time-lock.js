const { network, getNamedAccounts, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
const { MIN_DELAY } = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    log("-----------------------------")
    log("Deploying Timelock...")
    const timeLock = await deploy("TimeLock", {
        from: deployer,
        log: true,
        args: [MIN_DELAY, [], []],
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(timeLock.address, [])
    }
}
