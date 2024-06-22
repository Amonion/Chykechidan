<template>
  <div>
    <div class="hero">
      <img
        src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665011ca79044631aa660dda_subscribe-bg.jpg"
        loading="lazy"
        sizes="100vw"
        srcset="
          https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665011ca79044631aa660dda_subscribe-bg-p-500.jpg   500w,
          https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665011ca79044631aa660dda_subscribe-bg-p-800.jpg   800w,
          https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665011ca79044631aa660dda_subscribe-bg-p-1080.jpg 1080w,
          https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665011ca79044631aa660dda_subscribe-bg-p-1600.jpg 1600w,
          https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665011ca79044631aa660dda_subscribe-bg.jpg        1920w
        "
        alt=""
        class="responsive-pix"
      />
      <div class="ero-cover"></div>
      <div class="custom-container">
        <div class="custom-flex ero">
          <div class="ero-title">RESET PASSWORD</div>
          <div class="ero-link">
            [<a href="#" class="ero-text-link active">Home</a> - product]
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
                  maxlength="256"
                  name="field-3"
                  data-name="Field 3"
                  placeholder="Enter Password"
                  type="password"
                  id="field-3"
                  required=""
                /><img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/66580319033ec9be51772fd1_eye-slash.svg"
                  loading="lazy"
                  alt=""
                  class="input-icon"
                />
              </div>
              <div class="bill-input-wrap account">
                <div>Confirm Password</div>
                <input
                  class="bill-input w-input"
                  maxlength="256"
                  name="field-3"
                  data-name="Field 3"
                  placeholder="Enter Password"
                  type="password"
                  id="field-3"
                  required=""
                /><img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/66580319033ec9be51772fd1_eye-slash.svg"
                  loading="lazy"
                  alt=""
                  class="input-icon"
                />
              </div>
              <div class="terms-wrap">
                <div class="sinup-ceck active">
                  <img
                    src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665805ea25eaee8db62cce44_check.svg"
                    loading="lazy"
                    alt=""
                    class="ceck-icon"
                  />
                </div>
                <a href="#" class="terms-link"
                  >Kindly read and accept our
                  <span class="text-span">terms &amp; conditions</span></a
                >
              </div>
              <div
                id="w-node-_082a1007-2bd1-2683-92f3-097acda0e64b-7a51b666"
                class="ceck-out-btn btn"
              >
                SUBMIT
              </div>
              <div class="load-btn">
                <img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6656d0a87fa1d0b4305d0a2b_spinner.svg"
                  loading="lazy"
                  alt=""
                  class="spinner"
                />
                <div>Processing...</div>
              </div>
              <div class="terms-wrap">
                <a href="#" class="terms-link"
                  >Forgotten password?<span class="text-span">
                    Click Here</span
                  ></a
                >
              </div>
              <div class="response error">Please Fill in all the fields</div>
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
      const result = await this.$store.dispatch("makePOST", payload);
      if (result.response) {
        this.callResponse(result.response.data.message, true);
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
