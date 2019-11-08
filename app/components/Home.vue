<template>
    <Page class="page" @loaded="init">
        <ActionBar class="action-bar">
            <!--
            Use the NavigationButton as a side-drawer button in Android
            because ActionItems are shown on the right side of the ActionBar
            -->
            <NavigationButton ios:visibility="collapsed" icon="res://menu" @tap="onDrawerButtonTap"></NavigationButton>
            <!--
            Use the ActionItem for IOS with position set to left. Using the
            NavigationButton as a side-drawer button in iOS is not possible,
            because its function is to always navigate back in the application.
            -->
            <ActionItem icon="res://navigation/menu"
                android:visibility="collapsed"
                @tap="onDrawerButtonTap"
                ios.position="left">
            </ActionItem>
            <Label class="action-bar-title" text="Home"></Label>
        </ActionBar>

        <StackLayout>
            <ListView for="item in libList">
                <v-template>
                    <Label text="안녕!"/>
                </v-template>8
            </ListView>
        </StackLayout>

    </Page>
</template>

<script>
    import * as utils from "~/shared/utils";
    import SelectedPageService from "../shared/selected-page-service";
    import { mapActions, mapGetters } from 'vuex';

    export default {
        mounted() {
            SelectedPageService.getInstance().updateSelectedPage("Home");
        },
        computed: {
            ...mapGetters([
              'libList',
              'pagingData'
            ]),
        },
        data() {
            return {
                library: []
            }
        },
        methods: {
            ...mapActions([
              'fetchLib',
              'fetchTypeCount',
              'fetchType'
            ]),
            init() {
                this.fetchLib(true);
                console.log(this.libList);
            },
            onDrawerButtonTap() {
                utils.showDrawer();
            }
        }
    };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '~@nativescript/theme/scss/variables/blue';
    // End custom common variables

    // Custom styles
</style>
