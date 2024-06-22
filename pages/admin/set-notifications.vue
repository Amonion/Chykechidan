<template>
  <div class="das-main-body">
    <div class="das-body-eader">
      <div>Notification</div>
      <div>{{ formattedDate() }}</div>
    </div>
    <div class="das-tb-flow">
      <div class="das-tb">
        <div class="das-tb-ead">
          <div class="das-tb-cell">S/N</div>
          <div class="das-tb-cell _30">Name</div>
          <div class="das-tb-cell _30">Title</div>
          <div class="das-tb-cell _30">Content</div>
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
              @click="toggleCheck(int)"
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

          <div class="das-tb-cell _30">{{ item.title }}</div>
          <div class="das-tb-cell _30">{{ item.name }}</div>
          <div class="das-tb-cell _30" v-html="item.content"></div>
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
        @click="prepareNotificationEdit(selected[selected.length - 1])"
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
          <div class="from-rid-label">Name</div>
          <input
            class="from-rid-input w-input"
            v-model="name"
            placeholder="Enter Name"
            type="text"
          />
        </div>
        <div class="eac-form-input">
          <div class="from-rid-label">Title</div>
          <input
            class="from-rid-input w-input"
            v-model="title"
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
        <div v-else @click="processNotification" class="overlay-btn pad">
          Submit
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "admin",

  data() {
    return {
      title: "",
      name: "",
      content: "",

      editingId: "",
      editingState: false,
      response: "",
      isError: false,
      showResponse: false,
      onRequest: false,
      showEditor: false,

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
      this.editingId = "";
      this.editState = false;
      this.name = "";
      this.title = "";
      this.content = "";
      this.deleteId = "";
    },

    copyNotification(notification) {
      this.content = notification.content;
      this.title = notification.title;
      this.name = notification.name;
    },

    checkAll() {
      this.$store.commit("settingsStore/CHECK_ALL_NOTIFICATIONS");
    },

    toggleCheck(int) {
      this.$store.commit("admin/TOGGLE_NOTIFICATION_TEMP", int);
    },

    prepareNotificationEdit(data) {
      if (!data) {
        this.showResponseMsg("Please select one Notification to edit", true);
        return;
      }
      const notification = JSON.parse(JSON.stringify(data));
      this.showEditor = true;
      this.editingId = notification.id;
      this.editingState = true;
      this.copyNotification(notification);
    },

    prepareNotificationCopy(data) {
      if (!data) {
        this.showResponseMsg("Please select one Notification to copy", true);
        return;
      }
      const notification = JSON.parse(JSON.stringify(data));
      this.copyNotification(notification);
      this.editingId = "";
      this.editingState = false;
    },

    async getNotificationTemps() {
      const result = await this.$store.dispatch(
        "admin/GET_NOTIFICATION_TEMPS",
        `/notifications/temp/?limit=${this.limit}&page=${this.currentPage}`
      );
    },

    async processNotification() {
      const form = new FormData();
      form.append("name", this.name);
      form.append("title", this.title);
      form.append("content", this.content);

      const payload = {
        form: form,
        url: this.editingState
          ? `/notifications/temp/?id=${this.editingId}&limit=${this.limit}&page=${this.currentPage}`
          : `/notifications/temp/?limit=${this.limit}&page=${this.currentPage}`,
      };
      this.onRequest = true;

      const result = await this.$store.dispatch("admin/MAKE_POST", payload);
      // console.log(result, result.response);
      if (!result.response) {
        this.onRequest = false;
        this.$store.dispatch("admin/INITIALIZE_APP");
        this.showResponseMsg(result.data.message, false);
        this.clearInputs();
      } else {
        this.onRequest = false;
        this.showResponseMsg(result.response.message, true);
      }
    },
  },

  mounted() {
    if (!this.notificationTempStatus) {
      this.getNotificationTemps();
    }
  },

  computed: {
    editorConfig() {
      return this.$store.state.editor.editorConfig;
    },

    items() {
      return this.$store.state.admin.notificationTemps;
    },

    notificationTempStatus() {
      return this.$store.state.admin.notificationTempStatus;
    },

    selected() {
      return this.$store.state.admin.selectedNotificationTemps;
    },

    total() {
      return this.$store.state.admin.notificationTempLength;
    },

    isChecked() {
      return this.$store.state.settingsStore.isNotificationTempChecked;
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
