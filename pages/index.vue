<template>
  <div class="container">
    <button @click="test">Test</button>
    <div>{{ list }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return { list: [] };
  },
  async mounted() {
    const auth = this.$cloudbase.auth({ persistence: 'local' });

    if (!auth.hasLoginState()) {
      await auth.anonymousAuthProvider().signIn();
    }

    console.log('用户id', auth.hasLoginState().user.uid);
  },
  methods: {
    async test() {
      let response = await this.$cloudbase.callFunction({
        name: 'music-api',
        data: {
          action: 'comment_hotwall_list',
        },
      });
      response = response.result;

      if (response.code === 200) {
        this.list = response.data;
      }
    },
  },
});
</script>

<style lang="scss">
.container {
  @apply text-xl;
}
</style>
