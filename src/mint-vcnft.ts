import { UploadToIPFS } from './uploadIPFS.js';
import { agent } from './veramo/setup.js'
import dotenv from 'dotenv';
import { NftContract } from './blockchain/nftContract.js';
dotenv.config();

async function main() {
  // Create verifiable credential
  const verifiableCredential = await agent.createVerifiableCredential({
     credential: {
      issuer: { id:  'did:ethr:goerli:0x0216f17afc876c83d0d69d8fb3f8ea86da823da1b32043538226fe8f4dda05117b'},
      credentialSubject: {
        contractAddress: '0xd7E08464E8a8451732F0A8212C033f89bB190a5D',
        tokenId: '5',
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
  
  // upload metadata to IPFS
  const metadataUrl = await uploadToIPFS.uploadMetadata('test name', 'test description', 'https://test.com/', vcUrl);
  console.log(metadataUrl);

  // mint NFT with VC
  const nftContract = new NftContract(process.env.PROVIDER_URL!, process.env.PRIVATE_KEY!, '0xd7E08464E8a8451732F0A8212C033f89bB190a5D')
  nftContract.safeMint('0x88a3473dA09Cc38Ee29aDD599DAbb8E590bA6fF1', 4, metadataUrl);
}

main().catch(console.log)
