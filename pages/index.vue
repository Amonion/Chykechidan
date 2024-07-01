<template>
  <div>
    <hero-slider />

    <div v-if="about" class="pro-section">
      <div class="custom-container">
        <div class="pro-flex">
          <div class="pro-left">
            <div v-if="about[0]" class="about-pix-top">
              <img
                :src="`${FILE_URL}/${about[0].media}`"
                loading="lazy"
                alt=""
                class="responsive-pix"
              />
            </div>
            <div v-if="about[0]" class="pix-mid">
              <img
                :src="`${FILE_URL}/${about[1].media}`"
                loading="lazy"
                alt=""
                class="responsive-pix"
              />
            </div>
            <div class="years-box">
              <div class="year-flex">
                <div class="years-number">08</div>
                <div class="years-plus">+</div>
              </div>
              <div class="years-text">YEARS EXPERIENCED<br /></div>
            </div>
          </div>
          <div class="pro-rit">
            <div class="ab-intro">// WHO WE ARE</div>
            <div class="ab-title" v-if="about[0]">
              {{ about[0].title }} <br />
            </div>
            <div
              class="ab-subtitle"
              v-if="about[0]"
              v-html="about[0].content"
            ></div>
            <br />

            <div v-if="about[1]" class="one-module">
              <div class="modus-title">01. OUR CULTURE<br /></div>
              <div class="modus-flex">
                <div class="modus-box">
                  <img
                    src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6627d93fe2360afa56060469_energy-green-icon%201.svg"
                    loading="lazy"
                    alt=""
                    class="modus-icon"
                  />
                </div>
                <div class="modus-rit">
                  <div class="modus-text">{{ about[1].title }} <br /></div>
                  <NuxtLink to="/about" class="custom-btn trans w-inline-block"
                    ><img
                      src="/images/arrow-red.svg"
                      loading="lazy"
                      alt=""
                      class="btn-icon"
                    />
                    <div>Read More</div></NuxtLink
                  >
                </div>
              </div>
            </div>
            <div v-if="about[1]" class="one-module">
              <div class="modus-title">02. OUR PRODUCTIVITY<br /></div>
              <div class="modus-flex">
                <div class="modus-box">
                  <img
                    src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6627d93fce419d11a83f03f9_panel-solar-icon%201.svg"
                    loading="lazy"
                    alt=""
                    class="modus-icon"
                  />
                </div>
                <div class="modus-rit">
                  <div class="modus-text">{{ about[1].subtitle }} <br /></div>
                  <NuxtLink to="/about" class="custom-btn trans w-inline-block"
                    ><img
                      src="/images/arrow-red.svg"
                      loading="lazy"
                      alt=""
                      class="btn-icon"
                    />
                    <div>Read More</div></NuxtLink
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="ome-service">
      <div class="custom-container">
        <div class="ome-service-flex">
          <div class="ome-service-intro">// SERVICE AREAS \\</div>
          <div class="ome-service-title">
            QUICK FOOD STUFFS DISTRIBUTION SERVICES<br />
          </div>
          <div class="rit-title widt">
            Partnering with Chyke Chidan Enterprise is simple and
            straightforward. Here’s how you can start benefiting from our
            wholesale rice distribution service
          </div>
          <div v-if="services" class="w-layout-grid service-rid">
            <div
              v-for="item in services"
              :key="item.id"
              class="eac-service-ome"
            >
              <div class="eac-service-top">
                <img
                  src="/Icon.png"
                  loading="lazy"
                  alt=""
                  class="serice-rid-icon"
                />
                <NuxtLink
                  :to="`/blog-details/?id=${item.id}`"
                  class="service-title active"
                  >{{ item.title }}
                </NuxtLink>
                <div class="service-subtitle">
                  {{ item.subtitle }}
                </div>
                <NuxtLink
                  :to="`/blog-details/?id=${item.id}`"
                  class="service-read-more w-inline-block"
                  ><img
                    src="/images/arrow-red.svg"
                    loading="lazy"
                    alt=""
                    class="read-icon"
                  />
                  <div>More</div></NuxtLink
                >
              </div>
              <div class="service-rid-pix">
                <img
                  :src="`${FILE_URL}/${item.banner}`"
                  loading="lazy"
                  alt=""
                  class="responsive-pix"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="maintenance">
      <div class="custom-container">
        <div class="mentainance-flex">
          <div class="mentainance-top">
            <div>
              <div class="maintenance-intro">// Quality</div>
              <div class="mentainance-title">CHYKE CHIDAN PRODUCTS<br /></div>
            </div>
            <div class="mentainance-rit">
              At Chyke Chidan Enterprise, we understand that the secret to
              delicious meals often lies in the ingredients.
              <br />
            </div>
          </div>
          <div class="w-layout-grid maintenance-rid">
            <div
              class="eac-maintenance"
              v-for="(item, int) in products"
              :key="item.id"
              @mouseenter="setProd(int)"
              @mouseleave="unsetProd()"
            >
              <div class="maintenance-cover">
                <NuxtLink
                  :to="`/blog-details/?id=${item.id}`"
                  class="service-read-more wite w-inline-block"
                  ><img
                    src="/images/arrow-red.svg"
                    loading="lazy"
                    alt=""
                    class="read-icon"
                  />
                  <div>More</div></NuxtLink
                ><img
                  src="/Icon.png"
                  loading="lazy"
                  alt=""
                  class="maintenance-icon"
                />
                <div class="maintenance-title">
                  {{ item.title }}
                </div>
              </div>
              <img
                :src="`${FILE_URL}/${item.banner}`"
                loading="lazy"
                alt=""
                class="responsive-pix"
              />
              <div :class="{ active: prod == int }" class="maint-overlay">
                <div class="border-overlay">
                  <NuxtLink
                    :to="`/blog-details/?id=${item.id}`"
                    class="maint-overly-title"
                  >
                    {{ item.title }}
                  </NuxtLink>
                  <div class="maint-overlay-text">
                    {{ item.subtitle }}
                    <br />
                  </div>
                  <NuxtLink
                    :to="`/blog-details/?id=${item.id}`"
                    class="service-read-more reen w-inline-block"
                    ><img
                      src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6627ced1b84d6af368e52e15_arrow-forward.svg"
                      loading="lazy"
                      alt=""
                      class="read-icon bi"
                    />
                    <div>More</div></NuxtLink
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="ome-stats">
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
            <div class="ome-title">242</div>
            <div class="small-title">PROJECTS COMPLETED<br /></div>
            <div class="stat-circle bi">
              <div class="stat-circle abs active"></div>
              <div class="stat-circle">
                <img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664dc24f02566668e7024952_renewable-energy-solar-icon.svg"
                  loading="lazy"
                  alt=""
                  class="stat-icon"
                />
              </div>
            </div>
          </div>
          <div class="eac-stats">
            <div class="ome-title">242</div>
            <div class="small-title">PROJECTS COMPLETED<br /></div>
            <div class="stat-circle bi">
              <div class="stat-circle abs active"></div>
              <div class="stat-circle">
                <img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664dc24f02566668e7024952_renewable-energy-solar-icon.svg"
                  loading="lazy"
                  alt=""
                  class="stat-icon"
                />
              </div>
            </div>
          </div>
          <div class="eac-stats">
            <div class="ome-title">242</div>
            <div class="small-title">PROJECTS COMPLETED<br /></div>
            <div class="stat-circle bi">
              <div class="stat-circle abs active"></div>
              <div class="stat-circle">
                <img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664dc24f02566668e7024952_renewable-energy-solar-icon.svg"
                  loading="lazy"
                  alt=""
                  class="stat-icon"
                />
              </div>
            </div>
          </div>
          <div class="eac-stats">
            <div class="ome-title">242</div>
            <div class="small-title">PROJECTS COMPLETED<br /></div>
            <div class="stat-circle bi">
              <div class="stat-circle abs active"></div>
              <div class="stat-circle">
                <img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664dc24f02566668e7024952_renewable-energy-solar-icon.svg"
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

    <div class="process">
      <div class="custom-container">
        <div class="process-flex">
          <div class="process-title-left">
            <div class="title-sm">// WORKING PROCESS</div>
            <div class="ome-title sm">4 WAYS TO ACHIVE RESULTS<br /></div>
          </div>
          <div class="process-title-rit">
            <div class="rit-title">
              We are following these processes to maintain our working process
              and also for better outcomes.<br />
            </div>
          </div>
          <div class="eac-process">
            <div class="pro-step">STEP</div>
            <div class="process-arrow-flex">
              <div>01...</div>
              <img
                src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664ebb2b8380e37beb92fed8_arrow-down.svg"
                loading="lazy"
                alt=""
                class="process-arrow"
              />
            </div>
            <div class="process-title">CONSULT WITH US</div>
            <div class="process-text">
              Our engineers have extensive knowledge and design any system from
              start to finish.<br />
            </div>
          </div>
          <div class="eac-process">
            <div class="pro-step">STEP</div>
            <div class="process-arrow-flex">
              <div>02...</div>
              <img
                src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664eb9dff7886de88410cfb6_arrow.svg"
                loading="lazy"
                alt=""
                class="process-arrow"
              />
            </div>
            <div class="process-title">GENREATE POWER</div>
            <div class="process-text">
              We generate Power by using non pollution equipment such as
              turbines, water, steam.<br />
            </div>
          </div>
          <div class="eac-process">
            <div class="pro-step">STEP</div>
            <div class="process-arrow-flex">
              <div>03...</div>
              <img
                src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664ebb2b8380e37beb92fed8_arrow-down.svg"
                loading="lazy"
                alt=""
                class="process-arrow"
              />
            </div>
            <div class="process-title">STORE THE POWER</div>
            <div class="process-text">
              Energo stores the power for the future to handle any kind of
              disaster that may happen or not.<br />
            </div>
          </div>
          <div class="eac-process">
            <div class="pro-step">STEP</div>
            <div class="process-arrow-flex">
              <div>04...</div>
              <img
                src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664eb9dff7886de88410cfb6_arrow.svg"
                loading="lazy"
                alt=""
                class="process-arrow"
              />
            </div>
            <div class="process-title">USE IT FLEXIBLY</div>
            <div class="process-text">
              You can use our Energo product so easily and it is easy to move
              and replace guarantees.<br />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="boss">
      <img
        src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664ed3e5a237ae4bb7f35dc6_layerb1.svg"
        loading="lazy"
        alt=""
        class="responsive-pix"
      /><img
        src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664ed31ac437d16bd7d79c98_wind-1.png"
        loading="lazy"
        sizes="(max-width: 1439px) 100vw, 1385.5250244140625px"
        srcset="
          https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664ed31ac437d16bd7d79c98_wind-1-p-500.png 500w,
          https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664ed31ac437d16bd7d79c98_wind-1.png       584w
        "
        alt=""
        class="boss-solar"
      /><img
        src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664ed98a33e60f43e377283e_boss.png"
        loading="lazy"
        sizes="100vw"
        srcset="
          https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664ed98a33e60f43e377283e_boss-p-500.png 500w,
          https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664ed98a33e60f43e377283e_boss.png       644w
        "
        alt=""
        class="boss-im"
      /><img
        src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664ed31a178062a343b3d6a6_shape-2.png"
        loading="lazy"
        sizes="100vw"
        srcset="
          https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664ed31a178062a343b3d6a6_shape-2-p-500.png   500w,
          https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664ed31a178062a343b3d6a6_shape-2-p-800.png   800w,
          https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664ed31a178062a343b3d6a6_shape-2-p-1080.png 1080w,
          https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664ed31a178062a343b3d6a6_shape-2-p-1600.png 1600w,
          https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664ed31a178062a343b3d6a6_shape-2.png        1920w
        "
        alt=""
        class="responsive-pix _0"
      />
      <div class="custom-container">
        <div class="boss-flex">
          <div class="boss-rit">
            <div class="title-sm">// COMPANY STATISTICS</div>
            <div class="ome-title sm lit">
              FOR OVER 08 YEARS IN<br />THE BUSINESS
            </div>
            <div class="rit-title lit">
              Our power of choice is untrammelled and when nothing prevents us
              from being able to do what we like best, every pleasure is to be
              welcomed and every pain avoided in certain circumstances.<br />
            </div>
            <div class="boss-stats">
              <div class="dis-box"><div>62%</div></div>
              <div class="boss-stat-wrap">
                <div>SOLAR ENERGY<br /></div>
                <div class="stat-bar"></div>
              </div>
            </div>
            <div class="boss-stats">
              <div class="dis-box"><div>62%</div></div>
              <div class="boss-stat-wrap">
                <div>SOLAR ENERGY<br /></div>
                <div class="stat-bar"></div>
              </div>
            </div>
            <div class="boss-stats">
              <div class="dis-box"><div>62%</div></div>
              <div class="boss-stat-wrap">
                <div>SOLAR ENERGY<br /></div>
                <div class="stat-bar"></div>
              </div>
            </div>
            <div class="boss-stats">
              <div class="dis-box"><div>62%</div></div>
              <div class="boss-stat-wrap">
                <div>SOLAR ENERGY<br /></div>
                <div class="stat-bar"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="staffs">
      <div class="custom-container">
        <div class="staffs-flex">
          <div class="process-title-left">
            <div class="title-sm">// WORKING PROCESS</div>
            <div class="ome-title sm">TEAM BEHIND OUR SUCCESS<br /></div>
          </div>
          <div class="process-title-rit">
            <div class="rit-title">
              We are following these processes to maintain our working process
              and also for better outcomes.<br />
            </div>
          </div>
          <div class="w-layout-grid staff-rid">
            <div class="eac-staff-rid">
              <div
                id="w-node-_5dc38d1b-ea24-430d-381a-0f69cfb74d8f-7a51b666"
                class="rid-color active"
              ></div>
              <div
                id="w-node-_45dd9f45-b237-e295-6441-7b0c57cfbd3a-7a51b666"
                class="rid-pix-older"
              >
                <img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664f74d199c5069d1a2f8cb6_team-1.jpg"
                  loading="lazy"
                  alt=""
                  class="responsive-pix"
                />
                <div class="site-socials active">
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
                  <div class="staff-name">MARC KENNETH</div>
                  <div class="title-sm rem">SENIOR VP</div>
                </div>
              </div>
            </div>
            <div
              id="w-node-_95c3852b-9e9c-6918-0d3e-829d0e3f2cb0-7a51b666"
              class="eac-staff-rid"
            >
              <div
                id="w-node-_95c3852b-9e9c-6918-0d3e-829d0e3f2cb1-7a51b666"
                class="rid-color"
              ></div>
              <div
                id="w-node-_95c3852b-9e9c-6918-0d3e-829d0e3f2cb2-7a51b666"
                class="rid-pix-older"
              >
                <img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664f74d168df473770ff61df_team-3.jpg"
                  loading="lazy"
                  alt=""
                  class="responsive-pix"
                />
                <div class="site-socials">
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
                  <div class="staff-name">MARC KENNETH</div>
                  <div class="title-sm rem">SENIOR VP</div>
                </div>
              </div>
            </div>
            <div
              id="w-node-_992d466a-db33-e869-6a1d-58907ee426c6-7a51b666"
              class="eac-staff-rid"
            >
              <div
                id="w-node-_992d466a-db33-e869-6a1d-58907ee426c7-7a51b666"
                class="rid-color"
              ></div>
              <div
                id="w-node-_992d466a-db33-e869-6a1d-58907ee426c8-7a51b666"
                class="rid-pix-older"
              >
                <img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664f74d260b27de6797cca7e_team-2.jpg"
                  loading="lazy"
                  alt=""
                  class="responsive-pix"
                />
                <div class="site-socials">
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
                  <div class="staff-name">MARC KENNETH</div>
                  <div class="title-sm rem">SENIOR VP</div>
                </div>
              </div>
            </div>
            <div
              id="w-node-a6227dc7-ea9d-90a8-0254-1c1f644da933-7a51b666"
              class="eac-staff-rid"
            >
              <div
                id="w-node-a6227dc7-ea9d-90a8-0254-1c1f644da934-7a51b666"
                class="rid-color"
              ></div>
              <div
                id="w-node-a6227dc7-ea9d-90a8-0254-1c1f644da935-7a51b666"
                class="rid-pix-older"
              >
                <img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664f74d260b27de6797cca7e_team-2.jpg"
                  loading="lazy"
                  alt=""
                  class="responsive-pix"
                />
                <div class="site-socials">
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
                  <div class="staff-name">MARC KENNETH</div>
                  <div class="title-sm rem">SENIOR VP</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <testimonial />

    <div class="ome-blo">
      <div class="custom-container">
        <div class="custom-flex">
          <div class="process-title-left">
            <div class="title-sm">// WORKING PROCESS</div>
            <div class="ome-title sm">TEAM BEHIND OUR SUCCESS<br /></div>
          </div>
          <div class="process-title-rit">
            <div class="rit-title">
              We are following these processes to maintain our working process
              and also for better outcomes.<br />
            </div>
          </div>
          <div class="ome-blo-flex">
            <div class="eac-blo active">
              <div class="ome-blo-date">Sep 21, 2024</div>
              <div class="ome-blo-details">
                <img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664f85c52560a1b333396e44_comments.svg"
                  loading="lazy"
                  alt=""
                  class="ome-blo-icon"
                />
                <div class="blo-det-text">Comments</div>
                <img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664f85c596459c05bef09943_user-alt.svg"
                  loading="lazy"
                  alt=""
                  class="ome-blo-icon"
                />
                <div class="blo-det-text">Admin</div>
              </div>
              <a href="#" class="ome-blo-title active"
                >ENERGO IMPROVES A LEADING ONSHORE TURBINE TO INCREASE
                ELECTRICITY OUTPUT</a
              >
              <div class="blo-pix">
                <img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664f87a8ce6c3760bfdfc48f_news-1.jpg"
                  loading="lazy"
                  alt=""
                  class="responsive-pix"
                />
                <div class="cover active"></div>
              </div>
              <a href="#" class="ome-read-more w-inline-block"
                ><img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664f89750919596a347c0ba5_arrow-right.svg"
                  loading="lazy"
                  alt=""
                  class="read-blo-icon"
                />
                <div>Read More</div></a
              >
            </div>
            <div class="eac-blo">
              <div class="ome-blo-date">Sep 21, 2024</div>
              <div class="ome-blo-details">
                <img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664f85c52560a1b333396e44_comments.svg"
                  loading="lazy"
                  alt=""
                  class="ome-blo-icon"
                />
                <div class="blo-det-text">Comments</div>
                <img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664f85c596459c05bef09943_user-alt.svg"
                  loading="lazy"
                  alt=""
                  class="ome-blo-icon"
                />
                <div class="blo-det-text">Admin</div>
              </div>
              <a href="#" class="ome-blo-title"
                >ENERGO IMPROVES A LEADING ONSHORE TURBINE TO INCREASE
                ELECTRICITY OUTPUT</a
              >
              <div class="blo-pix">
                <img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664f87a84cea4f55b7103f0d_news-3.jpg"
                  loading="lazy"
                  alt=""
                  class="responsive-pix"
                />
                <div class="cover active"></div>
              </div>
              <a href="#" class="ome-read-more w-inline-block"
                ><img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664f89750919596a347c0ba5_arrow-right.svg"
                  loading="lazy"
                  alt=""
                  class="read-blo-icon"
                />
                <div>Read More</div></a
              >
            </div>
            <div class="eac-blo">
              <div class="ome-blo-date">Sep 21, 2024</div>
              <div class="ome-blo-details">
                <img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664f85c52560a1b333396e44_comments.svg"
                  loading="lazy"
                  alt=""
                  class="ome-blo-icon"
                />
                <div class="blo-det-text">Comments</div>
                <img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664f85c596459c05bef09943_user-alt.svg"
                  loading="lazy"
                  alt=""
                  class="ome-blo-icon"
                />
                <div class="blo-det-text">Admin</div>
              </div>
              <a href="#" class="ome-blo-title"
                >ENERGO IMPROVES A LEADING ONSHORE TURBINE TO INCREASE
                ELECTRICITY OUTPUT</a
              >
              <div class="blo-pix">
                <img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664f87a9c814b40b06b01f2e_news-2.jpg"
                  loading="lazy"
                  alt=""
                  class="responsive-pix"
                />
                <div class="cover active"></div>
              </div>
              <a href="#" class="ome-read-more w-inline-block"
                ><img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664f89750919596a347c0ba5_arrow-right.svg"
                  loading="lazy"
                  alt=""
                  class="read-blo-icon"
                />
                <div>Read More</div></a
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="ome-subscribe">
      <img
        src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665011ca79044631aa660dda_subscribe-bg.jpg"
        loading="lazy"
        sizes="100vw"
        srcset="
          https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665011ca79044631aa660dda_subscribe-bg-p-500.jpg   500w,
          https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665011ca79044631aa660dda_subscribe-bg-p-800.jpg   800w,
          https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665011ca79044631aa660dda_subscribe-bg-p-1080.jpg 1080w,
          https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665011ca79044631aa660dda_subscribe-bg-p-1600.jpg 1600w,
          https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665011ca79044631aa660dda_subscribe-bg.jpg        1920w
        "
        alt=""
        class="responsive-pix"
      />
      <div class="sub-cover"></div>
      <div class="custom-container">
        <div class="w-form">
          <div class="custom-flex sub">
            <img
              src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/6650182a25662ce3559c7a46_icon-14.png"
              loading="lazy"
              alt=""
              class="sub-icon-top"
            />
            <div class="ome-title sm">SUBSCRIBE OUR NEWSLETTER<br /></div>
            <div class="rit-title lit widt">
              Subscribe our newsletter and get latest news, updatesto your inbox
              directly.<br />
            </div>
            <div class="sub-older">
              <div class="sub-input-older">
                <input
                  class="sub-input w-input"
                  maxlength="256"
                  name="email"
                  data-name="Email"
                  placeholder="Your Name"
                  type="text"
                  id="email"
                  required=""
                /><img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/664f85c596459c05bef09943_user-alt.svg"
                  loading="lazy"
                  alt=""
                  class="sub-icon"
                />
              </div>
              <div class="sub-input-older">
                <input
                  class="sub-input w-input"
                  maxlength="256"
                  name="email"
                  data-name="email"
                  placeholder="Your Email"
                  type="email"
                  id="email-3"
                  required=""
                /><img
                  src="https://cdn.prod.website-files.com/6625e0ead22d28967a51b65f/665016897d66616f010b8d7d_envelope.svg"
                  loading="lazy"
                  alt=""
                  class="sub-icon"
                />
              </div>
              <div class="sub-input-older btn"><div>Subscribe</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeroSlider from "../components/HeroSlider.vue";
