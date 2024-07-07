<template>
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
          <div class="ome-title">{{ numberWithCommas(company.days * 1) }}+</div>
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
</template>

<script>
export default {
  methods: {
    numberWithCommas(number) {
      return number.toLocaleString("en-US", { maximumFractionDigits: 2 });
    },
  },
  computed: {
    company() {
      return this.$store.state.company;
    },
  },
};
</script>
