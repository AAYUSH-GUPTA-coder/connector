import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Bytes, BigInt, Address } from "@graphprotocol/graph-ts"
import { CrossChainMessageSent } from "../generated/schema"
import { CrossChainMessageSent as CrossChainMessageSentEvent } from "../generated/Contract/Contract"
import { handleCrossChainMessageSent } from "../src/contract"
import { createCrossChainMessageSentEvent } from "./contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let messageId = Bytes.fromI32(1234567890)
    let amount = BigInt.fromI32(234)
    let leverage = BigInt.fromI32(234)
    let destinationChainSelector = BigInt.fromI32(234)
    let receiver = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let user = Address.fromString("0x0000000000000000000000000000000000000001")
    let newCrossChainMessageSentEvent = createCrossChainMessageSentEvent(
      messageId,
      amount,
      leverage,
      destinationChainSelector,
      receiver,
      user
    )
    handleCrossChainMessageSent(newCrossChainMessageSentEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("CrossChainMessageSent created and stored", () => {
    assert.entityCount("CrossChainMessageSent", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "CrossChainMessageSent",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "messageId",
      "1234567890"
    )
    assert.fieldEquals(
      "CrossChainMessageSent",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount",
      "234"
    )
    assert.fieldEquals(
      "CrossChainMessageSent",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "leverage",
      "234"
    )
    assert.fieldEquals(
      "CrossChainMessageSent",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "destinationChainSelector",
      "234"
    )
    assert.fieldEquals(
      "CrossChainMessageSent",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "receiver",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "CrossChainMessageSent",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "user",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
