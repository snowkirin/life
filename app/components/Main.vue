<template>
  <Page>
    <ActionBar title="Hello World"></ActionBar>
    <RadSideDrawer ref="drawer">
      <StackLayout ~drawerContent>
        <Label text="Side" />
      </StackLayout>
      <StackLayout ~mainContent>
        <Label text="Main" />
      </StackLayout>
    </RadSideDrawer>
  </Page>
</template>

<script>
  export default {
    name: "Main"
  }
</script>

<style scoped lang="scss">
  @import '~@nativescript/theme/scss/variables/blue';
</style>
