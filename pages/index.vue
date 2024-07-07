<template>
  <div>
    <hero-slider />

    <div v-if="about" class="pro-section">
      <div class="custom-container">
        <div class="pro-flex">
          <div class="pro-left">
            <div v-if="about[0]" class="about-pix-top">
              <img
                :src="`${FILE_URL}/${about[0].media}`"
                loading="lazy"
                alt=""
                class="responsive-pix"
              />
            </div>
            <div v-if="about[0]" class="pix-mid">
              <img
                :src="`${FILE_URL}/${about[1].media}`"
                loading="lazy"
                alt=""
                class="responsive-pix"
              />
            </div>
            <div class="years-box">
              <div class="year-flex">
                <div class="years-number">08</div>
                <div class="years-plus">+</div>
              </div>
              <div class="years-text">YEARS EXPERIENCED<br /></div>
            </div>
          </div>
          <div class="pro-rit">
            <div class="ab-intro">// WHO WE ARE</div>
            <div class="ab-title" v-if="about[0]">
              {{ about[0].title }} <br />
            </div>
            <div
              class="ab-subtitle"
              v-if="about[0]"
              v-html="about[0].content"
            ></div>
            <br />

            <div v-if="about[1]" class="one-module">
              <div class="modus-title">01. OUR CULTURE<br /></div>
              <div class="modus-flex">
                <div class="modus-box">
                  <img
                    src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6627d93fe2360afa56060469_energy-green-icon%201.svg"
                    loading="lazy"
                    alt=""
                    class="modus-icon"
                  />
                </div>
                <div class="modus-rit">
                  <div class="modus-text">{{ about[1].title }} <br /></div>
                  <NuxtLink to="/about" class="custom-btn trans w-inline-block"
                    ><img
                      src="/images/arrow-red.svg"
                      loading="lazy"
                      alt=""
                      class="btn-icon"
                    />
                    <div>Read More</div></NuxtLink
                  >
                </div>
              </div>
            </div>
            <div v-if="about[1]" class="one-module">
              <div class="modus-title">02. OUR PRODUCTIVITY<br /></div>
              <div class="modus-flex">
                <div class="modus-box">
                  <img
                    src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6627d93fce419d11a83f03f9_panel-solar-icon%201.svg"
                    loading="lazy"
                    alt=""
                    class="modus-icon"
                  />
                </div>
                <div class="modus-rit">
                  <div class="modus-text">{{ about[1].subtitle }} <br /></div>
                  <NuxtLink to="/about" class="custom-btn trans w-inline-block"
                    ><img
                      src="/images/arrow-red.svg"
                      loading="lazy"
                      alt=""
                      class="btn-icon"
                    />
                    <div>Read More</div></NuxtLink
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="ome-service">
      <div class="custom-container">
        <div class="ome-service-flex">
          <div class="ome-service-intro">// SERVICE AREAS \\</div>
          <div class="ome-service-title">
            QUICK FOOD STUFFS DISTRIBUTION SERVICES<br />
          </div>
          <div class="rit-title widt">
            Partnering with Chyke Chidan Enterprise is simple and
            straightforward. Here’s how you can start benefiting from our
            wholesale rice distribution service
          </div>
          <div v-if="services" class="w-layout-grid service-rid">
            <div
              v-for="item in services"
              :key="item.id"
              class="eac-service-ome"
            >
              <div class="eac-service-top">
                <img
                  src="/Icon.png"
                  loading="lazy"
                  alt=""
                  class="serice-rid-icon"
                />
                <NuxtLink
                  :to="`/blog-details/?id=${item.id}`"
                  class="service-title active"
                  >{{ item.title }}
                </NuxtLink>
                <div class="service-subtitle">
                  {{ item.subtitle }}
                </div>
                <NuxtLink
                  :to="`/blog-details/?id=${item.id}`"
                  class="service-read-more w-inline-block"
                  ><img
                    src="/images/arrow-red.svg"
                    loading="lazy"
                    alt=""
                    class="read-icon"
                  />
                  <div>More</div></NuxtLink
                >
              </div>
              <div class="service-rid-pix">
                <img
                  :src="`${FILE_URL}/${item.banner}`"
                  loading="lazy"
                  alt=""
                  class="responsive-pix"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="maintenance">
      <div class="custom-container">
        <div class="mentainance-flex">
          <div class="mentainance-top">
            <div>
              <div class="maintenance-intro">// Quality</div>
              <div class="mentainance-title">CHYKE CHIDAN PRODUCTS<br /></div>
            </div>
            <div class="mentainance-rit">
              At Chyke Chidan Enterprise, we understand that the secret to
              delicious meals often lies in the ingredients.
              <br />
            </div>
          </div>
          <div class="w-layout-grid maintenance-rid">
            <div
              class="eac-maintenance"
              v-for="(item, int) in products"
              :key="item.id"
              @mouseenter="setProd(int)"
              @mouseleave="unsetProd()"
            >
              <div class="maintenance-cover">
                <NuxtLink
                  :to="`/blog-details/?id=${item.id}`"
                  class="service-read-more wite w-inline-block"
                  ><img
                    src="/images/arrow-red.svg"
                    loading="lazy"
                    alt=""
                    class="read-icon"
                  />
                  <div>More</div></NuxtLink
                ><img
                  src="/Icon.png"
                  loading="lazy"
                  alt=""
                  class="maintenance-icon"
                />
                <div class="maintenance-title">
                  {{ item.title }}
                </div>
              </div>
              <img
                :src="`${FILE_URL}/${item.banner}`"
                loading="lazy"
                alt=""
                class="responsive-pix"
              />
              <div :class="{ active: prod == int }" class="maint-overlay">
                <div class="border-overlay">
                  <NuxtLink
                    :to="`/blog-details/?id=${item.id}`"
                    class="maint-overly-title"
                  >
                    {{ item.title }}
                  </NuxtLink>
                  <div class="maint-overlay-text">
                    {{ item.subtitle }}
                    <br />
                  </div>
                  <NuxtLink
                    :to="`/blog-details/?id=${item.id}`"
                    class="service-read-more reen w-inline-block"
                    ><img
                      src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6627ced1b84d6af368e52e15_arrow-forward.svg"
                      loading="lazy"
                      alt=""
                      class="read-icon bi"
                    />
                    <div>More</div></NuxtLink
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <stats />

    <div class="process">
      <div class="custom-container">
        <div class="process-flex">
          <div class="process-title-left">
            <div class="title-sm">// MODUS OPERANDI</div>
            <div class="ome-title sm">WAYS WE ACHIVE RESULTS<br /></div>
          </div>
          <div class="process-title-rit">
            <div class="rit-title">
              We are following these processes to maintain our working culture
              and also for better outcomes.<br />
            </div>
          </div>
          <div class="eac-process">
            <div class="pro-step">STEP</div>
            <div class="process-arrow-flex">
              <div>01...</div>
              <img
                src="/images/arrow-down.svg"
                loading="lazy"
                alt=""
                class="process-arrow"
              />
            </div>
            <div class="process-title">SELECTIVE SOURCING</div>
            <div class="process-text">
              We carefully choose manufacturers who meet our high standards for
              quality and reliability. <br />
            </div>
          </div>
          <div class="eac-process">
            <div class="pro-step">STEP</div>
            <div class="process-arrow-flex">
              <div>02...</div>
              <img
                src="/images/arrow-up.svg"
                loading="lazy"
                alt=""
                class="process-arrow"
              />
            </div>
            <div class="process-title">BULK PURCHASING</div>
            <div class="process-text">
              We buy products in large quantities, which allows us to take
              advantage of bulk pricing.<br />
            </div>
          </div>
          <div class="eac-process">
            <div class="pro-step">STEP</div>
            <div class="process-arrow-flex">
              <div>03...</div>
              <img
                src="/images/arrow-down.svg"
                loading="lazy"
                alt=""
                class="process-arrow"
              />
            </div>
            <div class="process-title">EFFICIENT LOGISTICS</div>
            <div class="process-text">
              Our streamlined logistics and efficient supply chain management
              reduce overhead costs.<br />
            </div>
          </div>
          <div class="eac-process">
            <div class="pro-step">STEP</div>
            <div class="process-arrow-flex">
              <div>04...</div>
              <img
                src="/images/arrow-up.svg"
                loading="lazy"
                alt=""
                class="process-arrow"
              />
            </div>
            <div class="process-title">COMPETITIVE PRICING</div>
            <div class="process-text">
              We price our products competitively, balancing affordability with
              quality.<br />
            </div>
          </div>
        </div>
      </div>
    </div>

    <staffs />

    <testimonial />

    <div class="ome-blo">
      <div class="custom-container">
        <div class="custom-flex">
          <div class="process-title-left">
            <div class="title-sm">// BE UPDATED</div>
            <div class="ome-title sm">GET THE LATEST NEWS ON FOODS<br /></div>
          </div>
          <div class="process-title-rit">
            <div class="rit-title">
              Always remain informed on with price updates, quality and
              introduction of new products in the market with Chyke Chidan.
              <br />
            </div>
          </div>
          <div class="ome-blo-flex">
            <div
              @mouseenter="setBlog(int)"
              @mouseleave="unsetBlog"
              v-for="(item, int) in items"
              :key="int"
              class="eac-blo"
              :class="{ active: int == blog }"
            >
              <div class="ome-blo-date">{{ formattedDate(item.time * 1) }}</div>
              <div class="ome-blo-details">
                <img
                  src="/images/comments.svg"
                  loading="lazy"
                  alt=""
                  class="ome-blo-icon"
                />
                <div class="blo-det-text">Comments</div>
                <img
                  src="/images/author.svg"
                  loading="lazy"
                  alt=""
                  class="ome-blo-icon"
                />
                <div class="blo-det-text">{{ item.author }}</div>
              </div>
              <NuxtLink
                to="/"
                class="ome-blo-title"
                :class="{ active: int == blog }"
                >{{ item.title }}
              </NuxtLink>
              <div class="blo-pix">
                <img
                  :src="`${FILE_URL}/${item.banner}`"
                  loading="lazy"
                  alt=""
                  class="responsive-pix"
                />
                <div class="cover" :class="{ active: int == blog }"></div>
              </div>
              <NuxtLink
                :to="`/blog-details/?id=${item.id}`"
                class="ome-read-more w-inline-block"
                ><img
                  src="/images/arrow-red.svg"
                  loading="lazy"
                  alt=""
                  class="read-blo-icon"
                />
                <div>Read More</div></NuxtLink
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="ome-subscribe">
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
      <div class="sub-cover"></div>
      <div class="custom-container">
        <div class="w-form">
          <div class="custom-flex sub">
            <img
              src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6650182a25662ce3559c7a46_icon-14.png"
              loading="lazy"
              alt=""
              class="sub-icon-top"
            />
            <div class="ome-title sm">SUBSCRIBE OUR NEWSLETTER<br /></div>
            <div class="rit-title lit widt">
              Subscribe our newsletter and get latest news, updatesto your inbox
              directly.<br />
            </div>
            <div class="sub-older">
              <div class="sub-input-older">
                <input
                  class="sub-input w-input"
                  maxlength="256"
                  name="email"
                  data-name="Email"
                  placeholder="Your Name"
                  type="text"
                  id="email"
                  required=""
                /><img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664f85c596459c05bef09943_user-alt.svg"
                  loading="lazy"
                  alt=""
                  class="sub-icon"
                />
              </div>
              <div class="sub-input-older">
                <input
                  class="sub-input w-input"
                  maxlength="256"
                  name="email"
                  data-name="email"
                  placeholder="Your Email"
                  type="email"
                  id="email-3"
                  required=""
                /><img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665016897d66616f010b8d7d_envelope.svg"
                  loading="lazy"
                  alt=""
                  class="sub-icon"
                />
              </div>
              <div class="sub-input-older btn"><div>Subscribe</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeroSlider from "../components/HeroSlider.vue";
