<template>
  <ModalWrapper icon="plus" label="Validator" type="is-primary">
    <b-steps v-model="activeStep" animated rounded :has-navigation="true">
      <b-step-item step="1" label="Bond">
        <BondPartial v-model="bondCallback" />
      </b-step-item>

      <b-step-item step="2" label="Keys and Commision">
        <div>
          <b-field label="Session Keys">
            <b-input placeholder="0x..." expanded v-model="keys" />
            <b-button @click="generateSessionKey" type="is-success" outlined class="staking-actions-session-key__generate">Generate </b-button>
          </b-field>
          <b-field label="Commission">
            <b-input v-model="commision" />
          </b-field>
        </div>
      </b-step-item>

      <template slot="navigation" slot-scope="{ previous, next }">
        <b-button
          outlined
          icon-left="angle-left"
          :disabled="previous.disabled"
          @click.prevent="previous.action"
        >
        </b-button>
        <b-button
          outlined
          icon-right="angle-right"
          :disabled="next.disabled || emptyParams"
          @click.prevent="next.action"
        >
        </b-button>
      </template>
    </b-steps>

    <b-button
      type="is-primary"
      icon-left="paper-plane"
      outlined
      class="new-nominator__submit"
      :disabled="disabled"
      @click="submit"
    >
      Submit
    </b-button>
  </ModalWrapper>
</template>


<script lang="ts" >
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import BondPartial from './partial/BondPartial.vue';
import ModalWrapper from '@/components/shared/modals/ModalWrapper.vue';
import NominatePartial from './partial/NominatePartial.vue';
import Connector from '@vue-polkadot/vue-api';
import { notificationTypes, showNotification } from '@/utils/notification';

const components = {
  BondPartial,
  ModalWrapper,
  NominatePartial
};

type ApiCallType = {
  callback: () => void;
  params: any[];
};

@Component({ components })
export default class NewNominator extends Vue {
  private activeStep: number = 0;
  private bondCallback: ApiCallType = {
    callback: () => null,
    params: []
  };

  private keys: string = '';
  private commision: number = 0;

  get disabled(): boolean {
    return this.activeStep !== 1;
  }

  get emptyParams(): boolean {
    return false;
    // return !this.bondCallback.params.length
  }

  private submit() {
    console.log('Lorem Ipsum haha');
  }

  private async generateSessionKey() {
    const { api } = Connector.getInstance();
    try {
      const response = await api.rpc.author.rotateKeys()
      console.log('response', response)
      this.keys = response.toString();
    } catch (e) {
      showNotification(e.message, notificationTypes.danger);
      console.warn(e);
    }

  }
}
</script>

<style scoped>
.new-nominator__submit {
  float: right;
  margin-top: -2em;
}

.staking-actions-session-key__generate {
  height: inherit;
}
</style>