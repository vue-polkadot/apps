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
      <div class="proposal-proposer">
        <div>Indenticon Here</div>

        <div>{{ referendum.preimage.proposer.toString() }}</div>
      </div>
      <!--  <div class="proposal-proposal">
        <div>{{ referendum.proposal.callIndex }}</div>
      </div> -->
    </div>
    <div v-if="isArgsVisible">
      <div
        v-for="(arg, index) in referendum.proposal.meta['args'].toJSON()"
        :key="index"
      >
        {{ arg.name }}:{{ arg.type }} {{ referendum.proposal.args[index] }}
      </div>
      <b-message type="is-info">
            
            <label><b>Proposal Hash: </b></label><span>{{ referendum.hash }}</span>
        </b-message>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({

})
export default class Referendum extends Vue {
  @Prop() public referendum: any;

  private isArgsVisible: boolean = true;

  public toggleArgsVisible() {
    this.isArgsVisible = !this.isArgsVisible;
  }

  public isComponent(arg: any) {
    const regex = new RegExp(arg.type);
    if ('Vecor'.match(regex)) {
      return true;
    }
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

.proposal-proposal {
  cursor: pointer;
}
</style>