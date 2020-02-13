<template>
  <div class="card proposal-card">
    <div class="card-content proposal-content">
      <div>{{ referendum.index.toString() }}</div>
      <div class="proposal-proposer">
        <div>Indenticon Here</div>
        <div>{{ referendum.preimage.proposer.toString() }}</div>
      </div>
     <!--  <div class="proposal-proposal">
        <div>{{ referendum.proposal.callIndex }}</div>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({

})
export default class Referendum extends Vue {
  @Prop() referendum: any;
}
</script>


<style scoped>
.card.proposal-card {
  margin-bottom: 1em;
}

.card-content.proposal-content {
  display: flex;
  justify-content: space-between;
  padding: 1em;
}
</style>