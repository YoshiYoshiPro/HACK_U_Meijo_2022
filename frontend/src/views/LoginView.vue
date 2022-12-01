<template>
  <div class="task">
    <IndexLogin />
  </div>
</template>

<script>
// @ is an alias to /src
import IndexLogin from "@/components/IndexLogin.vue";

export default {
  name: "LoginView",
  components: {
    IndexLogin,
  },
};
</script>
