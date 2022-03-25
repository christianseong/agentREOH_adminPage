<template>
<div>
   <v-app-bar
      app
      color="black"
      dark
    >
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>

      <v-btn
      depressed
      color="white"
      class="black--text"
    >
      로그인
    </v-btn>
    
  </v-app-bar>
  
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="this.userInfo.agent_img"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{this.userInfo.real_estate_owner_name}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.route"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

  </div>
</template>
<script>
export default {
  name: 'mainPage',
 

  components: {  },
  data() {
    return {
      userInfo:{},
      drawer: null,
        items: [
          { title: '홈', icon: 'mdi-home' , route : '/' },
          { title: 'About', icon: 'mdi-forum' ,route : '/about'},
        ],
    }
  },


  created() {
    
  },
  mounted() {
   //this.getUserInfo()
  },
  methods: {
   getUserInfo(){
     this.$axios.get("http://api-ccw.com/pro/auth/userinfo",{
       params : {pro_pid : 14}
     }).then((res)=>{
       console.log(res)
       this.userInfo = res.data.proUserInfo
       
     }).catch((err)=>{
       console.log(err)
     })
   }



  },
}
</script>
