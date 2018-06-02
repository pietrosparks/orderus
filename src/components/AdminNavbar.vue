<template>
  <div>
    <nav class="navbar is-transparent">
      <div class="navbar-brand">
        <a class="navbar-item">
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
          <a class="navbar-item button is-teal" @click="addFood()">
            Add Foods
          </a>
          <!-- <router-link to="/myOrders" class="navbar-item">
                  My Orders
                </router-link> -->
        </div>
      </div>
    </nav>
  </div>

</template>

<script>
  import {
    EventBus
  } from '@/eventbus'
  export default {
    name: "Navbar",
    data() {
      return {
        modal: false
      }
    },
    methods: {
      dropUser() {
        this.$router.push('/')
      },
      addFood() {
        this.modal = !this.modal
        EventBus.$emit('foodModal', this.modal)
      }
    },
    mounted() {
      EventBus.$on('closeFoodModal', event => {
        this.modal = event;
      });
    }
  }

</script>

<style scoped>
  .is-teal {
    color: white;
    background-color: teal;
    margin-top: 7px;
  }

</style>
