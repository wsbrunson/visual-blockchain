// @flow
import type { TypeBlock } from "./types.flow";

export async function fetchLatestBlock(): Promise<TypeBlock> {
  const latestBlockResponse = await fetch(
    "https://blockchain.info/latestblock?cors=true"
  );
  const latestBlock = await latestBlockResponse.json();
  const latestBlockDetailsResponse = await fetch(
    `https://blockchain.info/rawblock/${latestBlock.hash}`
  );

  return await latestBlockDetailsResponse.json();
}

export async function fetchBlockForHash(hash: string): Promise<TypeBlock> {
  const blockResponse = await fetch(`https://blockchain.info/rawblock/${hash}`);

  return await blockResponse.json();
}
