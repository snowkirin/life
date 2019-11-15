<template>
  <Page class="page"
        @loaded="init">
    <ActionBar class="action-bar"
               flat="true"
    >
      <GridLayout columns="50,*,50">
        <Button text.decode="&#xf0b0;"
                class="fas"
                col="0"
                @tap="onDrawerButtonTap"
        />
        <Label text="CREATIVE LIBRARY"
               col="1"/>
        <Button text.decode="&#xf002;"
                class="fas"
                width="50"
                @tap="onSearch"
                col="2"/>
      </GridLayout>
    </ActionBar>
    <StackLayout height="100%">
      <TextField
        v-if="searching"
        v-model="searchValue"
        refs="searchBar"
        class="search-bar"
        @returnPress="onSearchSubmit"
        returnKeyType="search"
        hint="Enter text..."
      />
      <RadListView
        for="item in libList"
        @itemLoading="onItemLoading"
        loadOnDemandMode="Manual"
        @loadMoreDataRequested="onLoadMoreItemsRequested"
      >
        <v-template>
          <StackLayout>
            <Card :data="item.attachmentList"
                  :id="item.id"/>
            <StackLayout>
              <Label :text="item.brandName"
                     class="txt-brandName"/>
              <Label :text="item.name"
                     class="txt-name"/>
              <WrapLayout>
                <Label v-for="(tag, idx) in item.tag.split(',')"
                       :key="idx"
                       :text="'#'+tag+' '"
                       class="txt-tag"/>
              </WrapLayout>
            </StackLayout>
          </StackLayout>
        </v-template>
      </RadListView>
    </StackLayout>
  </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import SelectedPageService from "../shared/selected-page-service";
  import {mapActions, mapGetters} from 'vuex';
  import Card from './Card/Card';

  export default {
    mounted() {
      SelectedPageService.getInstance().updateSelectedPage("Home");
    },
    components: {
      Card
    },
    computed: {
      ...mapGetters([
        'libList',
        'pagingData'
      ]),
    },
    data() {
      return {
        searchValue: "",
        currentWidth: 0,
        searching: false
      }
    },

    methods: {
      ...mapActions([
        'fetchLib',
        'fetchTypeCount',
        'fetchType',
        'setSearchWord'
      ]),
      onSearch() {
        this.searching = !this.searching;
      },
      onSearchSubmit(args) {
        let searchBar = args.object;
        this.setSearchWord(this.searchValue);
        this.fetchLib(true);
        this.searching = false;
      },

      init() {
        this.fetchLib(true);
        this.fetchTypeCount('C');
        this.fetchType('T');
      },

      onDrawerButtonTap() {
        utils.showDrawer();
      },
      onItemLoading({index, view}) {
      },
      onLoadMoreItemsRequested(args) {
        const listView = args.object;
        if (!this.pagingData.last) {
          this.fetchLib();
          args.returnValue = true;
          listView.notifyLoadOnDemandFinished();
        } else {
          args.returnValue = false;
          listView.notifyLoadOnDemandFinished(true);
        }
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
  .action-bar {
    margin-left: -20;
  }

  .search-bar {
    padding-left: 10;
    padding-right: 10;
  }

  #searchBar {
    border-width: 1;
    border-color: #000;
    border-style: solid;
  }
  .txt-brandName {
    font-size: 16;
  }
  .txt-name {
    font-size: 24;
    font-weight: bold;
  }
  .txt-tag {
    font-size: 14;
  }
</style>
