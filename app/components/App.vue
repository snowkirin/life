<template lang="html">
  <RadSideDrawer ref="drawer"
                 drawerLocation="Left"
                 gesturesEnabled="true"
                 :drawerTransition="transition"
                 @drawerClosed="onDrawerClosed()"
  >
    <StackLayout ~drawerContent
                 backgroundColor="#ffffff">

      <GridLayout rows="*"
                  class="nt-drawer__content"
                  backgroundColor="#222222"
      >
        <ScrollView row="0"
                    class="nt-drawer__body">
          <StackLayout>
            <StackLayout class="filter-wrapper"
                         style="border-bottom-width: 1; border-bottom-color: rgba(255,255,255,0.2); padding-top: 20; padding-bottom: 20;"
            >
              <Label text="카테고리"
                     class="txt-title"/>
              <WrapLayout style="margin-left: -10">
                <FlexboxLayout
                  v-for="(item, idx) in filterListWithCount.category"
                  :key="idx"
                  class="btn-filter"
                  :class="{ active : calcClassName('category', item.id) }"
                  alignItems="center"
                  @tap="clickItem('category',item.id)"
                >
                  <Label
                    class="txt-abbr"
                    :text="item.abbrName"
                  />
                </FlexboxLayout>
              </WrapLayout>
            </StackLayout>
            <StackLayout class="filter-wrapper" style="padding-bottom: 20;">
              <Label text="소재유형"
                     class="txt-title"/>
              <WrapLayout style="margin-left: -10">
                <FlexboxLayout
                  v-for="(item, idx) in filterListWithCount.creativeType"
                  :key="idx"
                  class="btn-filter"
                  :class="{ active : calcClassName('creativeType', item.id) }"
                  alignItems="center"
                  @tap="clickItem('creativeType',item.id)"
                >
                  <Label
                    class="txt-abbr"
                    :text="item.abbrName"
                  />
                </FlexboxLayout>
              </WrapLayout>
            </StackLayout>
            <FlexboxLayout>
              <Button text="초기화"
                      class="btn-init"
                      @tap="clickInit"/>
              <Button text="검색"
                      class="btn-submit"
                      @tap="clickSearch"/>
            </FlexboxLayout>
          </StackLayout>
        </ScrollView>
      </GridLayout>
    </StackLayout>
    <Frame ~mainContent
           ref="drawerMainContent">
      <slot name="mainContent"></slot>
    </Frame>
  </RadSideDrawer>
</template>

<script>
  import {SlideInOnTopTransition} from 'nativescript-ui-sidedrawer';

  import * as utils from "~/shared/utils";
  import _ from 'lodash';
  import {mapActions, mapGetters} from 'vuex';

  export default {
    data() {
      return {
        transition: new SlideInOnTopTransition(),
        selectedItemTemp: {
          category: [],
          creativeType: [],
        },
        selectedItem: {
          category: [],
          creativeType: [],
        },
      }
    },
    components: {},
    computed: {
      ...mapGetters([
        'filterListWithCount',
      ]),
    },
    watch: {},
    methods: {
      ...mapActions([
        'fetchLib',
        'setFilter',
        'setFilterShow'
      ]),
      onNavigationItemTap(component) {
        utils.closeDrawer();
      },
      clickSearch() {
        this.selectedItemTemp = _.assign(
          this.selectedItemTemp,
          this.selectedItem
        );
        this.setFilter(this.selectedItem);
        this.setFilterShow(false);
        this.fetchLib(true);
        utils.closeDrawer();
      },
      clickInit() {
        _.forEach(this.filterListWithCount, (item, idx) => {
          this.setFilter([idx], []);
        });
        this.selectedItem = {
          category: [],
          creativeType: [],
        };
      },
      calcClassName(target, id) {
        return _.indexOf(this.selectedItem[target], id) !== -1;
      },
      clickItem(target, id) {
        if (_.indexOf(this.selectedItem[target], id) === -1) {
          this.selectedItem[target].push(id)
        } else {
          this.selectedItem[target] = _.without(this.selectedItem[target], id);
        }
      },
      onDrawerClosed() {
        this.setFilterShow(false);
        this.selectedItem = _.assign(this.selectedItem, this.selectedItemTemp);
      }
    }
  }
</script>

<style scoped
       lang="scss">
  // Start custom common variables
  @import '~@nativescript/theme/scss/variables/blue';
  // End custom common variables

  // Custom styles

  .filter-wrapper {
    padding: 10;
  }

  .txt-title {
    color: #fff;
    font-size: 16;
  }

  .btn-filter {
    border-radius: 18;
    background-color: rgba(255, 255, 255, 0.14);
    height: 36;
    padding-left: 15;
    padding-right: 15;
    margin-top: 10;
    margin-left: 10;

    .txt-abbr {
      font-size: 14;
      color: #fff;
      font-weight: 400;
    }

    .txt-count {
      font-size: 14;
      margin-left: 5;
    }

    &.active {
      background-color: #000000;
      .txt-abbr {
        color: #fff;
      }
    }
  }
  .btn-init {
    width: 156;
    height: 46;
    border-radius: 28;
    border-width: 1;
    border-style: solid;
    border-color: #fff;
    background-color: #000;
    color: #fff;
    font-size: 15;
  }

  .btn-submit {
    width: 156;
    height: 46;
    border-radius: 28;
    background-color: #ff4a01;
    color: #fff;
    font-size: 15;
  }
</style>
