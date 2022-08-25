const { network, getNamedAccounts, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    log("-----------------------------")
    log("Deploying box...")
    const box = await deploy("Box", {
        from: deployer,
        log: true,
        args: [],
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    const timeLock = await ethers.getContract("TimeLock")
    const boxContract = await ethers.getContract("Box")
    const transferOwnerTx = await boxContract.transferOwnership(timeLock.address)
    await transferOwnerTx.wait(1)
    log("SUCCESS AT LAST!!")

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(box.address, [])
    }
}
