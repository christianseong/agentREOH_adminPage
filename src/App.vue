<template> 
<div>
  <HomeView/>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
  </div> 
</template>

<script>
import HomeView from '@/views/HomeView.vue'

export default {
  name: 'App',
  components : {
    HomeView
  },
  data(){
       return { drawer: null,
        items: [
          { title: 'Home', icon: 'mdi-view-dashboard' },
          { title: 'About', icon: 'mdi-forum' },

        ],}
    },
};
</script>
