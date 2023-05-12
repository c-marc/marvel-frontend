// format: portrait
// - size : small, medium, xlarge, fantastic, uncanny, incredible
// format: standard
// - size: small, medium, fatanstic, amazing

/** Get url from thumbnail (data) and a variant option */
export const getImgUrl = (thumbnail, variant) => {
  const { path, extension } = thumbnail;
  const { format, size } = variant;
  return `${path}/${format}_${size}.${extension}`;
};
