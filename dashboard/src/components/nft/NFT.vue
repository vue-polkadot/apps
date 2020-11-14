<template>
  <div>
    <div class="nft-gallery__title">SubstraPunks NTF Gallery</div>
    <b-loading is-full-page v-model="isLoading" :can-cancel="true"></b-loading>
    <b-field label="Owners">
      <b-select
        placeholder="Select an owner"
        :value="selectedOwner"
        @input="handleOwner"
      >
        <option v-for="option in allOwners" :value="option" :key="option">
          {{ option }}
        </option>
      </b-select>
    </b-field>
    <div class="columns is-multiline ">
      <div
        class="column is-one-fifth-desktop is-one-third-tablet card nft-card "
        v-for="token in filteredTokens"
        :key="token.index"
      >
        <div class="card-image" v-if="token.image">
          <b-image
            :src="token.image"
            :alt="token.index.toString()"
            ratio="1by1"
            rounded
          ></b-image>
        </div>

        <div class="card-content">
          <div class="nft-card__index">SubstraPunk #{{ token.index }}</div>
          <div><b>Collection:</b>{{ token.collection }}</div>
          <div class="nft-card__owner"><b>Owner:</b>{{ token.owner }}</div>
          <div class="nft-card__owner"><b>Data:</b>{{ token.data }}</div>
          <b-tag type="is-primary" size="is-medium">{{ token.sex }}</b-tag>
          <b-taglist v-if="token.attributes">
            <b-tag
              type="is-dark"
              size="is-medium"
              v-for="attr in token.attributes"
              :key="attr"
            >
              {{ attr }}
            </b-tag>
          </b-taglist>
        </div>
      </div>
    </div>
    <b-button v-if="remaining" type="is-primary" @click="load" expanded outlined>Load ({{ remaining }} more)</b-button>
  </div>
</template>




<script lang="ts" >
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Connector from '@vue-polkadot/vue-api';
import { hexToString } from '@polkadot/util';
import { emptyObject } from '@/utils/empty';
import attributes from './punksAttr';
import { PunkNFT, Collection, Counter } from './types';
import U64 from '@polkadot/types/primitive/U64';


// substrapunks is collection #4
const COLLECTION = 4;
const regex = /{id}/;
const _allOwners = 'All';

interface OwnerMap {
  [owner: string]: number;
}

@Component({})
export default class NFT extends Vue {
  private tokens: PunkNFT[] = [];
  private ownerMap: OwnerMap = {
    [_allOwners]: 0
  };
  private filteredTokens: PunkNFT[] = [];
  private selectedOwner: string = _allOwners;
  private collection: Collection = emptyObject<Collection>();
  private isLoading: boolean = false;
  private collectionSize: number = 0;
  private min = 1;
  private max = 33;
  private chunkSize = 16;

  

  public async mounted() {
    const { api } = Connector.getInstance();
    const nftPallet = api.query.nft;
    if (!nftPallet) {
      console.warn('NFT PALLET NOT FOUND!');
      return;
    }

    const collectionSize = await nftPallet.itemListIndex(COLLECTION);
    const collection = await nftPallet.collection(COLLECTION);
    this.collectionSize = Number(collectionSize.toString());
    this.processCollection(collection);
    this.load();
  }

  get nftPallet() {
    const { api } = Connector.getInstance();
    return api.query.nft;
  }

  get remaining() {
    const count = this.collectionSize - this.min + 1
    return count < 0 ? 0 : count ;
  }

  private load() {
    this.isLoading = true;
    console.log('collection', this.collection);
    this.magic();
  }

  private magic() {
    const nftPallet = this.nftPallet;
    for (let i = this.min; i <= this.max; i++) {
      this.fetchCollectionItem(nftPallet, i);
    }

    this.min += this.max;
    this.max += this.remaining < this.chunkSize ? this.remaining : this.chunkSize;
    this.isLoading = false;
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
    if (this.ownerMap[token.owner]) {
      this.$set(this.ownerMap, token.owner, this.ownerMap[token.owner] + 1);
    } else {
      this.$set(this.ownerMap, token.owner, 1);
    }

    this.tokens.push(token);
    this.filteredTokens.push(token);
    console.log('NEW TOKEN', token);
  }

  get allOwners(): string[] {
    return Object.keys(this.ownerMap);
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

  private async handleOwner(newOwner: string) {
    if (newOwner === _allOwners) {
      this.filteredTokens = [...this.tokens];
      return;
    }

    const { api } = Connector.getInstance();
    const userTokens = await api.query.nft.addressTokens(COLLECTION, newOwner);
    this.filteredTokens = [];

    ((userTokens as unknown) as U64[])
      ?.map(tokenIndex => tokenIndex?.toNumber())
      .forEach(tokenIndex => {
        const index = tokenIndex - 1;
        if (this.tokens[index]) {
          this.filteredTokens.push(this.tokens[index]);
        }
      });
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

.nft-card__index {
  font-size: 1.35em;
  font-weight: bold;
}

.nft-gallery__title {
  font-size: 2em;
  font-weight: 500;
}
</style>
