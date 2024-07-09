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
          <div class="ero-title">CART ITEMS</div>
          <div class="ero-link">
            [<NuxtLink to="/" class="ero-text-link active">Home</NuxtLink> -
            Signup]
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
                  placeholder="Enter Username"
                  type="text"
                  v-model="username"
                />
              </div>
              <div class="bill-input-wrap account">
                <div>Email</div>
                <input
                  class="bill-input w-input"
                  placeholder="Enter Email"
                  type="email"
                  v-model="email"
                />
              </div>
              <div class="bill-input-wrap account">
                <div>Phone Number</div>
                <input
                  class="bill-input w-input"
                  placeholder="Enter Phone Number"
                  type="tel"
                  v-model="phone"
                />
              </div>
              <div class="bill-input-wrap account">
                <div>Password</div>
                <input
                  class="bill-input w-input"
                  placeholder="Enter Password"
                  :type="passwordType"
                  v-model="password"
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
              <div class="bill-input-wrap account">
                <div>Confirm Password</div>
                <input
                  class="bill-input w-input"
                  placeholder="Confirm Password"
                  :type="passwordType"
                  v-model="confirmPassword"
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
              <div class="terms-wrap">
                <div
                  @click="isChecked = !isChecked"
                  class="sinup-ceck"
                  :class="{ active: isChecked }"
                >
                  <img
                    src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665805ea25eaee8db62cce44_check.svg"
                    loading="lazy"
                    alt=""
                    class="ceck-icon"
                    v-if="isChecked"
                  />
                </div>
                <a href="#" class="terms-link"
                  >Kindly read and accept our
                  <span class="text-span">terms &amp; conditions</span></a
                >
              </div>

              <div class="terms-wrap">
                <NuxtLink to="/login" class="terms-link"
                  >Already have an account?
                  <span class="text-span">Login</span></NuxtLink
                >
              </div>

              <div v-if="onRequest" class="load-btn">
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
                v-if="showResponse"
                class="response"
                :class="{ error: isError }"
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
  layout: "home",
  data() {
    return {
      banner: "",
      response: "",
      isError: false,
      showResponse: false,
      onRequest: false,

      username: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      isChecked: false,
      passwordType: "password",

      referral: "",

      signup: "",
    };
  },

  methods: {
    checkErrorInputs(input, data) {
      //|| !/^\w+$/.test(data)
      if (input == "username") {
        if (data == "" || !data || data.length < 2) {
          this.isError = true;
          this.response = "Username must be at least 2 characters long.";
          return true;
        } else {
          this.isError = false;
        }
      } else if (input == "email") {
        if (data == "" || !data || !/^\S+@\S+\.\S+$/.test(data)) {
          this.response = "Please write a valid email.";
          this.isError = true;
          return true;
        } else {
          this.isError = false;
        }
      } else if (input == "password") {
        if (data == "" || !data || data.length < 4) {
          this.response = "Password must be at least 4 characters long.";
          this.isError = true;
          return true;
        } else {
          this.isError = false;
        }
      } else if (input == "confirmPassword") {
        if (data != this.password || data == "") {
          this.response = "Passwords do not match.";
          this.isError = true;
          return true;
        } else {
          this.isError = false;
        }
      }
    },

    callResponse(msg, state) {
      this.response = state
        ? msg
        : "Congratulations... Your registration is successful. You will be redirected to login page.";
      this.isError = state;
      this.showResponse = true;
      this.onRequest = false;
      if (!state) {
        setTimeout(() => {
          this.showResponse = false;
          this.$router.push("/login");
        }, 6000);
      }
    },

    clearInputs() {
      this.firstName = "";
      (this.lastName = ""), (this.username = "");
      this.phone = "";
      this.email = "";
      this.password = "";
      this.confirmPassword = "";
      this.isChecked = false;
    },

    setArray() {
      this.checkArray = [
        { name: "username", data: this.username },
        { name: "email", data: this.email },
        { name: "password", data: this.password },
        { name: "confirmPassword", data: this.confirmPassword },
      ];
    },

    resetPasswordType() {
      this.passwordType = this.passwordType == "password" ? "text" : "password";
    },

    async processUserData() {
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

      if (!this.isChecked) {
        this.callResponse(
          "Please check the terms and condition to continue.",
          true
        );
        return;
      }

      const form = {
        username: this.username.trim(),
        email: this.email.trim(),
        dateCreated: new Date().getTime(),
        password: this.password.trim(),
        phone: this.phone,
        confirmPassword: this.confirmPassword.trim(),
      };

      this.onRequest = true;

      try {
        const result = await this.$axios.post("/users/signup", form);
        //console.log(result);
        const msg = result.data.message;
        this.callResponse(msg, false);
        this.clearInputs();
        this.onRequest = false;
      } catch (err) {
        //console.log(err.response);
        this.callResponse(err.response.data.message, true);
        this.onRequest = false;
      }
    },
  },

  computed: {
    countries() {
      return this.$store.state.registrationDetails.countries;
    },

    FILE_URL() {
      return this.$store.state.fileURL;
    },
  },
};
</script>

<style></style>
