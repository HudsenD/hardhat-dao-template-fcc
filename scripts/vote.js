const fs = require("fs")
const { network, ethers } = require("hardhat")
const { proposalFile, VOTING_PERIOD } = require("../helper-hardhat-config")
const { moveBlocks } = require("../utils/move-blocks")

const index = 0

async function main(proposalIndex) {
    const proposals = JSON.parse(fs.readFileSync(proposalFile, "utf8"))
    const proposalId = proposals[network.config.chainId][proposalIndex]
    // 0 = Against, 1 = For, 2 = Abstain
    const voteWay = 1
    const governor = await ethers.getContract("GovernorContract")
    const reason = "Becuz I wannnaa"
    const castVoteTx = await governor.castVoteWithReason(proposalId, voteWay, reason)
    await castVoteTx.wait(1)

    if (network.config.chainId == "31337") {
        await moveBlocks(VOTING_PERIOD + 1, (sleepAmount = false))
    }
    console.log("Voted! Ready to go!")

    const proposalState = await governor.state(proposalId)
    console.log(proposalState.toString())
}

main(index)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
