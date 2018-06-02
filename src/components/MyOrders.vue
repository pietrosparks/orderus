<template>
  <div v-if="myOrders!==null">
    <navbar></navbar>
    <div class="columns">
      <div class="column is-half is-centered">
        <div class="box">
          <h2 class="is-size-4">Your Orders </h2>
          <hr>

          <div class="box" v-for="orders in myOrders">
            <h1 class="is-size-5">Order Id: {{orders.orderId}}</h1>
            <div v-for="order in orders.order">
              <p>{{order.name}} x {{order.count}} : {{order.price}}</p>
            </div>
            <p>Order Status:
              <span v-if="orders.status == 'open'" class="is-open">{{orders.status}}</span>
              <span v-if="orders.status == 'scanned'" class="is-scanned">{{orders.status}}</span>
            </p>
            </p>
            <div v-if="orders.discount">
              <p class="is-size-4">Total: {{orders.total}} x {{orders.discount.value}}% Discount =
                <span class="is-teal-color is-size-5">{{orders.total-(orders.total*(orders.discount.value/100))}} </span>
              </p>
            </div>
            <div v-else>
              <p class="is-size-4">Total:
                <span class="is-teal-color">{{orders.total}}</span>
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  </div>

  </div>
  </div>
</template>
<script>
  import navbar from '@/components/Navbar'
  export default {
    name: 'MyOrders',
    data() {
      return {
        cred: null,
        myOrders: null
      }
    },
    methods: {
      getOrders() {
        this.$axios.get(`/order/customer/${this.cred.token}`).then(resp => {
          console.log(resp);
          this.myOrders = resp.data.data;
        }).catch(e => {
          console.log(e);
        })
      }
    },
    mounted() {
      this.cred = JSON.parse(localStorage.getItem('orderCred'))
      this.getOrders();
    },
    components: {
      navbar
    }
  }

</script>
<style>
  .is-open {
    background-color: teal;
    color: white;
    padding: 5px;
    border-radius: 5px;
  }

  .is-scanned {
    background-color: #90A4AE;
    color: white;
    padding: 5px;
    border-radius: 5px;
  }

  .is-teal-color {
    color: teal;

  }

  .count {
    padding: 10px;
    background-color: grey
  }

  .is-centered {
    margin: 20px auto;
  }

</style>
