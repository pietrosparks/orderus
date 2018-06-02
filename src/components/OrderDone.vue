<template>
  <div v-if="order !== null">
    <navbar></navbar>
    <div class="columns">
      <div class="column is-half is-centered">
        <div class="box">
          <h2 class="is-size-4 title">
            Order Id :
            <span class="is-teal-color">{{order.orderId}}</span>
          </h2>
          <hr>
          <h3 class="is-size-5">
            Order Summary
          </h3>
          <hr>

          <div class="box">
            <p>Customer Name : {{order.customer.name}}</p>
            <p>Order Status : {{order.status}}</p>
            <br>
            <div class="box" v-for='food in order.order'>
              <p>{{food.name}} x {{food.count}} : {{food.count*food.price}} </p>
            </div>
            <p>Estimated Total: {{order.total}}</p>
            <div v-if="order.discount">
              <p>Discount :
                <span class="is-teal-color">{{order.discount.value}}%</span>
              </p>
              <p class='is-size-5 is-teal-color'>Final Total : {{order.total - (order.total*(order.discount.value/100))}}</p>
            </div>
            <div v-else>
              Discount : 0%
              <p class='is-size-5 is-teal-color'>Final Total : {{order.total}}</p>
            </div>
          </div>
          <!-- <img :src="order.qr" alt="img"> -->
        </div>
        <a class="button is-teal" @click="createPDF()">Print</a>
      </div>
    </div>
  </div>
  </div>

  </div>
  </div>
</template>
<script>
  import navbar from '@/components/Navbar'
  import jsPDF from 'jspdf';
  export default {
    name: 'OrderDone',
    data() {
      return {
        orderId: null,
        order: null,
        qrcode: null

      }
    },
    methods: {
      retrieveOrder() {
        this.$axios.get(`/order/${this.orderId}`).then(resp => {
          this.order = resp.data.data;
        }).catch(e => {
          console.log(e);
        })
      },
      createPDF() {
        let pdfName = 'order_receipt';
        const doc = new jsPDF();
        doc.text("Order Summary", 90, 10);
        doc.text(`Customer Name: ${this.order.customer.name}`, 20, 30);
        doc.text(`Order Status: ${this.order.status}`, 20, 40);
        doc.text(`Orders`, 100, 50);
        let counter = 60;
        this.order.order.forEach((food, index) => {
          doc.text(`${food.name} x ${food.count} : ${food.price*food.count}  `, 20, counter);
          counter += 15;
        })


        if (this.order.discount) {
          doc.text(`Discount: ${this.order.discount.value}%`, 20, counter + 10);
          doc.text(`Total: ${this.order.total-((this.order.discount.value/100) * this.order.total)}`, 20, counter + 20);
        } else {
          doc.text(`Total: ${this.order.total}`, 20, counter + 10);
        }

        doc.addImage(this.order.qr, 'png', 150, 20, 50, 50, 'monkey');
        // doc.text(`Order Status: ${this.order.status}`, 20, 80);
        doc.save(pdfName + '.pdf');
        this.$router.push('/order');
      }
    },
    mounted() {
      this.orderId = this.$route.params.id
      this.retrieveOrder()
    },
    components: {
      navbar
    }
  }

</script>
<style scoped>
  .is-teal {
    background-color: teal;
    color: white;
  }

  .is-teal-color {
    color: teal
  }

  .count {
    padding: 10px;
    background-color: grey
  }

  .is-centered {
    margin: 20px auto;
  }

</style>
