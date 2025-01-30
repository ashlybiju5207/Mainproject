import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, defs, linearGradient, stop } from 'recharts';
import { BarChart2 } from 'lucide-react';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase'; // Import Firestore instance
import dashboardIcon from '../images/dash.png';
import paymentsIcon from '../images/payments.png';
import reportsIcon from '../images/report.png';

function Dashboard() {
  const location = useLocation();
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'Users/12345ABC/Consumption'), (querySnapshot) => {
      const data = querySnapshot.docs.map(doc => {
        const timestamp = doc.data().timestamp;
        if (timestamp && timestamp.includes('at')) {
          const timePart = timestamp.split('at')[1].trim().split(' ')[0]; // Extract only the time part
          const [hours, minutes, seconds] = timePart.split(':');
          const ampm = timestamp.includes('PM') ? 'PM' : 'AM';
          const time = `${hours}:${minutes} ${ampm}`; // Format as hour:minutes am/pm
          return {
            time: time,
            kWh: doc.data().kwh_consumed
          };
        }
        return null;
      }).filter(item => item !== null); // Filter out any null values
      setData(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-6">EB Access</h2>
          <nav className="space-y-1">
            <Link to="/dashboard" className={`flex items-center p-2 rounded-lg ${location.pathname === '/dashboard' ? 'bg-green-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
              <img src={dashboardIcon} alt="Dashboard" className="mr-3 w-5 h-5" />
              Dashboard
            </Link>
            <Link to="/payments" className={`flex items-center p-2 rounded-lg ${location.pathname === '/payments' ? 'bg-green-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
              <img src={paymentsIcon} alt="Payments" className="mr-3 w-5 h-5" />
              Payments
            </Link>
            <Link to="/reports" className={`flex items-center p-2 rounded-lg ${location.pathname === '/reports' ? 'bg-green-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
              <img src={reportsIcon} alt="Reports" className="mr-3 w-5 h-5" />
              Reports
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            MetroniQ/EB access/Dashboard/
            <span className="text-green-500">Kurishmoodu Branch</span>
          </div>
          <button className="bg-black text-white px-4 py-2 rounded hover:bg-red-500 hover:text-white" onClick={() => { window.location.href = '/'; /* Add logout logic here */ }}>
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Users Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mr-4">
                <span className="text-green-500 text-xl">👥</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Users</p>
                <p className="text-2xl font-semibold">1</p>
              </div>
            </div>
          </div>

          {/* Pending Payments Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mr-4">
                <span className="text-green-500 text-xl">💸</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending Payments</p>
                <p className="text-2xl font-semibold">5</p>
              </div>
            </div>
          </div>

          {/* Total Consumption Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mr-4">
                <span className="text-green-500 text-xl">⚡</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Consumption</p>
                <p className="text-2xl font-semibold">10 kWh</p>
              </div>
            </div>
          </div>
        </div>

        {/* Energy Usage Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-6 flex items-center">
            <BarChart2 className="mr-2" /> Energy Usage
          </h3>
          <div className="h-[400px] bg-gray-50 rounded-lg flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorKWh" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" label={{ value: 'Time', position: 'insideBottomRight', offset: -5 }} />
                <YAxis label={{ value: 'kWh', angle: -90, position: 'insideLeft' }} />
                <Tooltip contentStyle={{ backgroundColor: '#f3f4f6', border: 'none', borderRadius: '10px' }} />
                <Legend />
                <Bar dataKey="kWh" fill="url(#colorKWh)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;