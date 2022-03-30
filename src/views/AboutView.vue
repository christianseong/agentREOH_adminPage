<template>
 
     <v-container>
      <v-row dense>
        <v-col v-for="n in 5" :key="n" cols="12" md="12">
          <v-card class="pa-16" tile>
            관리자 승인

          </v-card>

        </v-col>

      </v-row>
     </v-container>

</template>

<script>


export default {
  name: 'aboutView',
  components : {
    
  },
   data() {
    return {
      userInfo:{},
      
    }
  },
};
</script>
