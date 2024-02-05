import { agent } from './veramo/setup.js'

async function main() {
  const didDocument = await agent.resolveDid({
    didUrl: 'did:ethr:goerli:0x0304ec43e1510029d2bc230d41c17b27a9ac3f132dc254d3453e1f0b6a21f2fdd1'
  })
  console.log(didDocument.didDocument)
}

main().catch(console.log)