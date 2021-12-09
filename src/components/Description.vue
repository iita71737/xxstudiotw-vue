<template>
  <div class="container">
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
</template>

<script>
export default {
  name: "Description",
  props: {
    item: {
      required: true
    }
  }
};
</script>
