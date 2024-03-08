import { ethers } from "ethers";
import nftContractAbi from "./abi/nftContract.json" assert { type: "json" };
import vwblContractAbi from "./abi/vwblContract.json" assert { type: "json" };

type GasOption = {
  maxPriorityFee: number,
  maxFee: number
}

export class NftContract {
    private ethersProvider: ethers.providers.JsonRpcProvider;
    private ethersSigner: ethers.Wallet;
    private contract: ethers.Contract;
  
    constructor(providerUrl: string, privateKey: string, nftAddress: string, isVWBL: boolean) {
      this.ethersProvider = new ethers.providers.JsonRpcProvider(providerUrl);
      this.ethersSigner = new ethers.Wallet(privateKey, this.ethersProvider);
      const abi = isVWBL ? vwblContractAbi.abi : nftContractAbi.abi;
      this.contract = new ethers.Contract(nftAddress, abi, this.ethersSigner);
    }

    async getChainId() {
      return await this.ethersSigner.getChainId();
    }
  
    async mintNFT(
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

    async mintVWBL(
      minter: string,
      documentId: string,
      tokenId: number,
      to: string,
      uri: string,
      gasOption?: GasOption
    ) {
      const withSigner = this.contract.connect(this.ethersSigner);
      const tx = gasOption ? await withSigner.mintVWBL(
          minter, documentId, tokenId, to, uri,{
            maxFeePerGas: ethers.utils.parseUnits(gasOption.maxFee.toFixed(9), 'gwei'),
            maxPriorityFeePerGas: ethers.utils.parseUnits(gasOption.maxPriorityFee.toFixed(9), 'gwei')
          }
      ) : await this.contract.mintVWBL(minter, documentId, tokenId, to, uri);
      console.log("txHash:", tx.hash);
      await this.ethersProvider.waitForTransaction(tx.hash);
    }
  
    async tokenURI(tokenId: number): Promise<string> {
      const tokenURI = await this.contract.callStatic.tokenURI(tokenId);
      return tokenURI;
    }
}