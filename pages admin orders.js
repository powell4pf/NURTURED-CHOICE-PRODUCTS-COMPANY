import { useEffect, useState } from "react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/orders")
      .then(res => setOrders(res.data));
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/api/orders/${id}`, { status });
    window.location.reload();
  };

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold">Orders</h1>

      {orders.map(order => (
        <div key={order._id} className="border p-4 mt-4">
          <p>Total: Ksh {order.total}</p>
          <p>Status: {order.status}</p>

          <button onClick={() => updateStatus(order._id, "Paid")}>
            Mark Paid
          </button>

          <button onClick={() => updateStatus(order._id, "Delivered")}>
            Delivered
          </button>
        </div>
      ))}
    </div>
  );
}