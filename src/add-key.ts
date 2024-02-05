import { agent } from './veramo/setup.js'

async function main() {
  const key = await agent.keyManagerCreate({
    kms: 'local',
    type: 'Secp256k1',
  });
  console.log("key:", key);
  key.meta!.blockchainAccountId = 'eip155:5:0xaa5709bEE14f391401c0Fe23b2a1832fb2313AFB'
  console.log("key:", key);

  const result = await agent.didManagerAddKey({
    did: "did:ethr:goerli:0x0361fe5fcf149e7abdb8bcfd624bfc8aa2aa71f90b9dbfc3d9c933caf36fad0d3c",
    key,
  })
  console.log("add key result:", result);
}

main().catch(console.log)