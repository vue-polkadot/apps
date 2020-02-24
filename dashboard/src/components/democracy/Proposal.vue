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
      <div
        class="proposal-proposal"
        @click="toggleArgsVisible"
        v-if="proposal.proposal"
      >
        <div>
          <b>
            {{ proposal.proposal.sectionName }}.{{
              proposal.proposal.methodName
            }}
          </b>
        </div>
        <div
          v-for="(doc, index) in proposal.proposal.meta['documentation']"
          :key="index"
        >
          {{ doc }}
        </div>
      </div>
      <div v-else>
        <b-button type="is-primary" icon-left="plus" disabled>
          Preimage (Not implemented yet 😢)
        </b-button>
      </div>
      <Seconds :accounts="proposal.seconds" />
    </div>
    <div v-if="isArgsVisible">
      <Argurments
        v-if="proposal.proposal"
        :args="enhanceArgs()"
        @selected="handleSelectedArguments"
        :defaultValues="proposal.proposal.args"
        disabled
      />

      <b-message class="proposal-hash" type="is-info">
        <label><b>Proposal Hash: </b></label><span>{{ proposal.hash }}</span>
      </b-message>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Argurments from '@/components/extrinsics/Arguments.vue';
import Seconds from './Seconds.vue';

@Component({
  components: {
    Argurments,
    Seconds,
  },
})
export default class Proposal extends Vue {
  @Prop() public proposal: any;

  private isArgsVisible: boolean = true;

  public toggleArgsVisible() {
    this.isArgsVisible = !this.isArgsVisible;
  }

  public handleSelectedArguments() {
    return;
  }

  public enhanceArgs() {
    return this.proposal.proposal.meta.args;
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

.proposal-hash {
  margin-top: 1em;
}
</style>
