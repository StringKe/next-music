<template>
  <div>
    <Nuxt />
    <play-box />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import PlayBox from '@/components/play-box';

export default Vue.extend({
  components: { PlayBox },
});
</script>

<style lang="scss"></style>
