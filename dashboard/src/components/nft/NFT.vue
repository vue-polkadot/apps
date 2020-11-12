<template>
  <div>


  </div>
</template>

<script lang="ts" >
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Connector from '@vue-polkadot/vue-api';
import { hexToString } from '@polkadot/util';
import { emptyObject } from '@/utils/empty';

interface NFToken {
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
    this.magic(nftPallet, 1);

  }

  private magic(nftPallet: any, collectionSize: number) {
    for (let i = 1; i <= collectionSize; i++) {
      this.fetchCollectionItem(nftPallet, i)
    }
  }

  private fetchCollectionItem(nftPallet: any, index: number) {
    nftPallet.nftItemList(COLLECTION, index).then(this.process)     
  }

  private process(result: any) {
    const token: NFToken = emptyObject<NFToken>();
    token.data = hexToString(result?.Data);
    token.collection = result?.Collection?.toString();
    token.owner = result?.Owner?.toString();
    console.log('NEW TOKEN', token);
    
  }
}
</script>
