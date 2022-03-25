<template>
  <v-container fluid>
    <v-row justify="center" class="mt-5">
      <h1>에이전트 레오 프로 회원 관리</h1>
    </v-row>
    <v-row class="mt-10" justify="center">
      <v-col class="ma-10">
        <v-data-table
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
              <td>{{ (index +(itemsPerPage*(page-1))+1) }}</td>
              <td>{{ item.user_id }}</td>
              <td>{{ item.user_name }}</td>
              <td>{{ item.real_estate_name }}</td>
              <td v-if="item.agent_type=='O'"> 개업 </td>
              <td v-else-if="item.agent_type=='A'"> 소속</td>
              <td v-else> 탈퇴한 회원</td>
              <td>{{ item.updated_at }}</td>
              <td>
                <v-chip :color="getColor(item.approval_status)" class="white--text" dark v-if="item.approval_status=='Y'">
                  승인 
                </v-chip>
                <v-chip :color="getColor(item.approval_status)" class="white--text" dark v-else-if="item.approval_status=='N'">
                  비승인 
                </v-chip>
                 <v-chip :color="getColor(item.approval_status)" class="white--text" dark v-else-if="item.approval_status=='U'">
                  승인 대기 중 
                </v-chip>
                <v-chip :color="getColor(item.approval_status)" class="white--text" dark v-else>
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
export default {
  name: "mainView",

  components: {},
  data() {
    return {
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
    };
  },
  mounted() {
    this.getProList();
  },
  methods: {
    getProList() {
      this.$axios
        .get("http://api-ccw.com/admin/reoh-pro/list")
        .then((res) => {
          console.log(res.data);
          this.desserts = res.data.info;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleClick(item) {
      console.log(item);
      this.$router.push({name :'detail' , params : {"pro_pid" : item.user_pid, "approval_status" : item.approval_status}})
    },

    getColor(approval_status) {
      if (approval_status == "Y") return "#2ECC71";
      else if(approval_status == "N") return '#E74C3C';
      else if(approval_status == "U") return '#CCCCCC';
      else return " #999999";
    },

    changeType(agent_type){
      if (agent_type == "O") return "개업";
      else if (agent_type == "A") return "소속";
      else return "탈퇴한 회원";
    }
  },
};
</script>

<style scoped>
.v-data-table-header {
  background-color: grey;
}
</style>