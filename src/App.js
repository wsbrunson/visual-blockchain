import React, { Component } from "react";

import "./App.css";

const States = {
  INIT: "INIT",
  FETCHING: "FETCHING",
  LOAD: "LOAD",
  ERROR: "ERROR"
};

async function fetchLatestBlock() {
  const latestBlockResponse = await fetch(
    "https://blockchain.info/latestblock"
  );
  const latestBlock = await latestBlockResponse.json();
  const latestBlockDetailsResponse = await fetch(
    `https://blockchain.info/rawblock/${latestBlock.hash}`
  );

  return await latestBlockDetailsResponse.json();
}

async function fetchBlockForHash(hash, nextHash) {
  const blockResponse = await fetch(`https://blockchain.info/rawblock/${hash}`);
  const block = await blockResponse.json();

  return Object.assign({}, block, { next_block: nextHash });
}

class App extends Component {
  state = {
    state: States.INIT,
    currentBlock: {}
  };

  async componentDidMount() {
    const currentBlock = await fetchLatestBlock();

    this.setState({ state: States.LOAD, currentBlock });
  }

  async getBlockForHash(hash) {
    this.setState({ state: States.FETCHING });

    const currentBlock = await fetchBlockForHash(
      hash,
      this.state.currentBlock.hash
    );

    this.setState({ state: States.LOAD, currentBlock });
  }

  render() {
    switch (this.state.state) {
      case States.INIT:
        return (
          <div className="App">
            <h1>Blockchain Visualizer</h1>
            <p>Fetching latest Block data...</p>
          </div>
        );
      case States.FETCHING:
        return (
          <div className="App">
            <h1>Blockchain Visualizer</h1>
            <p>Fetching previous Block data...</p>
          </div>
        );
      case States.LOAD:
        const { currentBlock } = this.state;

        console.log(currentBlock);

        return (
          <div className="App">
            <h1>Blockchain Visualizer</h1>
            <p>Hash: {currentBlock.hash}</p>
            <p>Nonce: {currentBlock.nonce}</p>
            <p>Time: {currentBlock.time}</p>
            <p>Height: {currentBlock.height}</p>
            <p>Transaction Count: {currentBlock.n_tx}</p>
            <ol>
              {currentBlock.tx
                .filter((_, index) => index < 5)
                .map(transaction => <li>{transaction.value}</li>)}
            </ol>
            <button
              onClick={() => this.getBlockForHash(currentBlock.prev_block)}
            >
              Get Previous Block
            </button>
            <button
              onClick={() => this.getBlockForHash(currentBlock.next_block)}
            >
              Get Next Block
            </button>
          </div>
        );
      default:
        return null;
    }
  }
}

export default App;
