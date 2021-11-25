<template>
  <div class="">
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
            <div class="numbertext">{{ item.name }}</div>
            <img :src="img" style="width:100%" />
          </div>

          <!-- Next/previous controls -->
          <a class="prev" @click="plusSlides(-1)">&#10094;</a>
          <a class="next" @click="plusSlides(1)">&#10095;</a>

          <!-- Caption text -->
          <div class="caption-container">
            <p id="caption" ref="captionText"></p>
          </div>

          <div class="carousel-container">
            <carousel-3d
              :controls-visible="true"
              :controls-prev-html="'&#10092;'"
              :controls-next-html="'&#10093;'"
              :controls-width="30"
              :controls-height="60"
              :count="item.image.length"
            >
              <slide
                v-for="(img, index) in item.image"
                :index="index"
                :key="index"
              >
                <template v-slot="{ index, isCurrent, leftIndex, rightIndex }">
                  <img
                    ref="dots"
                    @click="currentSlide(index)"
                    :data-index="index"
                    :class="{
                      current: isCurrent,
                      onLeft: leftIndex >= 0,
                      onRight: rightIndex >= 0
                    }"
                    :src="img"
                  />
                </template>
              </slide>
            </carousel-3d>
          </div>
          <!-- carousel-3d -->
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

        <div class="info-container row mt-4">
          <div class="col-sm-6">
            <div class="main-img">
              <img
                ref="img"
                class="card-img image hover-shadow"
                :src="item.image[0]"
                @click="
                  openModal();
                  currentSlide(0);
                "
              />
            </div>
            <div class="side-img row ">
              <div
                class="card-container col-sm-4 p-2"
                v-for="(img, key) in item.image"
                :key="img.id"
              >
                <img
                  class="card-img image"
                  :src="img"
                  ref="img"
                  @click="
                    openModal();
                    currentSlide(key);
                  "
                />
              </div>
            </div>
          </div>
          <div class="col-sm-6">
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
              <div class="btn-section row m-1">
                <router-link
                  :to="{ name: 'checkout', params: item.id }"
                  class="text-dark p-2"
                >
                  <button class="btn btn-outline-dark mr-2" type="submit">
                    buy now
                  </button>
                </router-link>
                <button
                  v-if="!item.isInCart"
                  type="button"
                  class="btn btn-light
            btn-border favorite mr-2"
                  @click.stop.prevent="addCart"
                >
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
                      class="nav-link active"
                      id="home-tab"
                      data-toggle="tab"
                      href="#home"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                      >商品描述</a
                    >
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      id="profile-tab"
                      data-toggle="tab"
                      href="#profile"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                      >優惠活動</a
                    >
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      id="contact-tab"
                      data-toggle="tab"
                      href="#contact"
                      role="tab"
                      aria-controls="contact"
                      aria-selected="false"
                      >注意事項</a
                    >
                  </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                  <div
                    class="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <div class="container ">
                      <h4 class="d-flex justify-content-center m-4">
                        商品描述
                      </h4>
                      <ul class="info-detail">
                        <li>
                          {{ item.specification }}
                        </li>
                        <li>
                          {{ item.material }}
                        </li>
                        <li>
                          {{ item.color }}
                        </li>
                        <li>
                          {{ item.seal }}
                        </li>
                        <li>
                          {{ item.remark }}
                        </li>
                      </ul>
                      <ul class="info-notice mt-4">
                        <li v-for="line in item.description" :key="line.id">
                          {{ line }}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  >
                    ...
                  </div>
                  <div
                    class="tab-pane fade"
                    id="contact"
                    role="tabpanel"
                    aria-labelledby="contact-tab"
                  >
                    ...
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
import { Carousel3d, Slide } from "vue-carousel-3d";
var slideIndex = 0;

export default {
  name: "collectdetail",
  components: {
    Carousel3d,
    Slide
  },
  props: {
    initialCollection: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      item: { ...this.initialCollection }
    };
  },
  watch: {
    initialCollection(newValue) {
      this.item = {
        ...this.item,
        ...newValue
      };
    }
  },
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
.numbertext {
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
</style>
