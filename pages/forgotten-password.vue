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
          <div class="ero-title">PASSWORD RECOVERY</div>
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
                <div>Email</div>
                <input
                  class="bill-input w-input"
                  v-model="email"
                  placeholder="Enter Email"
                  type="email"
                />
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
              <div v-else class="ceck-out-btn btn" @click="processUserData">
                RESET PASSWORD
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
export default {
  layout: "home",

  data() {
    return {
      email: "",
      complete: true,

      showResponse: false,
      isError: false,
      response: "",
      onRequest: false,
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
      if (input == "email") {
        if (data == "" || !data || !/^\S+@\S+\.\S+$/.test(data)) {
          this.callResponse("Please write a valid email.", true);
          return true;
        } else {
          this.showResponse = false;
          this.isError = false;
        }
      }
    },

    clearInputs() {
      this.email = "";
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
        email: this.email.trim(),
      };

      const payload = {
        form: form,
        url: "/users/forgotten-password",
      };

      this.onRequest = true;
      const result = await this.$store.dispatch("MAKE_POST", payload);
      if (result.response) {
        this.callResponse(result.response.data.message, true);
      } else {
        this.clearInputs();
        this.callResponse(result.data.message, false);
      }
    },

    setArray() {
      this.checkArray = [{ name: "email", data: this.email }];
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
