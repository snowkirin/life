<template>
  <Page actionBarHidden="true">
    <StackLayout>
      <VideoPlayer
        :src="url"
        autoplay="true"
      ></VideoPlayer>
    </StackLayout>
  </Page>

</template>

<script>
  export default {
    props: {
      url: {
        type: String
      }
    },
  };
</script>
