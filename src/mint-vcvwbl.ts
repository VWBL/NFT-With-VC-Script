import { UploadToIPFS } from './uploadIPFS.js';
import { agent } from './veramo/setup.js'
import { utils } from "ethers";
import { VWBLApi, createRandomKey, encryptString } from 'vwbl-sdk';
import dotenv from 'dotenv';
import { NftContract } from './blockchain/nftContract.js';
dotenv.config();

async function main() {
  const vwblAddress = process.env.CONTRACT_ADDRESS!;
  // Create verifiable credential
  const verifiableCredential = await agent.createVerifiableCredential({
     credential: {
      issuer: { id:  'did:ethr:goerli:0x0216f17afc876c83d0d69d8fb3f8ea86da823da1b32043538226fe8f4dda05117b'},
      credentialSubject: {
        contractAddress: vwblAddress,
        tokenId: '1',
        issuerName: 'vwbl team'
      },
    },
    proofFormat: 'jwt',
  })
  console.log(verifiableCredential);
  
  // upload verifiable credential to IPFS
  const uploadToIPFS = new UploadToIPFS(process.env.NFT_STORAGE_KEY!);
  const vcUrl = await uploadToIPFS.uploadVerifiableCredential(JSON.stringify(verifiableCredential));
  console.log(vcUrl);
  
  // encrypt content
  const key = createRandomKey();
  const content = "This is VWBL NFT With Verifiable Credential"
  const encryptedContent = encryptString(content, key);

  // upload metadata to IPFS
  const metadataUrl = await uploadToIPFS.uploadVWBLMetadata('test name', 'test description', 'https://test.com/', [encryptedContent], vcUrl, 'text/plain', "base64");
  console.log(metadataUrl);

  // mint VWBL with VC
  const issuerPubKey = "04c5b0ebe28f368103465e7b1ab01d16bd2ba6e6493f065eb06e246db8c766159b59c0ddb28ff11d9d327af0bc7f58f7a58e7168ba9557d8030f35ed0504a1763f";
  const minterAddress = utils.computeAddress("0x"+issuerPubKey);
  const documentId = utils.hexlify(utils.randomBytes(32));
  const vwblContract = new NftContract(process.env.PROVIDER_URL!, process.env.PRIVATE_KEY!, vwblAddress, true);
  const toAddress = '0x88a3473dA09Cc38Ee29aDD599DAbb8E590bA6fF1';
  vwblContract.mintVWBL(minterAddress, documentId, 5, toAddress, metadataUrl);

  // set key to VWBL Network
  const vwblApi = new VWBLApi(process.env.VWBL_NETWORK_URL!);
  const signedMessage = await agent.keyManagerSign({
    keyRef: issuerPubKey,
    algorithm: "eth_signMessage",
    data: process.env.SIGN_FOR_PROTOCOL!,
  });
  const chainId = await vwblContract.getChainId();
  await vwblApi.setKey(documentId, chainId, key, signedMessage);
}

main().catch(console.log)