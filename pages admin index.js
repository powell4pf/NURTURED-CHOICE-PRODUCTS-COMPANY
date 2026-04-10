import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/orders")
      .then(res => setOrders(res.data));
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-3 gap-6 mt-6">
        <div className="bg-green-200 p-5 rounded">
          <h2>Total Orders</h2>
          <p>{orders.length}</p>
        </div>

        <div className="bg-yellow-200 p-5 rounded">
          <h2>Total Revenue</h2>
          <p>Ksh {totalRevenue}</p>
        </div>

        <div className="bg-red-200 p-5 rounded">
          <h2>Pending Orders</h2>
          <p>{orders.filter(o => o.status === "Pending").length}</p>
        </div>
      </div>
    </div>
  );
}