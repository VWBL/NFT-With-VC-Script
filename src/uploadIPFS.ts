import { Blob, NFTStorage } from "nft.storage";

export class UploadToIPFS {
  private client: NFTStorage;
  constructor(ipfsNftStorageKey: string) {
    this.client = new NFTStorage({ token: ipfsNftStorageKey });
  }

  async uploadVerifiableCredential(
    verifiableCredential: string
  ): Promise<string> {

    const vcJSON = JSON.stringify(verifiableCredential);
    const metaDataBlob = new Blob([vcJSON]);

    let cid;
    try {
      cid = await this.client.storeBlob(metaDataBlob);
    } catch (err: any) {
      throw new Error(err);
    }

    return `https://nftstorage.link/ipfs/${cid}`;
  }

  async uploadMetadata(
    name: string,
    description: string,
    previewImageUrl: string,
    verifiableCredentialUrl: string
  ): Promise<string> {
    const metadata = {
      name,
      description,
      image: previewImageUrl,
      verifiableCredentialUrl
    };

    const metadataJSON = JSON.stringify(metadata);
    const metaDataBlob = new Blob([metadataJSON]);

    let cid;
    try {
      cid = await this.client.storeBlob(metaDataBlob);
    } catch (err: any) {
      throw new Error(err);
    }

    return `https://nftstorage.link/ipfs/${cid}`;
  }
}