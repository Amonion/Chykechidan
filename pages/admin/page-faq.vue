<template>
  <div class="das-main-body">
    <div class="das-body-eader">
      <div>FAQ</div>
      <div>{{ formattedDate() }}</div>
    </div>
    <div class="das-tb-flow">
      <div class="das-tb">
        <div class="das-tb-ead">
          <div class="das-tb-cell">S/N</div>
          <div class="das-tb-cell _20">Category</div>
          <div class="das-tb-cell _30">Question</div>
          <div class="das-tb-cell _60">Answer</div>
        </div>
        <div
          v-for="(item, int) in items"
          :key="item.id"
          :class="{ even: int % 2 == 0 }"
          class="das-tb-body"
        >
          <div class="das-tb-cell">
            <div>{{ (currentPage - 1) * limit + int + 1 }}</div>
            <div
              :class="{ active: item.checked }"
              class="das-tb-ceck"
              @click="toggleItem(int)"
            >
              <img
                src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665805ea25eaee8db62cce44_check.svg"
                loading="lazy"
                alt=""
                class="das-tb-icon"
                :class="{ active: item.checked }"
              />
            </div>
          </div>

          <div class="das-tb-cell _20">
            <div class="from-rid-label">{{ item.category }}</div>
          </div>
          <div class="das-tb-cell _30">{{ item.question }}</div>
          <div class="das-tb-cell _60" v-html="item.answer"></div>
        </div>
      </div>
    </div>

    <div class="das-tb-info">
      <div>Page {{ currentPage }} of {{ pages().length }}</div>

      <div class="das-paination">
        <div
          v-if="currentPage > 1"
          class="das-pa-next"
          @click="paginate(currentPage - 1)"
        >
          <img
            src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665b4f324c69c44d55719f02_chevron0.svg"
            loading="lazy"
            alt=""
            class="das-paination-icon"
          />
        </div>
        <div
          v-for="(item, int) in pages()"
          @click="paginate(int + 1)"
          :key="int"
          class="das-foot-pa"
        >
          {{ int + 1 }}
        </div>

        <div
          class="das-pa-next"
          @click="paginate(currentPage + 1)"
          v-if="currentPage < pages().length"
        >
          <img
            src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665b500072be49a09b6c1d36_chevron10.svg"
            loading="lazy"
            alt=""
            class="das-paination-icon"
          />
        </div>
      </div>
    </div>

    <div class="das-tb-footer">
      <div class="das-tb-cell">
        <div>3</div>
        <div class="das-tb-ceck foot active">
          <img
            src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665805ea25eaee8db62cce44_check.svg"
            loading="lazy"
            alt=""
            class="das-tb-icon active"
          />
        </div>
      </div>
      <img
        src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/666010bad7eb3baa6c4314b2_edit.svg"
        loading="lazy"
        alt=""
        class="tb-action-icon"
        @click="prepareItemEdit"
      /><img
        src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665b486dcc7eddebcb1b7c96_trash-alt.svg"
        loading="lazy"
        alt=""
        class="tb-action-icon"
        @click="deleteFAQ"
      />
    </div>

    <div class="das-form">
      <div class="w-layout-grid das-rid">
        <div class="eac-form-input">
          <div class="from-rid-label">Category</div>
          <input
            class="from-rid-input w-input"
            v-model="category"
            placeholder="Enter Category"
            type="text"
          />
        </div>
        <div class="eac-form-input">
          <div class="from-rid-label">Question</div>
          <input
            class="from-rid-input w-input"
            v-model="question"
            placeholder="Enter title"
            type="text"
          />
        </div>
      </div>

      <div class="eac-form-input">
        <div class="from-rid-label">Content</div>

        <client-only placeholder="loading..."
          ><ckeditor-nuxt
            class="from-rid-input w-input"
            v-model="answer"
            :config="editorConfig"
          />
        </client-only>
      </div>

      <div v-if="showResponse" class="das-response" :class="{ error: isError }">
        {{ response }}
      </div>

      <div class="form-btn-roups">
        <div v-if="onRequest" class="overlay-btn pad">
          <img
            src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6656d0a87fa1d0b4305d0a2b_spinner.svg"
            loading="lazy"
            alt=""
            class="form-btn-icon spinner"
          />
          <div class="tb-action-text">Processing...</div>
        </div>
        <div v-else @click="processFAQ" class="overlay-btn pad">Submit</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      category: "",
      question: "",
      answer: "",
      time: "",

      editingId: "",
      editingState: false,
      response: "",
      isError: false,
      showResponse: false,
      onRequest: false,
      showEditor: false,
      deleteId: "",

      sort: "-time",
      field: "",
      limit: 10,
      currentPage: 1,
      pages: function () {
        let array = [];
        let x = Math.ceil(this.total / this.limit);
        for (let i = 0; i < x; i++) {
          array.push("i");
        }
        return array;
      },
    };
  },
  methods: {
    formatDate(data) {
      if (data == null || data == undefined) {
        return "N/A";
      }
      const date = new Date(data).getTime(); // Note that month is zero-indexed in JavaScript
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        suffix: (day) => {
          if (day === 1 || day === 21 || day === 31) {
            return "st";
          } else if (day === 2 || day === 22) {
            return "nd";
          } else if (day === 3 || day === 23) {
            return "rd";
          } else {
            return "th";
          }
        },
      };

      return new Intl.DateTimeFormat("en-US", options).format(date);
    },

    formattedDate() {
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
      const date = new Date();
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

    showResponseMsg(msg, status) {
      this.response = msg;
      this.isError = status;
      this.showResponse = true;
      this.onRequest = false;
      setTimeout(() => {
        this.response = "";
        this.showResponse = false;
      }, 6000);
    },

    clearInputs() {
      this.editingId = "";
      this.editingState = false;
      (this.category = ""), (this.question = "");
      this.answer = "";
    },

    showAlertBox(msg, status) {
      this.$store.commit("settingsStore/SHOW_ALERT_BOX", { msg, status });
    },

    toggleItem(int) {
      this.$store.commit("admin/TOGGLE_FAQ", int);
    },

    checkAllItem() {
      this.$store.commit("settingsStore/CHECK_ALL_FAQ");
    },

    checkResponse(result, msg, status) {
      this.onRequest = false;
      if (result.status == 200) {
        this.clearInputs();
        this.showAlertBox(msg, status);
      } else {
        this.showAlertBox(result.response.data.message, true);
      }
    },

    copyItem(item) {
      this.question = item.question;
      this.category = item.category;
      this.answer = item.answer;
      this.time = item.time;
    },

    prepareItemEdit() {
      if (this.selectedItems.length == 0) {
        this.showAlertBox("Please select a blog to edit", true);
        return;
      }
      const item = JSON.parse(
        JSON.stringify(this.selectedItems[this.selectedItems.length - 1])
      );
      this.editingId = item.id;
      this.editingState = true;
      this.copyItem(item);
    },

    duplicateItem() {
      if (this.selectedItems.length == 0) {
        this.showAlertBox("Please select a blog to duplicate", true);
        return;
      }
      const item = JSON.parse(
        JSON.stringify(this.selectedItems[this.selectedItems.length - 1])
      );
      this.editingId = "";
      this.editingState = false;
      this.copyItem(item);
    },

    sortResult() {
      this.sort = this.sort == "-time" ? "time" : "-time";
      this.getFAQ();
    },

    paginate(page) {
      this.currentPage = page;
      this.getFAQ();
    },

    async processFAQ() {
      const form = {
        category: this.category,
        question: this.question,
        answer: this.answer,
        time: this.editingState ? this.time : new Date().getTime(),
      };

      const payload = {
        form: form,
        url: this.editingState
          ? `/faq/?id=${this.editingId}&limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`
          : `/faq/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`,
      };

      this.onRequest = true;

      const result = await this.$store.dispatch("admin/MAKE_POST", payload);

      if (!result.response) {
        this.$store.commit("admin/SET_FAQ", result.data);
        this.clearInputs();
        this.onRequest = false;
      } else {
        console.log(result.response);
      }
    },

    async getFAQ() {
      const query = `/faq/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`;
      const result = await this.$store.dispatch("admin/MAKE_POST", query);
    },

    async deleteFAQ() {
      const query = `?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`;
    },
  },

  computed: {
    editorConfig() {
      return this.$store.state.editor.editorConfig;
    },

    items() {
      return this.$store.state.admin.faqs;
    },

    selectedItems() {
      return this.$store.state.admin.selectedFAQ;
    },

    total() {
      return this.$store.state.admin.faqLength;
    },

    isAllChecked() {
      return this.$store.state.admin.isFAQChecked;
    },
  },

  components: {
    "ckeditor-nuxt": () => {
      if (process.client) {
        return import("@blowstack/ckeditor-nuxt");
      }
    },
  },
};
</script>
