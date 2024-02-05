import { ethers } from "ethers";
import contractAbi from "./abi/nftContract.json" assert { type: "json" };

type GasOption = {
  maxPriorityFee: number,
  maxFee: number
}

export class NftContract {
    private ethersProvider: ethers.providers.JsonRpcProvider;
    private ethersSigner: ethers.Wallet;
    private contract: ethers.Contract;
  
    constructor(providerUrl: string, privateKey: string, nftAddress: string) {
      this.ethersProvider = new ethers.providers.JsonRpcProvider(providerUrl);
      this.ethersSigner = new ethers.Wallet(privateKey, this.ethersProvider);
      this.contract = new ethers.Contract(nftAddress, contractAbi.abi, this.ethersSigner);
    }
  
    async safeMint(
      to: string,
      tokenId: number,
      uri: string,
      gasOption?: GasOption
    ) {
      const withSigner = this.contract.connect(this.ethersSigner);
      const tx = gasOption ? await withSigner.safeMint(
          to,tokenId, uri,{
            maxFeePerGas: ethers.utils.parseUnits(gasOption.maxFee.toFixed(9), 'gwei'),
            maxPriorityFeePerGas: ethers.utils.parseUnits(gasOption.maxPriorityFee.toFixed(9), 'gwei')
          }
      ) : await this.contract.safeMint(to, tokenId, uri);
      console.log("txHash:", tx.hash);
      await this.ethersProvider.waitForTransaction(tx.hash);
    }
  
    async tokenURI(tokenId: number): Promise<string> {
      const tokenURI = await this.contract.callStatic.tokenURI(tokenId);
      return tokenURI;
    }
}