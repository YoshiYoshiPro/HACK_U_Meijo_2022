<template>
  <div class="task">
    <index-login />
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
