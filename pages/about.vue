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
          <div class="ero-title">ABOUT COMPANY</div>
          <div class="ero-link">
            [<NuxtLink to="/" class="ero-text-link active">Home</NuxtLink> -
            About]
          </div>
        </div>
      </div>
    </div>

    <div class="about-sect">
      <div class="custom-container">
        <div class="custom-flex text-center">
          <div class="title-sm">// CHYKE CHIDAN \\</div>
          <div class="ome-title sm">
            WELCOME TO CHYKE CHIDAN ENTERPRISE<br />SINCE 2015<br />
          </div>
          <div v-if="intro" class="about-flex">
            <div class="about-pix">
              <img
                :src="`${FILE_URL}/${intro.media}`"
                loading="lazy"
                sizes="(max-width: 767px) 95vw, (max-width: 1279px) 46vw, 556.7999877929688px"
                :srcset="`
                  ${FILE_URL}/${intro.media} 500w,
                  ${FILE_URL}/${intro.media} 550w`"
                alt=""
                class="responsive-pix"
              />
            </div>
            <div class="about-rit">
              <div class="sub-title">WELCOME TO A NOURISHING WORLD!</div>
              <div class="ab-subtitle ab" v-html="intro.content"></div>
              <div class="about-sub-flex">
                <div class="eac-sub-about">
                  <img
                    src="/images/check.svg"
                    loading="lazy"
                    alt=""
                    class="about-ceck"
                  />
                  <div class="sub-title border">QUALITY PRODUCTS</div>
                  <div class="ab-subtitle">
                    {{ intro.title }}
                  </div>
                </div>
                <div class="eac-sub-about">
                  <img
                    src="/images/check.svg"
                    loading="lazy"
                    alt=""
                    class="about-ceck"
                  />
                  <div class="sub-title border">AFFORDABLE PRICES</div>
                  <div class="ab-subtitle">
                    {{ intro.subtitle }}
                  </div>
                </div>
              </div>
              <div v-if="owner" class="sin-flex">
                <div class="about-founder">
                  <div>{{ owner.title }}</div>
                  <div class="founder">{{ owner.subtitle }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="missions" class="statement-sect">
      <img
        v-if="missions[0]"
        :src="`${FILE_URL}/${missions[0].media}`"
        loading="lazy"
        sizes="100vw"
        :srcset="`
          ${FILE_URL}/${missions[0].media}  500w,
          ${FILE_URL}/${missions[0].media}  800w,
          ${FILE_URL}/${missions[0].media} 1080w,
          ${FILE_URL}/${missions[0].media} 1920w`"
        alt=""
        class="responsive-pix"
      />
      <div class="statement-cover"></div>
      <div class="custom-container">
        <div class="statement-flex">
          <div class="statement-nav">
            <div
              v-for="(item, int) in missions"
              :key="int"
              class="statement-nav-item"
              :class="{ active: int == aboutIndex }"
              @click="aboutIndex = int"
            >
              <img
                v-if="int == aboutIndex"
                :src="`/images/${icons[int]}.svg`"
                loading="lazy"
                alt=""
                class="statement-nav-icon"
              />
              <img
                v-else
                :src="`/images/${icons[int]}_black.svg`"
                loading="lazy"
                alt=""
                class="statement-nav-icon"
              />
              <div>
                <div class="statment-nav-intro">CHYKE-CHIDAN</div>
                <div class="statement-nav-title">{{ item.subtitle }}</div>
              </div>
            </div>
          </div>
          <div v-if="missions" class="statement-body">
            <div class="statement-color" v-if="missions[aboutIndex]">
              {{ missions[aboutIndex].subtitle }}
            </div>
            <div class="ome-title sm" v-if="missions[aboutIndex]">
              {{ missions[aboutIndex].title }}
            </div>
            <div
              class="ab-subtitle ab"
              v-if="missions[aboutIndex]"
              v-html="missions[aboutIndex].content"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <div class="istory-top">
      <div class="custom-container">
        <div class="istory-top-flex">
          <div class="title-sm wite">// OUR HISTORY \\</div>
          <div class="ome-title sm">EXPLORE OUR COMPANY HISTORY<br /></div>
          <div class="subtitle">
            Ever since our incorporation, we have been and will remain excellent
            and consistent in our services
          </div>
        </div>
      </div>
    </div>

    <div class="istory-slide-sect">
      <div class="custom-container">
        <div
          data-delay="7000"
          data-animation="slide"
          class="istory-slider w-slider"
          data-autoplay="true"
          data-easing="ease-in-out-cubic"
          data-hide-arrows="false"
          data-disable-swipe="false"
          data-autoplay-limit="0"
          data-nav-spacing="3"
          data-duration="2000"
          data-infinite="true"
        >
          <div class="istory-mask w-slider-mask">
            <div
              v-for="item in events"
              :key="item.id"
              class="istory-slides w-slide"
            >
              <div class="istory-slide-wrapper">
                <div class="slide-box-txt">
                  {{ formattedDate(item.year * 1) }}
                </div>
                <div class="slide-box">
                  <div class="slide-inner-box"></div>
                </div>
                <div class="istory-v-line"></div>
                <div class="istory-body">
                  <div class="istory-pix">
                    <img
                      :src="`${FILE_URL}/${item.media}`"
                      loading="lazy"
                      alt=""
                      class="responsive-pix"
                    />
                  </div>
                  <div class="sub-title">{{ item.title }}</div>
                  <div
                    class="ab-subtitle no-pad sm"
                    v-html="item.content"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div class="left-arrow-3 w-slider-arrow-left">
            <div class="w-icon-slider-left"></div>
          </div>
          <div class="right-arrow-3 w-slider-arrow-right">
            <div class="w-icon-slider-right"></div>
          </div>
          <div class="istory-slide-nav w-slider-nav w-round"></div>
        </div>
      </div>
    </div>

    <stats />

    <staffs />
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
      active: false,
      range: 23000,
      online: 1,
      aboutIndex: 0,
      icons: ["vision", "mission", "record"],
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

    intro() {
      return this.$store.state.about[10];
    },

    owner() {
      return this.$store.state.about[11];
    },

    events() {
      const items = this.$store.state.about;
      const blogs = [];
      for (let i = 0; i < items.length; i++) {
        const el = items[i];
        if (el.subtitle == "Event") {
          blogs.push(el);
        }
      }
      return blogs;
    },

    missions() {
      const items = this.$store.state.about;
      const blogs = [];
      for (let i = 0; i < items.length; i++) {
        const el = items[i];
        if (el.subtitle.includes("STATEMENT")) {
          blogs.push(el);
        }
      }
      return blogs;
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

    staffs() {
      return this.$store.state.staffs;
    },

    ceo() {
      const items = this.$store.state.staffs;
      let person = "";
      for (let i = 0; i < items.length; i++) {
        const el = items[i];
        if (el.position == "CEO") {
          person = el;
        }
      }
      return person;
    },
  },
};
</script>

<style></style>
