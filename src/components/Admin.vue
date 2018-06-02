<template>
  <div>
    <navbar></navbar>
    <div class="columns">
      <div class="column is-half half-back">
        <div class="columns">
          <div class="column is-two-thirds is-centered">
            <div class="box ">
              <a class="button" @click="getAllOrders()">All Orders</a>
              <a class="button" @click="openOrders()">Open Orders</a>
              <a class="button" @click="scannedOrders()">Scanned Orders</a>
              <hr>
              <div class="box orders" v-for="order in orders" @click="getOrder(order)">
                <p>Order Id: {{order.orderId}}
                  <span v-if="order.status == 'open'" class="is-open">{{order.status}}</span>
                  <span v-if="order.status == 'scanned'" class="is-scanned">{{order.status}}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-half half-details">
        <div class="columns" v-if="openedOrder!==null">
          <div class="column is-two-thirds is-centered">
            <div class="box">
              <h1>Order Summary for
                <span class="is-teal-color is-size-5">{{openedOrder.orderId}}</span>
              </h1>
              <hr>
              <p>Customer Name : {{openedOrder.customer.name}}</p>
              <p>Status :
                <span v-if="openedOrder.status == 'open'" class="is-open">{{openedOrder.status}}</span>
                <span v-if="openedOrder.status == 'scanned'" class="is-scanned">{{openedOrder.status}}</span>
              </p>
              <br>
              <div class="box" v-for="order in openedOrder.order">
                <p>{{order.name}} x {{order.count}} : {{order.price * order.count}}</p>
              </div>
              <div v-if="openedOrder.discount">
                <p class="is-size-5">Total: {{openedOrder.total}} x {{openedOrder.discount.value}}% Discount =
                  <span class="is-teal-color is-size-4">{{openedOrder.total-(openedOrder.total*(openedOrder.discount.value/100))}} </span>
                </p>
              </div>
              <div v-else>
                <p class="is-size-5">Total:
                  <span class="is-teal-color">{{openedOrder.total}}</span>
                </p>
              </div>

            </div>

            <a v-if="openedOrder.status == 'scanned'" class="button submit is-teal" @click="doneOrder()">Check this Order as done</a>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" :class="{'is-active':modalOpen}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <p class="is-size-4">Add New Food</p>
          <hr>
          <div class="fields">
            <input type="text" class="input" placeholder="Food Name" v-model="newFood.name">
          </div>
          <div class="fields">
            <input type="text" class="input" placeholder="Food Type" v-model="newFood.type">
          </div>
          <div class="fields">
            <input type="text" class="input" placeholder="Food Price" v-model="newFood.price">
          </div>
          <hr>
          <a class="button is-teal" @click="submitFood()">Submit</a>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="closeModal()"></button>
    </div>
  </div>

  </div>
  </div>
</template>
<script>
  import navbar from '@/components/AdminNavbar';
  import {
    EventBus
  } from '@/eventbus'
  export default {
    name: 'Admin',
    data() {
      return {
        allOrders: null,
        orders: null,
        openedOrder: null,
        modalOpen: false,
        newFood: {}
      }
    },
    methods: {
      initAllOrders() {
        this.$axios.get('/order/all').then(resp => {
          this.allOrders = resp.data.data
          this.orders = this.allOrders;
        }).catch(e => {
          console.log(e)
        })
      },
      getAllOrders() {
        this.orders = this.allOrders
      },
      openOrders() {
        this.orders = this.allOrders.filter(order => order.status == 'open')
      },
      scannedOrders() {
        this.orders = this.allOrders.filter(order => order.status == 'scanned')
      },
      getOrder(order) {
        this.openedOrder = order
      },
      doneOrder() {
        this.$axios.put(`/order/done/${this.openedOrder.orderId}`, {}).then(resp => {
          this.openedOrder = null;
          this.initAllOrders();

        }).catch(e => {
          console.log(e);
        })
      },
      closeModal() {
        this.modalOpen = false;
        EventBus.$emit('closeFoodModal', this.modalOpen);
      },
      submitFood() {
        this.$axios.post('/food', this.newFood).then(resp => {
          console.log(resp, "hshs")
          this.closeModal();
        })
      }
    },
    mounted() {
      this.initAllOrders();
      EventBus.$on('foodModal', event => {
        this.modalOpen = event;
      });
    },
    components: {
      navbar
    }
  }

</script>
<style scoped>
  .is-open {
    background-color: teal;
    color: white;
    padding: 5px;
    border-radius: 5px;
  }

  .is-teal {
    background-color: teal;
    color: white;
  }

  .box.orders {
    cursor: pointer;
  }

  .is-scanned {
    background-color: #90A4AE;
    color: white;
    padding: 5px;
    border-radius: 5px;
  }

  .half-back {
    background-color: teal;
    color: white;
    min-height: 94.5vh
  }

  .half-details {
    background-color: #EEEEEE;
  }

  .is-teal-color {
    color: teal;

  }

  .is-centered {
    margin: 20px auto;
  }

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

</style>
