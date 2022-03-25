<template>

 <v-container>
      <v-row dense>
        <v-col v-for="n in 16" :key="n" cols="12" md="12">
          <v-card class="pa-16" tile>
            todo

          </v-card>

        </v-col>

      </v-row>
     </v-container>
 
</template>
<script>

  export default {
    name: 'todoView',

    components: {
      
    },
    data(){
       return { 
    }
    },
    methods:{
        buttonClick(){
           this.count = "성재호"
        }
    }
  }
</script>

<style scoped>

</style>