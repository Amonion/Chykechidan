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
              src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/66501bd220de87873e7cb4f7_envelope1.svg"
              loading="lazy"
              alt=""
              class="foot-email-icon"
            />
            <div>
              <div class="foot-title">FREE CONSULT</div>
              <NuxtLink to="/" class="foot-email-link"
                >SUPPORT@IRON.COM</NuxtLink
              >
            </div>
          </div>
          <div class="foot-title">
            Our goal to help our companies maintains achieve best position their
            respective industries best team work that work have hand to be
            repudiated.
          </div>
        </div>
        <div class="eac-footer-sect m">
          <div class="foot-title top">COMPANY<br /></div>
          <div class="footer-line-flex">
            <div class="footer-line"></div>
            <div class="footer-line lon"></div>
          </div>
          <NuxtLink to="/" class="eac-footer-link w-inline-block"
            ><div class="footer-link-box">
              <div class="footer-link-line"></div>
            </div>
            <div class="foot-title">HOME</div></NuxtLink
          ><NuxtLink to="/" class="eac-footer-link w-inline-block"
            ><div class="footer-link-box">
              <div class="footer-link-line"></div>
            </div>
            <div class="foot-title">ABOUT US</div></NuxtLink
          ><NuxtLink to="/" class="eac-footer-link active w-inline-block"
            ><div class="footer-link-box active">
              <div class="footer-link-line active"></div>
            </div>
            <div class="foot-title">ABOUT US</div></NuxtLink
          ><NuxtLink to="/" class="eac-footer-link w-inline-block"
            ><div class="footer-link-box">
              <div class="footer-link-line"></div>
            </div>
            <div class="foot-title">CONTACT US</div></NuxtLink
          >
        </div>
        <div class="eac-footer-sect m">
          <div class="foot-title top">SUPPORT</div>
          <div class="footer-line-flex">
            <div class="footer-line"></div>
            <div class="footer-line lon"></div>
          </div>
          <NuxtLink to="/" class="eac-footer-link w-inline-block"
            ><div class="footer-link-box">
              <div class="footer-link-line"></div>
            </div>
            <div class="foot-title">SERVICES</div></NuxtLink
          ><NuxtLink to="/" class="eac-footer-link w-inline-block"
            ><div class="footer-link-box">
              <div class="footer-link-line"></div>
            </div>
            <div class="foot-title">FAQ</div></NuxtLink
          ><NuxtLink to="/" class="eac-footer-link active w-inline-block"
            ><div class="footer-link-box active">
              <div class="footer-link-line active"></div>
            </div>
            <div class="foot-title">TUTORIALS</div></NuxtLink
          ><NuxtLink to="/" class="eac-footer-link w-inline-block"
            ><div class="footer-link-box">
              <div class="footer-link-line"></div>
            </div>
            <div class="foot-title">HELP</div></NuxtLink
          >
        </div>
        <div class="eac-footer-sect full">
          <div class="foot-title top">FROM BLOG<br /></div>
          <div class="footer-line-flex">
            <div class="footer-line"></div>
            <div class="footer-line lon"></div>
          </div>
          <NuxtLink to="/" class="eac-footer-link news w-inline-block"
            ><div class="foot-title">SEP 24, 2024</div>
            <div class="foot-title news">CONTACT US</div></NuxtLink
          ><NuxtLink to="/" class="eac-footer-link news w-inline-block"
            ><div class="foot-title">SEP 24, 2024</div>
            <div class="foot-title news">CONTACT US</div></NuxtLink
          ><NuxtLink to="/" class="eac-footer-link news w-inline-block"
            ><div class="foot-title">SEP 24, 2024</div>
            <div class="foot-title news">CONTACT US</div></NuxtLink
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
    return {};
  },
  methods: {
    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
      }
      return text;
    },

    formatDateToDDMon(dateString) {
      const options = { month: "short", day: "2-digit" };
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
  },
};
</script>

<style></style>
