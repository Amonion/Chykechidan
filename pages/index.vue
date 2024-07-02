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

    <div v-if="company" class="ome-stats">
      <div class="stats-cover"></div>
      <img
        src="/images/banner2.jpeg"
        loading="lazy"
        sizes="100vw"
        srcset="
          /images/banner2.jpeg  500w,
          /images/banner2.jpeg  800w,
          /images/banner2.jpeg 1080w,
          /images/banner2.jpeg 1200w
        "
        alt=""
        class="responsive-pix"
      />
      <div class="custom-container">
        <div class="stats-flex">
          <div class="eac-stats">
            <div class="ome-title">
              {{ numberWithCommas(company.days * 1) }}+
            </div>
            <div class="small-title">DAYS ONLINE<br /></div>
            <div class="stat-circle bi">
              <div class="stat-circle abs active"></div>
              <div class="stat-circle">
                <img
                  src="/images/calendar.svg"
                  loading="lazy"
                  alt=""
                  class="stat-icon"
                />
              </div>
            </div>
          </div>
          <div class="eac-stats">
            <div class="ome-title">
              {{ numberWithCommas(company.customers * 1) }}+
            </div>
            <div class="small-title">LOYAL CUSTOMERS<br /></div>
            <div class="stat-circle bi">
              <div class="stat-circle abs active"></div>
              <div class="stat-circle">
                <img
                  src="/images/boys.svg"
                  loading="lazy"
                  alt=""
                  class="stat-icon"
                />
              </div>
            </div>
          </div>
          <div class="eac-stats">
            <div class="ome-title">
              {{ numberWithCommas(company.products * 1) }}+
            </div>
            <div class="small-title">AVAILABLE PRODUCTS<br /></div>
            <div class="stat-circle bi">
              <div class="stat-circle abs active"></div>
              <div class="stat-circle">
                <img
                  src="/images/box.svg"
                  loading="lazy"
                  alt=""
                  class="stat-icon"
                />
              </div>
            </div>
          </div>
          <div class="eac-stats">
            <div class="ome-title">
              {{ numberWithCommas(company.partners * 1) }}+
            </div>
            <div class="small-title">BEST PARTNERS<br /></div>
            <div class="stat-circle bi">
              <div class="stat-circle abs active"></div>
              <div class="stat-circle">
                <img
                  src="/images/handshake.svg"
                  loading="lazy"
                  alt=""
                  class="stat-icon"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

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

    <div class="staffs">
      <div class="custom-container">
        <div class="staffs-flex">
          <div class="process-title-left">
            <div class="title-sm">// WONDERFUL STAFF</div>
            <div class="ome-title sm">TEAM BEHIND OUR SUCCESS<br /></div>
          </div>
          <div class="process-title-rit">
            <div class="rit-title">
              Meat our wonderful staff of Chyke Chidan who are working very
              smart and efficient to make available our services to your reach
              <br />
            </div>
          </div>
          <div class="w-layout-grid staff-rid">
            <div
              @mouseenter="activateStaff(int)"
              @mouseleave="deactivateStaff"
              v-for="(item, int) in staffs"
              :key="int"
              class="eac-staff-rid"
            >
              <div class="rid-color" :class="{ active: int == staf }"></div>
              <div class="rid-pix-older">
                <img
                  :src="`${FILE_URL}/${item.image}`"
                  loading="lazy"
                  alt=""
                  class="responsive-pix"
                />
                <div :class="{ active: int == staf }" class="site-socials">
                  <a href="#" class="dis-box bot w-inline-block"
                    ><img
                      src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/662685c168d98f8cc52fcd76_facebook-app-round-icon%201.svg"
                      loading="lazy"
                      alt=""
                      class="dis-box-icon" /></a
                  ><a href="#" class="dis-box bot w-inline-block"
                    ><img
                      src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/662685c168d98f8cc52fcd76_facebook-app-round-icon%201.svg"
                      loading="lazy"
                      alt=""
                      class="dis-box-icon" /></a
                  ><a href="#" class="dis-box w-inline-block"
                    ><img
                      src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/662685c168d98f8cc52fcd76_facebook-app-round-icon%201.svg"
                      loading="lazy"
                      alt=""
                      class="dis-box-icon"
                  /></a>
                </div>
                <div class="staff-name-older">
                  <div class="staff-name">{{ item.username }}</div>
                  <div class="title-sm rem">{{ item.position }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <testimonial />

    <div class="ome-blo">
      <div class="custom-container">
        <div class="custom-flex">
          <div class="process-title-left">
            <div class="title-sm">// WORKING PROCESS</div>
            <div class="ome-title sm">TEAM BEHIND OUR SUCCESS<br /></div>
          </div>
          <div class="process-title-rit">
            <div class="rit-title">
              We are following these processes to maintain our working process
              and also for better outcomes.<br />
            </div>
          </div>
          <div class="ome-blo-flex">
            <div class="eac-blo active">
              <div class="ome-blo-date">Sep 21, 2024</div>
              <div class="ome-blo-details">
                <img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664f85c52560a1b333396e44_comments.svg"
                  loading="lazy"
                  alt=""
                  class="ome-blo-icon"
                />
                <div class="blo-det-text">Comments</div>
                <img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664f85c596459c05bef09943_user-alt.svg"
                  loading="lazy"
                  alt=""
                  class="ome-blo-icon"
                />
                <div class="blo-det-text">Admin</div>
              </div>
              <a href="#" class="ome-blo-title active"
                >ENERGO IMPROVES A LEADING ONSHORE TURBINE TO INCREASE
                ELECTRICITY OUTPUT</a
              >
              <div class="blo-pix">
                <img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664f87a8ce6c3760bfdfc48f_news-1.jpg"
                  loading="lazy"
                  alt=""
                  class="responsive-pix"
                />
                <div class="cover active"></div>
              </div>
              <a href="#" class="ome-read-more w-inline-block"
                ><img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664f89750919596a347c0ba5_arrow-right.svg"
                  loading="lazy"
                  alt=""
                  class="read-blo-icon"
                />
                <div>Read More</div></a
              >
            </div>
            <div class="eac-blo">
              <div class="ome-blo-date">Sep 21, 2024</div>
              <div class="ome-blo-details">
                <img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664f85c52560a1b333396e44_comments.svg"
                  loading="lazy"
                  alt=""
                  class="ome-blo-icon"
                />
                <div class="blo-det-text">Comments</div>
                <img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664f85c596459c05bef09943_user-alt.svg"
                  loading="lazy"
                  alt=""
                  class="ome-blo-icon"
                />
                <div class="blo-det-text">Admin</div>
              </div>
              <a href="#" class="ome-blo-title"
                >ENERGO IMPROVES A LEADING ONSHORE TURBINE TO INCREASE
                ELECTRICITY OUTPUT</a
              >
              <div class="blo-pix">
                <img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664f87a84cea4f55b7103f0d_news-3.jpg"
                  loading="lazy"
                  alt=""
                  class="responsive-pix"
                />
                <div class="cover active"></div>
              </div>
              <a href="#" class="ome-read-more w-inline-block"
                ><img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664f89750919596a347c0ba5_arrow-right.svg"
                  loading="lazy"
                  alt=""
                  class="read-blo-icon"
                />
                <div>Read More</div></a
              >
            </div>
            <div class="eac-blo">
              <div class="ome-blo-date">Sep 21, 2024</div>
              <div class="ome-blo-details">
                <img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664f85c52560a1b333396e44_comments.svg"
                  loading="lazy"
                  alt=""
                  class="ome-blo-icon"
                />
                <div class="blo-det-text">Comments</div>
                <img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664f85c596459c05bef09943_user-alt.svg"
                  loading="lazy"
                  alt=""
                  class="ome-blo-icon"
                />
                <div class="blo-det-text">Admin</div>
              </div>
              <a href="#" class="ome-blo-title"
                >ENERGO IMPROVES A LEADING ONSHORE TURBINE TO INCREASE
                ELECTRICITY OUTPUT</a
              >
              <div class="blo-pix">
                <img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664f87a9c814b40b06b01f2e_news-2.jpg"
                  loading="lazy"
                  alt=""
                  class="responsive-pix"
                />
                <div class="cover active"></div>
              </div>
              <a href="#" class="ome-read-more w-inline-block"
                ><img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664f89750919596a347c0ba5_arrow-right.svg"
                  loading="lazy"
                  alt=""
                  class="read-blo-icon"
                />
                <div>Read More</div></a
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
import Testimonial from "../components/Testimonial.vue";
export default {
  components: { HeroSlider, Testimonial },
  layout: "home",
  data() {
    return {
      prod: 10,
      staf: -1,
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

    activateStaff(int) {
      this.staf = int;
    },

    deactivateStaff() {
      this.staf = -1;
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

    blogs() {
      const items = this.$store.state.blogs;
      const blogs = [];
      for (let i = 0; i < items.length; i++) {
        const el = items[i];
        if (el.category == "Blog") {
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
