export default async function getAllCategories() {
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/categories", {
    cache: "no-store",
  });
  const { data } = await response.json(); 
  return data;
}
