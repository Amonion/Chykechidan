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
      this.$store.commit("admin/TOGGLE_RESPONSE");
    },

    showOverlayResponse(msg, error, success, warning, show) {
      const payload = {
        msg,
        error,
        success,
        warning,
        show,
      };

      this.$store.commit("admin/SHOW_RESPONSE", payload);
    },

    async proceedConfirmation() {
      const payload = {
        url: this.data.query,
        form: this.data.load,
      };

      // this.$store.commit("SHOW_PROGRESS");

      if (this.data.type == "POST") {
        const result = await this.$store.dispatch("admin/MAKE_POST", payload);
        this.handleResponse(result);
      } else {
        const result = await this.$store.dispatch(
          "admin/MAKE_DELETE",
          this.data.query
        );
        this.handleResponse(result);
      }
    },

    handleResponse(result) {
      console.log(result, result.response);
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
      return this.$store.state.admin.show;
    },

    msg() {
      return this.$store.state.admin.msg;
    },

    error() {
      return this.$store.state.admin.error;
    },

    success() {
      return this.$store.state.admin.success;
    },

    warning() {
      return this.$store.state.admin.warning;
    },

    data() {
      return this.$store.state.admin.data;
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
