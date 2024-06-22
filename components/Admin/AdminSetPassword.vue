<template>
  <div class="das-form">
    <div class="w-layout-grid das-rid">
      <div class="eac-form-input">
        <div class="from-rid-label">Old Password</div>
        <input
          class="from-rid-input w-input"
          v-model="oldPassword"
          placeholder="Enter Old Password"
          type="password"
        />
      </div>
      <div class="eac-form-input">
        <div class="from-rid-label">New Password</div>
        <input
          class="from-rid-input w-input"
          placeholder="Enter New Password"
          type="password"
          v-model="password"
        />
      </div>
      <div class="eac-form-input">
        <div class="from-rid-label">Confirm Password</div>
        <input
          class="from-rid-input w-input"
          placeholder="Confirm Password"
          type="password"
          v-model="confirmPassword"
        />
      </div>
    </div>
    <div v-if="showResponse" class="das-response" :class="{ error: isError }">
      {{ response }}
    </div>
    <div class="form-btn-roups">
      <div v-if="onRequest" class="overlay-btn pad">
        <img
          src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6656d0a87fa1d0b4305d0a2b_spinner.svg"
          loading="lazy"
          alt=""
          class="form-btn-icon spinner"
        />
        <div class="tb-action-text">Processing...</div>
      </div>
      <div v-else @click="processPassword" class="overlay-btn pad">Submit</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oldPassword: "",
      password: "",
      confirmPassword: "",

      response: "",
      isError: false,
      showResponse: false,
      onRequest: false,

      passwordError: false,
      oldPasswordError: false,
      cPasswordError: false,
    };
  },
  methods: {
    showAlert(msg, status) {
      this.$store.commit("SHOW_ALERT_BOX", { msg, status });
    },

    clearInputs() {
      this.oldPassword = "";
      this.confirmPassword = "";
      this.password = "";
    },

    callResponse(msg, state) {
      this.response = msg;
      this.showResponse = true;
      this.onRequest = false;
      this.isError = state;
      setTimeout(() => {
        this.showResponse = false;
      }, 6000);
    },

    checkResponse(result, msg, status) {
      this.onRequest = false;
      if (result.status == 200) {
        this.password = "";
        this.cPassword = "";
        this.oldPassword = "";
        this.$store.commit("SET_PASSWORD_CHANGED");
        this.showAlert(msg, status);
      } else {
        this.callResponse(result.response.data.message, true);
      }
    },

    async processPassword() {
      if (this.password == "" || this.oldPassword == "") {
        const msg = "Please fill in passwords and try again.";
        const status = true;
        this.callResponse(msg, status);
        return;
      }
      if (this.password != this.confirmPassword) {
        const msg = "Sorry passwords do not match, try again.";
        const status = true;
        this.callResponse(msg, status);
        return;
      }

      const form = {
        oldPassword: this.oldPassword,
        password: this.password,
        cPassword: this.confirmPassword,
      };

      this.onRequest = true;

      const payload = {
        form: form,
        url: `/users/update-password/?id=${this.user.id}`,
      };
      const result = await this.$store.dispatch("MAKE_POST", payload);

      this.handleResponse(result);
    },

    handleResponse(result) {
      console.log(result, result.response);
      if (!result.response) {
        this.callResponse(result.data.message, false);
        this.onRequest = false;
        this.clearInputs();
      } else {
        this.callResponse(result.response.data.message, true);
      }
    },
  },

  computed: {
    user() {
      return this.$store.getters.getUserInfo;
    },
  },
};
</script>

<style></style>
