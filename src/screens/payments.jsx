import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../firebase'; // Import Firestore and Auth instances
import dashboardIcon from '../images/dash.png';
import paymentsIcon from '../images/payments.png';
import reportsIcon from '../images/report.png'; // Corrected file name
import './dashboard.css';

const PaymentDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('prepaid'); // State to manage active tab
  const [payments, setPayments] = useState([]);
  const [address, setAddress] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const unsubscribePayments = onSnapshot(collection(db, 'Users/12345ABC/Payments'), (querySnapshot) => {
      const paymentsData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        const datePaid = data.date_paid.toDate().toLocaleDateString('en-US'); // Convert Firestore timestamp to date string
        return {
          id: doc.id,
          ...data,
          date_paid: datePaid
        };
      });
      setPayments(paymentsData);
    });

    const unsubscribeUser = onSnapshot(doc(db, 'Users/12345ABC'), (docSnapshot) => {
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        setAddress(userData.address);
        setUserName(userData.name);
      }
    });

    return () => {
      unsubscribePayments();
      unsubscribeUser();
    };
  }, []);

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate('/'); // Redirect to the landing page after logout
    }).catch((error) => {
      console.error('Error logging out: ', error);
    });
  };

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
                  <img src={dashboardIcon} alt="Dashboard" className="mr-3" style={{ width: '20px', height: '20px' }} />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/payments" className={`flex items-center p-2 rounded-lg ${location.pathname === '/payments' ? 'bg-green-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <img src={paymentsIcon} alt="Payments" className="mr-3" style={{ width: '20px', height: '20px' }} />
                  Payments
                </Link>
              </li>
              <li>
                <Link to="/reports" className={`flex items-center p-2 rounded-lg ${location.pathname === '/reports' ? 'bg-green-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <img src={reportsIcon} alt="Reports" className="mr-3" style={{ width: '20px', height: '20px' }} />
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
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-gray-600">
              MetroniQ/EB access/Payments/
              <span className="text-green-500">Kurishmoodu Branch</span>
            </div>
            <button className="bg-black text-white px-4 py-2 rounded hover:bg-red-500 hover:text-white" onClick={handleLogout}>
              Logout
            </button>
          </div>

          {/* Payment Details Section */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Payment Details</h2>
                <div className="flex space-x-2">
                  <button
                    className={`px-4 py-1 rounded-full ${activeTab === 'prepaid' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'}`}
                    onClick={() => setActiveTab('prepaid')}
                  >
                    Prepaid
                  </button>
                  <button
                    className={`px-4 py-1 rounded-full ${activeTab === 'postpaid' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'}`}
                    onClick={() => setActiveTab('postpaid')}
                  >
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
                      <td className="py-3 px-4 text-blue-600">{userName}</td>
                      <td className="py-3 px-4 text-gray-600">{address}</td>
                      <td className="py-3 px-4 text-gray-600">{payment.date_paid}</td>
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