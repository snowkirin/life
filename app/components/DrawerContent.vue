<template lang="html">
  <GridLayout rows="*"
              class="nt-drawer__content"
              backgroundColor="#222222"
  >
    <ScrollView row="0"
                class="nt-drawer__body">
      <StackLayout>
        <GridLayout v-for="(item, idx) in category" :key="idx">
          <Label :text="item.name" style="color: #fff;" />
        </GridLayout>
      </StackLayout>
    </ScrollView>
  </GridLayout>
</template>

<script>
  import * as utils from "~/shared/utils";
  import {mapActions, mapGetters} from 'vuex';
  export default {
    data() {
      return {};
    },
    components: {},
    computed: {
      ...mapGetters([
        'category',
        'creativeType'
      ]),
    },
    methods: {
      ...mapActions([
        'fetchLib'
      ]),
      onNavigationItemTap(component) {
        utils.closeDrawer();
      },
      consoleTap() {
        console.log('HIHIHIHIHI')
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
