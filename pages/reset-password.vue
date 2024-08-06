<template>
  <div>
    <div class="hero">
      <img
        src="/images/banner2.jpeg"
        loading="lazy"
        sizes="100vw"
        srcset="
          /images/banner2.jpeg  500w,
          /images/banner2.jpeg  800w,
          /images/banner2.jpeg 1080w,
          /images/banner2.jpeg 1600w,
          /images/banner2.jpeg 1920w
        "
        alt=""
        class="responsive-pix"
      />
      <div class="ero-cover"></div>
      <div class="custom-container">
        <div class="custom-flex ero">
          <div class="ero-title">RESET PASSWORD</div>
          <div class="ero-link">
            [<NuxtLink to="/" class="ero-text-link active">Home</NuxtLink> -
            Password]
          </div>
        </div>
      </div>
    </div>

    <div class="maintenance">
      <div class="custom-container">
        <div class="w-form">
          <div class="mentainance-flex account">
            <div class="blo-main-col account">
              <div class="bill-input-wrap account">
                <div>Password</div>
                <input
                  class="bill-input w-input"
                  v-model="password"
                  placeholder="Enter Password"
                  :type="passwordType"
                /><img
                  v-if="passwordType == 'password'"
                  src="/images/eye-slash.svg"
                  loading="lazy"
                  alt=""
                  class="input-icon"
                  @click="resetPasswordType"
                />
                <img
                  v-else
                  src="/images/eye.svg"
                  loading="lazy"
                  alt=""
                  class="input-icon"
                  @click="resetPasswordType"
                />
              </div>
              <div class="bill-input-wrap account">
                <div>Confirm Password</div>
                <input
                  class="bill-input w-input"
                  v-model="confirmPassword"
                  placeholder="Enter Confirm Password"
                  :type="passwordType"
                />
                <img
                  v-if="passwordType == 'password'"
                  src="/images/eye-slash.svg"
                  loading="lazy"
                  alt=""
                  class="input-icon"
                  @click="resetPasswordType"
                />
                <img
                  v-else
                  src="/images/eye.svg"
                  loading="lazy"
                  alt=""
                  class="input-icon"
                  @click="resetPasswordType"
                />
              </div>

              <div class="load-btn" v-if="onRequest">
                <img
                  src="/images/spinner.svg"
                  loading="lazy"
                  alt=""
                  class="spinner"
                />
                <div>Processing...</div>
              </div>
              <div v-else @click="processUserData" class="ceck-out-btn btn">
                SUBMIT
              </div>

              <div
                class="response"
                :class="{ error: isError }"
                v-if="showResponse"
              >
                {{ response }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HomeNav from "../components/HomeNav";
export default {
  components: { HomeNav },
  layout: "home",

  data() {
    return {
      password: "",
      confirmPassword: "",
      token: "",
      passwordType: "password",

      showResponse: false,
      isError: false,
      response: false,
      onRequest: false,

      isError: false,
    };
  },
  methods: {
    callResponse(msg, state) {
      this.showResponse = true;
      this.isError = state;
      this.response = msg;
      this.onRequest = false;
      setTimeout(() => {
        this.showResponse = false;
      }, 6000);
    },

    resetPasswordType() {
      this.passwordType = this.passwordType == "password" ? "text" : "password";
    },

    checkErrorInputs(input, data) {
      if (input == "password") {
        if (data == "" || !data || data.length < 4) {
          this.callResponse("password must be at least 4 characters", true);
          return true;
        } else {
          this.showResponse = false;
          this.isError = false;
        }
      } else if (input == "password") {
        if (data == "" || !data || data !== this.password) {
          this.callResponse(
            "Please confirm a valid password that matches",
            true
          );
          return true;
        } else {
          this.showResponse = false;
          this.isError = false;
        }
      }
    },

    clearInputs() {
      this.password = "";
      this.confirmPassword = "";
    },

    async processUserData() {
      this.setArray();
      this.checkArray.forEach((el) => {
        this.checkErrorInputs(el.name, el.data);
      });
      if (this.isError) {
        return;
      }

      const form = {
        password: this.password.trim(),
        confirmPassword: this.confirmPassword.trim(),
        token: this.token,
      };

      const payload = {
        form: form,
        url: "/users/reset-password",
      };

      this.onRequest = true;
      const result = await this.$store.dispatch("MAKE_POST", payload);
      console.log(result, this.response);
      if (result.response) {
        this.callResponse("Your password has been updated successfully.", true);
      } else {
        this.clearInputs();
        this.callResponse(result.data.message, false);
      }
    },

    setArray() {
      this.checkArray = [
        { name: "password", data: this.password },
        { name: "confirmPassword", data: this.confirmPassword },
      ];
    },
  },

  mounted() {
    this.token = this.$route.query.token;
    if (!this.token) {
      //   this.$router.push("/login");
    }
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },

    FILE_URL() {
      return this.$store.state.fileURL;
    },
  },
};
</script>