import Testimonial from "../components/Testimonial.vue";
export default {
  components: { HeroSlider, Testimonial },
  layout: "home",
  data() {
    return {
      prod: 10,
    };
  },
  methods: {
    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
      }
      return text;
    },

    numberWithCommas(number) {
      return number.toLocaleString("en-US", { maximumFractionDigits: 2 });
    },

    setProd(int) {
      this.prod = int;
    },

    unsetProd() {
      this.prod = 10;
    },

    formatDateToDD(dateString) {
      const options = { day: "2-digit" };
      const date = new Date(dateString);
      const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
        date
      );
      return formattedDate;
    },
    formatDateToMon(dateString) {
      const options = { month: "short" };
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

    topBlogs() {
      const items = this.$store.state.blogs;
      const blogs = [];
      for (let i = 0; i < items.length; i++) {
        const el = items[i];
        if (el.category == "TopBlog") {
          blogs.push(el);
        }
      }
      return blogs;
    },

    services() {
      const items = this.$store.state.blogs;
      const blogs = [];
      for (let i = 0; i < items.length; i++) {
        const el = items[i];
        if (el.type == "Services") {
          blogs.push(el);
        }
      }
      return blogs;
    },

    products() {
      const items = this.$store.state.blogs;
      const blogs = [];
      for (let i = 0; i < items.length; i++) {
        const el = items[i];
        if (el.type == "Products") {
          blogs.push(el);
        }
      }
      return blogs;
    },

    currencies() {
      return this.$store.state.currencies;
    },
  },
};
</script>

<style>
a.first-link-header {
  text-decoration: none;
  color: black;
}

.cover {
  background-color: rgba(255, 111, 0, 0.151);
}
</style>
