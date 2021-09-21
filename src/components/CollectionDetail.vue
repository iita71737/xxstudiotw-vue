<template>
  <div class="">
    <div class="row">
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
                class="card-img image"
                :src="item.image.img1"
                @click="showModal(item.image.img1)"
              />
              <!-- The Modal -->
              <div id="myModal" class="modal" ref="modal">
                <!-- The Close Button -->
                <span class="close" @click="closeModal()">&times;</span>

                <!-- Modal Content (The Image) -->
                <img class="modal-content" id="img01" ref="modalImg" />

                <!-- Modal Caption (Image Text) -->
                <div id="caption" ref="captionText">{{ item.name }}</div>
              </div>
            </div>

            <div class="side-img row ">
              <div
                class="card-container col-sm-4 p-2"
                v-for="img in item.image"
                :key="img.id"
              >
                <img
                  class="card-img image"
                  :src="img"
                  ref="img"
                  @click="showModal(img)"
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
                <button class="btn btn-outline-dark mr-2" type="submit">
                  buy now
                </button>
                <button class="btn btn-outline-dark" type="submit">
                  加入購物車
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
export default {
  name: "collectdetail",
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
  methods: {
    showModal(url) {
      this.$refs.modal.style.display = "block";
      this.$refs.modalImg.src = url;
    },
    closeModal() {
      this.$refs.modal.style.display = "none";
    }
  }
};
</script>
