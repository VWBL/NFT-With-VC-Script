import { Blob, NFTStorage } from "nft.storage";
import {
  EncryptLogic,
} from "vwbl-sdk";

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

  async uploadNFTMetadata(
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

  async uploadVWBLMetadata(
    name: string,
    description: string,
    previewImageUrl: string,
    encryptedDataUrls: string[],
    verifiableCredentialUrl: string,
    mimeType: string,
    encryptLogic: EncryptLogic
  ): Promise<string> {
    const metadata = {
      name,
      description,
      image: previewImageUrl,
      encrypted_data: encryptedDataUrls,
      verifiable_credential: verifiableCredentialUrl,
      mime_type: mimeType,
      encrypt_logic: encryptLogic,
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