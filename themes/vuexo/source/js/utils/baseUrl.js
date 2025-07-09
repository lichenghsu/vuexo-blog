const isProd = window.location.pathname.includes("/lcxlab.github.io/");
export const BASE_URL = isProd ? "/lcxlab.github.io/" : "/"