<template>
  <v-container fluid>
    <v-row justify="center" class="mt-5">
      <h1>회원 관리</h1>
    </v-row>
      <v-row justify="center" >
          <v-text-field
            class="shrink"
            v-model="search"
            append-icon="mdi-magnify"
            label="검색"
            single-line
            hide-details
          ></v-text-field>
        </v-row>
    <v-row class="mt-10" justify="center">
      <v-col class="ma-0">
      
      
        <v-data-table
          :loading="loadingStatus"
          loading-text="데이터를 불러오는중...."
          :search="search"
          :headers="headers"
          :items="desserts"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          class="elevation-1 ma-2"
          @page-count="pageCount = $event"
        >
          <template v-slot:item="{ item, index }">
            <tr @click="handleClick(item)" class="text-center">
              <td>{{ index + itemsPerPage * (page - 1) + 1 }}</td>
              <td>{{ item.user_id }}</td>
              <td>{{ item.user_name }}</td>
              <td>{{ item.real_estate_name }}</td>
              <td v-if="item.agent_type == 'O'">개업</td>
              <td v-else-if="item.agent_type == 'A'">소속</td>
              <td v-else>탈퇴한 회원</td>
              <td>{{ item.updated_at }}</td>
              <td>
                <v-chip
                  :color="getColor(item.approval_status)"
                  class="white--text"
                  dark
                  v-if="item.approval_status == 'Y'"
                >
                  승인
                </v-chip>
                <v-chip
                  :color="getColor(item.approval_status)"
                  class="white--text"
                  dark
                  v-else-if="item.approval_status == 'N'"
                >
                  비승인
                </v-chip>
                <v-chip
                  :color="getColor(item.approval_status)"
                  class="white--text"
                  dark
                  v-else-if="item.approval_status == 'U'"
                >
                  승인 대기 중
                </v-chip>
                <v-chip
                  :color="getColor(item.approval_status)"
                  class="white--text"
                  dark
                  v-else
                >
                  탈퇴한 회원
                </v-chip>
              </td>
            </tr>
          </template>
        </v-data-table>
        <div class="text-center pt-2">
          <v-pagination v-model="page" :length="pageCount"></v-pagination>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import http from "../http"
export default {
  name: "mainView",

  components: {},
  data() {
    return {
      loadingStatus : true,
      page: 1,
      pageCount: 0,
      itemsPerPage: 15,
      headers: [
        {
          text: "No",
          align: "center",
          sortable: false,
          value: "user_pid",
        },
        {
          text: "아이디",
          align: "center",
          sortable: true,
          value: "user_id",
        },
        {
          text: "이름",
          align: "center",
          sortable: true,
          value: "user_name",
        },
        {
          text: "중개사무소명",
          align: "center",
          sortable: true,
          value: "real_estate_name",
        },
        {
          text: "타입",
          align: "center",
          sortable: true,
          value: "agent_type",
        },
        {
          text: "승인요청일",
          align: "center",
          sortable: true,
          value: "updated_at",
        },
        {
          text: "승인여부",
          align: "center",
          sortable: true,
          value: "approval_status",
        },
      ],
      desserts: [],
      search: "",
    };
  },
  mounted() {
    this.getProList();
    // var info = {
    //   agent_img:
    //     "https://agent-reoh-bucket.s3.ap-northeast-2.amazonaws.com/pro/profile/1647934297679.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAU2PQ723K2HIWI6NC%2F20220324%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20220324T110301Z&X-Amz-Expires=604800&X-Amz-Signature=f4744a31dd32895d0fefa33f2975c54fa6c4c6c452b00936b1c1a44b9aa8b013&X-Amz-SignedHeaders=host",
    //   user_pid: 14,
    //   agent_type: "A",
    //   user_name: "한은경",
    //   user_id: "erika1234",
    //   pro_phone: "010-5185-8392",
    //   pro_birth: "1998-09-11",
    //   pro_gender: "F",
    //   sms_consent: "N",
    //   email_consent: "N",
    //   real_estate_name: "레오레오",
    //   real_estate_owner_name: "김백현",
    //   opening_day: "2022-03-22",
    //   address: "서울 서초구 서초대로77길 7 (서초동)",
    //   address_detail: "11",
    //   registration_number: "7382828",
    //   contact_number: "하하하하",
    //   account_bank: "우리",
    //   account_number: "555555",
    //   account_holder: "1234",
    //   contact_email: "admin@chungchunwrestlsr.com",
    //   certificate_number: "123456789",
    //   created_at: "2022-03-22 07:32:16",
    //   updated_at: "2022-03-24 10:18:48",
    //   approval_status: "Y",
    // };

    // var info2 = {
    //   agent_img:
    //     "https://agent-reoh-bucket.s3.ap-northeast-2.amazonaws.com/pro/profile/1647934297679.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAU2PQ723K2HIWI6NC%2F20220324%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20220324T110301Z&X-Amz-Expires=604800&X-Amz-Signature=f4744a31dd32895d0fefa33f2975c54fa6c4c6c452b00936b1c1a44b9aa8b013&X-Amz-SignedHeaders=host",
    //   user_pid: 15,
    //   agent_type: "O",
    //   user_name: "성재호",
    //   user_id: "chris1234",
    //   pro_phone: "010-5185-8392",
    //   pro_birth: "1998-09-11",
    //   pro_gender: "F",
    //   sms_consent: "N",
    //   email_consent: "N",
    //   real_estate_name: "재호재호",
    //   real_estate_owner_name: "김백현",
    //   opening_day: "2022-03-22",
    //   address: "서울 서초구 서초대로77길 7 (서초동)",
    //   address_detail: "11",
    //   registration_number: "7382828",
    //   contact_number: "하하하하",
    //   account_bank: "우리",
    //   account_number: "555555",
    //   account_holder: "1234",
    //   contact_email: "admin@chungchunwrestlsr.com",
    //   certificate_number: "123456789",
    //   created_at: "2022-03-22 07:32:16",
    //   updated_at: "2022-03-24 10:18:48",
    //   approval_status: "Y",
    // };
    //this.desserts.push(info);
    //this.desserts.push(info2);
  },
  methods: {
    getProList() {

       http
          .get("/admin/reoh-pro/list")
          .then((res) => {
            console.log(res.data);

          this.desserts = res.data.info;
          this.loadingStatus =false
          })
          .catch(error => {
            alert(error.response.data.message)
            //reject(error)
          })
     
    },
    handleClick(item) {
      console.log(item);
      this.$router.push({
        name: "detail",
        params: {
          pro_pid: item.user_pid,
          approval_status: item.approval_status,
        },
      });
    },

    getColor(approval_status) {
      if (approval_status == "Y") return "#2ECC71";
      else if (approval_status == "N") return "#E74C3C";
      else if (approval_status == "U") return "#CCCCCC";
      else return " #999999";
    },

    changeType(agent_type) {
      if (agent_type == "O") return "개업";
      else if (agent_type == "A") return "소속";
      else return "탈퇴한 회원";
    },
  },
};
</script>

<style scoped>
.v-data-table-header {
  background-color: grey;
}
.v-text-field {
  width: 400px;
}
</style>