<template>
  <div class="das-main-body">
    <div class="das-body-eader">
      <div>Terms</div>
      <div>{{ formattedDate() }}</div>
    </div>
    <div class="das-tb-flow">
      <div class="das-tb">
        <div class="das-tb-ead">
          <div class="das-tb-cell">S/N</div>
          <div class="das-tb-cell _20">Category</div>
          <div class="das-tb-cell _30">Title</div>
          <div class="das-tb-cell _60">Content</div>
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
          <div class="das-tb-cell _30">{{ item.title }}</div>
          <div
            class="das-tb-cell _60"
            v-html="truncateString(item.content, 200)"
          ></div>
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
        @click="prepareTermEdit"
      /><img
        src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665b486dcc7eddebcb1b7c96_trash-alt.svg"
        loading="lazy"
        alt=""
        class="tb-action-icon"
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
          <div class="from-rid-label">Title</div>
          <input
            class="from-rid-input w-input"
            v-model="title"
            placeholder="Enter Title"
            type="text"
          />
        </div>
      </div>
      <div class="eac-form-input">
        <div class="from-rid-label">Content</div>

        <client-only placeholder="loading..."
          ><ckeditor-nuxt
            class="from-rid-input w-input"
            v-model="content"
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
        <div v-else @click="processTerms" class="overlay-btn pad">Submit</div>
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
      title: "",
      content: "",

      editingId: "",
      editingState: false,
      showEditor: false,

      response: "",
      isError: false,
      showResponse: false,
      onRequest: false,

      showOverlay: false,
      overlayMsg: "",

      sort: "-time",
      limit: 3,
      resultLength: "",
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
    clearInputs() {
      this.title = "";
      this.content = "";
      this.category = "";
      this.editingState = false;
      this.editingId = "";
      this.deleteId = "";
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

    showAlertBox(msg, status) {
      this.$store.commit("admin/SHOW_ALERT_BOX", { msg, status });
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

    toggleItem(int) {
      this.$store.commit("admin/TOGGLE_TERM", int);
    },

    returnConfirmation(data) {
      if (data == "yes") {
        this.deleteTerms();
      }
      this.confirmStatus = true;
    },

    truncateString(str, maxLength) {
      if (str.length > maxLength) {
        return str.slice(0, maxLength - 3) + "...";
      }
      return str;
    },

    copyItem(term) {
      this.category = term.category;
      this.content = term.content;
      this.title = term.title;
      this.editingId = term.id;
      this.editingState = true;
    },

    prepareTermEdit() {
      if (this.selectedItems.length == 0) {
        this.showOverlayResponse(
          "Please select a term to edit",
          true,
          false,
          false,
          true
        );
        return;
      }
      const item = JSON.parse(
        JSON.stringify(this.selectedItems[this.selectedItems.length - 1])
      );
      this.editingId = item.id;
      this.editingState = true;
      this.copyItem(item);
    },

    showOverlayResponse(msg, error, success, warning, show) {
      const payload = {
        msg,
        error,
        success,
        warning,
        show,
      };

      this.$store.commit("admin/SHOW_RESPONSE", payload);
    },

    async processTerms() {
      this.onRequest = true;
      const form = {
        category: this.category,
        content: this.content,
        title: this.title,
        time: this.editingState ? this.time : new Date().getTime(),
      };

      const payload = {
        form: form,
        url: this.editingState
          ? `/terms/?id=${this.editingId}&limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`
          : `/terms/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`,
      };

      const result = await this.$store.dispatch("admin/MAKE_POST", payload);

      if (!result.response) {
        this.$store.commit("admin/SET_TERMS", result.data);
        this.clearInputs();
        this.onRequest = false;
      } else {
        console.log(result.response);
      }
    },

    startDeleteTerms(id) {
      this.deleteId = id;
      this.showOverlay = true;
      this.overlayMsg = "Are you sure you want to delete this term?";
    },

    closeOverlay() {
      this.showOverlay = false;
      this.overlayMsg = "";
      this.deleteTerms();
    },

    async getTerms() {
      const query = `/terms/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`;
      const result = await this.$store.dispatch("admin/MAKE_GET", query);
      this.$store.commit("admin/SET_TERMS", result.data);
    },

    async deleteTerms() {
      const query = `?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`;
      try {
        const result = await this.$axios.delete(
          `/terms/${this.deleteId}/${query}`
        );
        this.terms = result.data.data;
        this.resultLength = result.data.resultLength;
        this.clearInputs();
      } catch (err) {
        this.showResponseMsg(err.response.data.message, true);
      }
    },
  },

  computed: {
    editorConfig() {
      return this.$store.state.editor.editorConfig;
    },

    items() {
      return this.$store.state.admin.terms;
    },

    selectedItems() {
      return this.$store.state.admin.selectedTerms;
    },

    total() {
      return this.$store.state.admin.termLength;
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
