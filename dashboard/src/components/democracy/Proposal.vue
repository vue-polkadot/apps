<template>
  <div class="card proposal-card">
    <div class="card-content proposal-content">
      <div class="proposal-index">{{ proposal.index.toString() }}</div>
      <div class="proposal-proposer">
        <div>Indenticon Here</div>
        <div>{{ proposal.proposer.toString() }}</div>
      </div>
      <div class="proposal-balance">
      <div>Locked</div>
      <div>{{ proposal.balance }}</div>
      </div>
      <div class="proposal-proposal" @click="toggleArgsVisible">
        <div>
          {{ proposal.proposal.sectionName }}.{{
            proposal.proposal.methodName
          }}
        </div>
        <div
          v-for="(doc, index) in proposal.proposal.meta['documentation']"
          :key="index"
        >
          {{ doc }}
        </div>
      </div>
    
    </div>
    <div v-if="isArgsVisible">
        <div v-for="second in proposal.seconds" :key="second.toString()">
          {{ second }}
        </div>
        <b-message type="is-info">  
            <label><b>Proposal Hash: </b></label><span>{{ proposal.hash }}</span>
        </b-message>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Proposal extends Vue {
  @Prop() public proposal: any;

  private isArgsVisible: boolean = true;

  public toggleArgsVisible() {
    this.isArgsVisible = !this.isArgsVisible;
  }
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

.proposal-index {
  font-size: 2em;
}
</style>