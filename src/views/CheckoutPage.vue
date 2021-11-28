<template>
  <form id="main-form">
    <div class="form-container">
      <div class="form-order">
        <div class="step-panel" id="step-control">
          <h2>結帳</h2>
          <div class="step-wrapper">
            <div
              class="step"
              :class="{ checked: step > 0, active: step === 0 }"
            >
              <div class="circle-container"></div>
              <span>寄送地址</span>
            </div>
            <div class="connect-line"></div>
            <div
              class="step"
              :class="{ checked: step > 1, active: step === 1 }"
            >
              <div class="circle-container"></div>
              <span>運送方式</span>
            </div>
            <div class="connect-line"></div>
            <div
              class="step"
              :class="{ checked: step > 2, active: step === 2 }"
            >
              <div class="circle-container"></div>
              <span>付款資訊</span>
            </div>
          </div>
        </div>
        <FormStepOne
          :v-if="this.step == 0"
          :step="step"
          @after-filled-out="afterFilledOut"
          :form-data="formData"
        />
        <FormStepTwo
          :v-if="this.step == 1"
          :step="step"
          @after-selected-shippingway="childByValue"
          :form-data="formData"
        />
        <FormStepThree
          :v-if="this.step == 2"
          :step="step"
          @after-filled-creditcard="handleCreditCard"
          :form-data="formData"
        />
        <FinishedMessage :v-if="this.steproute > 3" :step="step" />
      </div>
      <!-- Carts -->
      <Carts
        :shipping-cost="this.shippingCost"
        :step="step"
        @after-change-amount="handleOrder"
        v-show="this.step < 3"
      />
    </div>

    <div id="btn-control" class="control-panel">
      <div class="button-wrapper">
        <button
          v-if="step < 3"
          :class="{ 'd-none': isHidePrev }"
          class="btn-previus"
          @click.stop.prevent="handlePrev()"
        >
          <router-link :to="{ path: `step${steproute - 1}` }">
            <i class="far fa-long-arrow-left"></i> 上一步</router-link
          >
        </button>
        <button
          v-if="step < 2"
          :class="{ 'd-none': isHideNext }"
          class="btn-next"
          @click.stop.prevent="handleNext()"
        >
          <router-link
            :to="{
              path: `/checkout/step${steproute + 1}`,
              params: { step: steproute }
            }"
          >
            下一步<i class="far fa-long-arrow-right"></i
          ></router-link>
        </button>

        <button
          v-else-if="step == 2"
          :class="{ 'd-none': hiddenNext }"
          class="btn-next"
          @click.stop.prevent="submitOrder()"
        >
          確認下單<i class="far fa-long-arrow-right"></i>
        </button>
        <button
          v-else-if="step > 2"
          :class="{ 'd-none': hiddenNext }"
          class="btn-next"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          type="button"
        >
          顯示已完成訂單<i class="far fa-long-arrow-right"></i>
        </button>
        <!-- Modal -->
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <ul
                  class="list-group mb-2"
                  v-for="item in shoppingCart"
                  :key="item.id"
                >
                  <li class="list-group-item">{{ item.name }}</li>
                  <li class="list-group-item">數量：{{ item.amount }}</li>
                  <li class="list-group-item">
                    單項總價：{{ item.price * item.amount }}
                  </li>
                </ul>
                <ul class="mt-3 ">
                  <li class="list-group-item">
                    運費：{{ this.formData.shippingfee }}
                  </li>
                  <li class="list-group-item">
                    訂單總金額：{{ this.formData.total }}
                  </li>
                </ul>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="empty-div"></div>
      </div>
      <div class="right-div"></div>
    </div>
  </form>
</template>

<script>
import FormStepOne from "./../components/FormStepOne.vue";
import FormStepTwo from "./../components/FormStepTwo.vue";
import FormStepThree from "./../components/FormStepThree.vue";
import Carts from "../components/Carts.vue";
import FinishedMessage from "./../components/FinishedMessage.vue";
import "./../assets/scss/carts.scss";
import { mapState } from "vuex";

const STORAGE_KEY = "xxstudio-carts";

export default {
  name: "CheckoutPage",
  components: {
    FormStepOne,
    FormStepTwo,
    FormStepThree,
    Carts,
    FinishedMessage
  },
  data() {
    return {
      cartitems: [],
      formData: "",
      step: 0,
      shippingCost: 0,
      hiddenPrev: true,
      hiddenNext: false,
      steproute: 1
    };
  },
  computed: {
    ...mapState(["shoppingCart"]),
    isHidePrev() {
      return this.step === 0;
    },
    isHideNext() {
      return this.step >= 2;
    }
  },
  methods: {
    fetchCartItems() {},
    handlePrev() {
      if (this.step > 0) {
        this.step = this.step - 1;
        this.steproute = this.step + 1;
      }
    },
    handleNext() {
      if (this.step < 3) {
        this.step = this.step + 1;
        this.steproute = this.step + 1;
      }
    },
    submitOrder() {
      this.step = this.step + 1;
      this.steproute = this.step + 1;
      this.saveStorage();
    },
    saveStorage() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.formData));
    },
    childByValue(childValue) {
      // childValue就是子元件傳過來的值
      this.shippingCost = Number(childValue);
      this.formData = { ...this.formData, shippingfee: this.shippingCost };
    },
    afterFilledOut(BIdata) {
      // childValue就是子元件傳過來的值
      this.formData = { ...BIdata };
    },
    handleCreditCard(data) {
      this.formData = { ...this.formData, data };
    },
    handleOrder(total) {
      this.formData = { ...this.formData, total };
    }
  },
  created() {
    this.fetchCartItems();
    this.formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
      sex: "male",
      location: "select"
    };
  },
  watch: {
    formData: {
      handler: function() {
        console.log("saveToStorage");
        this.saveStorage();
      }
    }
  }
};
</script>
