// @flow
export type TypeTimestamp = number;

export type TypeHash = string;

export type TypeBlock = {
  hash: TypeHash,
  prev_block: TypeHash,
  nonce: string,
  time: TypeTimestamp,
  height: string,
  n_tx: number,
  tx: any[]
};
