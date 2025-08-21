<template>

      <div class="flex gap-8 flex-col px-8 w-full">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 w-full">
          <div class="p-4 bg-cyan-50 dark:bg-cyan-400/30 rounded-2xl border border-cyan-200 dark:border-cyan-400/20 flex flex-col gap-6">
            <div class="flex justify-between items-start">
              <div class="flex justify-center items-center h-8 w-8 bg-cyan-500 dark:bg-cyan-600 rounded-lg">
                <i class="pi pi-inbox text-surface-0 !text-base !leading-none" />
              </div>
              <span class="text-cyan-700 dark:text-cyan-300 text-sm font-medium leading-tight">11:08, 17 Aug</span>
            </div>
            <div class="flex flex-col gap-2">
              <span class="text-cyan-700 dark:text-cyan-300 font-normal leading-tight">Campaign Alerts</span>
              <div class="text-cyan-900 dark:text-cyan-100 font-medium !text-2xl !leading-tight">123k</div>
            </div>
          </div>

          <div class="p-4 bg-orange-50 dark:bg-orange-400/30 rounded-2xl border border-orange-200 dark:border-orange-400/20 flex flex-col gap-6">
            <div class="flex justify-between items-start">
              <div class="flex justify-center items-center h-8 w-8 bg-orange-500 dark:bg-orange-600 rounded-lg">
                <i class="pi pi-bolt text-surface-0 !text-base !leading-none" />
              </div>
              <span class="text-orange-700 dark:text-orange-300 text-sm font-medium leading-tight">14:15, 18 Aug</span>
            </div>
            <div class="flex flex-col gap-2">
              <span class="text-orange-700 dark:text-orange-300 font-normal leading-tight">System Alerts</span>
              <div class="text-orange-900 dark:text-orange-100 font-medium !text-2xl !leading-tight">89k</div>
            </div>
          </div>

          <div class="p-4 bg-slate-50 dark:bg-slate-400/30 rounded-2xl border border-slate-200 dark:border-slate-400/20 flex flex-col gap-6">
            <div class="flex justify-between items-start">
              <div class="flex justify-center items-center h-8 w-8 bg-slate-500 dark:bg-slate-600 rounded-lg">
                <i class="pi pi-gift text-surface-0 !text-base !leading-none" />
              </div>
              <span class="text-slate-700 dark:text-slate-300 text-sm font-medium leading-tight">09:30, 16 Aug</span>
            </div>
            <div class="flex flex-col gap-2">
              <span class="text-slate-700 dark:text-slate-300 font-normal leading-tight">Promotional Offers</span>
              <div class="text-slate-900 dark:text-slate-100 font-medium !text-2xl !leading-tight">3k</div>
            </div>
          </div>

          <div class="p-4 bg-violet-50 dark:bg-violet-400/30 rounded-2xl border border-violet-200 dark:border-violet-400/20 flex flex-col gap-6">
            <div class="flex justify-between items-start">
              <div class="flex justify-center items-center h-8 w-8 bg-violet-500 dark:bg-violet-600 rounded-lg">
                <i class="pi pi-wave-pulse text-surface-0 !text-base !leading-none" />
              </div>
              <span class="text-violet-700 dark:text-violet-300 text-sm font-medium leading-tight">16:45, 19 Aug</span>
            </div>
            <div class="flex flex-col gap-2">
              <span class="text-violet-700 dark:text-violet-300 font-normal leading-tight">Traffic Distribution</span>
              <div class="text-violet-900 dark:text-violet-100 font-medium !text-2xl !leading-tight">175k</div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 w-full">
          <div class="shadow bg-surface-0 dark:bg-surface-900 rounded-2xl p-8 md:col-span-1 lg:col-span-2">
            <div class="flex items-center justify-between">
              <span class="text-xl font-medium text-surface-900 dark:text-surface-0">Campaign Performance</span>
            </div>
            <div class="mt-8">
              <div class="flex flex-col gap-4">
                <div class="overflow-hidden rounded-xl border border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors duration-200 cursor-pointer">
                  <div class="flex items-stretch">
                    <div class="bg-primary flex items-center justify-center px-4 border-r border-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M8.9445 4.58986C7.99777 3.95728 7 3.07697 7 1.93836V0.5C8.38446 0.5 9.73784 0.910543 10.889 1.67971C12.0401 2.44888 12.9373 3.54213 13.4672 4.82121C13.997 6.10028 14.1356 7.50777 13.8655 8.86563C13.5954 10.2235 12.9287 11.4708 11.9497 12.4497C10.9708 13.4287 9.72349 14.0954 8.36563 14.3655C7.00777 14.6356 5.60028 14.497 4.32121 13.9672C3.04213 13.4373 1.94888 12.5401 1.17971 11.389C0.410543 10.2378 0 8.88446 0 7.5H1.43836C2.57697 7.5 3.45728 8.49777 4.08986 9.4445C4.47444 10.0201 5.02107 10.4687 5.66062 10.7336C6.30014 10.9985 7.00389 11.0678 7.68282 10.9327C8.36175 10.7977 8.98538 10.4644 9.47489 9.97489C9.96436 9.48538 10.2977 8.86175 10.4327 8.18282C10.5678 7.50389 10.4985 6.80014 10.2336 6.16062C9.96867 5.52107 9.52007 4.97444 8.9445 4.58986Z"
                            class="fill-surface-0 dark:fill-surface-900"
                        />
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M3.9375 0.500001C3.69587 0.500001 3.50282 0.696627 3.47269 0.936366C3.43378 1.24606 3.35353 1.54981 3.23358 1.83939C3.05769 2.26403 2.79988 2.64987 2.47487 2.97488C2.14987 3.29988 1.76403 3.55769 1.33939 3.73358C1.04981 3.85353 0.746057 3.93378 0.436365 3.97269C0.196626 4.00282 1.44426e-07 4.19588 1.33864e-07 4.4375L0 7.5C0.919252 7.5 1.8295 7.31895 2.67879 6.96716C3.52807 6.61538 4.29975 6.09976 4.94973 5.44974C5.59975 4.79975 6.11537 4.02807 6.46716 3.17879C6.81894 2.3295 7 1.41925 7 0.5L3.9375 0.500001Z"
                            class="fill-surface-0 dark:fill-surface-900"
                        />
                      </svg>
                    </div>
                    <div class="flex flex-1 items-center justify-between p-4">
                      <div class="flex flex-col gap-2">
                        <div class="text-xl font-medium text-surface-900 dark:text-surface-0">All Traffic</div>
                        <div class="text-base text-surface-900 dark:text-surface-0">1250 Visits</div>
                      </div>
                      <div class="flex gap-4 items-center">
                        <div class="hidden items-end gap-[3px] md:flex">
                          <div class="w-[6px] h-[22px] bg-surface-200 dark:bg-surface-700 rounded-[3.5px]" />
                          <div class="w-[6px] h-[14px] bg-surface-200 dark:bg-surface-700 rounded-[3.5px]" />
                          <div class="w-[6px] h-[19px] bg-surface-200 dark:bg-surface-700 rounded-[3.5px]" />
                          <div class="w-[6px] h-[19px] bg-surface-200 dark:bg-surface-700 rounded-[3.5px]" />
                          <div class="w-[6px] h-[17px] bg-surface-200 dark:bg-surface-700 rounded-[3.5px]" />
                          <div class="w-[6px] h-[24px] bg-primary rounded-[3.5px]" />
                        </div>
                        <i class="pi pi-chevron-right !text-xs !leading-tight text-surface-900 dark:text-surface-0" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div class="overflow-hidden rounded-xl border border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors duration-200 cursor-pointer">
                    <div class="flex items-stretch">
                      <div class="bg-surface-100 dark:bg-surface-800 flex items-center justify-center border-r border-surface-200 dark:border-surface-700 px-4">
                        <i class="pi pi-instagram !text-base !leading-tight text-surface-900 dark:text-surface-0" />
                      </div>
                      <div class="flex flex-1 items-center justify-between p-4">
                        <div class="flex flex-col gap-2">
                          <div class="text-xl font-medium text-surface-900 dark:text-surface-0">Instagram</div>
                          <div class="text-base text-surface-700 dark:text-surface-200">660 Visits</div>
                        </div>
                        <div class="flex gap-4 items-center">
                          <div class="hidden items-end gap-[3px] md:flex">
                            <div class="w-[6px] h-[18px] bg-surface-200 dark:bg-surface-700 rounded-[3.5px]" />
                            <div class="w-[6px] h-[18px] bg-surface-200 dark:bg-surface-700 rounded-[3.5px]" />
                            <div class="w-[6px] h-[12px] bg-surface-200 dark:bg-surface-700 rounded-[3.5px]" />
                            <div class="w-[6px] h-[18px] bg-surface-200 dark:bg-surface-700 rounded-[3.5px]" />
                            <div class="w-[6px] h-[21px] bg-surface-200 dark:bg-surface-700 rounded-[3.5px]" />
                            <div class="w-[6px] h-[15px] bg-primary rounded-[3.5px]" />
                          </div>
                          <i class="pi pi-chevron-right !text-xs !leading-tight text-surface-900 dark:text-surface-0" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="overflow-hidden rounded-xl border border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors duration-200 cursor-pointer">
                    <div class="flex items-stretch">
                      <div class="bg-surface-100 dark:bg-surface-800 flex items-center justify-center border-r border-surface-200 dark:border-surface-700 px-4">
                        <i class="pi pi-linkedin !text-base !leading-tight text-surface-900 dark:text-surface-0" />
                      </div>
                      <div class="flex flex-1 items-center justify-between p-4">
                        <div class="flex flex-col gap-2">
                          <div class="text-xl font-medium text-surface-900 dark:text-surface-0">Linkedin</div>
                          <div class="text-base text-surface-700 dark:text-surface-200">733 Visits</div>
                        </div>
                        <div class="flex gap-4 items-center">
                          <div class="hidden items-end gap-[3px] md:flex">
                            <div class="w-[6px] h-[12px] bg-surface-200 dark:bg-surface-700 rounded-[3.5px]" />
                            <div class="w-[6px] h-[16px] bg-surface-200 dark:bg-surface-700 rounded-[3.5px]" />
                            <div class="w-[6px] h-[20px] bg-surface-200 dark:bg-surface-700 rounded-[3.5px]" />
                            <div class="w-[6px] h-[10px] bg-surface-200 dark:bg-surface-700 rounded-[3.5px]" />
                            <div class="w-[6px] h-[12px] bg-surface-200 dark:bg-surface-700 rounded-[3.5px]" />
                            <div class="w-[6px] h-[10px] bg-primary rounded-[3.5px]" />
                          </div>
                          <i class="pi pi-chevron-right !text-xs !leading-tight text-surface-900 dark:text-surface-0" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="overflow-hidden rounded-xl border border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors duration-200 cursor-pointer">
                    <div class="flex items-stretch">
                      <div class="bg-surface-100 dark:bg-surface-800 flex items-center justify-center border-r border-surface-200 dark:border-surface-700 px-4">
                        <i class="pi pi-google !text-base !leading-tight text-surface-900 dark:text-surface-0" />
                      </div>
                      <div class="flex flex-1 items-center justify-between p-4">
                        <div class="flex flex-col gap-2">
                          <div class="text-xl font-medium text-surface-900 dark:text-surface-0">Google</div>
                          <div class="text-base text-surface-700 dark:text-surface-200">817 Visits</div>
                        </div>
                        <div class="flex gap-4 items-center">
                          <div class="hidden items-end gap-[3px] md:flex">
                            <div class="w-[6px] h-[17px] bg-surface-200 dark:bg-surface-700 rounded-[3.5px]" />
                            <div class="w-[6px] h-[9px] bg-surface-200 dark:bg-surface-700 rounded-[3.5px]" />
                            <div class="w-[6px] h-[14px] bg-surface-200 dark:bg-surface-700 rounded-[3.5px]" />
                            <div class="w-[6px] h-[12px] bg-surface-200 dark:bg-surface-700 rounded-[3.5px]" />
                            <div class="w-[6px] h-[14px] bg-surface-200 dark:bg-surface-700 rounded-[3.5px]" />
                            <div class="w-[6px] h-[21px] bg-primary rounded-[3.5px]" />
                          </div>
                          <i class="pi pi-chevron-right !text-xs !leading-tight text-surface-900 dark:text-surface-0" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="overflow-hidden rounded-xl border border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors duration-200 cursor-pointer">
                    <div class="flex items-stretch">
                      <div class="bg-surface-100 dark:bg-surface-800 flex items-center justify-center border-r border-surface-200 dark:border-surface-700 px-4">
                        <i class="pi pi-twitter !text-base !leading-tight text-surface-900 dark:text-surface-0" />
                      </div>
                      <div class="flex flex-1 items-center justify-between p-4">
                        <div class="flex flex-col gap-2">
                          <div class="text-xl font-medium text-surface-900 dark:text-surface-0">X</div>
                          <div class="text-base text-surface-700 dark:text-surface-200">995 Visits</div>
                        </div>
                        <div class="flex gap-4 items-center">
                          <div class="hidden items-end gap-[3px] md:flex">
                            <div class="w-[6px] h-[15px] bg-surface-200 dark:bg-surface-700 rounded-[3.5px]" />
                            <div class="w-[6px] h-[15px] bg-surface-200 dark:bg-surface-700 rounded-[3.5px]" />
                            <div class="w-[6px] h-[12px] bg-surface-200 dark:bg-surface-700 rounded-[3.5px]" />
                            <div class="w-[6px] h-[21px] bg-surface-200 dark:bg-surface-700 rounded-[3.5px]" />
                            <div class="w-[6px] h-[20px] bg-surface-200 dark:bg-surface-700 rounded-[3.5px]" />
                            <div class="w-[6px] h-[17px] bg-primary rounded-[3.5px]" />
                          </div>
                          <i class="pi pi-chevron-right !text-xs !leading-tight text-surface-900 dark:text-surface-0" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-surface-0 dark:bg-surface-900 shadow-sm rounded-2xl p-8 flex flex-col gap-8">
            <span class="text-xl font-medium text-surface-900 dark:text-surface-0 leading-tight">Campaign Targets</span>

            <div class="flex flex-col gap-4">
              <div class="flex justify-between md:items-center md:flex-row flex-col">
                <span class="text-surface-900 dark:text-surface-0 text-4xl font-semibold leading-tight">85.7%</span>
                <span class="text-surface-700 dark:text-surface-300 leading-tight">8571 / 10000</span>
              </div>

              <MeterGroup
                  :value="meterItems"
                  :pt="{
                                    meters: { class: '!h-3 !bg-surface-200 dark:!bg-surface-700' },
                                    meter: { class: '!h-3 first:!rounded-l-lg last:!rounded-r-lg' },
                                    labellist: { class: '!hidden' }
                                }"
              />
            </div>

            <div class="flex flex-col gap-4">
              <span class="text-surface-900 dark:text-surface-0 font-semibold leading-tight">Details</span>

              <div class="flex flex-col gap-4">
                <div class="flex items-center gap-4">
                  <span class="w-4 h-4 bg-cyan-500 rounded-full" />
                  <span class="flex-1 text-surface-900 dark:text-surface-0 font-normal leading-tight">New Subscriptions</span>
                  <span class="text-surface-700 dark:text-surface-300 leading-tight">152 / 300</span>
                </div>

                <div class="flex items-center gap-4">
                  <span class="w-4 h-4 bg-amber-500 rounded-full" />
                  <span class="flex-1 text-surface-900 dark:text-surface-0 font-normal leading-tight">Renewal Contracts</span>
                  <span class="text-surface-700 dark:text-surface-300 leading-tight">63 / 500</span>
                </div>

                <div class="flex items-center gap-4">
                  <span class="w-4 h-4 bg-violet-500 rounded-full" />
                  <span class="flex-1 text-surface-900 dark:text-surface-0 font-normal leading-tight">Upsell Revenue</span>
                  <span class="text-surface-700 dark:text-surface-300 leading-tight">23 / 1000</span>
                </div>

                <div class="flex items-center gap-4">
                  <span class="w-4 h-4 bg-pink-500 rounded-full" />
                  <span class="flex-1 text-surface-900 dark:text-surface-0 font-normal leading-tight">Add-On Sales</span>
                  <span class="text-surface-700 dark:text-surface-300 leading-tight">42 / 2000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div class="p-8 bg-surface-0 dark:bg-surface-900 shadow-sm rounded-2xl flex flex-col gap-8">
            <div class="flex items-center gap-4">
              <img src="https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/avatars/circle-big/avatar-m-1.png" class="w-12 h-12 rounded-full" />
              <div class="flex flex-col gap-1">
                <span class="text-surface-900 dark:text-surface-0 text-xl font-medium leading-tight">Cameron Williamson</span>
                <span class="text-surface-600 dark:text-surface-200 font-normal leading-tight">Marketing Coordinator</span>
              </div>
            </div>

            <div class="flex flex-col gap-4">
              <div class="flex flex-col gap-2">
                <div class="flex justify-between items-center gap-4">
                  <span class="text-surface-900 dark:text-surface-0 font-medium leading-tight">Twitter</span>
                  <span class="text-surface-700 dark:text-surface-300 leading-tight">34.00%</span>
                </div>
                <ProgressBar
                    :value="34"
                    class="!h-2 rounded"
                    :pt="{
                                        label: { class: '!hidden' }
                                    }"
                />
              </div>

              <div class="flex flex-col gap-2">
                <div class="flex justify-between items-center gap-4">
                  <span class="text-surface-900 dark:text-surface-0 font-medium leading-tight">Facebook</span>
                  <span class="text-surface-700 dark:text-surface-300 leading-tight">45.86%</span>
                </div>
                <ProgressBar
                    :value="46"
                    class="!h-2 rounded"
                    :pt="{
                                        label: { class: '!hidden' }
                                    }"
                />
              </div>

              <div class="flex flex-col gap-2">
                <div class="flex justify-between items-center gap-4">
                  <span class="text-surface-900 dark:text-surface-0 font-medium leading-tight">Google</span>
                  <span class="text-surface-700 dark:text-surface-300 leading-tight">79.00%</span>
                </div>
                <ProgressBar
                    :value="79"
                    class="!h-2 rounded"
                    :pt="{
                                        label: { class: '!hidden' }
                                    }"
                />
              </div>
            </div>
          </div>

          <div class="p-8 bg-surface-0 dark:bg-surface-900 shadow-sm rounded-2xl flex flex-col gap-8">
            <div class="flex items-center gap-4">
              <img src="https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/avatars/circle-big/avatar-f-2.png" class="w-12 h-12 rounded-full" />
              <div class="flex flex-col gap-1">
                <span class="text-surface-900 dark:text-surface-0 text-xl font-medium leading-tight">Kathryn Murphy</span>
                <span class="text-surface-600 dark:text-surface-200 font-normal leading-tight">President of Sales</span>
              </div>
            </div>

            <div class="flex flex-col gap-4">
              <div class="flex flex-col gap-2">
                <div class="flex justify-between items-center gap-4">
                  <span class="text-surface-900 dark:text-surface-0 font-medium leading-tight">Twitter</span>
                  <span class="text-surface-700 dark:text-surface-300 leading-tight">64.47%</span>
                </div>
                <ProgressBar
                    :value="64"
                    class="!h-2 rounded"
                    :pt="{
                                        label: { class: '!hidden' }
                                    }"
                />
              </div>

              <div class="flex flex-col gap-2">
                <div class="flex justify-between items-center gap-4">
                  <span class="text-surface-900 dark:text-surface-0 font-medium leading-tight">Facebook</span>
                  <span class="text-surface-700 dark:text-surface-300 leading-tight">75.67%</span>
                </div>
                <ProgressBar
                    :value="76"
                    class="!h-2 rounded"
                    :pt="{
                                        label: { class: '!hidden' }
                                    }"
                />
              </div>

              <div class="flex flex-col gap-2">
                <div class="flex justify-between items-center gap-4">
                  <span class="text-surface-900 dark:text-surface-0 font-medium leading-tight">Google</span>
                  <span class="text-surface-700 dark:text-surface-300 leading-tight">45.00%</span>
                </div>
                <ProgressBar
                    :value="45"
                    class="!h-2 rounded"
                    :pt="{
                                        label: { class: '!hidden' }
                                    }"
                />
              </div>
            </div>
          </div>

          <div class="p-8 bg-surface-0 dark:bg-surface-900 shadow-sm rounded-2xl flex flex-col gap-8">
            <div class="flex items-center gap-4">
              <img src="https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/avatars/circle-big/avatar-m-3.png" class="w-12 h-12 rounded-full" />
              <div class="flex flex-col gap-1">
                <span class="text-surface-900 dark:text-surface-0 text-xl font-medium leading-tight">Darrell Steward</span>
                <span class="text-surface-600 dark:text-surface-200 font-normal leading-tight">Web Designer</span>
              </div>
            </div>

            <div class="flex flex-col gap-4">
              <div class="flex flex-col gap-2">
                <div class="flex justify-between items-center gap-4">
                  <span class="text-surface-900 dark:text-surface-0 font-medium leading-tight">Twitter</span>
                  <span class="text-surface-700 dark:text-surface-300 leading-tight">23.55%</span>
                </div>
                <ProgressBar
                    :value="24"
                    class="!h-2 rounded"
                    :pt="{
                                        label: { class: '!hidden' }
                                    }"
                />
              </div>

              <div class="flex flex-col gap-2">
                <div class="flex justify-between items-center gap-4">
                  <span class="text-surface-900 dark:text-surface-0 font-medium leading-tight">Facebook</span>
                  <span class="text-surface-700 dark:text-surface-300 leading-tight">78.65%</span>
                </div>
                <ProgressBar
                    :value="79"
                    class="!h-2 rounded"
                    :pt="{
                                        label: { class: '!hidden' }
                                    }"
                />
              </div>

              <div class="flex flex-col gap-2">
                <div class="flex justify-between items-center gap-4">
                  <span class="text-surface-900 dark:text-surface-0 font-medium leading-tight">Google</span>
                  <span class="text-surface-700 dark:text-surface-300 leading-tight">86.54%</span>
                </div>
                <ProgressBar
                    :value="87"
                    class="!h-2 rounded"
                    :pt="{
                                        label: { class: '!hidden' }
                                    }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
</template>
<script setup>
import Button from 'primevue/button';
import {ref} from 'vue';

const search = ref('');
const selectedNav = ref('Home');
const navs = ref([
  { label: 'Home', icon: 'pi pi-home' },
  { label: 'Bookmark', icon: 'pi pi-bookmark' },
  { label: 'Users', icon: 'pi pi-users' },
  { label: 'Comments', icon: 'pi pi-comments' },
  { label: 'Calendar', icon: 'pi pi-calendar' }
]);
const bottomNavs = ref([
  { label: 'Question', icon: 'pi pi-question-circle' },
  { label: 'Settings', icon: 'pi pi-cog' }
]);
const meterItems = [
  {
    label: 'New Subscriptions',
    value: 20,
    color: 'var(--p-cyan-500)'
  },
  {
    label: 'Renewal Contracts',
    value: 20,
    color: 'var(--p-amber-500)'
  },
  {
    label: 'Upsell Revenue',
    value: 20,
    color: 'var(--p-violet-500)'
  },
  {
    label: 'Add-On Sales',
    value: 20,
    color: 'var(--p-pink-500)'
  }
];
</script>
