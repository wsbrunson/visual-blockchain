// @flow
import type { TypeBlock } from "./types.flow";

export async function fetchLatestBlock(): Promise<TypeBlock> {
  try {
    const latestBlockResponse = await fetch("api/latestblock");
    const body = await latestBlockResponse.json();
    console.log(body);
    return body;
  } catch (e) {
    console.log(e);
  }
}

export async function fetchBlockForHash(hash: string): Promise<TypeBlock> {
  console.log(hash);
  const blockResponse = await fetch(`api/block/?id=${hash}`);

  return await blockResponse.json();
}
