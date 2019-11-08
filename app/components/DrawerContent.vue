<template lang="html">
  <GridLayout rows="auto, *"
              class="nt-drawer__content">
    <StackLayout row="0"
                 class="nt-drawer__header">
      <Label text="Header"/>
    </StackLayout>

    <ScrollView row="1"
                class="nt-drawer__body">
      <StackLayout>
        <Label text="HIHIHIHI!!!!!!!!!!!"/>
      </StackLayout>
    </ScrollView>
  </GridLayout>
</template>

<script>
  import * as utils from "~/shared/utils";

  export default {
    mounted() {
    },
    data() {
      return {
        selectedPage: ""
      };
    },
    components: {},
    methods: {
      onNavigationItemTap(component) {
        utils.closeDrawer();
      }
    }
  };
</script>

<style scoped
       lang="scss">
  // Start custom common variables
  @import '~@nativescript/theme/scss/variables/blue';
  // End custom common variables

  // Custom styles
</style>
