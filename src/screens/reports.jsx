import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import PrintReportButton from '../components/PrintReportButton';
import dashboardIcon from '../images/dash.png';
import paymentsIcon from '../images/payments.png';
import reportsIcon from '../images/report.png';
import './dashboard.css';
import './print.css';
import { getAuth, signOut } from 'firebase/auth';

const Reports = () => {
  const location = useLocation();
  const [reports, setReports] = useState([]);
  const [userData, setUserData] = useState({
    address: '',
    name: ''
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const unsubscribeReports = onSnapshot(
      collection(db, 'Users/12345ABC/Reports'),
      (querySnapshot) => {
        const reportsData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            reason: data.reason,
            date: data.timestamp?.toDate().toLocaleDateString('en-US', {
              month: '2-digit',
              day: '2-digit',
              year: '2-digit'
            })
          };
        });
        setReports(reportsData);
      }
    );

    // Fetch user details
    const unsubscribeUser = onSnapshot(doc(db, 'Users/12345ABC'), (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setUserData({
          address: data.address,
          name: data.name
        });
      }
    });

    setTimeout(() => setLoaded(true), 100); // Add delay for transition

    return () => {
      unsubscribeReports();
      unsubscribeUser();
    };
  }, []);

  const handleLogout = () => {
    setLoaded(false);
    setTimeout(() => {
      const auth = getAuth();
      signOut(auth).then(() => {
        window.location.href = '/';
      }).catch((error) => {
        console.error('Error during logout:', error);
      });
    }, 1000); // Wait for the fade-out transition to complete
  };

  return (
    <div className={`flex h-screen bg-gray-50 transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-6">EB Access</h2>
          <nav>
            <ul className="space-y-1">
              <li>
                <Link 
                  to="/dashboard" 
                  className={`flex items-center p-2 rounded-lg ${
                    location.pathname === '/dashboard' 
                      ? 'bg-green-500 text-white' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <img 
                    src={dashboardIcon} 
                    alt="Dashboard" 
                    className="mr-3" 
                    style={{ width: '20px', height: '20px' }} 
                  />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  to="/payments" 
                  className={`flex items-center p-2 rounded-lg ${
                    location.pathname === '/payments' 
                      ? 'bg-green-500 text-white' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <img 
                    src={paymentsIcon} 
                    alt="Payments" 
                    className="mr-3" 
                    style={{ width: '20px', height: '20px' }} 
                  />
                  Payments
                </Link>
              </li>
              <li>
                <Link 
                  to="/reports" 
                  className={`flex items-center p-2 rounded-lg ${
                    location.pathname === '/reports' 
                      ? 'bg-green-500 text-white' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <img 
                    src={reportsIcon} 
                    alt="Reports" 
                    className="mr-3" 
                    style={{ width: '20px', height: '20px' }} 
                  />
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
              MetroniQ/EB access/Reports/
              <span className="text-green-500">Kurishmoodu Branch</span>
            </div>
            <button className="bg-black text-white px-4 py-2 rounded hover:bg-red-500 hover:text-white" onClick={handleLogout}>
              Logout
            </button>
          </div>

          {/* Reports Table */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">Report Details</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4 text-left">Users</th>
                      <th className="py-3 px-4 text-left">Address</th>
                      <th className="py-3 px-4 text-left">Date</th>
                      <th className="py-3 px-4 text-left">Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report) => (
                      <tr key={report.id} className="border-b last:border-b-0">
                        <td className="py-3 px-4 text-blue-600">{userData.name}</td>
                        <td className="py-3 px-4 text-gray-600">{userData.address}</td>
                        <td className="py-3 px-4 text-gray-600">{report.date}</td>
                        <td className="py-3 px-4 text-gray-600">{report.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <PrintReportButton reports={reports} userData={{ name: userData.name, address: userData.address, billing_plan: userData.billing_plan, balance_amount: userData.payment_amount }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;