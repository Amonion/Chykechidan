<template>
  <div
    class="das-overlay"
    :class="{ active: show }"
    @click.self="showOverlayResponse('', false, false, false, false)"
  >
    <div class="das-overlay-card">
      <div class="overlay-response" :class="{ error: error }">
        {{ msg }}
      </div>

      <div v-if="warning" class="overlay-btn-wrap">
        <div class="overlay-btn" @click="proceedConfirmation">Proceed</div>
        <div @click="hideResponse" class="overlay-btn">Cancel</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    hideResponse() {
      this.$store.commit("TOGGLE_RESPONSE");
    },

    showOverlayResponse(msg, error, success, warning, show) {
      const payload = {
        msg,
        error,
        success,
        warning,
        show,
      };

      this.$store.commit("SHOW_RESPONSE", payload);
    },

    proceedConfirmation() {
      this.hideResponse();
      this.$router.push("/signup");
    },

    handleResponse(result) {
      // console.log(result, result.response);
      this.showOverlayResponse("", false, false, false, false);
      if (!result.response) {
        // this.alertReturnedMsg(result.data.message, false);
        this.$store.commit("admin/SET_ORDERS", result.data);
        // this.$store.dispatch("admin/INITIALIZE_APP");
      } else {
      }
    },
  },

  computed: {
    show() {
      return this.$store.state.show;
    },

    msg() {
      return this.$store.state.msg;
    },

    error() {
      return this.$store.state.error;
    },

    success() {
      return this.$store.state.success;
    },

    warning() {
      return this.$store.state.warning;
    },

    data() {
      return this.$store.state.data;
    },

    loading() {
      return this.$store.state.isLoading;
    },

    user() {
      return this.$store.state.auth.user;
    },
  },
};
</script>

<style></style>
