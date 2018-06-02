<template>
  <div>
    <navbar></navbar>
    <div class="columns">
      <div class="column is-one-third is-centered">
        <div class="box">
          <h2 class="is-size-4">Please Enter Customer Table Number</h2>
          <hr>
          <div class="field">
            <input type="text" class="input" placeholder="Table No." v-model="tableNo">
          </div>


          <a class="button is-teal" @click="enterTableNo()">Submit</a>
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
    name: 'TableNo',
    data() {
      return {
        orderId: null,
        tableNo: null

      }
    },
    methods: {
      enterTableNo() {
        const table = {
          tableNo: this.tableNo,
          status:'scanned'
        }
        this.$axios.put(`/order/process/${this.orderId}`, table).then(resp => {
          this.$router.push('/adminpage')
        }).catch(e => {
          console.log(e);
        })
      }
    },
    mounted() {
      this.orderId = this.$route.params.id
    },
    components: {
      navbar
    }
  }

</script>
<style>
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
