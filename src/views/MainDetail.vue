 <template>
  <v-container>
    <v-row justify="center" class="mt-3">
      <h1>에이전트 레오 프로 회원 상세 페이지</h1>
    </v-row>
    <v-row class="mt-0" align="center" justify="center">
      <v-col class="ma-3">
        <v-card ripple class="pa-0 ma-0 rounded-xl" height="700" elevation="10">
          <v-row class="pa-0 ma-0">
            <v-col
              cols="6"
              align-self="center"
              class="pl-5 pr-5 pt-3 pb-3"
              v-bind:style="{ 'border-right': '1px solid #c8c8c8' }"
            >
              <v-row class="pa-0 ma-0">
                <v-img
                  :src="this.userInfo.agent_img"
                  height="300"
                  class="rounded-xl"
                >
                  <v-chip-group>
                    <v-chip class="ma-2 mt-3" color="red" text-color="white">
                      {{ this.changeType(this.userInfo.agent_type) }}
                    </v-chip>
                  </v-chip-group>
                </v-img>
              </v-row>

              <v-row
                class="pa-0 ma-0 mt-1 row-left"
                v-for="(i, index) in this.userInfoLeftList"
                :key="index"
              >
                <v-col class="ma-0 pa-0">
                  <v-card-text
                    class="text-left card-font-size"
                    v-bind:style="{ 'font-weight': 'bold' }"
                  >
                    {{ i.name }}
                  </v-card-text>
                </v-col>

                <v-col class="ma-0 pa-0">
                  <v-card-text class="text-right card-font-size">
                    {{ i.data }}
                  </v-card-text>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6" align-self="center" class="pl-5 pr-5 pt-3 pb-3">
              <v-row
                class="pa-0 ma-0 row-right"
                v-for="(i, index) in this.userInfoRightList"
                :key="index"
              >
                <v-col class="ma-0 pa-0">
                  <v-card-text
                    class="text-left"
                    v-bind:style="{ 'font-weight': 'bold' }"
                  >
                    {{ i.name }}
                  </v-card-text>
                </v-col>

                <v-col class="ma-0 pa-0">
                  <v-card-text class="text-right">
                    <v-btn
                      color="red"
                      class="white--text"
                      mr-1
                      width="1px"
                      v-if="i.name == '등록번호'"
                      @click="popUpRegistration()"
                      >등록증</v-btn
                    >
                    <v-btn
                      color="red"
                      class="white--text"
                      mr-1
                      width="1px"
                      v-else-if="i.name == '대표 계좌번호'"
                      @click="popUpAccount()"
                      >통장사본</v-btn
                    >
                    <v-btn
                      color="red"
                      class="white--text"
                      mr-1
                      width="1px"
                      v-else-if="i.name == '자격증 번호'"
                      @click="popUpAgent()"
                      >자격증</v-btn
                    >
                    {{ i.data }}
                  </v-card-text>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row
      align="center"
      class="mt-0"
      v-if="this.$route.params.approval_status == 'U'"
    >
      <v-col align="center" cols="6">
        <v-btn
          v-bind:style="{
            width: '200px',
            height: '50px',
            color: 'white',
            'font-size': '1.3rem',
          }"
          color="#2ECC71"
          @click="approvalPro()"
          >승인</v-btn
        >
      </v-col>
      <v-col align="center" cols="6">
        <v-btn
          v-bind:style="{
            width: '200px',
            height: '50px',
            color: 'white',
            'font-size': '1.3rem',
          }"
          color="#E74C3C"
          @click="rejectionPro()"
          >비승인</v-btn
        >
      </v-col>
    </v-row>
    <v-row
      align="center"
   
      class="mt-0"
      v-if="this.$route.params.approval_status == 'Y'"
    >
   
       <v-col align="center" cols="6">
        <v-text-field
          placeholder="포인트를 입력하세요"
          v-model="point"
          type="number"

          maxLength="4"

          required
        ></v-text-field>
       </v-col>
        <v-col align="center" cols="6">
        <v-btn
          v-bind:style="{
            width: '200px',
            height: '50px',
            color: 'white',
            'font-size': '1.3rem',
          }"
          color="#E74C3C"
          @click="addPoint()"
          >포인트 추가</v-btn
        >
      </v-col>
    </v-row>

    <v-dialog
      transition="dialog-bottom-transition"
      max-width="1000"
      v-model="dialog"
    >
      <v-card>
        <v-toolbar
          color="red"
          class="white--text"
          style="font-size: 1.3rem"
          dark
          >{{ this.dialogTitle }}</v-toolbar
        >
        <v-card-text v-if="this.dialogImage != null">
          <v-img
            :src="this.dialogImage"
            height="700px"
            width="1000px"
            class="rounded-xl mt-3"
            v-if="this.dialogImage != ''"
          >
          </v-img>
        </v-card-text>
        <v-card-text v-else>
          <p
            mt-10
            class="text-h4 text-center text--primary"
            style="margin-top: 30px"
          >
            등록되어 있지 않습니다
          </p>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="closeDialog()">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import http from "../http";
