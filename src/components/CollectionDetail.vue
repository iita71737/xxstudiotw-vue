<template>
  <div class="mr-2">
    <div class="row">
      <!-- The Modal/Lightbox -->
      <div id="myModal" class="modal" ref="modal">
        <span class="close cursor" @click="closeModal()">&times;</span>
        <div class="modal-content ">
          <div
            class="mySlides hover-shadow"
            ref="slides"
            v-for="img in item.image"
            :key="img.id"
          >
            <div class="number-text">{{ item.name }}</div>
            <img :src="img" />
          </div>

          <!-- Next/previous controls -->
          <a class="prev" @click="plusSlides(-1)">&#10094;</a>
          <a class="next" @click="plusSlides(1)">&#10095;</a>

          <!-- Caption text -->
          <div class="caption-container">
            <p id="caption" ref="captionText"></p>
          </div>

          <!----->
        </div>
      </div>
      <!--Modal-->

      <div>
        <div>
          <nav>
            <a href="/" title="返回到首頁">首頁</a>
            <span>&nbsp; ›&nbsp; </span>
            <a href="/">Feature on homepage&nbsp; </a>
            <span aria-hidden="true">&nbsp; ›&nbsp; </span>
            <span>{{ item.name }}</span>
          </nav>
        </div>

        <div class="info-container row mt-4 g-5">
          <div class="col-12 col-lg-6">
            <!--swiper container -->
            <div class="swiper-container">
              <img
                v-if="!item.image"
                class="rounded shadow product-img "
                :src="item.image[0]"
                :alt="item.name"
              />
              <SwiperComponent v-else :product="item" />
            </div>
          </div>
          <div class="col-12 col-lg-6">
            <div class="right-section">
              <h2>{{ item.name }}</h2>
              <div class="price pt-4">
                <h3>NT$：{{ item.price }}</h3>
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="inputGroupSelect01"
                    >數量</label
                  >
                </div>
                <select class="custom-select" id="inputGroupSelect01">
                  <option selected>Choose...</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div class="btn-section row p-1">
                <router-link
                  :to="{ name: 'checkout', params: item.id }"
                  class="text-dark p-2"
                >
                  <button class="btn btn-outline-dark " type="submit">
                    <i class="fas fa-shopping-cart "></i> buy now
                  </button>
                </router-link>
                <button
                  v-if="!item.isInCart"
                  type="button"
                  class="btn btn-light
            btn-border favorite mr-2"
                  @click.stop.prevent="addCart"
                >
                  <i class="fas fa-shopping-cart "></i>
                  加入購物車
                </button>
                <button
                  v-else
                  type="button"
                  class="btn btn-light
            btn-border favorite mr-2"
                  @click.stop.prevent="removeCart"
                >
                  從購物車移除
                </button>
              </div>

              <div class="mt-4">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                  <li class="nav-item">
                    <a
                      class="nav-link "
                      :class="{ active: this.nowTabs === 'description' }"
                      id="home-tab"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                      @click="clickTabs('description')"
                      >商品描述
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      :class="{ active: this.nowTabs === 'discount' }"
                      id="profile-tab"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                      @click="clickTabs('discount')"
                      >優惠活動
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      :class="{ active: this.nowTabs === 'precaution' }"
                      id="contact-tab"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="contact"
                      aria-selected="false"
                      @click="clickTabs('precaution')"
                      >注意事項</a
                    >
                  </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                  <div
                    class="tab-pane fade show
