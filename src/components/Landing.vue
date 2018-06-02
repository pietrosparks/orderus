<template>
  <div>
    <navbar></navbar>
   <div class="columns">
     <div class="column is-half half-back">
       <div class="welcome">
          <h1 class="is-size-2 ">
              Welcome to OrderUS
            </h1>
      
            <h3 class="is-size-5">Input your name and proceed with your order</h3>
       </div>
     
     </div>
     <div class="column is-half half-name">
      
         <div class="enter-name">
          <input type="text" class="input name" placeholder="Name" v-model="name">
          <a class="button is-success" :class="{'is-loading':isLoading}" @click="enterName()">Enter</a>
       </div>
     
     </div>
   </div>
  
  </div>
  
</template>

<script>
  import random from 'random-id'
  import navbar from '@/components/Navbar'
  export default {
    name: 'Landing',
    data() {
      return {
        name:'',
        isLoading: false
      }
    },
    methods: {
      enterName(){
        const user = {
          name: this.name,
          token: random(7)
        }
        localStorage.setItem('orderCred', JSON.stringify(user));
        this.$router.push('/order')
      }
    },
    components:{
      navbar
    }
  }

</script>

<style scoped>
 .half-back{
   background-color: teal;
   color: white;
   min-height: 94.5vh
 }
 .welcome{
   position: relative;
   top: 40%
 }
 .half-name{
  background-color: #EEEEEE;
 }

 .input.name{
   width: 60%;
 }
 .enter-name {
   position: relative;
   top: 40%;
 }
</style>
