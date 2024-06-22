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
          <div class="ero-title">PASSWORD RECOVERY</div>
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
                <div>Email</div>
                <input
                  class="bill-input w-input"
                  maxlength="256"
                  name="field-3"
                  data-name="Field 3"
                  placeholder="Enter First Name"
                  type="text"
                  id="field-3"
                  required=""
                />
              </div>
              <div
                id="w-node-_7ff90450-f3ab-c667-9f97-86e1aca86eb8-7a51b666"
                class="ceck-out-btn btn"
              >
                RESET PASSWORD
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
              <div class="response error">Please Fill in all the fields</div>
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
      const result = await this.$store.dispatch("makePOST", payload);
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
