import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
import { apiEnabled } from './routeGuard';
import Landing from './components/landing/Landing.vue';
import Accounts from './views/Accounts.vue';
import AccountsCreate from './views/AccountsCreate.vue';
import AccountsBackup from './views/AccountsBackup.vue';
import AccountsChangePassword from './views/AccountsChangePassword.vue';
import AccountsRestore from './views/AccountsRestore.vue';
import Addressbook from './components/addressbook/Addressbook.vue';
import AddressbookCreate from './views/AddressbookCreate.vue';
import Transfer from './components/transfer/Transfer.vue';
import DemocracyWrapper from './components/democracy/DemocracyWrapper.vue';
import Settings from './views/Settings.vue';
import Toolbox from './components/toolbox/Toolbox.vue';
import Staking from './views/Staking.vue';
import ChainState from './views/ChainState.vue';
import Explorer from './components/explorer/Explorer.vue';
import Extrinsics from './views/Extrinsics.vue';
import TreasuryWrapper from './components/treasury/TreasuryWrapper.vue';
import FourZeroFour from './components/FourZeroFour.vue'

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing,
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: Accounts,
      // beforeEnter: apiEnabled,
    },
    {
      path: '/accounts/create',
      name: 'accountsCreate',
      component: AccountsCreate,
      // beforeEnter: apiEnabled,
    },
    {
      path: '/accounts/backup/:address',
      name: 'accountsBackup',
      component: AccountsBackup,
      // beforeEnter: apiEnabled,
    },
    {
      path: '/accounts/changepassword/:address',
      name: 'accountsChangePassword',
      component: AccountsChangePassword,
      beforeEnter: apiEnabled,
    },
    {
      path: '/accounts/restore',
      name: 'accountsRestore',
      component: AccountsRestore,
      // beforeEnter: apiEnabled,
    },
    {
      path: '/addressbook',
      name: 'addressbook',
      component: Addressbook,
      // beforeEnter: apiEnabled,
    },
    {
      path: '/addressbook/create',
      name: 'addressbookCreate',
      component: AddressbookCreate,
      beforeEnter: apiEnabled,
    },
    {
      path: '/transfer',
      name: 'transfer',
      component: Transfer,
      // beforeEnter: apiEnabled,
    },
    {
      path: '/transfer/f/:from/t/:to/a/:amount/:asset',
      name: 'transferSignSubmit',
      component: Transfer,
      beforeEnter: apiEnabled,
    },
    {
      path: '/transfer/from/:from',
      name: 'transferFrom',
      component: Transfer,
      beforeEnter: apiEnabled,
    },
    {
      path: '/transfer/to/:to',
      name: 'transferTo',
      component: Transfer,
      beforeEnter: apiEnabled,
    },
    {
      path: '/democracy',
      name: 'democracy',
      component: DemocracyWrapper,
      beforeEnter: apiEnabled,
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
    },
    {
      path: '/toolbox',
      name: 'toolbox',
      component: Toolbox
    },
    {
      path: '/staking',
      name: 'staking',
      component: Staking
    },
    {
      path: '/chainstate',
      name: 'chainstate',
      component: ChainState
    },
    {
      path: '/explorer',
      name: 'explorer',
      component: Explorer,
      beforeEnter: apiEnabled,
    },
    {
      path: '/explorer/:tab',
      name: 'explorerByTab',
      component: Explorer,
      // beforeEnter: apiEnabled,
    },
    {
      path: '/explorer/:tab/:hash',
      name: 'explorerByTabHash',
      component: Explorer,
      // beforeEnter: apiEnabled,
    },
    {
      path: '/extrinsics',
      name: 'extrinsics',
      component: Extrinsics,
      beforeEnter: apiEnabled,
    },
    {
      path: '/treasury',
      name: 'treasury',
      component: TreasuryWrapper
    },
    {
      path: '*',
      name: 'FourZeroFour',
      component: FourZeroFour,
    },
  ],
});
