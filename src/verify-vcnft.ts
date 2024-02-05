import axios from 'axios';
import { agent } from './veramo/setup.js'
import dotenv from 'dotenv';
import { NftContract } from './blockchain/nftContract.js';
dotenv.config();

async function main(_tokenId: number) {
  const nftContract = new NftContract(process.env.PROVIDER_URL!, process.env.PRIVATE_KEY!, '0xd7E08464E8a8451732F0A8212C033f89bB190a5D')
  const metadataUrl = await nftContract.tokenURI(_tokenId);
  const metadata = (await axios.get(metadataUrl).catch(() => undefined))?.data;
  console.log(metadata);
  const fetchedVC = (await axios.get(metadata.verifiableCredentialUrl).catch(() => undefined))?.data;
  console.log(fetchedVC);
  console.log(JSON.parse(fetchedVC));
  const vc = JSON.parse(fetchedVC);

  const result = await agent.verifyCredential({
    credential: vc
  })
  console.log(`Credential verified:`, result.verified)
  console.log("contract address:", vc.credentialSubject.contractAddress);
  console.log("token Id:", vc.credentialSubject.tokenId);
  // The following verification guarantees that the NFT that copies the issued VC will not pass the verification
  console.log("isCorrectContractAddress:", vc.credentialSubject.contractAddress === '0xd7E08464E8a8451732F0A8212C033f89bB190a5D')
  console.log("isCorrectTokenId:", Number(vc.credentialSubject.tokenId) === _tokenId);
}

main(4).catch(console.log)