<template>
  <div class="container">
    <button @click="test">Test</button>
    <div v-if="list.songs" class="music_list">
      <div
        v-for="item in list.songs"
        :key="item.id"
        class="music_list_item"
        @click="play(item)"
      >
        <img :src="item.al.picUrl" width="30" height="30" alt="cover" />
        {{ item.al.name }}

        <div class="buttons">
          <button @click="add(item)">添加</button>
          <button @click="play(item)">播放</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import _ from 'lodash';
import Bus from '~/lib/Bus';

export default Vue.extend({
  data() {
    return { list: {} };
  },
  async mounted() {
    const auth = this.$cloudbase.auth({ persistence: 'local' });

    if (!auth.hasLoginState()) {
      await auth.anonymousAuthProvider().signIn();
    }

    console.log('用户id', auth.hasLoginState().user.uid);
  },
  methods: {
    add(item: any) {
      Bus.emit('player.list.add', item);
    },
    play(item: any) {
      Bus.emit('player.play', item);
    },
    async test() {
      let response = await this.$cloudbase.callFunction({
        name: 'music-api',
        data: {
          action: 'playlist_detail',
          params: {
            id: 111741273,
          },
        },
      });

      response = response.result;

      if (response.code === 200) {
        const list = _.get(response, 'data.playlist.trackIds');
        const idList = _.map(list, 'id');

        let playListDetail = await this.$cloudbase.callFunction({
          name: 'music-api',
          data: {
            action: 'song_detail',
            params: {
              ids: idList.join(','),
            },
          },
        });
        playListDetail = playListDetail.result;
        if (playListDetail.code === 200) {
          this.list = playListDetail.data;
        }
      }
    },
  },
});
</script>

<style lang="scss">
.container {
  @apply text-xl;
  .music_list {
    .music_list_item {
      @apply flex py-2 items-center border border-gray-300 mb-3 bg-white rounded overflow-hidden;
      img {
        @apply mr-3;
      }

      .buttons {
        @apply ml-auto;
        button {
          @apply border-red-300 rounded mr-3;
        }
      }
    }
  }
}
</style>
