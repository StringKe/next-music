import Vue from 'vue';
import CloudBaseVue from '@cloudbase/vue-provider';
import { Context } from '@nuxt/types';
import * as tcb from 'tcb-js-sdk';

declare module 'vue/types/vue' {
  interface Vue {
    $cloudbase: typeof tcb;
  }
}

export default async (context: Context) => {
  const envId = await fetch(`${context.env.backend}/backend`)
    .then((response) => response.json())
    .then((data) => data.envId);

  Vue.use(CloudBaseVue, {
    env: envId,
  });
};
