<template>
  <div class="mypage">
    <MyPage />
  </div>
</template>

<script>
// @ is an alias to /src
import MyPage from "@/components/MyPage.vue";

export default {
  name: "MyPageView",
  components: {
    MyPage,
  },
};
</script>
