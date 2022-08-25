const { ethers, network } = require("hardhat")
const fs = require("fs")
const { NEW_STORE_VALUE, FUNC, PROPOSAL_DESCRIPTION, VOTING_DELAY, proposalFile } = require("../helper-hardhat-config")
const { moveBlocks } = require("../utils/move-blocks")

async function propose(args, functionToCall, proposalDescription) {
    const governor = await ethers.getContract("GovernorContract")
    const box = await ethers.getContract("Box")
    const encodedFunctionCall = box.interface.encodeFunctionData(functionToCall, args)
    console.log(encodedFunctionCall)
    console.log(`Proposing ${functionToCall} on ${box.address} with ${args}`)
    console.log(`Proposal Description: \n ${proposalDescription}`)
    const proposeTx = await governor.propose([box.address], [0], [encodedFunctionCall], proposalDescription)
    const proposeReceipt = await proposeTx.wait(1)
    console.log("Propose complete!")

    if (network.config.chainId == "31337") {
        await moveBlocks(VOTING_DELAY + 1, (sleepAmount = false))
    }

    const proposalId = proposeReceipt.events[0].args.proposalId
    let proposals = JSON.parse(fs.readFileSync(proposalFile), "utf8")
    proposals[network.config.chainId.toString()].push(proposalId.toString())
    fs.writeFileSync(proposalFile, JSON.stringify(proposals))
}

propose([NEW_STORE_VALUE], FUNC, PROPOSAL_DESCRIPTION)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
