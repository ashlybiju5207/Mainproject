import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

const PaymentDashboard = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch specific user data
        const userRef = doc(firestore, 'Users', '12345ABC');
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setPaymentData([{
            name: userData.name || 'Unknown',
            address: userData.address || 'Not specified',
            date: new Date().toLocaleDateString(),
            amount: `Rs. ${userData.balance_amount || 0}`,
            billing_plan: userData.billing_plan || 'Not specified'
          }]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
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
                    <tr key={index}>
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
                        {payment.billing_plan}
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