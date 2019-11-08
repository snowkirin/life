const VueCommon = {};

VueCommon.install = Vue => {
  Vue.prototype.$common = {
    /**
     * @return {string}
     */
    API_URL() {
      return process.env.VUE_APP_API_URL;
    },
    /**
     * @return {string}
     */
    S3_URL(id, thumb) {
      const path = id + (thumb ? '/thumb/' : '/');
      return `https://wisebirds-creativelibrary.s3.ap-northeast-2.amazonaws.com/${path}`;
    },
    // SVG(path) {
    //   return require(`@/assets/images/${path}`);
    // },
  };
};

export default VueCommon;
