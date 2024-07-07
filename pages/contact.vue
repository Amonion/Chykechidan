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
              src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665850e20a79a760ff2d0e69_contact-1.png"
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
                  maxlength="256"
                  name="field-3"
                  data-name="Field 3"
                  placeholder="Your Name"
                  type="text"
                  id="field-3"
                  required=""
                /><img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664f85c596459c05bef09943_user-alt.svg"
                  loading="lazy"
                  alt=""
                  class="input-icon cont"
                />
              </div>
              <div class="bill-input-wrap contact">
                <input
                  class="bill-input contact w-input"
                  maxlength="256"
                  name="field-3"
                  data-name="Field 3"
                  placeholder="Your Email"
                  type="email"
                  id="field-3"
                  required=""
                /><img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665016897d66616f010b8d7d_envelope.svg"
                  loading="lazy"
                  alt=""
                  class="input-icon cont"
                />
              </div>
              <div class="bill-input-wrap contact">
                <input
                  class="bill-input contact w-input"
                  maxlength="256"
                  name="field-3"
                  data-name="Field 3"
                  placeholder="Your Phone"
                  type="email"
                  id="field-3"
                  required=""
                /><img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665856a56af606e37b446c5e_phone.svg"
                  loading="lazy"
                  alt=""
                  class="input-icon cont"
                />
              </div>
              <div class="bill-input-wrap contact">
                <input
                  class="bill-input contact active w-input"
                  maxlength="256"
                  name="field-3"
                  data-name="Field 3"
                  placeholder="Subject"
                  type="email"
                  id="field-3"
                  required=""
                /><img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6658574de8b315bf910914a1_podcast.svg"
                  loading="lazy"
                  alt=""
                  class="input-icon cont"
                />
              </div>
              <div class="bill-input-wrap contact full">
                <img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664f85c52560a1b333396e44_comments.svg"
                  loading="lazy"
                  alt=""
                  class="input-icon top"
                /><textarea
                  placeholder="Example Text"
                  maxlength="5000"
                  id="field-5"
                  name="field-5"
                  data-name="Field 5"
                  class="bill-input contact text w-input"
                ></textarea>
              </div>
              <div class="btn-roup">
                <div class="response">Please Fill in all the fields</div>

                <div v-if="onRequest" class="load-btn">
                  <img
                    src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6656d0a87fa1d0b4305d0a2b_spinner.svg"
                    loading="lazy"
                    alt=""
                    class="spinner"
                  />
                  <div>Processing...</div>
                </div>
                <div v-else class="ceck-out-btn btn">SUBMIT</div>
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
import Staffs from "../components/Staffs.vue";
import Stats from "../components/Stats.vue";
export default {
  components: { Staffs, Stats },
  layout: "home",

  data() {
    return {
      onRequest: false,
    };
  },

  methods: {
    loadScript() {
      if (!process.server) {
        let review = document.getElementById("scriptStaff");

        if (review == null) {
          const script = document.createElement("script");

          script.type = "text/javascript";

          script.src = "/script/home.js";

          script.id = "scriptStaff";
          const app = document.querySelector("#staff");
          if (app) {
            app.appendChild(script);
          } else {
            console.error("Could not find app node to append script element");
          }
        }
      }
    },

    formattedDate(time) {
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const date = new Date(time);
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();

      return `${month} ${year}`;
    },

    numberWithCommas(number) {
      return number.toLocaleString("en-US", { maximumFractionDigits: 2 });
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

    staffs() {
      return this.$store.state.staffs;
    },
  },
};
</script>

<style></style>
