<template>
  <ScrollView orientation="horizontal"
              @scroll="getScroll"
              ref="list">
    <WrapLayout orientation="horizontal">
      <FlexboxLayout class="card"
                     v-for="(item, idx) in data"
                     :key="idx"
                     :width="currentWidth - 16"
                     height="100%"
                     justifyContent="center"
                     :class="{'active': (idx == active), 'inactive': (idx != active)}"
      >
        <AbsoluteLayout width="100%"
                        height="100%">
          <FlexboxLayout width="100%"
                         height="100%"
          >
            <Image v-if="item.fileName.indexOf('mp4') !== -1"
                   class="img"
                   :src="$common.S3_URL(id, true) + item.thumbnail"
                   stretch="aspectFit"
                   @tap="goToVideoViewer($common.S3_URL(id) + item.fileName)"
            >
            </Image>
            <Image v-else
                   class="img"
                   :src="$common.S3_URL(id) + item.fileName"
                   stretch="aspectFit"
                   @tap="goImageViewer($common.S3_URL(id) + item.fileName)"
            ></Image>
          </FlexboxLayout>
        </AbsoluteLayout>
      </FlexboxLayout>
    </WrapLayout>
  </ScrollView>


</template>

<script>
  import {isAndroid, screen, device} from 'tns-core-modules/platform';
  import VideoViewer from "../VideoViewer/VideoViewer";
  export default {
    props: {
      data: {
        type: [Object, Array]
      },
      id: {
        type: Number
      }
    },
    data() {
      return {
        currentWidth: 0,
        active: 0
      }
    },
    mounted() {
      this.currentWidth = screen.mainScreen.widthDIPs
    },
    methods: {
      getScroll(e) {
        this.active = Math.round(e.scrollX / this.currentWidth);
      },
      goToVideoViewer(url) {
        this.$navigateTo(VideoViewer, {
          props: {
            url: url
          }
        })
      },
      goImageViewer(url) {
        console.log('ClickImage');
        // 사용여부 아직 미정
      }
    }
  };
</script>
<style scoped>
  .card .background {
    transform: scale(1.05);
    opacity: 0.75;
  }

  @keyframes highlight {
    from {
      transform: scale(0.85);
    }

    to {
      transform: scale(1);
    }
  }

  @keyframes downlight {
    from {
      transform: scale(1);
    }

    to {
      transform: scale(0.85);
    }
  }

  .card {
    background-position: center center;
    background-size: ocver;
    background-repeat: no-repeat;
    transform: scale(0.85);
  }

  .card.active {
    animation-name: highlight;
    animation-duration: 0.25s;
    animation-fill-mode: forwards;
  }

  .card.inactive {
    animation-name: downlight;
    animation-duration: 0.25s;
    animation-fill-mode: backwards;
  }

  .card .img {
    background-position: center center;
    background-size: 100%;
    background-repeat: no-repeat;
    border-radius: 14;
  }

  .card .title {
    color: #545454;
    font-size: 18;
  }

  .card .subTitle {
    color: #DADADA;
    font-size: 16;
  }
</style>
