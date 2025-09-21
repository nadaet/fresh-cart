export default async function removeItemFromCart(productId: string, token: string) {
  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const data = await response.json();
  return data;
}
