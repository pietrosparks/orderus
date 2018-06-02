<template>
  <div v-if="user!==null">
    <navbar></navbar>
    <div class="columns">
      <div class="column is-half half-back">
        <div class="welcome ">
          <h1 class="is-size-2 ">
            Welcome {{user.name}}
          </h1>
          <h3 class="is-size-5">Choose from our menu below</h3>
          <br>
          <div v-for="(food, index) in foodMenu" @click="addFood(food, index)">
            <a class="button is-padded">
              {{food.name}}
            </a>
          </div>
        </div>
      </div>
      <div class="column is-half half-cart">
        <div class="columns">
          <div class="column is-two-thirds is-centered box">
            <h3 class="is-size-4">Food Cart</h3>
            <hr>
            <div v-if="foodCart.length">
              <div v-for="(food, index) in foodCart">
                <div class="box cart">
                  <p style="display:inline">{{food.name}}</p>
                  <div class="is-pulled-right">
                    <a class="button is-teal rounded" @click="decCount(food, index)">-</a>
                    <span class="count">{{food.count}}</span>
                    <a class="button is-teal rounded" @click="incCount(food, index)">+</a>
                  </div>
                </div>
              </div>
            </div>
            <input type="text" class="input" placeholder="Total" v-model="total">
            <hr>
            <input type="text" placeholder="Enter discount code" v-model="discountCode" class="input">
          </div>
        </div>
        <a class="button submit is-teal" @click="submitOrder()">Submit Order</a>
      </div>
    </div>

  </div>
  </div>
</template>
<script>
  import navbar from '@/components/Navbar'
  export default {
    name: 'Order',
    data() {
      return {
        user: null,
        foodMenu: null,
        foodCart: [],
        discountCode: null,
        foodTotal: null
      }
    },
    methods: {
      incCount(food, index) {
        if (this.foodCart.includes(food)) {
          this.foodCart[index].count++
        }
      },
      decCount(food, index) {
        if (this.foodCart.includes(food) && this.foodCart[index].count > 0) {
          this.foodCart[index].count--
        }
        if (this.foodCart[index].count == 0) {
          this.foodCart.splice(index, 1);
        }
      },
      retrieveData() {
        this.user = JSON.parse(localStorage.getItem('orderCred'));
        this.$axios.get('/food').then(resp => {
          resp.data.data = resp.data.data.map(food => {
            food.count = 0
            return food;
          })
          this.foodMenu = resp.data.data;
        }).catch(err => {
          console.log(err)
        })
      },
      addFood(food, index) {
        if (!this.foodCart.includes(food)) {
          food.count++;
          this.foodCart.push(food);
        }

      },
      submitOrder() {
        const order = {
          food: this.foodCart,
          customer: JSON.parse(localStorage.getItem('orderCred')),
          total: this.foodTotal
        }
        if (this.discountCode && discountCode.length == 5) {
          order.discountCode = this.discountCode
        } else if (this.discountCode == null || this.discountCode.length > 0 && this.discountCode.length < 5) {
          console.log("Invalid")
        }
        this.$axios.post('/order/new', order).then(resp => {
          const orderId = resp.data.data.orderId
          this.$router.push(`/order/${orderId}`);
        }).catch(e => {
          console.log(e);
        })
      }
    },
    components: {
      navbar
    },
    mounted() {
      this.retrieveData();
    },
    computed: {
      total() {
        let total = 0;
        this.foodCart.forEach(food => {
          total += (food.price * food.count);
        })
        this.foodTotal = total;
        return total;
      }
    }
  }

</script>
<style scoped>
  .is-padded {
    margin: 10px;
  }

  .is-centered {
    margin: 120px auto 0px auto;
    position: relative;

  }

  .submit{
      width: 70%;
      border-radius: 10px;
  }
  .rounded {
    border-radius: 30%;
    margin-top: -5px;
    margin-left: 5px;
    margin-right: 5px
  }

  .cart {
    margin-bottom: 20px;
  }

  .is-teal {
    background-color: teal;
    color: white;
  }

  .half-back {
    background-color: teal;
    color: white;
    min-height: 94.5vh
  }

  .half-cart {
    background-color: #EEEEEE;
  }

  .welcome {
    position: relative;
    top: 20%
  }

  .foodcart {
    width: 50% !important;
    margin: 0;

  }

</style>
