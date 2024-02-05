import { agent } from './veramo/setup.js'

async function main() {
  const result = await agent.verifyCredential({
    credential: {
      "credentialSubject": {
        "contractAddress": "0xd7E08464E8a8451732F0A8212C033f89bB190a5D",
        "tokenId": "5",
        "issuerName": "vwbl team"
      },
      "issuer": {
        "id": "did:ethr:goerli:0x0216f17afc876c83d0d69d8fb3f8ea86da823da1b32043538226fe8f4dda05117b"
      },
      "type": [
        "VerifiableCredential"
      ],
      "@context": [
        "https://www.w3.org/2018/credentials/v1"
      ],
      "issuanceDate": "2023-08-01T06:39:25.000Z",
      "proof": {
        "type": "JwtProof2020",
        "jwt": "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImNvbnRyYWN0QWRkcmVzcyI6IjB4ZDdFMDg0NjRFOGE4NDUxNzMyRjBBODIxMkMwMzNmODliQjE5MGE1RCIsInRva2VuSWQiOiI0IiwiaXNzdWVyTmFtZSI6Im9zYWthIGV4cG8ifX0sIm5iZiI6MTY5MDg3MTk2NSwiaXNzIjoiZGlkOmZha2U6ejZNa2dicU5VNHVGOU5LU3o1QnFKUTRYS1ZIdVFaWWNVWlA4cFhHc0pDOG5USHdvIn0.A8eUvY0u4mxosav8FL2nUHZjXrYbBfrdzY-qJULLfiL9OuBg0twkrB3Qel_WuBL3uVj_HlbiFzgY2_Rx5ZIDDA"
      }
    }
  })

  console.log(`Credential verified`, result.verified)
}

main().catch(console.log)