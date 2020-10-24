<template>
  <div class="play_box">
    <div class="play_box_container">{{ playState.time }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import _ from 'lodash';
import Bus from '~/lib/Bus';

export default Vue.extend({
  data() {
    return {
      playList: [], // 播放列表
      nowPlay: {}, // 正在播放的音乐
      playState: {
        loop: false, // 单曲循环
        loopList: false, // 列表循环
        random: false, // 随机
        time: {
          current: 0,
          full: 0,
        },
      },
      audio: undefined,
    };
  },
  mounted() {
    this.audio = new Audio();
    setInterval(() => {
      this.playState.time.current = this.audio.currentTime;
    }, 500);

    Bus.on('player.list.replace', (list: any[]) => {
      this.playList = list;
      console.log('list');
    });

    Bus.on('player.list.add', (item: any) => {
      this.playList.push(item);
      this.getResource(item.id);
    });

    Bus.on('player.play', (item: any) => {
      // 播放
      this.playList.push(item);
      this.getResource(item.id, this.play);
    });
  },
  methods: {
    async getResource(
      musicId: number,
      callback: Function | undefined = undefined
    ) {
      let response = await this.$cloudbase.callFunction({
        name: 'music-api',
        data: {
          action: 'song_url',
          params: {
            id: musicId,
          },
        },
      });

      response = response.result;

      if (response.code === 200) {
        response = response.data;
        this.nowPlay = _.first(_.get(response, 'data'));
        if (callback) {
          callback();
        }
      }
    },
    play() {
      const audio: HTMLAudioElement = this.audio;
      if (!_.isEmpty(this.nowPlay)) {
        audio.src = this.nowPlay.url;
        audio.play();
      }
    },
  },
});
</script>

<style scoped lang="scss">
.play_box {
  height: 72px;
  @apply fixed left-0 right-0 bottom-0;
  .play_box_container {
    @apply relative w-full h-full flex bg-white;
  }
}
</style>
