'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import getUserOrders from "src/OrderAction/OrderAction";
import { CartItem, OrderData } from "src/types/Order.type";

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await getUserOrders();
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      {loading ? (
        <div className="max-w-6xl mx-auto p-6 py-12 flex flex-col items-center justify-center min-h-[500px]">
          <span className="spinner"></span>
          <p className="mt-4 text-main font-bold text-lg animate-pulse">
            Loading...
          </p>
        </div>
      ) : orders.length === 0 ? (
        <p className="text-black text-lg">No orders found</p>
      ) : (
        <div className="space-y-8">
          <h1 className="text-3xl font-bold mb-6 text-black">
            My Orders
          </h1>

          {orders.map((order: OrderData) => (
            <div
              key={order._id}
              className="border border-gray-300 rounded-lg p-6 shadow hover:shadow-lg transition-shadow bg-white"
            >
              <div className="flex justify-between items-center mb-4">
                <span
                  className={`font-semibold px-3 py-1 rounded-full text-sm ${
                    order.isPaid
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {order.isPaid ? "Paid" : "Not Paid"}
                </span>
              </div>

              <div className="mb-4 space-y-1">
                <p className="text-black text-lg font-medium">
                  Total: {order.totalOrderPrice.toLocaleString()} EGP
                </p>
                <p className="text-black text-base">
                  Payment Method: {order.paymentMethodType}
                </p>
                <p className="text-black text-sm">
                  Created at:{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="space-y-3">
                {order.cartItems.map((item: CartItem) => (
                  <div
                    key={item._id}
                    className="flex items-center border-t pt-3 border-gray-200"
                  >
                    <Image
                      src={item.product.imageCover}
                      alt={item.product.title}
                      width={80}
                      height={80}
                      className="object-cover rounded mr-4"
                    />

                    <div className="flex-1">
                      <p className="text-black font-medium">
                        {item.product.title}
                      </p>
                      <p className="text-black text-sm">
                        Quantity: {item.count} × Price:{" "}
                        {item.price.toLocaleString()} EGP
                      </p>
                      <p className="text-black text-sm">
                        Brand: {item.product.brand.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}




// import Image from "next/image";
// import getUserOrders from "src/OrderAction/OrderAction";
// import { CartItem, OrderData } from "src/types/Order.type";

// export default async function AllOrdersPage() {
//   // API بيرجع { status, data }
//   const response = await getUserOrders();
//   const orders: OrderData[] = response?.data ?? [];

//   if (orders.length === 0) {
//     return (
//       <div className="max-w-5xl mx-auto p-6">
//         <p className="text-black text-lg">No orders found</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-5xl mx-auto p-6 space-y-8">
//       <h1 className="text-3xl font-bold mb-6 text-black">
//         My Orders
//       </h1>

//       {orders.map((order) => (
//         <div
//           key={order._id}
//           className="border border-gray-300 rounded-lg p-6 shadow hover:shadow-lg transition-shadow bg-white"
//         >
//           <div className="flex justify-between items-center mb-4">
//             <span
//               className={`font-semibold px-3 py-1 rounded-full text-sm ${
//                 order.isPaid
//                   ? "bg-green-100 text-green-700"
//                   : "bg-red-100 text-red-700"
//               }`}
//             >
//               {order.isPaid ? "Paid" : "Not Paid"}
//             </span>
//           </div>

//           <div className="mb-4 space-y-1">
//             <p className="text-black text-lg font-medium">
//               Total: {order.totalOrderPrice.toLocaleString()} EGP
//             </p>
//             <p className="text-black text-base">
//               Payment Method: {order.paymentMethodType}
//             </p>
//             <p className="text-black text-sm">
//               Created at:{" "}
//               {new Date(order.createdAt).toLocaleDateString()}
//             </p>
//           </div>

//           <div className="space-y-3">
//             {order.cartItems.map((item: CartItem) => (
//               <div
//                 key={item._id}
//                 className="flex items-center border-t pt-3 border-gray-200"
//               >
//                 <Image
//                   src={item.product.imageCover}
//                   alt={item.product.title}
//                   width={80}
//                   height={80}
//                   className="object-cover rounded mr-4"
//                 />

//                 <div className="flex-1">
//                   <p className="text-black font-medium">
//                     {item.product.title}
//                   </p>
//                   <p className="text-black text-sm">
//                     Quantity: {item.count} × Price:{" "}
//                     {item.price.toLocaleString()} EGP
//                   </p>
//                   <p className="text-black text-sm">
//                     Brand: {item.product.brand.name}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
