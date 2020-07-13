import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
import { apiEnabled } from './routeGuard';

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('./components/landing/Landing.vue'),
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: () => import('./views/Account/Accounts.vue'),
      // beforeEnter: apiEnabled,
    },
    {
      path: '/accounts/create',
      name: 'accountsCreate',
      component: () => import('./views/Account/AccountsCreate.vue'),
      // beforeEnter: apiEnabled,
    },
    {
      path: '/accounts/backup/:address',
      name: 'accountsBackup',
      component: () => import('./views/Account/AccountsBackup.vue'),
      // beforeEnter: apiEnabled,
    },
    {
      path: '/accounts/changepassword/:address',
      name: 'accountsChangePassword',
      component: () => import('./views/Account/AccountsChangePassword.vue'),
      beforeEnter: apiEnabled,
    },
    {
      path: '/accounts/restore',
      name: 'accountsRestore',
      component: () => import('./views/Account/AccountsRestore.vue'),
      // beforeEnter: apiEnabled,
    },
    {
      path: '/addressbook',
      name: 'addressbook',
      component: () => import('./components/shared/accounts/addressbook/Addressbook.vue'),
      // beforeEnter: apiEnabled,
    },
    {
      path: '/addressbook/create',
      name: 'addressbookCreate',
      component: () => import('./views/Account/AddressbookCreate.vue'),
      beforeEnter: apiEnabled,
    },
    {
      path: '/transfer',
      name: 'transfer',
      component: () => import('./components/transfer/Transfer.vue'),
      // beforeEnter: apiEnabled,
    },
    {
      path: '/transfer/f/:from/t/:to/a/:amount/:asset',
      name: 'transferSignSubmit',
      component: () => import('./components/transfer/Transfer.vue'),
      beforeEnter: apiEnabled,
    },
    {
      path: '/transfer/from/:from',
      name: 'transferFrom',
      component: () => import('./components/transfer/Transfer.vue'),
      beforeEnter: apiEnabled,
    },
    {
      path: '/transfer/to/:to',
      name: 'transferTo',
      component: () => import('./components/transfer/Transfer.vue'),
      beforeEnter: apiEnabled,
    },
    {
      path: '/democracy',
      name: 'democracy',
      component: () => import('./components/democracy/DemocracyWrapper.vue'),
      beforeEnter: apiEnabled,
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('./views/Settings.vue'),
    },
    {
      path: '/toolbox',
      name: 'toolbox',
      component: () => import('./components/toolbox/Toolbox.vue')
    },
    {
      path: '/staking',
      name: 'staking',
      component: () => import('./views/Staking.vue')
    },
    {
      path: '/chainstate',
      name: 'chainstate',
      component: () => import('./views/ChainState.vue')
    },
    {
      path: '/explorer',
      name: 'explorer',
      component: () => import('./components/explorer/Explorer.vue'),
      beforeEnter: apiEnabled,
    },
    {
      path: '/explorer/:tab',
      name: 'explorerByTab',
      component: () => import('./components/explorer/Explorer.vue'),
      beforeEnter: apiEnabled,
    },
    {
      path: '/explorer/:tab/:hash',
      name: 'explorerByTabHash',
      component: () => import('./components/explorer/Explorer.vue'),
      beforeEnter: apiEnabled,
    },
    {
      path: '/extrinsics',
      name: 'extrinsics',
      component: () => import('./views/Extrinsics.vue'),
      beforeEnter: apiEnabled,
    },
    {
      path: '/treasury',
      name: 'treasury',
      component: () => import('./components/treasury/TreasuryWrapper.vue')
    },
    {
      path: '*',
      name: 'FourZeroFour',
      component: () => import('./components/FourZeroFour.vue'),
    },
  ],
});