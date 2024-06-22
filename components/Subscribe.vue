<template>
  <div class="custom-container subscription w-form">
    <div class="radial-gradient"></div>
    <div class="subscribe-flex">
      <div class="subscribe-highlight">Subscription</div>
      <h1 class="intel-title center">
        Join Our Community Let’s Make Profits!<br />
      </h1>
      <div class="text-custom center">
        Subscribe to be amoung the community receiving our newsletters!<br />
      </div>
      <div class="subscribe-input">
        <input
          type="text"
          v-model="email"
          class="subscribe-field w-input"
          placeholder="Enter your Email here to subscribe"
        />
        <div v-if="onRequest" class="custom-btn processing">
          <img
            src="https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/645afa6c4a84d4675d43a8b9_loader-icon.svg"
            loading="lazy"
            alt=""
            class="processing-icon spinning-icon"
          />
          <div class="processing-text">Processing</div>
        </div>
        <input
          @click="processData"
          v-else
          type="submit"
          value="Subscribe"
          data-wait="Please wait..."
          class="custom-btn sub w-button"
        />
      </div>
      <div
        v-if="showResponse"
        class="sign-label response"
        :class="{ error: isError }"
      >
        {{ response }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",

      response: "",
      isError: false,
      showResponse: false,
      onRequest: false,
    };
  },

  methods: {
    checkErrorInputs(input, data) {
      if (input == "email") {
        if (data == "" || !data || !/^\S+@\S+\.\S+$/.test(data)) {
          this.response = "Please write a valid email.";
          this.isError = true;
          return true;
        } else {
          this.isError = false;
        }
      }
    },

    callResponse(msg, state) {
      this.response = state ? msg : "Thanks, your email was sent successfully.";
      this.isError = state;
      this.showResponse = true;
      this.onRequest = false;
      if (!state) {
        setTimeout(() => {
          this.email = "";
          this.showResponse = false;
        }, 4000);
      }
    },

    processData() {
      this.setArray();
      this.checkArray.forEach((el) => {
        this.checkErrorInputs(el.name, el.data);
      });
      if (this.isError) {
        this.callResponse("Please write a valid email.", true);
        return;
      }

      this.showResponse = false;

      this.onRequest = true;

      setTimeout(() => {
        this.callResponse("Thanks, your email was sent successfully.", false);
      }, 2000);
    },

    setArray() {
      this.checkArray = [{ name: "email", data: this.email }];
    },
  },

  computed: {
    FILE_URL() {
      return this.$store.state.fileURL;
    },

    company() {
      return this.$store.state.company;
    },

    topBlogs() {
      const items = this.$store.state.blogs;
      const blogs = [];
      for (let i = 0; i < items.length; i++) {
        const el = items[i];
        if (el.category == "TopBlog") {
          blogs.push(el);
        }
      }
      return blogs;
    },
  },
};
</script>

<style></style>
