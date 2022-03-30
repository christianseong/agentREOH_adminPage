<template>
  <v-container fluid>
    <v-row justify="center" class="mt-5">
      <h1>관리자 로그인</h1>
    </v-row>
    <v-row class="mt-10" justify="center">
      <v-card flat class="mx-auto">
        <v-row style="margin-top: 60px">
          <v-col>
            <v-alert type="error" v-if="this.checkFromAuth"> LogIn Required. </v-alert>
            <v-form style="width: 700px; height: 700px">
              <div class="mx-3">
                <v-icon color="black" size="30px">mdi-account</v-icon> 아이디
                <div class="mx-1">
                  <v-text-field
                    placeholder="아이디를 입력하세요"
                    v-model="userId"
                    required
                  ></v-text-field>
                </div>
              </div>
              <div class="mx-3">
                <v-icon color="black" size="30px">mdi-lock</v-icon>
                비밀번호
                <div class="mx-1">
                  <v-text-field
                    placeholder="비밀번호를 입력하세요"
                    type="password"
                    v-model="userPassword"
                    required
                  ></v-text-field>
                </div>
              </div>
              <v-card-actions>
                <v-btn color="#2c4f91" dark large block @click="loginSubmit"
                  >로그인
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
  </v-container>
</template> <script>
export default {
  name: "loginView",
  data() {
    return {
      checkFromAuth : false,
      userId: "",
      userPassword: "",
      items: [
        { title: "홈", icon: "mdi-home", route: "/" },
        { title: "메인", icon: "mdi-account", route: "/main" },
        { title: "About", icon: "mdi-forum", route: "/about" },
      ],
    };
  },
  methods: {

    async loginSubmit() {
      
      if (this.userId=="") {
        alert("아이디를 입력해주세요!");
        return false;
      }
      if (this.userPassword=="") {
        alert("비밀번호를 입력해주세요!");
        return false;
      }
  

      this.$store
        .dispatch("login", {
          userId: this.userId,
          password: this.userPassword,
        })
        .then((response) => {
          console.log(response)
          if (response.status == 200) {
            this.$router.push({
              name: "main",
            });
          }
        })
        .catch(({ message }) => alert(message));

      return true;
    },
  },
  mounted(){
     if(this.$route.params.login=="required"){
         this.checkFromAuth = true
     }else{
          this.checkFromAuth = false
     }
  }
};
</script>

