<template>
  <v-container fluid>
    <v-row justify="center" class="mt-5">
      <h1>관리자 회원가입</h1>
    </v-row>
    <v-row class="mt-10" justify="center">
      <v-card flat class="mx-auto">
        <v-row style="margin-top: 60px">
          <v-col>
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
              <div class="mx-3">
                <v-icon color="black" size="30px">mdi-pencil</v-icon>
                이름
                <div class="mx-1">
                  <v-text-field
                    placeholder="이름을 입력하세요"
                    v-model="userName"
                    required
                  ></v-text-field>
                </div>
              </div>
              <v-card-actions>
                <v-btn color="#2c4f91" dark large block @click="formSubmit()"
                  >가입</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
  </v-container>
</template> <script>
 import { mapGetters } from "vuex"
export default {
  name: "signUpView",
  data() {
    return {
      userId: "",
      userName: "",
      userPassword: "",
    };
  },
   computed: {
      ...mapGetters(["isAuthenticated"]),
    },
  methods: {
    async formSubmit() {
      
      if (this.userId=="") {
        alert("아이디를 입력해주세요!");
        return false;
      }
      if (this.userPassword=="") {
        alert("비밀번호를 입력해주세요!");
        return false;
      }
      if (this.userName=="") {
        alert("이름을 입력해주세요!");
        return false;
      }
  

      this.$store
        .dispatch("register", {
          userId: this.userId,
          userPassword: this.userPassword,
          userName: this.userName,
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
};
</script>

