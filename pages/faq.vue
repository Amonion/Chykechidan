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
          <div class="ero-title">FREQUENTLY ANSWERED QUESTION</div>
          <div class="ero-link">
            [<NuxtLink to="/" class="ero-text-link active">Home</NuxtLink> -
            FAQ]
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
            <div
              v-for="category in faqCategories"
              :key="category.id"
              class="eac-faq-wrap"
            >
              <div class="faq-cateory">// {{ category }}</div>
              <div
                v-for="faq in filteredFAQ(category)"
                :key="faq.id"
                class="eac-faq"
              >
                <div
                  class="question-ead"
                  :class="{ active: faq.checked }"
                  @click="toggleQuestion(faq)"
                >
                  <div
                    class="product-pa-item sm"
                    :class="{ active: faq.checked }"
                  >
                    <div>+</div>
                  </div>
                  <div class="faq-question">
                    {{ faq.question }}
                  </div>
                </div>
                <div
                  class="answer"
                  :class="{ active: faq.checked }"
                  v-html="faq.answer"
                ></div>
              </div>
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
      faqCategories: [],
      faqs: [],
    };
  },

  methods: {
    filteredFAQ(data) {
      return this.faqs.filter((item) => item.category === data);
    },

    getFaqCategories(data) {
      this.faqCategories = [...new Set(data.map((item) => item.category))];
    },

    toggleQuestion(question) {
      this.checkFAQs(this.faqs);
      question.checked = !question.checked;
    },

    checkFAQs(data) {
      data.forEach((el) => {
        el.checked = false;
      });
      return data;
    },

    async getFaqs() {
      try {
        const result = await this.$axios.get("/faq/?limit=60");
        this.getFaqCategories(result.data.data);
        this.faqs = await this.checkFAQs(result.data.data);
        this.loadScript();
        console.log(this.faqCategories);
      } catch (err) {
        console.log(err.response.data.message);
      }
    },
  },

  mounted() {
    this.getFaqs();
  },
};
</script>
