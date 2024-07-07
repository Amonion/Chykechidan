<template>
  <div class="staffs">
    <div class="custom-container">
      <div class="staffs-flex">
        <div class="process-title-left">
          <div class="title-sm">// WONDERFUL STAFF</div>
          <div class="ome-title sm">TEAM BEHIND OUR SUCCESS<br /></div>
        </div>
        <div class="process-title-rit">
          <div class="rit-title">
            Meat our wonderful staff of Chyke Chidan who are working very smart
            and efficient to make available our services to your reach
            <br />
          </div>
        </div>
        <div class="w-layout-grid staff-rid">
          <div
            @mouseenter="activateStaff(int)"
            @mouseleave="deactivateStaff"
            v-for="(item, int) in staffs"
            :key="int"
            class="eac-staff-rid"
          >
            <div class="rid-color" :class="{ active: int == staf }"></div>
            <div class="rid-pix-older">
              <img
                :src="`${FILE_URL}/${item.image}`"
                loading="lazy"
                alt=""
                class="responsive-pix"
              />
              <div :class="{ active: int == staf }" class="site-socials">
                <a href="#" class="dis-box bot w-inline-block"
                  ><img
                    src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/662685c168d98f8cc52fcd76_facebook-app-round-icon%201.svg"
                    loading="lazy"
                    alt=""
                    class="dis-box-icon" /></a
                ><a href="#" class="dis-box bot w-inline-block"
                  ><img
                    src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/662685c168d98f8cc52fcd76_facebook-app-round-icon%201.svg"
                    loading="lazy"
                    alt=""
                    class="dis-box-icon" /></a
                ><a href="#" class="dis-box w-inline-block"
                  ><img
                    src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/662685c168d98f8cc52fcd76_facebook-app-round-icon%201.svg"
                    loading="lazy"
                    alt=""
                    class="dis-box-icon"
                /></a>
              </div>
              <div class="staff-name-older">
                <div class="staff-name">{{ item.username }}</div>
                <div class="title-sm rem">{{ item.position }}</div>
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
  data() {
    return {
      staf: -1,
    };
  },
  methods: {
    activateStaff(int) {
      this.staf = int;
    },

    deactivateStaff() {
      this.staf = -1;
    },
  },
  computed: {
    FILE_URL() {
      return this.$store.state.fileURL;
    },
    staffs() {
      return this.$store.state.staffs;
    },
  },
};
</script>
