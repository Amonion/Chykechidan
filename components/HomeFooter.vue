<template>
  <div class="ome-footer">
    <div class="custom-container">
      <div class="custom-flex footer">
        <div class="eac-footer-sect">
          <NuxtLink to="/" class="brand w-inline-block"
            ><img src="/Logo.png" loading="lazy" alt=""
          /></NuxtLink>
          <div class="foot-email">
            <img
              src="/images/envelope.svg"
              loading="lazy"
              alt=""
              class="foot-email-icon"
            />
            <div v-if="company">
              <div class="foot-title">FREE CONSULT</div>
              <NuxtLink to="/" class="foot-email-link"
                >{{ company.systemEmail }}
              </NuxtLink>
            </div>
          </div>
          <div
            v-if="about"
            class="foot-title"
            v-html="truncateText(about.content, 150)"
          ></div>
        </div>
        <div class="eac-footer-sect m">
          <div class="foot-title top">COMPANY<br /></div>
          <div class="footer-line-flex">
            <div class="footer-line"></div>
            <div class="footer-line lon"></div>
          </div>
          <div
            class="eac-footer-link w-inline-block"
            @mouseenter="linkin('/')"
            @mouseleave="unlink"
          >
            <NuxtLink
              to="/"
              class="eac-footer-link w-inline-block"
              :class="{ active: link == '/' }"
            >
              <div class="footer-link-box" :class="{ active: link == '/' }">
                <div
                  class="footer-link-line"
                  :class="{ active: link == '/' }"
                ></div>
              </div>
              <div class="foot-title">HOME</div>
            </NuxtLink>
          </div>
          <div
            class="eac-footer-link w-inline-block"
            @mouseenter="linkin('about')"
            @mouseleave="unlink"
          >
            <NuxtLink
              to="/about"
              class="eac-footer-link w-inline-block"
              :class="{ active: link == 'about' }"
            >
              <div class="footer-link-box" :class="{ active: link == 'about' }">
                <div
                  class="footer-link-line"
                  :class="{ active: link == 'about' }"
                ></div>
              </div>
              <div class="foot-title">ABOUT</div>
            </NuxtLink>
          </div>
          <div
            class="eac-footer-link w-inline-block"
            @mouseenter="linkin('products')"
            @mouseleave="unlink"
          >
            <NuxtLink
              to="/products"
              class="eac-footer-link w-inline-block"
              :class="{ active: link == 'products' }"
            >
              <div
                class="footer-link-box"
                :class="{ active: link == 'products' }"
              >
                <div
                  class="footer-link-line"
                  :class="{ active: link == 'products' }"
                ></div>
              </div>
              <div class="foot-title">PRODUCTS</div>
            </NuxtLink>
          </div>
        </div>
        <div class="eac-footer-sect m">
          <div class="foot-title top">SUPPORT</div>
          <div class="footer-line-flex">
            <div class="footer-line"></div>
            <div class="footer-line lon"></div>
          </div>

          <div
            class="eac-footer-link w-inline-block"
            @mouseenter="linkin('contact')"
            @mouseleave="unlink"
          >
            <NuxtLink
              to="/contact"
              class="eac-footer-link w-inline-block"
              :class="{ active: link == 'contact' }"
            >
              <div
                class="footer-link-box"
                :class="{ active: link == 'contact' }"
              >
                <div
                  class="footer-link-line"
                  :class="{ active: link == 'contact' }"
                ></div>
              </div>
              <div class="foot-title">CONTACTS</div>
            </NuxtLink>
          </div>
          <div
            class="eac-footer-link w-inline-block"
            @mouseenter="linkin('faq')"
            @mouseleave="unlink"
          >
            <NuxtLink
              to="/faq"
              class="eac-footer-link w-inline-block"
              :class="{ active: link == 'faq' }"
            >
              <div class="footer-link-box" :class="{ active: link == 'faq' }">
                <div
                  class="footer-link-line"
                  :class="{ active: link == 'faq' }"
                ></div>
              </div>
              <div class="foot-title">FAQ</div>
            </NuxtLink>
          </div>
          <div
            class="eac-footer-link w-inline-block"
            @mouseenter="linkin('terms')"
            @mouseleave="unlink"
          >
            <NuxtLink
              to="/terms"
              class="eac-footer-link w-inline-block"
              :class="{ active: link == 'terms' }"
            >
              <div class="footer-link-box" :class="{ active: link == 'terms' }">
                <div
                  class="footer-link-line"
                  :class="{ active: link == 'terms' }"
                ></div>
              </div>
              <div class="foot-title">TERMS</div>
            </NuxtLink>
          </div>
          <div
            class="eac-footer-link w-inline-block"
            @mouseenter="linkin('blogs')"
            @mouseleave="unlink"
          >
            <NuxtLink
              to="/blogs"
              class="eac-footer-link w-inline-block"
              :class="{ active: link == 'blogs' }"
            >
              <div class="footer-link-box" :class="{ active: link == 'blogs' }">
                <div
                  class="footer-link-line"
                  :class="{ active: link == 'blogs' }"
                ></div>
              </div>
              <div class="foot-title">BLOG</div>
            </NuxtLink>
          </div>
        </div>
        <div class="eac-footer-sect full">
          <div class="foot-title top">FROM BLOG<br /></div>
          <div class="footer-line-flex">
            <div class="footer-line"></div>
            <div class="footer-line lon"></div>
          </div>
          <NuxtLink
            v-for="item in items"
            :key="item.id"
            :to="`/blog-details/?id=${item.id}`"
            class="eac-footer-link news w-inline-block"
            ><div class="foot-title">{{ formattedDate(item.time * 1) }}</div>
            <div class="foot-title news">{{ item.subtitle }}</div></NuxtLink
          >
        </div>
      </div>
    </div>
    <div class="footer-copy" v-if="company">
      <div>Copyright @ {{ company.companyDomain }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      link: "",
    };
  },

  methods: {
    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
      }
      return text;
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

    formatDateToDDMon(dateString) {
      const options = { month: "short", day: "2-digit" };
      const date = new Date(dateString);
      const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
        date
      );
      return formattedDate;
    },

    linkin(text) {
      this.link = text;
    },

    unlink() {
      this.link = "";
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
      return this.$store.state.about[1];
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
  },
};
</script>

<style></style>
