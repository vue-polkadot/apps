<template>
  <div class="card proposal-card">
    <div class="card-content proposal-content">
      <div>{{ proposal.index.toString() }}</div>
      <div class="proposal-proposer">
        <div>Indenticon Here</div>
        <div>{{ proposal.proposer.toString() }}</div>
      </div>
      <div class="proposal-proposal">
        <div>{{ proposal.proposal.callIndex }}</div>
      </div>
      <div class="proposal-seconds">
        <div v-for="second in proposal.seconds" :key="second.toString()">{{ second }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Proposal extends Vue {
  @Prop() proposal: any;
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