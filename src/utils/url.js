export const getSkip = (page, limit) => {
  return (page - 1) * limit;
};

export const getPage = (skip, limit) => {
  return skip / limit + 1;
};

export const getPageMax = (count, limit) => {
  return Math.floor(count / limit) + 1;
};

export const sanitizeParams = (params) => {
  for (const k of Object.entries(params)) {
    switch (k) {
      case "skip":
        params[k] = params[k] >= 0 ? params[k] : 0;
        break;
      case "limit":
        params[k] = params[k] > 0 && params[k] <= 100 ? params[k] : 1;
        break;
      case "title":
        params[k] = params[k] || "";
        break;
      case "name":
        params[k] = params[k] || "";
        break;
      default:
        break;
    }
  }
  return params;
};

/** Create valid endpoint with filter, where search filter is either name or title */
export const createParams = (params) => {
  const safeParams = sanitizeParams(params);
  return new URLSearchParams(safeParams);
};
