const { ethers } = require("hardhat")

const networkConfig = {
    4: {
        name: "rinkeby",
        vrfCoordinatorV2: "0x6168499c0cFfCaCD319c818142124B7A15E857ab",
        entranceFee: "10000000000000000",
        gasLane: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc",
        subscriptionId: "9397",
        callbackGasLimit: "500000",
        interval: "30", //this is in seconds
        mintFee: "10000000000000000",
        ethUsdPriceFeed: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e",
    },
    137: {
        name: "polygon",
        vrfCoordinatorV2: "0xAE975071Be8F8eE67addBC1A82488F1C24858067",
    },
    31337: {
        name: "hardhat",
        entranceFee: "10000000000000000",
        gasLane: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc", //can use anything here, doesn't matter
        subscriptionId: "1",
        callbackGasLimit: "500000",
        interval: "30", //this is in seconds
        mintFee: "10000000000000000", // 0.01 ETH
    },
}

const developmentChains = ["hardhat", "localhost"]
const DECIMALS = 8
const INITIAL_ANSWER = 200000000000
const MIN_DELAY = 3600 //seconds
const VOTING_PERIOD = 5 // blocks
const VOTING_DELAY = 1 // block
const QUORUM_PERCENTAGE = 4 // 4 percent of voters need to have voted for a vote to pass
const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000"
const NEW_STORE_VALUE = 77
const FUNC = "updateValue"
const PROPOSAL_DESCRIPTION = "Proposal #1: Store 77 in the Box"
const proposalFile = "proposals.json"

module.exports = {
    networkConfig,
    developmentChains,
    DECIMALS,
    INITIAL_ANSWER,
    MIN_DELAY,
    VOTING_PERIOD,
    VOTING_DELAY,
    QUORUM_PERCENTAGE,
    ADDRESS_ZERO,
    NEW_STORE_VALUE,
    FUNC,
    PROPOSAL_DESCRIPTION,
    proposalFile,
}
