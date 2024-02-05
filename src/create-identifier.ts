import { agent } from './veramo/setup.js'

async function main() {
  const identifier = await agent.didManagerCreate({ provider: 'did:ethr:goerli' })
  console.log(`New identifier created`)
  console.log(JSON.stringify(identifier, null, 2))

  const ids = await agent.didManagerFind()
  console.log(ids)
}

main().catch(console.log)