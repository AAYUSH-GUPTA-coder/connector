import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, BigInt, Address } from "@graphprotocol/graph-ts"
import { CrossChainMessageSent } from "../generated/Contract/Contract"

export function createCrossChainMessageSentEvent(
  messageId: Bytes,
  amount: BigInt,
  leverage: BigInt,
  destinationChainSelector: BigInt,
  receiver: Address,
  user: Address
): CrossChainMessageSent {
  let crossChainMessageSentEvent = changetype<CrossChainMessageSent>(
    newMockEvent()
  )

  crossChainMessageSentEvent.parameters = new Array()

  crossChainMessageSentEvent.parameters.push(
    new ethereum.EventParam(
      "messageId",
      ethereum.Value.fromFixedBytes(messageId)
    )
  )
  crossChainMessageSentEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  crossChainMessageSentEvent.parameters.push(
    new ethereum.EventParam(
      "leverage",
      ethereum.Value.fromUnsignedBigInt(leverage)
    )
  )
  crossChainMessageSentEvent.parameters.push(
    new ethereum.EventParam(
      "destinationChainSelector",
      ethereum.Value.fromUnsignedBigInt(destinationChainSelector)
    )
  )
  crossChainMessageSentEvent.parameters.push(
    new ethereum.EventParam("receiver", ethereum.Value.fromAddress(receiver))
  )
  crossChainMessageSentEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )

  return crossChainMessageSentEvent
}
