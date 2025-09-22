import { getUserOrder } from '@/apis/getUserOrders'
import { Orders } from '@/types/order.type'
import Image from 'next/image'

export default async function AllOrders() {
  const data: Orders = await getUserOrder()

  return (
    <div className="w-[90%] md:w-[80%] mx-auto py-10">
      <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">
        My Orders
      </h1>

      {(!data || data.length === 0) && (
        <div className="text-center text-gray-500">
          You don’t have any orders yet.
        </div>
      )}

      <div className="space-y-8">
        {data.map((order) => (
          <div
            key={order._id}
            className="border border-gray-200 rounded-xl shadow-md p-6 bg-white"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Order #{order._id.slice(-6)}
              </h2>
              <span className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>

            {/* Shipping Info */}
            <div className="grid md:grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
              <div>
                <p><span className="font-medium">City:</span> {order.shippingAddress.city}</p>
                <p><span className="font-medium">Phone:</span> {order.shippingAddress.phone}</p>
                <p><span className="font-medium">Address:</span> {order.shippingAddress.details}</p>
              </div>
              <div>
                <p><span className="font-medium">Payment:</span> {order.paymentMethodType}</p>
                <p>
                  <span className="font-medium">Paid:</span>{" "}
                  {order.isPaid ? (
                    <span className="text-green-600">Yes</span>
                  ) : (
                    <span className="text-red-600">No</span>
                  )}
                </p>
                <p>
                  <span className="font-medium">Delivered:</span>{" "}
                  {order.isDelivered ? (
                    <span className="text-green-600">Yes</span>
                  ) : (
                    <span className="text-yellow-600">Pending</span>
                  )}
                </p>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-3">
              {order.cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 border-t pt-3"
                >
                  <Image
                    src={item.product.imageCover}
                    alt={item.product.title}
                    width={60}
                    height={60}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.product.title}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.count} × EGP{item.price}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-800">
                    EGP{(item.count * item.price).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end">
              <p className="text-lg font-bold text-gray-900">
                Total: EGP{order.totalOrderPrice.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
