export default async function getAllBrands() {
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/brands", {
    cache: "no-store",
  });
  const { data } = await response.json(); 
  return data;
}