"
                    :class="{ active: this.nowTabs === 'description' }"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <Description
                      :item="item"
                      v-if="this.nowTabs === 'description'"
                    />
                  </div>
                  <div
                    class="tab-pane fade"
                    :class="{ show, active: this.nowTabs === 'discount' }"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  >
                    <Discount v-if="this.nowTabs === 'discount'" />
                  </div>
                  <div
                    class="tab-pane fade"
                    :class="{ show, active: this.nowTabs === 'precaution' }"
                    id="contact"
                    role="tabpanel"
                    aria-labelledby="contact-tab"
                  >
                    <Precautions v-if="this.nowTabs === 'precaution'" />
                  </div>
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
import SwiperComponent from "@/components/SwiperComponent.vue";
import Description from "../components/Description.vue";
import Discount from "../components/Discount.vue";
import Precautions from "../components/Precautions.vue";
var slideIndex = 0;

export default {
  name: "CollectDetail",
  components: {
    SwiperComponent,
    Description,
    Discount,
    Precautions
  },
  props: {
    initialCollection: {
      required: true
    }
  },
  data() {
    return {
      item: { ...this.initialCollection },
      nowTabs: "description"
    };
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    openModal() {
      this.$refs.modal.style.display = "block";
    },
    closeModal() {
      this.$refs.modal.style.display = "none";
    },
    plusSlides(n) {
      this.showSlides((slideIndex += n));
    },
    currentSlide(n) {
      console.log(n);
      this.showSlides((slideIndex = n));
    },
    showSlides(n) {
      if (n >= this.item.image.length) {
        slideIndex = 0;
      }
      if (n < 0) {
        slideIndex = this.item.image.length;
      }
      for (let i = 0; i < this.item.image.length; i++) {
        this.$refs.slides[i].style.display = "none";
      }
      for (let i = 0; i < this.item.image.length; i++) {
        this.$refs.dots[i].className = this.$refs.dots[i].className.replace(
          " active",
          ""
        );
      }
      this.$refs.slides[slideIndex].style.display = "block";
      this.$refs.dots[slideIndex].className += " active";
      this.$refs.captionText.innerHTML = this.$refs.dots[slideIndex].alt;
    },
    addCart() {
      this.item = { ...this.item, isInCart: true, amount: 1 };
      this.$store.commit("addToCart", this.item);
    },
    removeCart(itemId) {
      this.item = { ...this.item, isInCart: false };
      this.$store.commit("removeFormCart", itemId);
    },
    clickTabs(tabName) {
      this.nowTabs = tabName;
    }
  }
};
</script>

<style lang="scss" scoped>
.row > .column {
  padding: 0 8px;
}
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* Create four equal columns that floats next to eachother */
.carousel-container {
  background-color: rgb(0, 0, 0);
}

/* The Modal (background) */
.modal {
  display: none;
  position: fixed;
  //z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: black;
} /* Modal
Content */
.modal-content {
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  width: 90%;
  max-width: 1200px;
} /* The Close Button
*/
.close {
  color: white;
  position: absolute;
  top: 10px;
  right: 25px;
  font-size: 35px;
  font-weight: bold;
}
.close:hover,
.close:focus {
  color: #999;
  text-decoration: none;
  cursor: pointer;
} /* Hide the slides by default */
.mySlides {
  display: none;
} /* Next & previous buttons */
.prev,
.next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  padding: 16px;
  margin-top: -50px;
  color: white;
  font-weight: bold;
  font-size: 20px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
  -webkit-user-select: none;
} /* Position the "next button" to the right */
.next {
  right: 0;
  border-radius: 3px 0 0 3px;
} /* On hover, add a black background color with a
little bit see-through */
.prev:hover,
.next:hover {
  background-color: rgba(0, 0, 0, 0.8);
} /* Number text (1/3 etc) */
.number-text {
  color: #f2f2f2;
  font-size: 12px;
  padding: 8px 12px;
  position: absolute;
  top: 0;
} /* Caption
text */
.caption-container {
  text-align: center;
  background-color: black;
  padding: 2px 16px;
  color: white;
}

.active,
.demo:hover {
  opacity: 1;
}
img.hover-shadow {
  transition: 0.3s;
}
.hover-shadow:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.product-img {
  height: 300px;
  width: 100%;
  object-position: bottom;
}
</style>
