import React from "react";

function EditChannelInfo() {
  return (
    <div class="flex flex-wrap justify-center gap-y-4 py-4">
      <div class="w-full sm:w-1/2 lg:w-1/3">
        <h5 class="font-semibold">Channel Info</h5>
        <p class="text-gray-300">Update your Channel details here.</p>
      </div>
      <div class="w-full sm:w-1/2 lg:w-2/3">
        <div class="rounded-lg border">
          <div class="flex flex-wrap gap-y-4 p-4">
            <div class="w-full">
              <label class="mb-1 inline-block" for="username">
                Username
              </label>
              <div class="flex rounded-lg border">
                <p class="flex shrink-0 items-center border-r border-white px-3 align-middle">
                  vidplay.com/
                </p>
                <input
                  type="text"
                  class="w-full bg-transparent px-2 py-1.5"
                  id="username"
                  placeholder="@username"
                  value="reactpatterns"
                />
              </div>
            </div>
            <div class="w-full">
              <label class="mb-1 inline-block" for="desc">
                Description
              </label>
              <textarea
                class="w-full rounded-lg border bg-transparent px-2 py-1.5"
                rows="4"
                id="desc"
                placeholder="Channel Description"
              >
                I&#x27;m a Product Designer based in Melbourne, Australia. I
                specialise in UX/UI design, brand strategy, and Webflow
                development.
              </textarea>
              <p class="mt-0.5 text-sm text-gray-300">275 characters left</p>
            </div>
            <div class="flex w-full items-center gap-3">
              <div class="w-full max-w-xs rounded-lg border">
                <select class="w-full border-r-8 border-transparent bg-transparent py-1.5 pl-2">
                  <option value="light">Light</option>
                  <option value="regular" selected="">
                    Regular
                  </option>
                  <option value="semi-bold">Semi bold</option>
                  <option value="bold">Bold</option>
                  <option value="bolder">Bolder</option>
                </select>
              </div>
              <button class="h-6 w-6 hover:text-[#ae7aff] focus:text-[#ae7aff]">
                <svg
                  width="11"
                  height="14"
                  viewBox="0 0 11 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.6 6.79C9.57 6.12 10.25 5.02 10.25 4C10.25 1.74 8.5 0 6.25 0H0V14H7.04C9.13 14 10.75 12.3 10.75 10.21C10.75 8.69 9.89 7.39 8.6 6.79ZM3 2.5H6C6.83 2.5 7.5 3.17 7.5 4C7.5 4.83 6.83 5.5 6 5.5H3V2.5ZM6.5 11.5H3V8.5H6.5C7.33 8.5 8 9.17 8 10C8 10.83 7.33 11.5 6.5 11.5Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </button>
              <button class="h-6 w-6 hover:text-[#ae7aff] focus:text-[#ae7aff]">
                <svg
                  width="12"
                  height="14"
                  viewBox="0 0 12 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 0V3H6.21L2.79 11H0V14H8V11H5.79L9.21 3H12V0H4Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </button>
              <button class="h-6 w-6 hover:text-[#ae7aff] focus:text-[#ae7aff]">
                <svg
                  width="20"
                  height="10"
                  viewBox="0 0 20 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.9 5C1.9 3.29 3.29 1.9 5 1.9H9V0H5C2.24 0 0 2.24 0 5C0 7.76 2.24 10 5 10H9V8.1H5C3.29 8.1 1.9 6.71 1.9 5ZM6 6H14V4H6V6ZM15 0H11V1.9H15C16.71 1.9 18.1 3.29 18.1 5C18.1 6.71 16.71 8.1 15 8.1H11V10H15C17.76 10 20 7.76 20 5C20 2.24 17.76 0 15 0Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </button>
              <button class="h-6 w-6 hover:text-[#ae7aff] focus:text-[#ae7aff]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  ></path>
                </svg>
              </button>
              <button class="h-6 w-6 hover:text-[#ae7aff] focus:text-[#ae7aff]">
                <svg
                  width="19"
                  height="16"
                  viewBox="0 0 19 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 13H2V13.5H1V14.5H2V15H0V16H3V12H0V13ZM1 4H2V0H0V1H1V4ZM0 7H1.8L0 9.1V10H3V9H1.2L3 6.9V6H0V7ZM5 1V3H19V1H5ZM5 15H19V13H5V15ZM5 9H19V7H5V9Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </button>
            </div>
            <div class="w-full">
              <label class="mb-1 inline-block" for="timezone">
                Timezone
              </label>
              <div class="relative w-full rounded-lg border">
                <div class="absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <select
                  id="timezone"
                  class="w-full border-r-8 border-transparent bg-transparent py-1.5 pl-8"
                >
                  <option value="UTC-12:00">
                    (UTC-12:00) International Date Line West
                  </option>
                  <option value="UTC-11:00">
                    (UTC-11:00) Coordinated Universal Time-11
                  </option>
                  <option value="UTC-10:00">(UTC-10:00) Hawaii</option>
                  <option value="UTC-09:00">(UTC-09:00) Alaska</option>
                  <option value="UTC-08:00">
                    (UTC-08:00) Pacific Time (US & Canada)
                  </option>
                  <option value="UTC-07:00">
                    (UTC-07:00) Mountain Time (US & Canada)
                  </option>
                  <option value="UTC-06:00">
                    (UTC-06:00) Central Time (US & Canada)
                  </option>
                  <option value="UTC-05:00">
                    (UTC-05:00) Eastern Time (US & Canada)
                  </option>
                  <option value="UTC-04:00">
                    (UTC-04:00) Atlantic Time (Canada)
                  </option>
                  <option value="UTC-03:30">(UTC-03:30) Newfoundland</option>
                  <option value="UTC-03:00">
                    (UTC-03:00) Buenos Aires, Georgetown
                  </option>
                  <option value="UTC-02:00">
                    (UTC-02:00) Coordinated Universal Time-02
                  </option>
                  <option value="UTC-01:00">(UTC-01:00) Azores</option>
                  <option value="UTC+00:00">
                    (UTC+00:00) Coordinated Universal Time
                  </option>
                  <option value="UTC+01:00">
                    (UTC+01:00) Central European Time
                  </option>
                  <option value="UTC+02:00">
                    (UTC+02:00) Eastern European Time
                  </option>
                  <option value="UTC+03:00">
                    (UTC+03:00) Moscow, St. Petersburg
                  </option>
                  <option value="UTC+03:30">(UTC+03:30) Tehran</option>
                  <option value="UTC+04:00">
                    (UTC+04:00) Abu Dhabi, Muscat
                  </option>
                  <option value="UTC+04:30">(UTC+04:30) Kabul</option>
                  <option value="UTC+05:00">(UTC+05:00) Tashkent</option>
                  <option value="UTC+05:30" selected="">
                    (UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi
                  </option>
                  <option value="UTC+05:45">(UTC+05:45) Kathmandu</option>
                  <option value="UTC+06:00">
                    (UTC+06:00) Almaty, Novosibirsk
                  </option>
                  <option value="UTC+06:30">
                    (UTC+06:30) Yangon (Rangoon)
                  </option>
                  <option value="UTC+07:00">
                    (UTC+07:00) Bangkok, Hanoi, Jakarta
                  </option>
                  <option value="UTC+08:00">
                    (UTC+08:00) Beijing, Chongqing, Hong Kong
                  </option>
                  <option value="UTC+08:45">(UTC+08:45) Eucla</option>
                  <option value="UTC+09:00">
                    (UTC+09:00) Osaka, Sapporo, Tokyo
                  </option>
                  <option value="UTC+09:30">(UTC+09:30) Adelaide</option>
                  <option value="UTC+09:45">(UTC+09:45) Darwin</option>
                  <option value="UTC+10:00">(UTC+10:00) Brisbane</option>
                  <option value="UTC+10:30">
                    (UTC+10:30) Lord Howe Island
                  </option>
                  <option value="UTC+11:00">
                    (UTC+11:00) Solomon Is., New Caledonia
                  </option>
                  <option value="UTC+11:30">(UTC+11:30) Norfolk Island</option>
                  <option value="UTC+12:00">(UTC+12:00) Fiji</option>
                  <option value="UTC+12:45">(UTC+12:45) Chatham Islands</option>
                  <option value="UTC+13:00">(UTC+13:00) Nuku&#x27;alofa</option>
                  <option value="UTC+14:00">(UTC+14:00) Kiritimati</option>
                </select>
              </div>
            </div>
          </div>
          <hr class="border border-gray-300" />
          <div class="flex items-center justify-end gap-4 p-4">
            <button class="inline-block rounded-lg border px-3 py-1.5 hover:bg-white/10">
              Cancel
            </button>
            <button class="inline-block bg-[#ae7aff] px-3 py-1.5 text-black">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditChannelInfo;
