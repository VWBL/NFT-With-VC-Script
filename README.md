## NFT with VC(Verifiable Credential) script

This script is issuing and verifying NFT with VC(Verifiable Credential). VC functionality add a verification layer to ensure the authenticity of NFT issuers. This uses [veramo](https://veramo.io/) as a vc framework.


## Setup Infura Id
```
./src/veramo/setup.ts (line39)
// You will need to get a project ID from infura https://www.infura.io
const INFURA_PROJECT_ID = '${YOUR_INFURA_ID}'
```

## Usage
    yarn

    // registrater issuer did
    yarn ts-node --esm ./src/create-identifier.ts
    // resolve did document
    yarn ts-node --esm ./src/resolve-did.ts
    // list did
    yarn ts-node --esm ./src/list-identifiers.ts
    // mint nft with vc
    yarn ts-node --esm ./src/mint-vcnft.ts
    // verify nft with vc
    yarn ts-node --esm ./src/verify-vcnft.ts
    // sign message by issuer private key
    yarn ts-node --esm ./src/sign-message.ts
