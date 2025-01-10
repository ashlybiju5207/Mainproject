import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import './dashboard.css';

const PaymentDashboard = () => {
  const location = useLocation();
  const payments = [
    { id: 1, user: "Mithilesh Kumar Singh", address: "Kritipur, Kathmandu", date: "12.Jan.2021", amount: 2500 },
    { id: 2, user: "Suron Maharjan", address: "Natole, Lalitpur", date: "21.Feb.2021", amount: 4000 },
    { id: 3, user: "Sandesh Bajracharya", address: "Bhinchhebahal, Lalitpur", date: "13.Mar.2021", amount: 800 },
    { id: 4, user: "Subin Sedhai", address: "Baneshwor, Kathmandu", date: "24.Jan.2021", amount: 1500 },
    { id: 5, user: "Wonjala Joshi", address: "Bhaisepati, Lalitpur", date: "21.Sep.2021", amount: 4500 },
    { id: 6, user: "Numa Limbu", address: "Sampang Chowk,Dharan", date: "21.Sep.2021", amount: 2455 },
    { id: 7, user: "Nimesh Sthapit", address: "Newroad, Pokhara", date: "21.Sep.2021", amount: 1800 },
    { id: 8, user: "Samikshya Basnet", address: "Nakhipot, Lalitpur", date: "21.Sep.2021", amount: 1000 },
    { id: 9, user: "Sushant Kushwar", address: "Sinamangal, Kathmandu", date: "21.Sep.2021", amount: 3500 },
    { id: 10, user: "Hrishav Gajurel", address: "Khumaltar, Lalitpur", date: "21.Sep.2021", amount: 3200 },
    { id: 11, user: "Tisha Joshi", address: "Ason, Kathmandu", date: "21.Sep.2021", amount: 1900 }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-6">EB Access</h2>
          <nav>
            <ul className="space-y-1">
              <li>
                <Link to="/dashboard" className={`flex items-center p-2 rounded-lg ${location.pathname === '/dashboard' ? 'bg-green-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <span className="mr-3">📊</span>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/payments" className={`flex items-center p-2 rounded-lg ${location.pathname === '/payments' ? 'bg-green-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <span className="mr-3">📄</span>
                  Payments
                </Link>
              </li>
              <li>
                <Link to="/reports" className={`flex items-center p-2 rounded-lg ${location.pathname === '/reports' ? 'bg-green-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <span className="text-green-500 mr-3">📊</span>
                  Reports
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto py-6 px-4">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-600 mb-6">
            MetroniQ/EB access/Payments/
            <span className="text-green-500">Kurishmoodu Branch</span>
          </div>

          {/* Payment Details Section */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Payment Details</h2>
                <div className="flex space-x-2">
                  <button className="px-4 py-1 text-gray-600 bg-gray-100 rounded-full">
                    Prepaid
                  </button>
                  <button className="px-4 py-1 text-white bg-green-500 rounded-full">
                    Postpaid
                  </button>
                </div>
              </div>

              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Users <ChevronDown className="inline h-4 w-4" />
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Address <ChevronDown className="inline h-4 w-4" />
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Date <ChevronDown className="inline h-4 w-4" />
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Amount <ChevronDown className="inline h-4 w-4" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id} className="border-b last:border-b-0">
                      <td className="py-3 px-4 text-blue-600">{payment.user}</td>
                      <td className="py-3 px-4 text-gray-600">{payment.address}</td>
                      <td className="py-3 px-4 text-gray-600">{payment.date}</td>
                      <td className="py-3 px-4 text-gray-600">Rs. {payment.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDashboard;