import { CrossChainMessageSent as CrossChainMessageSentEvent } from "../generated/Contract/Contract"
import { CrossChainMessageSent } from "../generated/schema"

export function handleCrossChainMessageSent(
  event: CrossChainMessageSentEvent
): void {
  let entity = new CrossChainMessageSent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.messageId = event.params.messageId
  entity.amount = event.params.amount
  entity.leverage = event.params.leverage
  entity.destinationChainSelector = event.params.destinationChainSelector
  entity.receiver = event.params.receiver
  entity.user = event.params.user

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
