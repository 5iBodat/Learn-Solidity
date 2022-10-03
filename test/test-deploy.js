const { ethers } = require('hardhat')
const { expact, assert } = require("chai")

describe('SimpleStorage', () => {
    let SimpleStorageFactory
    let simpleStorage
    beforeEach(async () => {
        SimpleStorageFactory = await ethers.getContractFactory(
            "SimpleStorage"
        )

        simpleStorage = await SimpleStorageFactory.deploy()
    })

    it("should start with a favorite number of 0", async () => {
        const currentValue = await simpleStorage.retrive()
        const expectedValue = "0"

        assert.equal(currentValue.toString(), expectedValue)

    })

    it("should update when we call store", async () => {
        const expectedValue = '7'
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)

        const currentValue = await simpleStorage.retrive()
        assert.equal(currentValue.toString(), expectedValue)
    })

    it("should add person when we call addPerson", async () => {
        const expectedName = "sahat"
        const expectedFavNumber = "7"


        const transactionResponse = await simpleStorage.addPerson(expectedName, expectedFavNumber)
        await transactionResponse.wait(1)

        const currentValue = await simpleStorage.people(0)

        console.log(currentValue)
        assert.equal(currentValue.name.toString(), expectedName)
        assert.equal(currentValue.favNumber.toString(), expectedFavNumber)
    })
})