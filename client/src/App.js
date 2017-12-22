import React, { Component } from "react";
import styled from "styled-components";

import { fetchLatestBlock, fetchBlockForHash } from "./blockServices";

import type { TypeHash, TypeBlock } from "./types.flow";

const States = {
  INIT: "INIT",
  FETCH_PREVIOUS: "FETCH_PREVIOUS",
  FETCH_NEXT: "FETCH_NEXT",
  LOAD: "LOAD",
  ERROR: "ERROR"
};

type TypeState = {
  state: $Keys<typeof States>,
  currentBlockHash: TypeHash,
  lastestBlockHash: TypeHash,
  blocks: {
    [hash: TypeHash]: TypeBlock
  }
};

const AppComponent = styled.div`
  text-align: center;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
`;

const BlockChainContainer = styled.div`
  min-height: 300px;
  min-width: 150px;
  display: flex;
  align-items: center;
  padding: 20px;
  border: solid black 5px;
`;

const BlockInfoContainer = styled.div`
  min-height: 300px;
  min-width: 150px;
  padding: 20px;
  border: solid black 5px;
  text-align: left;
`;

export default class App extends Component<void, TypeState> {
  state = {
    state: States.INIT,
    currentBlockHash: "",
    lastestBlockHash: "",
    blocks: {}
  };

  async componentDidMount() {
    this.getLatestBlock();
  }

  async getLatestBlock() {
    try {
      const currentBlock = await fetchLatestBlock();
      console.log(currentBlock);
      const { hash } = currentBlock;

      this.setState({
        state: States.LOAD,
        currentBlockHash: hash,
        lastestBlockHash: hash,
        blocks: {
          ...this.state.blocks,
          [hash]: currentBlock
        }
      });
    } catch (_) {
      this.setState({ state: States.ERROR });
    }
  }

  async getPreviousBlockForHash() {
    this.setState({ state: States.FETCH_PREVIOUS });

    try {
      const currentBlock = await fetchBlockForHash(this.state.currentBlockHash);
      const { hash } = currentBlock;

      this.setState({
        state: States.LOAD,
        currentBlockHash: hash,
        blocks: {
          [hash]: currentBlock
        }
      });
    } catch (_) {
      this.setState({ state: States.ERROR });
    }
  }

  getContent = () => {
    const { state, blocks, currentBlockHash } = this.state;
    const currentBlock = blocks[currentBlockHash];

    return (
      <Content>
        {state === States.LOAD && (
          <div>
            <BlockChainContainer />
            <BlockInfoContainer>
              <p>Nonce: {currentBlock.nonce}</p>
              <p>Time: {currentBlock.time}</p>
              <p>Height: {currentBlock.height}</p>
              <p>Transaction Count: {currentBlock.n_tx}</p>
            </BlockInfoContainer>
          </div>
        )}
        {state === States.FETCHING && (
          <div>
            <BlockChainContainer />
            <BlockInfoContainer>
              <p>Nonce: </p>
              <p>Time: </p>
              <p>Height: </p>
              <p>Transaction Count: </p>
            </BlockInfoContainer>
          </div>
        )}
        <ButtonGroup>
          <button onClick={this.getPreviousBlockForHash.bind(this)}>
            Get Previous Block
          </button>
          <button onClick={() => {}}>Get Next Block</button>
        </ButtonGroup>
      </Content>
    );
  };

  render() {
    const { state } = this.state;
    return (
      <AppComponent>
        <h1>Blockchain Visualizer</h1>
        {state === States.INIT && <p>Fetching latest Block data...</p>}
        {state === States.ERROR && (
          <div>
            <p>
              There was an error fetching blocks. Please refresh to try again or
              press the button below to retry fetching the latest block.
            </p>
            <button onClick={this.getLatestBlock.bind(this)}>
              Re-fetch Latest Block
            </button>
          </div>
        )}
        {(state === States.LOAD || state === States.FETCHING) &&
          this.getContent()}
      </AppComponent>
    );
  }
}
