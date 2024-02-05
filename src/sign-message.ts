import { agent } from './veramo/setup.js'
import Web3 from "web3";

async function main() {
  const signed = await agent.keyManagerSign({
    keyRef: "04c5b0ebe28f368103465e7b1ab01d16bd2ba6e6493f065eb06e246db8c766159b59c0ddb28ff11d9d327af0bc7f58f7a58e7168ba9557d8030f35ed0504a1763f",
    algorithm: "eth_signMessage",
    data: 'Hello VWBL',
  })
  
  console.log(signed)

  const web3 = new Web3();
  const verified = web3.eth.accounts.recover('Hello VWBL', signed);
  console.log("verified:", verified);

}

main().catch(console.log)