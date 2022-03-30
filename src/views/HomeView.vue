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
      @click="toAccount()"
    >
    <v-icon color="black" size="30px">mdi-account</v-icon> 회원가입
       </v-btn> -->

      <v-btn
      depressed
      color="white"
      class="black--text"
      @click="toLogin()"
      v-if="!isAuthenticated"
    >
    <v-icon color="black" size="30px" >mdi-login</v-icon> 로그인
      
    </v-btn>

      <v-btn
      v-else
      depressed
      color="white"
      class="black--text"
      @click="logOut()"
    >
    <v-icon color="black" size="30px">mdi-logout</v-icon> 로그아웃
      
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
import { mapGetters } from "vuex"
export default {
  name: 'mainPage',
 

  components: {  },
  data() {
    return {
      userInfo:{},
      drawer: null,
        items: [
          { title: '홈', icon: 'mdi-home' , route : '/' },
           { title: '회원관리', icon: 'mdi-account' , route : '/main' },
          { title: '관리자 승인', icon: 'mdi-forum' ,route : '/about'},
        ],

      

    }
  },


  created() {
    
  },
   computed: {
      ...mapGetters(["isAuthenticated"]),
    },

  mounted() {
   //this.getUserInfo()
  },
  methods: {
    logOut(){
      console.log("눌림")
      this.$store
        .dispatch("logout")
        .then((response) => {
          console.log(response)
          
            this.$router.push({
              name: "login",
            });
          
        })
        .catch(({ message }) => alert(message));
    },
    toAccount(){
      this.$router.push({name :'signup' })
    },
    toLogin(){
      this.$router.push({name :'login' })
    },
  //  getUserInfo(){
  //    this.isAuthenticated = this.$store.getters["isAuthenticated"]
  //     this.token = this.$store.getters["token"]

      
  //  }



  },
}
</script>
