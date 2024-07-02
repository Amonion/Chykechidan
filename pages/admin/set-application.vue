<template>
  <div class="das-main-body">
    <div class="das-body-eader">
      <div>Company</div>
      <div>{{ formattedDate() }}</div>
    </div>
    <div class="das-tb-flow">
      <div class="das-tb">
        <div class="das-tb-ead">
          <div class="das-tb-cell">S/N</div>
          <div class="das-tb-cell _30">Company Name</div>
          <div class="das-tb-cell _30">Compan Domain</div>
          <div class="das-tb-cell _30">System Email</div>
          <div class="das-tb-cell _30">Phone Number</div>
        </div>
        <div
          class="das-tb-body"
          v-for="(item, int) in items"
          :key="item.id"
          :class="{ even: int % 2 == 0 }"
        >
          <div class="das-tb-cell">
            <div>{{ int + 1 }}</div>
            <div
              class="das-tb-ceck"
              @click="toggleCompany(int)"
              :class="{ active: item.checked }"
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
          <div class="das-tb-cell _30">{{ item.companyName }}</div>
          <div class="das-tb-cell _30">{{ item.companyDomain }}</div>
          <div class="das-tb-cell _30">{{ item.systemEmail }}</div>
          <div class="das-tb-cell _30">{{ item.companyPhone }}</div>
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
        @click="prepareEditCompany()"
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
          <div class="from-rid-label">Company Name</div>
          <input
            class="from-rid-input w-input"
            v-model="companyName"
            placeholder="Enter Company Name"
            type="text"
          />
        </div>
        <div class="eac-form-input">
          <div class="from-rid-label">Company Domain</div>
          <input
            class="from-rid-input w-input"
            v-model="companyDomain"
            placeholder="Enter Company Domain"
            type="text"
          />
        </div>
        <div class="eac-form-input">
          <div class="from-rid-label">System Email</div>
          <input
            class="from-rid-input w-input"
            v-model="systemEmail"
            placeholder="Enter System Email"
            type="text"
          />
        </div>
        <div class="eac-form-input">
          <div class="from-rid-label">Phone Number</div>
          <input
            class="from-rid-input w-input"
            v-model="companyPhone"
            placeholder="Enter Phone Number"
            type="text"
          />
        </div>
        <div class="eac-form-input">
          <div class="from-rid-label">Address</div>
          <input
            class="from-rid-input w-input"
            v-model="companyAddress"
            placeholder="Enter title"
            type="text"
            id="title-2"
            required=""
          />
        </div>
        <div class="eac-form-input">
          <div class="from-rid-label">Bank Name</div>
          <input
            class="from-rid-input w-input"
            v-model="companyBank"
            placeholder="Enter Company Bank"
            type="text"
          />
        </div>
        <div class="eac-form-input">
          <div class="from-rid-label">Account Name</div>
          <input
            class="from-rid-input w-input"
            v-model="companyAccountName"
            placeholder="Enter Account Name"
            type="text"
          />
        </div>
        <div class="eac-form-input">
          <div class="from-rid-label">Account Number</div>
          <input
            class="from-rid-input w-input"
            v-model="companyAccountNumber"
            placeholder="Enter Account Number"
            type="text"
          />
        </div>
        <div class="eac-form-input">
          <div class="from-rid-label">Customers</div>
          <input
            class="from-rid-input w-input"
            v-model="customers"
            placeholder="Enter Customers"
            type="number"
          />
        </div>
        <div class="eac-form-input">
          <div class="from-rid-label">Days Online</div>
          <input
            class="from-rid-input w-input"
            v-model="days"
            placeholder="Enter Days"
            type="number"
          />
        </div>
        <div class="eac-form-input">
          <div class="from-rid-label">Products</div>
          <input
            class="from-rid-input w-input"
            v-model="products"
            placeholder="Enter Products"
            type="number"
          />
        </div>
        <div class="eac-form-input">
          <div class="from-rid-label">Partners</div>
          <input
            class="from-rid-input w-input"
            v-model="partners"
            placeholder="Enter Partners"
            type="number"
          />
        </div>
      </div>

      <div
        v-if="showResponse"
        class="das-response error"
        :class="{ error: isError }"
      >
        {{ response }}
      </div>

      <div class="payment-description">
        <div
          class="das-tb-ceck"
          @click="toggleStock"
          :class="{ active: takeStock }"
        >
          <img
            src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665805ea25eaee8db62cce44_check.svg"
            loading="lazy"
            alt=""
            class="das-tb-icon"
            :class="{ active: takeStock }"
          />
        </div>
      </div>
      <div class="form-btn-roups">
        <div v-if="onRequest" class="overlay-btn pad">
          <img
            src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6656d0a87fa1d0b4305d0a2b_spinner.svg"
            loading="lazy"
            alt=""
            class="form-btn-icon"
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
        <div v-else @click="processData" class="overlay-btn pad">Submit</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "admin",

  data() {
    return {
      companyName: "",
      companyDomain: "",
      announcements: [],
      announcement: "",
      companyBank: "",
      companyAccountName: "",
      companyAccountNumber: "",
      systemEmail: "",
      companyPhone: "",
      companyAddress: "",
      referralPercentage: 0,
      takeStock: false,

      customers: "",
      products: "",
      days: "",
      partners: "",

      isEditing: false,
      editingId: "",
      editingIndex: "",

      response: "",
      isError: false,
      showResponse: false,
      onRequest: false,
      showEditor: false,
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
      this.companyName = "";
      this.companyPhone = "";
      this.companyAddress = "";
      this.companyDomain = "";
      this.companyBank = "";
      this.companyAccountName = "";
      this.companyAccountNumber = "";
      this.customers = "";
      this.days = "";
      this.products = "";
      this.partners = "";
      this.announcements = [];
      this.referralPercentage = 0;
      this.systemEmail = "";
      this.takeStock = false;

      this.editingId = "";
    },

    toggleStock() {
      this.takeStock = !this.takeStock;
    },

    getAnnouncement(data) {
      return [];
      if (!Array.isArray(data)) {
        return [];
      } else {
        return JSON.parse(data);
      }
    },

    addAnnouncement() {
      this.announcements.push(this.announcement);
      this.announcement = "";
    },

    showAlertBox(msg, status) {
      this.$store.commit("SHOW_ALERT_BOX", { msg, status });
    },

    toggleCompany(int) {
      this.$store.commit("admin/TOGGLE_COMPANY", int);
    },

    prepareEditCompany() {
      const newCompany = JSON.parse(JSON.stringify(this.items[0]));
      this.editingId = newCompany.id;

      this.companyName = newCompany.companyName;
      this.companyDomain = newCompany.companyDomain;
      this.companyBank = newCompany.companyBank;
      this.companyPhone = newCompany.companyPhone;
      this.companyAddress = newCompany.companyAddress;
      this.companyAccountName = newCompany.companyAccountName;
      this.companyAccountNumber = newCompany.companyAccountNumber;
      this.announcements = newCompany.announcements;
      this.systemEmail = newCompany.systemEmail;
      this.takeStock = newCompany.takeStock;
      this.customers = newCompany.customers;
      this.products = newCompany.products;
      this.partners = newCompany.partners;
      this.days = newCompany.days;
    },

    checkResponse(response) {
      if (response.status === 200) {
        this.showAlertBox("The company is saved successfully", false);
        this.clearInputs();
      } else {
        this.showResponseMsg(response.response.data.message, true);
      }
      this.onRequest = false;
    },

    async processData() {
      const form = {
        companyName: this.companyName,
        companyDomain: this.companyDomain,
        companyBank: this.companyBank,
        companyPhone: this.companyPhone,
        companyAddress: this.companyAddress,
        companyAccountName: this.companyAccountName,
        companyAccountNumber: this.companyAccountNumber,
        customers: this.customers,
        products: this.products,
        days: this.days,
        partners: this.partners,
        takeStock: this.takeStock,
        systemEmail: this.systemEmail,
        referralPercentage: this.referralPercentage,
        announcements: JSON.stringify(this.announcements),
      };

      this.onRequest = true;
      const payload = {
        form: form,
        url: `/company/?id=${this.editingId}`,
      };
      const result = await this.$store.dispatch("MAKE_POST", payload);
      this.handResponse(result);
    },

    async resetCompany() {
      // try {
      //   const result = await this.$axios.post("/company/reset");
      //   console.log(result);
      //   this.showResponseMsg(result.data.message, false);
      // } catch (err) {
      //   console.log(err.response);
      //   this.showResponseMsg(err.response.data.message, true);
      // }
    },

    handResponse(result) {
      this.onRequest = false;
      if (!result.response) {
        this.$store.commit("admin/SET_COMPANY", result.data);
        this.clearInputs();
      } else {
        this.showResponseMsg(result.response.data, true);
      }
    },
  },

  computed: {
    items() {
      return this.$store.state.admin.company;
    },

    user() {
      this.$store.state.auth.user;
    },
  },
};
</script>

<style></style>
