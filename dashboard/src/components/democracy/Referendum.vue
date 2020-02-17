<template>
  <div class="card proposal-card">
    <div class="card-content proposal-content">
      <div class="proposal-index">{{ referendum.index.toString() }}</div>
      <div class="proposal-proposal" @click="toggleArgsVisible">
        <div>
          {{ referendum.proposal.sectionName }}.{{
            referendum.proposal.methodName
          }}
        </div>
        <div>{{ referendum.proposal.meta["documentation"] }}</div>
      </div>
      <div class="proposal-meta">
        <div>Remaining: <div>0 KSM</div></div>
        <div>Activate at: <div>0 KSM</div></div>
        <div>Aye ({{state.voteCountAye}}): <div>{{state.votedAye}}</div></div>
        <div>Nay ({{state.voteCountNay}}): <div>{{state.votedNay}}</div></div>
      </div>
      <!--  <div class="proposal-proposal">
        <div>{{ referendum.proposal.callIndex }}</div>
      </div> -->
    </div>
    <div v-if="isArgsVisible">
      <Argurments
        :args="enhanceArgs()"
        @selected="handleSelectedArguments"
        :defaultValues="referendum.proposal.args"
        :disabled="true"
      />
      <b-message class="proposal-hash" type="is-info">
        <label><b>Proposal Hash: </b></label><span>{{ referendum.hash }}</span>
      </b-message>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Argurments from '@/components/extrinsics/Arguments.vue';
import BN from 'bn.js';
import Connector from '@vue-polkadot/vue-api';

@Component({
  components: {
    Argurments,
  },
})
export default class Referendum extends Vue {
  @Prop() public referendum: any;

  private isArgsVisible: boolean = true;
  private state: any = {};

  public async mouted() {
    console.log('mouted');
    
    if (Connector.getInstance()) {
      const votesFor = await Connector.getInstance().api.derive.democracy.referendumVotesFor(this.referendum.index);
      console.warn(votesFor);
      this.state = votesFor.reduce((state: any, { balance, vote }: { balance: any, vote: any }) => {
        const isDefault = vote.conviction.index === 0;
        const counted = balance
          .muln(isDefault ? 1 : vote.conviction.index)
          .divn(isDefault ? 10 : 1);

        if (vote.isAye) {
          state.voteCountAye++;
          state.votedAye = state.votedAye.add(counted);
        } else {
          state.voteCountNay++;
          state.votedNay = state.votedNay.add(counted);
        }

        state.voteCount++;
        state.votedTotal = state.votedTotal.add(counted);

        return state;
      }, {
        voteCount: 0,
        voteCountAye: 0,
        voteCountNay: 0,
        votedAye: new BN(0),
        votedNay: new BN(0),
        votedTotal: new BN(0),
      });
    }
  }

  public toggleArgsVisible() {
    this.isArgsVisible = !this.isArgsVisible;
  }

  public handleSelectedArguments() {
    return;
  }

  public enhanceArgs() {
    return this.referendum.proposal.meta.args;
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
  flex-grow: 1;
}

.proposal-proposal {
  cursor: pointer;
  flex-grow: 1;
}

.proposal-meta {
    display: flex;
    flex-grow: 1;
    justify-content: space-around;
}

.proposal-hash {
  margin-top: 1em;
}
</style>