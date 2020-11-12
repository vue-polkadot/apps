<template>
  <div>
    <div v-for="token in tokens" :key="token.index">
      <div><b>Index:</b>{{ token.index }}</div>
      <div><b>Collection:</b>{{ token.collection }}</div>
      <div><b>Owner:</b>{{ token.owner }}</div>
      <div><b>Data:</b>{{ token.data }}</div>
    </div>

  </div>
</template>

<script lang="ts" >
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Connector from '@vue-polkadot/vue-api';
import { hexToString } from '@polkadot/util';
import { emptyObject } from '@/utils/empty';

interface NFToken {
  index: number;
  collection: number;
  owner: string;
  data: string | string[];
}

// substrapunks is collection #4
const COLLECTION = 4;
@Component({})
export default class NFT extends Vue {

  private tokens: NFToken[] = [];
  @Prop() public value!: any;


  public async mounted() {
    const { api } = Connector.getInstance();
    const nftPallet = api.query.nft;
    if (!nftPallet) {
      console.warn('NFT PALLET NOT FOUND!');
      return;
    }

    const collectionSize = await nftPallet.itemListIndex(COLLECTION);
    this.magic(nftPallet, 4);

  }

  private magic(nftPallet: any, collectionSize: number) {
    for (let i = 1; i <= collectionSize; i++) {
      this.fetchCollectionItem(nftPallet, i)
    }
  }

  private fetchCollectionItem(nftPallet: any, index: number) {
    nftPallet.nftItemList(COLLECTION, index).then((value: any) => this.process(value, index))     
  }

  private process(result: any, index: number) {
    const token: NFToken = emptyObject<NFToken>();
    token.data = result?.Data?.toString();
    token.collection = result?.Collection?.toString();
    token.owner = result?.Owner?.toString();
    token.index = index;
    this.tokens.push(token)
    console.log('NEW TOKEN', token);
    
  }
}
</script>
