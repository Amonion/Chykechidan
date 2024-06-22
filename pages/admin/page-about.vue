<template>
  <div class="das-main-body">
    <div class="das-body-eader">
      <div>About</div>
      <div>{{ formattedDate() }}</div>
    </div>
    <div class="das-tb-flow">
      <div class="das-tb">
        <div class="das-tb-ead">
          <div class="das-tb-cell">S/N</div>
          <div class="das-tb-cell _20">Media</div>
          <div class="das-tb-cell _30">Title</div>
          <div class="das-tb-cell _30">Subtitle</div>
          <div class="das-tb-cell _60">Description</div>
        </div>
        <div
          class="das-tb-body"
          v-for="(item, int) in items"
          :key="item.id"
          :class="{ even: int % 2 == 0 }"
        >
          <div class="das-tb-cell">
            <div>{{ (currentPage - 1) * limit + int + 1 }}</div>
            <div
              :class="{ active: item.checked }"
              class="das-tb-ceck"
              @click="toggleAbout(int)"
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
            <img
              :src="`${FILE_URL}/${item.media}`"
              loading="lazy"
              sizes="(max-width: 479px) 102.86250305175781px, (max-width: 767px) 21vw, (max-width: 991px) 13vw, (max-width: 1279px) 11vw, (max-width: 1439px) 128.8125px, 145.1999969482422px"
              :srcset="`
                            ${FILE_URL}/${item.media} 500w,
                            ${FILE_URL}/${item.media} 550w,
                            ${FILE_URL}/${item.media} 953w`"
              alt=""
              class="tb-pix"
            />
          </div>
          <div class="das-tb-cell _30">{{ item.title }}</div>
          <div class="das-tb-cell _30">{{ item.subtitle }}</div>

          <div class="das-tb-cell _60" v-html="item.content"></div>
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
          <div class="from-rid-label">Title</div>
          <input
            class="from-rid-input w-input"
            v-model="title"
            placeholder="Enter title"
            type="text"
          />
        </div>

        <div class="eac-form-input">
          <div class="from-rid-label">Subtitle</div>
          <input
            class="from-rid-input w-input"
            v-model="subtitle"
            placeholder="Enter Subtitle"
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
        <label for="file" class="overlay-btn pad">
          <img
            src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/66605c571255a4e63fb9cb4f_upload.svg"
            loading="lazy"
            alt=""
            class="form-btn-icon"
          /><input
            class="hide w-input"
            type="file"
            id="file"
            @change="setMedia"
          />
          <div class="tb-action-text">Upload</div>
        </label>

        <div v-if="onRequest" class="overlay-btn pad">
          <img
            src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6656d0a87fa1d0b4305d0a2b_spinner.svg"
            loading="lazy"
            alt=""
            class="form-btn-icon spinner"
          /><input
            class="hide w-input"
            maxlength="256"
            name="field-3"
            data-name="Field 3"
            placeholder="27/10/2024"
            type="text"
            id="field-3"
            required=""
          />
          <div class="tb-action-text">Processing...</div>
        </div>
        <div v-else @click="processEmail" class="overlay-btn pad">Submit</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      editState: false,
      editId: "",
      content: "",
      subtitle: "",
      title: "",
      media: "",

      isAllChecked: false,

      sort: "title",
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

      response: "",
      isError: false,
      showResponse: false,
      onRequest: false,
      showEditor: false,

      alertStatus: false,
      alertMsg: "",
    };
  },

  methods: {
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

    clearInputs() {
      this.editId = "";
      this.editState = false;
      this.title = "";
      this.subtitle = "";
      this.media = "";
      this.content = "";
      this.deleteId = "";
    },

    setMedia(e) {
      this.media = e.target.files[0];
    },

    toggleAbout(int) {
      this.$store.commit("admin/TOGGLE_ABOUT", int);
    },

    checkAllEmails() {
      this.isAllChecked = !this.isAllChecked;
      this.$store.commit("settingsStore/CHECK_ALL_EMAILS", this.isAllChecked);
    },

    sortResult() {
      this.sort = this.sort == "-time" ? "time" : "-time";
      this.getAbout();
    },

    paginate(page) {
      this.currentPage = page;
      this.getAbout();
    },

    closeEditor() {
      this.clearInputs();
      this.showEditor = false;
    },

    showAlertBox(msg, status) {
      this.$store.commit("settingsStore/SHOW_ALERT_BOX", { msg, status });
    },

    copyData(item) {
      this.subtitle = item.subtitle;
      this.content = item.content;
      this.title = item.title;
      this.media = item.media;
    },

    duplicateEmail() {
      if (this.selectedEmails.length == 0) {
        const msg = `Please select an email to duplicate`;
        const status = true;
        this.showAlertBox(msg, status);
        return;
      }
      const email = JSON.parse(
        JSON.stringify(this.selectedEmails[this.selectedEmails.length - 1])
      );
      this.copyData(email);
    },

    editEmail() {
      if (this.selectedEmails.length == 0) {
        const msg = `Please select an email to edit`;
        const status = true;
        // this.showAlertBox(msg, status);
        return;
      }
      const email = JSON.parse(
        JSON.stringify(this.selectedEmails[this.selectedEmails.length - 1])
      );
      this.showEditor = true;
      this.editState = true;
      this.editId = email.id;
      this.copyData(email);
    },

    startDeleteEmail(id) {
      this.deleteId = id;
      this.showOverlay = true;
      this.overlayMsg = `Are you sure you want to delete this email?`;
    },

    async processEmail() {
      // const fields = [
      //   { name: "greeting", data: this.greeting },
      //   { name: "title", data: this.title },
      //   { name: "template", data: this.template },
      //   { name: "content", data: this.content },
      // ];

      // fields.forEach((el) => {
      //   if (el.data == "" && el.data.trim() == "") {
      //     this.alertMsg = `Please fill in the ${el.name} field`;
      //     this.alertStatus = true;
      //     this.showAlertBox(this.alertMsg, this.alertStatus);
      //     this.isError = true;

      //     return;
      //   }
      // });

      // if (this.isError) {
      //   this.onRequest = false;
      //   this.isError = false;
      //   return;
      // }

      this.onRequest = true;

      const form = new FormData();
      form.append("media", this.media);
      form.append("title", this.title);
      form.append("content", this.content);
      form.append("subtitle", this.subtitle);

      const payload = {
        form: form,
        url: !this.editState
          ? `/about/?limit=${this.limit}&page=${this.currentPage}`
          : `/about/?id=${this.editId}&limit=${this.limit}&page=${this.currentPage}`,
      };

      const result = await this.$store.dispatch("admin/MAKE_POST", payload);
      if (!result.response) {
        this.$store.commit("admin/SET_ABOUT", result.data);
        this.onRequest = false;
        this.clearInputs();
      } else {
        console.log(result.response);
      }
    },

    closeOverlay() {
      this.showOverlay = false;
      this.overlayMsg = "";
      if (this.deleteId != "") {
        this.deleteEmail();
      }
    },

    async getEmails() {
      const query = `?limit=${this.limit}&page=${this.currentPage}&sort=${title}`;
      this.$store.dispatch("settingsStore/GET_EMAILS", query);
    },

    // async deleteEmail() {
    //   const query = `?limit=${this.limit}&page=${this.currentPage}`;
    //   try {
    //     const result = await this.$axios.delete(
    //       `/emails/${this.deleteId}/${query}`
    //     );
    //     this.emails = result.data.data;
    //     this.resultLength = result.data.resultLength;
    //     this.clearInputs();
    //   } catch (err) {
    //     console.log(err.response.data);
    //   }
    // },
  },

  computed: {
    editorConfig() {
      return this.$store.state.editor.editorConfig;
    },

    items() {
      return this.$store.state.admin.abouts;
    },

    FILE_URL() {
      return this.$store.state.admin.fileURL;
    },

    total() {
      return this.$store.state.admin.aboutLength;
    },

    selectedEmails() {
      return this.$store.state.admin.selectedAbout;
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

<style></style>