export default {
  name: "mainDetail",

  components: {},
  data() {
    return {

  
      dialog: false,
      dialogTitle: "",
      dialogImage: "",
      user_pid: 0,
      userInfo: {},
      userInfoLeftList: [],
      userInfoRightList: [],
      gender: "",

      agent_certificate: "",
      registration_certificate: "",
      account_copy: "",
      point : ''
    };
  },
  methods: {
    addPoint(){
      
 
      if(this.point=="" || this.point.length >3){
        alert('포인트를 올바르게 입력해주세요!')
        return;
      }

       var params = {
        pro_pid: this.$route.params.pro_pid,
        point : parseInt(this.point)
      };

      http
        .post("/admin/reoh-pro/point", params)
        .then((res) => {
          console.log(res.data);
          parseInt(this.point)
          alert(`${this.point} 포인트가 추가되었습니다.  ${res.data.point} 포인트가 되었습니다`);
        
          this.point=""
        })
        .catch((error) => {
          alert(error.response.data.message);
          //reject(error)
        });
    },

    closeDialog() {
      this.dialogTitle = "";
      this.dialogImage = "";
      this.dialog = false;
    },
    popUpRegistration() {
      this.dialogTitle = "등록번호";
      this.dialogImage = this.registration_certificate;
      this.dialog = true;
    },
    popUpAccount() {
      this.dialogTitle = "대표 계좌번호";
      this.dialogImage = this.account_copy;
      this.dialog = true;
    },
    popUpAgent() {
      this.dialogTitle = "자격증 번호";
      this.dialogImage = this.agent_certificate;
      this.dialog = true;
    },

    approvalPro() {
      var params = {
        pro_pid: this.$route.params.pro_pid,
      };

      http
        .put("/admin/reoh-pro/approval", params)
        .then((res) => {
          console.log(res.data);
          alert("승인 되었습니다");
          this.$router.push({ name: "main" });
        })
        .catch((error) => {
          alert(error.response.data.message);
          //reject(error)
        });

      // this.$axios
      //   .put("http://api-ccw.com/admin/reoh-pro/approval", params)
      //   .then((res) => {
      //     console.log(res.data);
      //     alert("승인 되었습니다");
      //     this.$router.push({ name: "main" });
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },

    rejectionPro() {
      var params = {
        pro_pid: this.$route.params.pro_pid,
      };

      http
        .put("/admin/reoh-pro/rejection", params)
        .then((res) => {
          console.log(res.data);
          alert("비승인 되었습니다");
          this.$router.push({ name: "main" });
        })
        .catch((error) => {
          alert(error.response.data.message);
          //reject(error)
        });
    },

    getDetailUser() {
      http
        .get("/admin/reoh-pro", {
          params: { pro_pid: this.$route.params.pro_pid },
        })
        .then((res) => {
          console.log(res.data);
          this.userInfo = res.data.info;

          console.log(this.userInfo);

          this.agent_certificate = this.userInfo.agent_certificate;
          this.registration_certificate =
            this.userInfo.registration_certificate;
          this.account_copy = this.userInfo.account_copy;

          if (this.userInfo.pro_gender == "M") {
            this.gender = "남성";
          } else {
            this.gender = "여성";
          }

          this.userInfoLeftList.push({
            name: "이름",
            data: this.userInfo.pro_user_name,
          });
          this.userInfoLeftList.push({
            name: "아이디",
            data: this.userInfo.pro_user_id,
          });
          this.userInfoLeftList.push({
            name: "연락처",
            data: this.userInfo.pro_phone,
          });
          this.userInfoLeftList.push({
            name: "생년월일",
            data: this.userInfo.pro_birth,
          });
          this.userInfoLeftList.push({
            name: "성별",
            data: this.gender,
          });
          this.userInfoLeftList.push({
            name: "sns 마케팅 활용 동의",
            data: this.userInfo.sms_consent,
          });
          this.userInfoLeftList.push({
            name: "이메일 마케팅 활용 동의 ",
            data: this.userInfo.email_consent,
          });

          this.userInfoRightList.push({
            name: "중개사무소명",
            data: this.userInfo.real_estate_name,
          });
          this.userInfoRightList.push({
            name: "대표자명",
            data: this.userInfo.real_estate_owner_name,
          });
          this.userInfoRightList.push({
            name: "개업일",
            data: this.userInfo.opening_day,
          });
          this.userInfoRightList.push({
            name: "주소",
            data: this.userInfo.address + "," + this.userInfo.address_detail,
          });
          this.userInfoRightList.push({
            name: "등록번호",
            data: this.userInfo.registration_number,
          });
          this.userInfoRightList.push({
            name: "대표 연락처",
            data: this.userInfo.pro_phone,
          });
          this.userInfoRightList.push({
            name: "대표 은행 ",
            data: this.userInfo.account_bank,
          });
          this.userInfoRightList.push({
            name: "대표 계좌번호",
            data: this.userInfo.account_number,
          });
          this.userInfoRightList.push({
            name: "대표 예금주",
            data: this.userInfo.account_holder,
          });
          this.userInfoRightList.push({
            name: "대표 메일",
            data: this.userInfo.contact_email,
          });
          this.userInfoRightList.push({
            name: "자격증 번호",
            data: this.userInfo.certificate_number,
          });

          console.log(this.userInfoLeftList[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    },



    changeType(agent_type) {
      if (agent_type == "O") return "개업 공인중개사";
      else if (agent_type == "A") return "소속 공인중개사";
      else return "탈퇴한 회원";
    },
  },

  mounted() {
    if (this.$route.params.pro_pid == undefined) {
      this.$router.push({ name: "main" });
    } else {
      this.getDetailUser();
    }
  },
};
</script>

<style scoped>
.v-card__text {
  font-size: 1.3rem;
}

.col .row-right {
  height: 3.8rem;
}

.col .row-left {
  height: 3rem;
}

.card-font-size {
  font-size: 1.2rem;
}
</style>
