<template>
	<ModalWrapper label="Set Identity" icon="address-card">
		<div>
		<h3>#Set Identity</h3>
		<Dropdown mode="accounts" @selected="handleAccountSelection" />
		<b-field label="password 🤫 magic spell" class="password-wrapper">
      <b-input v-model="password" type="password" password-reveal> </b-input>
    </b-field>

    <b-field label="name">
      <b-input v-model="identity.display"> </b-input>
    </b-field>

    <b-field label="email">
      <b-input v-model="identity.email"> </b-input>
    </b-field>
    <b-field label="web">
      <b-input v-model="identity.web"> </b-input>
    </b-field>
    <b-field label="twitter">
      <b-input v-model="identity.twitter"> </b-input>
    </b-field>
    <b-field label="riot">
      <b-input v-model="identity.riot"> </b-input>
    </b-field>
    <b-field label="telephone">
      <b-input v-model="identity.tel"> </b-input>
    </b-field>


      <b-button
        type="is-primary"
        icon-left="paper-plane"
        outlined
        :disabled="!account || !password"
        @click="shipIt"
      >
        Submit
      </b-button>
			<ViewTransaction v-if="tx" :tx="tx"/>
    </div>
		
	</ModalWrapper>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import ModalWrapper from './ModalWrapper.vue';
import Dropdown from '@/components/shared/Dropdown.vue';
import { KeyringPair } from '@polkadot/keyring/types';
import { notificationTypes,  showNotification } from '@/utils/notification';
import exec from '@/utils/transactionExecutor';
import ViewTransaction from '../ViewTransaction.vue';
import { urlBuilderTransaction } from '@/utils/explorerGuide';

@Component({
	components: {
		ModalWrapper,
		Dropdown,
		ViewTransaction,
	},
})
export default class SetIdentity extends Vue {
	// @Prop() public referendumId!: any;

	private account: any = {};
	private password: string = '';
	private identity: any = {
    display: '',
    email: '',
    web: '',
    twitter: '',
    riot: '',
    tel: '',
  }

  private additional = [];
	private tx: string = '';
	
  getExplorerUrl(value: string) {
    return urlBuilderTransaction(value, 
      this.$store.state.explorer.chain, 
      this.$store.state.explorer.provider)
  }

  public enhanceIdentityData(): any {
    return Object.fromEntries(Object.entries(this.identity).map(([key, val]: [any, any]) => {
      if (val) {
        return [key, {'raw': val}]
      }
      return [key, {'none': null}]
    }))
  }

  public handleAccountSelection(account: KeyringPair) {
		this.account = account;
	}

		public async shipIt() {
		const { api } = (this as any).$http;

		if (!api) {
			return;
		}
		
		try {
			showNotification('Dispatched');
      const enhancedData = this.enhanceIdentityData();
      const x = { ...enhancedData, additional: [[{'raw': 'telephone'}, {'raw': this.identity.tel}]] }
			this.tx = await exec(this.account, this.password, api.tx.identity.setIdentity, [x]);
			showNotification(`Identity`, { ...notificationTypes.success, onAction: this.onAction() });
		} catch (e) {
			showNotification(e, notificationTypes.danger);
		}

	}

	public onAction() {
		return () => window.open(this.getExplorerUrl(this.tx), '_blank');
	}
  
}
</script>
