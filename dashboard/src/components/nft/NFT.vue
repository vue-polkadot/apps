<template>
  <div>
    <div class="card nft-card" v-for="token in tokens" :key="token.index">
      <div class="card-image" v-if="token.image">
        <b-image
          :src="token.image"
          :alt="token.index.toString()"
          ratio="1by1"
          rounded
        ></b-image>
      </div>
      <div class="card-content">
        <h2><b>Index:</b>{{ token.index }}</h2>
        <div><b>Collection:</b>{{ token.collection }}</div>
        <div class="nft-card__owner"><b>Owner:</b>{{ token.owner }}</div>
        <div><b>Data:</b>{{ token.data }}</div>
        <b-tag type="is-primary" size="is-medium">{{ token.sex }}</b-tag>
        <b-taglist v-if="token.attributes">
        <b-tag type="is-dark" size="is-medium" v-for="attr in token.attributes" :key="attr">
          {{ attr }}
        </b-tag>
        </b-taglist>
      </div>
    </div>
  </div>
</template>




<script lang="ts" >
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Connector from '@vue-polkadot/vue-api';
import { hexToString } from '@polkadot/util';
import { emptyObject } from '@/utils/empty';
import attributes from './punksAttr';
import { PunkNFT, Collection } from './types';

// substrapunks is collection #4
const COLLECTION = 4;
const regex = /{id}/;

@Component({})
export default class NFT extends Vue {
  private tokens: PunkNFT[] = [];
  private collection: Collection = emptyObject<Collection>();

  public async mounted() {
    const { api } = Connector.getInstance();
    const nftPallet = api.query.nft;
    if (!nftPallet) {
      console.warn('NFT PALLET NOT FOUND!');
      return;
    }

    const collectionSize = await nftPallet.itemListIndex(COLLECTION);
    const collection = await nftPallet.collection(COLLECTION);
    console.log('collection', collection);
    this.processCollection(collection);
    console.log('collection', this.collection);
    this.magic(nftPallet, 4);
  }

  private magic(nftPallet: any, collectionSize: number) {
    for (let i = 1; i <= collectionSize; i++) {
      this.fetchCollectionItem(nftPallet, i);
    }
  }

  private fetchCollectionItem(nftPallet: any, index: number) {
    nftPallet
      .nftItemList(COLLECTION, index)
      .then((value: any) => this.process(value, index));
  }

  private process(result: any, index: number) {
    const token: PunkNFT = emptyObject<PunkNFT>();
    token.data = result?.Data?.toString();
    token.collection = result?.Collection?.toString();
    token.owner = result?.Owner?.toString();
    token.index = index;
    token.sex = result?.Data[2] ? 'Female' : 'Male';
    token.attributes = this.extractAttributes(result?.Data);
    if (this.collection.offchainSchema) {
      token.image = this.collection.offchainSchema?.replace(regex, `${index}`);
    }
    this.tokens.push(token);
    console.log('NEW TOKEN', token);
  }

  private processCollection(collection: any) {
    this.collection.owner = collection?.Owner?.toString();
    this.collection.name = collection?.Name?.toString();
    this.collection.description = collection?.Description?.toString();
    this.collection.tokenPrefix = collection?.TokenPrefix?.toString();
    this.collection.offchainSchema = collection?.OffchainSchema?.toHuman();
    this.collection.sponsor = collection?.Sponsor?.toString();
    this.collection.unconfirmedSponsor = collection?.UnconfirmedSponsor?.toString();
  }

  private extractAttributes(data: number[]): string[] {
    const attrArray: string[] = [];
    for (let i = 0; i < 7; i++) {
      if (data[i + 3] !== 255) attrArray.push(attributes[data[i + 3]]);
    }

    return attrArray;
  }
}
</script>

<style scoped>
.card.nft-card {
  margin: 1em !important;
}

.nft-card__owner {
  word-break: break-word;
}
</style>
