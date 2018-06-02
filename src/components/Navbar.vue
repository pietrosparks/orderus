<template>
  <div>
    <nav class="navbar is-transparent">
      <div class="navbar-brand">
        <a class="navbar-item" @click="dropUser()">
            OrderUs
        </a>
        <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="navbarExampleTransparentExample" class="navbar-menu">
        <div class="navbar-start">
          <router-link to="/order" class="navbar-item">
            New Order
          </router-link>
          <router-link to="/myOrders" class="navbar-item">
            My Orders
          </router-link>

        </div>

      </div>
    </nav>

  </div>

</template>

<script>
  export default {
    name: "Navbar",
    data() {
      return {

      }
    },
    methods:{
        dropUser(){
            localStorage.clear();
            this.$router.push('/')
        }
    }
  }

</script>

<style>


</style>