import Staffs from "../components/Staffs.vue";
import Stats from "../components/Stats.vue";
import Testimonial from "../components/Testimonial.vue";
export default {
  components: { HeroSlider, Testimonial, Staffs, Stats },
  layout: "home",
  data() {
    return {
      prod: 10,
      staf: -1,
      blog: -1,
    };
  },
  methods: {
    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
      }
      return text;
    },

    numberWithCommas(number) {
      return number.toLocaleString("en-US", { maximumFractionDigits: 2 });
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
      const day = date.getDate();
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();

      // Function to get the day suffix
      function getDaySuffix(day) {
        if (day > 3 && day < 21) return "th"; // catch 11th, 12th, 13th
        switch (day % 10) {
          case 1:
            return "st";
          case 2:
            return "nd";
          case 3:
            return "rd";
          default:
            return "th";
        }
      }

      return `${month} ${day}${getDaySuffix(day)}, ${year}`;
    },

    setBlog(int) {
      this.blog = int;
    },

    unsetBlog() {
      this.blog = -1;
    },

    setProd(int) {
      this.prod = int;
    },

    unsetProd() {
      this.prod = 10;
    },

    formatDateToDD(dateString) {
      const options = { day: "2-digit" };
      const date = new Date(dateString);
      const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
        date
      );
      return formattedDate;
    },
    formatDateToMon(dateString) {
      const options = { month: "short" };
      const date = new Date(dateString);
      const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
        date
      );
      return formattedDate;
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

    items() {
      const items = this.$store.state.blogs;
      const blogs = [];
      for (let i = 0; i < items.length; i++) {
        const el = items[i];
        if (el.type == "Blog") {
          blogs.push(el);
        }
      }
      return blogs;
    },

    services() {
      const items = this.$store.state.blogs;
      const blogs = [];
      for (let i = 0; i < items.length; i++) {
        const el = items[i];
        if (el.type == "Services") {
          blogs.push(el);
        }
      }
      return blogs;
    },

    products() {
      const items = this.$store.state.blogs;
      const blogs = [];
      for (let i = 0; i < items.length; i++) {
        const el = items[i];
        if (el.type == "Products") {
          blogs.push(el);
        }
      }
      return blogs;
    },

    staffs() {
      return this.$store.state.staffs;
    },
  },
};
</script>

<style>
a.first-link-header {
  text-decoration: none;
  color: black;
}

.cover {
  background-color: rgba(255, 111, 0, 0.151);
}
</style>
