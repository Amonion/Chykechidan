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
          <div class="ero-title">SOLAR INVERTER PANEL</div>
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
                <div>Username</div>
                <input
                  class="bill-input w-input"
                  v-model="username"
                  placeholder="Enter Username"
                  type="text"
                />
              </div>
              <div class="bill-input-wrap account">
                <div>Password</div>
                <input
                  class="bill-input w-input"
                  placeholder="Enter Password"
                  :type="passwordType"
                  v-model="password"
                /><img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/66580319033ec9be51772fd1_eye-slash.svg"
                  loading="lazy"
                  alt=""
                  class="input-icon"
                  @click="resetPasswordType"
                />
              </div>
              <div class="terms-wrap">
                <NuxtLink to="/signup" class="terms-link"
                  >Don't have an account?
                  <span class="text-span">Signup</span></NuxtLink
                >
              </div>
              <div class="load-btn" v-if="onRequest">
                <img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6656d0a87fa1d0b4305d0a2b_spinner.svg"
                  loading="lazy"
                  alt=""
                  class="spinner"
                />
                <div>Processing...</div>
              </div>
              <div
                v-else
                @click="processUserData"
                id="w-node-_6ccb78a3-0248-286d-90f2-55065e9a1611-7a51b666"
                class="ceck-out-btn btn"
              >
                SUBMIT
              </div>

              <div class="terms-wrap">
                <NuxtLink to="/forgotten-password" class="terms-link"
                  >Forgotten your password?
                  <span class="text-span">Click here</span></NuxtLink
                >
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
export default {
  layout: "home",

  data() {
    return {
      username: "",
      password: "",
      complete: true,
      user: "",
      passwordType: "password",

      showResponse: false,
      isError: false,
      response: false,
      onRequest: false,

      isChecked: false,
      isError: false,

      usernameError: false,
      passwordError: false,
      msg: "",
    };
  },
  methods: {
    resetPasswordType() {
      this.passwordType = this.passwordType == "password" ? "text" : "password";
    },

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
      if (input == "username") {
        if (
          data == "" ||
          !data ||
          data.length < 2 ||
          !/^[a-zA-Z0-9]+$/.test(data)
        ) {
          this.response = "Username must be at least 2 characters.";
          this.isError = true;
          return true;
        } else {
          this.response = "";
          this.isError = false;
        }
      } else if (input == "password") {
        if (data == "" || !data || data.length < 4) {
          this.response = "Password must be at least 4 characters.";
          this.isError = true;
          return true;
        } else {
          this.msg = "";
          this.isError = false;
        }
      }

      // if (input == "username") {
      //   if (
      //     data == "" ||
      //     !data ||
      //     data.length < 2 ||
      //     !/^[a-zA-Z0-9]+$/.test(data)
      //   ) {
      //     this.response = "username must be at least 2 characters";
      //     this.isError = true;
      //     return true;
      //   } else {
      //     const parent = this.$el.querySelector(".username");
      //     this.response = "";
      //     this.isError = false;
      //   }
      // } else
    },

    processUserData() {
      this.setArray();
      for (let i = 0; i < this.checkArray.length; i++) {
        const el = this.checkArray[i];
        const result = this.checkErrorInputs(el.name, el.data);
        if (result) {
          break; // This will exit the entire loop
        }
      }
      if (this.isError) {
        this.showResponse = true;
        return;
      }
      const form = {
        username: this.username.trim(),
        password: this.password.trim(),
      };

      this.onRequest = true;
      this.handleLogin(form);
    },

    async handleLogin(form) {
      try {
        const result = await this.$auth.loginWith("local", { data: form });

        const user = result.data.user;
        if (user.status == "Staff") {
          this.$router.push("/admin");
        } else {
          this.$router.push("/customer");
        }
        // await this.$store.dispatch("dashboard/initializeUserDetails", user);
      } catch (err) {
        console.log(err.response);
        this.callResponse(err.response.data.message, true);
      }
    },

    setArray() {
      this.checkArray = [
        { name: "username", data: this.username },
        { name: "password", data: this.password },
      ];
    },
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
