import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase/config';
import { doc, getDoc, onSnapshot, collection } from 'firebase/firestore';

const PaymentDashboard = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userRef = collection(firestore, 'Users');
    
    const unsubscribe = onSnapshot(userRef, (snapshot) => {
      const users = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        users.push({
          id: doc.id,
          name: data.name,
          address: data.address,
          date: new Date().toLocaleDateString(),
          amount: `Rs. ${data.balance_amount}`,
          plan: data.billing_plan
        });
      });
      setPaymentData(users);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar remains same */}
      
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            MetroniQ/EB access/Payments/
            <span className="text-green-500">Kurishmoodu Branch</span>
          </div>
          <button className="bg-black text-white px-4 py-2 rounded hover:bg-red-500">
            Logout
          </button>
        </div>

        {loading ? (
          <div className="text-center">Loading payment data...</div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-6">Payment History</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Plan
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paymentData.map((payment, index) => (
                    <tr key={payment.id || index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payment.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.address}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.plan}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentDashboard;