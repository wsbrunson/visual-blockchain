const express = require("express");
const axios = require("axios");
const Web3 = require("web3");

const ethApp = new Web3();
const app = express();

app.get("/api/latestBlock", async (req, res) => {
  console.log("response");
  try {
    const { data } = await axios.get("https://api.blockcypher.com/v1/eth/main");

    res.send(data);
  } catch (e) {
    console.log(e);

    res.send(data);
  }
});

app.get("/api/block", async (req, res) => {
  const { id } = req.query;

  if (id) {
    try {
      const { data } = await axios.get(
        `https://blockchain.info/rawblock/${id}`
      );

      res.send(data);
    } catch (error) {
      console.log(error);

      res.send(data);
    }
  }
});

const port = process.env.PORT || 3001;

app.listen(port);
