export function validateProduct(product) {
  let error = [];
  console.log("got here");
  if (product.product_name === "") {
    return (error = [
      2,
      "Invalid title",
      "",
      "All products must have a title so that customers can easily find what they looking for",
    ]);
  }
  if (product.product_slug === "") {
    return (error = [
      2,
      "Invalid slug",
      "",
      "This is not a usual error report to support@mallorar.com",
    ]);
  }
  if (product.product_department === "") {
    return (error = [
      2,
      "Invalid department",
      "",
      "Please set a product department so that we can better place this product in your store",
    ]);
  }
  if (product.product_category === "") {
    return (error = [
      2,
      "Invalid category",
      "",
      "Please set a product category so that we can better place this product according to category",
    ]);
  }
  if (product.child_category === "") {
    return (error = [
      2,
      "Invalid category",
      "",
      "Please set a child category so that we can better place this product",
    ]);
  }
  if (product.product_price <= product.sale_price && product.on_sale) {
    return (error = [
      2,
      "Invalid sale price",
      "",
      `The regular price (${product.base_currency}${product.product_price}) cannot be less or equal to sale price (${product.base_currency}${product.sale_price})`,
    ]);
  }
  if (
    product.local_shipping_cost <= 0 &&
    product.local_shipping_type !== "free"
  ) {
    return (error = [
      2,
      "Invalid shipping cost",
      "",
      `Local shipping cost of ${product.base_currency} 0 is not allowed. Set to free shipping instead.`,
    ]);
  }
  if (product.intl_del_flat_fee <= 0 && product.intl_shipping_type === "flat") {
    return (error = [
      2,
      "Invalid shipping cost",
      "",
      `International shipping cost of ${product.base_currency} 0 is not allowed. Set to calculated international shipping instead.`,
    ]);
  }

  if (
    product.intl_shipping_zones.length <= 0 &&
    product.intl_shipping_type !== "no-shipping"
  ) {
    return (error = [
      2,
      "Unset shipping zones",
      "",
      `You must set your shipping zones if you offer international shipping, else remove international shipping on this product.`,
    ]);
  }
  if (product.product_images.length === 0) {
    return (error = [
      2,
      "Add Product Photo",
      "",
      `You must add at least 1 product photo for this product before you save it`,
    ]);
  }

  if (product.product_price === 0 && product.product_variations.length === 0) {
    return (error = [
      2,
      "Invalid price",
      "",
      "Please give your product a price",
    ]);
  }

  if (error.length === 4) {
    return error;
  }
}
