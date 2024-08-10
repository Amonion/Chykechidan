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
          <div class="ero-title">CONTACT</div>
          <div class="ero-link">
            [<NuxtLink to="/" class="ero-text-link active">Home</NuxtLink> -
            CONTACT]
          </div>
        </div>
      </div>
    </div>
    <div class="maintenance">
      <div class="custom-container">
        <div class="w-form">
          <div class="mentainance-flex faq">
            <div class="title-sm mid">// FIND ANSWERS \\</div>
            <div class="ome-title sm mid">HOW CAN WE HELP YOU?</div>
            <div v-if="company" class="contact-start">
              <div class="eac-contact">
                <div class="product-pa-item sm">
                  <img
                    src="/images/email.svg"
                    loading="lazy"
                    alt=""
                    class="contact-icon"
                  />
                </div>
                <div>
                  <div>email</div>
                  <div class="contact-text">{{ company.systemEmail }}</div>
                </div>
              </div>
              <div class="eac-contact">
                <div class="product-pa-item sm">
                  <img
                    src="/images/call.svg"
                    loading="lazy"
                    alt=""
                    class="contact-icon"
                  />
                </div>
                <div>
                  <div>call line</div>
                  <div class="contact-text">{{ company.companyPhone }}</div>
                </div>
              </div>
              <div class="eac-contact">
                <div class="product-pa-item sm">
                  <img
                    src="/images/maps.svg"
                    loading="lazy"
                    alt=""
                    class="contact-icon"
                  />
                </div>
                <div v-if="company">
                  <div>address</div>
                  <div class="contact-text">{{ company.companyAddress }}</div>
                </div>
              </div>
            </div>
            <img
              src="/images/contact.png"
              loading="lazy"
              alt=""
              class="contact-person"
            />
            <div class="contact-start">
              <div class="eac-contact left">
                <div class="product-pa-item sm">
                  <img
                    src="/images/clock.svg"
                    loading="lazy"
                    alt=""
                    class="contact-icon"
                  />
                </div>
                <div>
                  <div>Work Houraddress</div>
                  <div class="contact-text">8:00 AM - 6:00 PM</div>
                </div>
              </div>
              <div class="eac-contact left">
                <div class="product-pa-item sm">
                  <img
                    src="/images/headphone.svg"
                    loading="lazy"
                    alt=""
                    class="contact-icon"
                  />
                </div>
                <div>
                  <div>INQUIRIES</div>
                  <div class="contact-text">8:00AM - 7:00PM DAILY</div>
                </div>
              </div>
              <div class="eac-contact left">
                <div class="product-pa-item sm">
                  <img
                    src="/images/maps.svg"
                    loading="lazy"
                    alt=""
                    class="contact-icon"
                  />
                </div>
                <div v-if="company">
                  <div>address</div>
                  <div class="contact-text">
                    {{ company.companyAddress }}
                  </div>
                </div>
              </div>
            </div>
            <div class="contact-form-bd">
              <div class="faq-cateory contact">send us your message</div>
              <div class="contact-subtitle">
                Please feel free to get in touch using the form below. We&#x27;d
                love to hear for you.
              </div>
              <div class="bill-input-wrap contact">
                <input
                  class="bill-input contact w-input"
                  :class="{ active: active == 'name' }"
                  @focus="active = 'name'"
                  @blur="active = ''"
                  v-model="name"
                  placeholder="Your Name"
                  type="text"
                /><img
                  src="/images/user.svg"
                  loading="lazy"
                  alt=""
                  class="input-icon cont"
                />
              </div>
              <div class="bill-input-wrap contact">
                <input
                  :class="{ active: active == 'email' }"
                  @focus="active = 'email'"
                  @blur="active = ''"
                  class="bill-input contact w-input"
                  placeholder="Your Email"
                  type="email"
                  v-model="email"
                /><img
                  src="/images/smoke_envelope.svg"
                  loading="lazy"
                  alt=""
                  class="input-icon cont"
                />
              </div>
              <div class="bill-input-wrap contact">
                <input
                  :class="{ active: active == 'pone' }"
                  @focus="active = 'pone'"
                  @blur="active = ''"
                  class="bill-input contact w-input"
                  placeholder="Your Phone"
                  type="tel"
                /><img
                  src="/images/phone.svg"
                  loading="lazy"
                  alt=""
                  class="input-icon cont"
                />
              </div>
              <div class="bill-input-wrap contact">
                <input
                  :class="{ active: active == 'subject' }"
                  @focus="active = 'subject'"
                  @blur="active = ''"
                  class="bill-input contact w-input"
                  v-model="subject"
                  placeholder="Subject"
                  type="text"
                /><img
                  src="/images/podcast.svg"
                  loading="lazy"
                  alt=""
                  class="input-icon cont"
                />
              </div>
              <div class="bill-input-wrap contact full">
                <img
                  src="/images/comments.svg"
                  loading="lazy"
                  alt=""
                  class="input-icon top"
                /><textarea
                  :class="{ active: active == 'content' }"
                  @focus="active = 'content'"
                  @blur="active = ''"
                  placeholder="Enter Message"
                  v-model="content"
                  class="bill-input contact text w-input"
                ></textarea>
              </div>
              <div class="btn-roup">
                <div
                  class="response"
                  :class="{ error: isError }"
                  v-if="showResponse"
                >
                  {{ response }}
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
                <div v-else @click="processData" class="ceck-out-btn btn">
                  SUBMIT
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="contact-map">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.579318821107!2d7.044548424984569!3d5.4805883444991395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104259aa55923ed5%3A0x4fd7f3d86c09f5d3!2sRelief%20Market%2C%20Owerri%20460281%2C%20Imo!5e0!3m2!1sen!2sng!4v1720353973186!5m2!1sen!2sng"
        width="100%"
        height="450"
        style="border: 0"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  layout: "home",

  data() {
    return {
      name: "",
      email: "",
      active: "",
      subject: "",
      content: "",

      response: "",
      onRequest: false,
      isError: false,
      showResponse: false,
    };
  },

  methods: {
    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
      }
      return text;
    },

    checkErrorInputs(input, data) {
      //|| !/^\w+$/.test(data)
      if (input == "name") {
        if (data == "" || !data || data.length < 2) {
          this.isError = true;
          this.response = "Name must be at least 2 characters long.";
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
      } else if (input == "content") {
        if (data == "" || !data || data.length < 30) {
          this.response = "Message must be at least 30 characters long.";
          this.isError = true;
          return true;
        } else {
          this.isError = false;
        }
      }
    },

    callResponse(msg, state) {
      this.response = msg;
      this.isError = state;
      this.showResponse = true;
      this.onRequest = false;
      setTimeout(() => {
        this.showResponse = false;
      }, 6000);
    },

    clearInputs() {
      this.name = "";
      this.subject = "";
      this.email = "";
      this.content = "";
      this.onRequest = false;
    },

    setArray() {
      this.checkArray = [
        { name: "name", data: this.name },
        { name: "email", data: this.email },
        { name: "subject", data: this.subject },
        { name: "content", data: this.content },
      ];
    },

    async processData() {
      this.setArray();
      for (let i = 0; i < this.checkArray.length; i++) {
        const el = this.checkArray[i];
        const result = this.checkErrorInputs(el.name, el.data);
        if (result) {
          break; // This will exit the entire loop
        }
      }

      if (this.isError) {
        this.callResponse(this.response, true);
        return;
      }

      const form = {
        name: this.name,
        email: this.email,
        subject: this.subject,
        content: this.content,
        time: new Date().getTime(),
      };

      this.onRequest = true;

      try {
        const result = await this.$axios.post("/emails/contact", form);
        this.callResponse(result.data.message, false);
        this.clearInputs();
      } catch (err) {
        this.callResponse(err.response.data.message, true);
      }
    },
  },

  computed: {
    FILE_URL() {
      return this.$store.state.fileURL;
    },

    company() {
      return this.$store.state.company;
    },

    about() {
      return this.$store.state.about;
    },
  },
};
</script>

<style></style>
