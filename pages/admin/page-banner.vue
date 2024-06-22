<template>
  <div class="das-main-body">
    <div class="das-body-eader">
      <div>Banner</div>
      <div>{{ formattedDate() }}</div>
    </div>
    <div class="das-tb-flow">
      <div class="das-tb">
        <div class="das-tb-ead">
          <div class="das-tb-cell">S/N</div>
          <div class="das-tb-cell _20">Image</div>
          <div class="das-tb-cell _60">Title</div>
          <div class="das-tb-cell _30">Subtitle</div>
          <div class="das-tb-cell _30">Category</div>
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
              @click="toggleBanner(int)"
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
              :src="`${FILE_URL}/${item.image}`"
              loading="lazy"
              sizes="(max-width: 479px) 103.48750305175781px, (max-width: 767px) 22vw, (max-width: 991px) 13vw, (max-width: 1279px) 11vw, (max-width: 1439px) 129.4375px, 145.8249969482422px"
              :srcset="`
                ${FILE_URL}/${item.image} 500w,
                ${FILE_URL}/${item.image}       550w`"
              alt=""
              class="tb-pix"
            />
          </div>
          <div class="das-tb-cell _60">{{ item.bannerTitle }}</div>
          <div class="das-tb-cell _30">{{ item.bannerSubtitle }}</div>
          <div class="das-tb-cell _30">{{ item.bannerCategory }}</div>
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
        @click="prepareBannerEdit"
      /><img
        src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665b486dcc7eddebcb1b7c96_trash-alt.svg"
        loading="lazy"
        alt=""
        class="tb-action-icon"
        @click="deleteBanner"
      />
    </div>

    <div class="das-form">
      <div class="w-layout-grid das-rid">
        <div class="eac-form-input">
          <div class="from-rid-label">Title</div>
          <input
            class="from-rid-input w-input"
            v-model="bannerTitle"
            placeholder="Enter title"
            type="text"
          />
        </div>
        <div class="eac-form-input">
          <div class="from-rid-label">Subtitle</div>
          <input
            class="from-rid-input w-input"
            v-model="bannerSubtitle"
            placeholder="Enter Subtitle"
            type="text"
          />
        </div>
        <div class="eac-form-input">
          <div class="from-rid-label">Category</div>
          <input
            class="from-rid-input w-input"
            v-model="bannerCategory"
            placeholder="Enter Category"
            type="text"
          />
        </div>
        <div class="eac-form-input">
          <div class="from-rid-label">Intro</div>
          <input
            class="from-rid-input w-input"
            v-model="bannerIntro"
            placeholder="Enter Intro"
            type="text"
          />
        </div>
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
            @change="setBanner"
          />
          <div class="tb-action-text">Upload</div>
        </label>

        <div v-if="onRequest" class="overlay-btn pad">
          <img
            src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6656d0a87fa1d0b4305d0a2b_spinner.svg"
            loading="lazy"
            alt=""
            class="form-btn-icon spinner"
          />
          <div class="tb-action-text">Processing...</div>
        </div>
        <div v-else @click="processBanner" class="overlay-btn pad">Submit</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      bannerPage: "",
      bannerIntro: "",
      bannerTitle: "",
      bannerSubtitle: "",
      image: "",
      bannerCategory: "",

      editingState: false,
      editingId: "",

      response: "",
      isError: false,
      showResponse: false,
      onRequest: false,
      showEditor: false,
      showProductList: false,
      deleteId: "",

      showOverlay: false,
      overlayMsg: "",

      field: "",
      sort: "-time",
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

    setBanner(event) {
      this.image = event.target.files[0];
    },

    toggleBanner(int) {
      this.$store.commit("admin/TOGGLE_BANNER", int);
    },

    checkAllBanner() {
      this.$store.commit("settingsStore/CHECK_ALL_BANNERS");
    },

    clearInputs() {
      this.editingId = "";
      this.editingState = false;
      this.bannerIntro = "";
      this.bannerTitle = "";
      this.bannerSubtitle = "";
      this.image = "";
    },

    showConfirmation(msg, id) {
      this.deleteId = id;
      this.confirmMessage = msg;
      this.confirmStatus = false;
    },

    copyData(data) {
      this.image = data.image;
      this.bannerIntro = data.bannerIntro;
      this.bannerTitle = data.bannerTitle;
      this.bannerSubtitle = data.bannerSubtitle;
      this.bannerCategory = data.bannerCategory;
    },

    duplicateBanner() {
      const banner = this.selectedBanners[this.selectedBanners.length - 1];
      this.editingId = "";
      this.editingState = false;
      const data = JSON.parse(JSON.stringify(banner));
      this.copyData(data);
    },

    prepareBannerEdit() {
      const banner = this.selectedBanners[this.selectedBanners.length - 1];
      this.editingId = banner.id;
      this.editingState = true;
      const data = JSON.parse(JSON.stringify(banner));
      this.copyData(data);
    },

    getField(data) {
      if (data == "All Banner") {
        this.field = "";
      } else {
        this.field = `&bannerCategory=${data}`;
      }
      this.hideCategory = true;
      this.getBanner();
    },

    sortResult() {
      this.sort = this.sort == "-time" ? "time" : "-time";
      this.getBanner();
    },

    paginate(page) {
      this.currentPage = page;
      this.getBanner();
    },

    startBannerDelete(id) {
      this.showOverlay = true;
      this.overlayMsg = "Are you sure you want to delete this banner?";
      this.deleteId = id;
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

    async processBanner() {
      this.onRequest = true;
      const form = new FormData();
      form.append("bannerIntro", this.bannerIntro);
      form.append("bannerTitle", this.bannerTitle);
      form.append("bannerSubtitle", this.bannerSubtitle);
      form.append("image", this.image);
      form.append("bannerCategory", this.bannerCategory);

      const payload = {
        form: form,
        url: !this.editingState
          ? `/banners/?limit=${this.limit}&page=${this.currentPage}`
          : `/banners/?id=${this.editingId}&limit=${this.limit}&page=${this.currentPage}`,
      };

      const result = await this.$store.dispatch("admin/MAKE_POST", payload);
      if (!result.response) {
        this.$store.commit("admin/SET_BANNERS", result.data);
        this.onRequest = false;
        this.clearInputs();
        this.showOverlayResponse(
          "The banner operation was successful",
          false,
          true,
          false,
          true
        );
        // console.log(result);
        this.onRequest = false;
      } else {
        console.log(result.response);
        this.onRequest = false;
      }
    },

    async getBanner() {
      const query = `?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}${this.field}`;
    },

    async deleteBanner() {
      if (this.selectedBanners.length == 0) {
        this.showOverlayResponse(
          "Please select at least a row to delete",
          true,
          false,
          false,
          true
        );
        return;
      }
      const id = this.selectedBanners[this.selectedBanners.length - 1].id;
      const query = `/banners/?id=${id}&limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}${this.field}`;
      const result = await this.$store.dispatch("admin/MAKE_DELETE", query);
      if (!result.response) {
        this.$store.commit("admin/SET_BANNERS", result.data);
        this.onRequest = false;
        this.clearInputs();
        this.showOverlayResponse(
          "The banner  was deleted successful",
          false,
          true,
          false,
          true
        );
      } else {
        console.log(result.response);
      }
    },
  },

  computed: {
    total() {
      return this.$store.state.admin.bannerLength;
    },

    items() {
      return this.$store.state.admin.banners;
    },

    selectedBanners() {
      return this.$store.state.admin.selectedBanners;
    },

    FILE_URL() {
      return this.$store.state.admin.fileURL;
    },

    isAllChecked() {
      return this.$store.state.admin.isBannerChecked;
    },

    user() {
      return this.$store.state.auth.user;
    },
  },
};
</script>

<style></style>
