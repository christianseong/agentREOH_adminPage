<template>
<div>
    <v-app-bar
      app
      color="black"
      dark
    >
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>

      <!-- <v-btn
      depressed
      color="white"
      class="black--text"
    >
      로그인
    </v-btn> -->
    <h1>admin님</h1>
      <v-btn
      depressed
      color="white"
      class="black--text"
    >
      로그아웃
    </v-btn>
    
  </v-app-bar>
  
</div>
  
</template>

<script>
export default {
    name: 'mainHeader',

    components: {
   
    },
}
</script>

<style>

</style>