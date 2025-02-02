import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Label } from 'recharts';
import { BarChart2, Clock, Zap, AlertCircle } from 'lucide-react';
import { collection, onSnapshot } from 'firebase/firestore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { db, auth } from '../firebase';
import dashboardIcon from '../images/dash.png';
import paymentsIcon from '../images/payments.png';
import reportsIcon from '../images/report.png';
import pendingPaymentsIcon from '../images/pendingpayments.png'; // Import the new icon
import totalConsumptionIcon from '../images/totalconsumption.png'; // Import the new icon
import userIcon from '../images/user.png';
import './dashboard.css'; // Import the new CSS file

// Colors for pie chart
const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [totalConsumption, setTotalConsumption] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [peakUsage, setPeakUsage] = useState(0);

  useEffect(() => {
    setLoaded(true);

    const unsubscribeConsumption = onSnapshot(collection(db, 'Users/12345ABC/Consumption'), (querySnapshot) => {
      const hourlyData = {};

      querySnapshot.docs.forEach(doc => {
        const timestamp = doc.data().timestamp;
        if (timestamp && timestamp.includes('at')) {
          const timePart = timestamp.split('at')[1].trim().split(' ')[0];
          const [hours, minutes, seconds] = timePart.split(':');
          const ampm = timestamp.includes('PM') ? 'PM' : 'AM';
          const hour = `${hours} ${ampm}`;

          if (!hourlyData[hour]) {
            hourlyData[hour] = { time: hour, kWh: 0 };
          }
          hourlyData[hour].kWh += doc.data().kwh_consumed;
        }
      });

      const formattedData = Object.values(hourlyData);
      setData(formattedData);

      // Calculate metrics
      const total = formattedData.reduce((sum, item) => sum + item.kWh, 0);
      setTotalConsumption(total.toFixed(2));
      setPeakUsage(Math.max(...formattedData.map(item => item.kWh)).toFixed(2));
    });

    const unsubscribeUsers = onSnapshot(collection(db, 'Users'), (querySnapshot) => {
      setUserCount(querySnapshot.size); // Update the user count
    });

    return () => {
      unsubscribeConsumption();
      unsubscribeUsers();
    };
  }, []);

  const handleLogout = () => {
    setLoaded(false);
    setTimeout(() => {
      auth.signOut().then(() => {
        navigate('/'); // Redirect to the landing page after logout
      }).catch((error) => {
        console.error('Error logging out: ', error);
      });
    }, 1000); // Wait for the fade-out transition to complete
  };

  return (
    <div className={`flex h-screen bg-gray-50 transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Sidebar */}
      <div className="sidebar w-64 bg-white border-r border-gray-200 h-screen">
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
            <Link to="/" className="text-gray-600 hover:text-gray-800">MetroniQ</Link> / 
            <Link to="/dashboard" className="text-gray-600 hover:text-gray-800">EB access</Link> / Dashboard 
            <div className="text-[#37BE00] font-bold">Kurishmoodu Branch</div>
          </div>
          <button className="bg-black text-white px-4 py-2 rounded hover:bg-red-500 hover:text-white" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-lg shadow-sm">
            <div className="flex items-center">
              <Zap className="w-5 h-5 mr-2 text-green-600" />
              <div>
                <p className="text-sm text-gray-600 font-bold">Peak Usage</p>
                <p className="text-2xl font-semibold">{peakUsage} kW</p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600 font-bold">Avg. Daily</p>
                <p className="text-2xl font-semibold">{(totalConsumption/30).toFixed(1)} kWh</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg shadow-sm">
            <div className="flex items-center">
              <span className="text-lg mr-2">₹</span>
              <div>
                <p className="text-sm text-gray-600 font-bold">Cost Estimate</p>
                <p className="text-2xl font-semibold">₹{(totalConsumption * 8).toFixed(0)}</p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 p-4 rounded-lg shadow-sm">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
              <div>
                <p className="text-sm text-gray-600 font-bold">Alerts</p>
                <p className="text-2xl font-semibold">2</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mr-4">
                <img src={pendingPaymentsIcon} alt="Pending Payments" className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-bold">Pending Payments</p>
                <p className="text-2xl font-semibold">5</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mr-4">
                <img src={totalConsumptionIcon} alt="Total Consumption" className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-bold">Total Consumption</p>
                <p className="text-2xl font-semibold">{totalConsumption} kWh</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mr-4">
                <img src={userIcon} alt="Users" className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-bold">Users</p>
                <p className="text-2xl font-semibold">{userCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-6">
          {/* Improved Energy Usage Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold flex items-center">
                <BarChart2 className="mr-2" /> Hourly Energy Usage
              </h3>
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                className="border rounded-lg px-3 py-1 text-sm"
              />
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                  <defs>
                    <linearGradient id="colorKWh" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" />
                      <stop offset="95%" stopColor="#22c55e" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="time" 
                    angle={-45} 
                    textAnchor="end" 
                    tick={{ fontSize: 12 }}
                    interval={0}
                  />
                  <YAxis>
                    <Label 
                      value="kWh" 
                      angle={-90} 
                      position="insideLeft" 
                      style={{ textAnchor: 'middle' }}
                    />
                  </YAxis>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Bar 
                    dataKey="kWh" 
                    fill="url(#colorKWh)" 
                    barSize={20}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Energy Distribution Pie Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-6">Energy Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="kWh"
                    nameKey="time"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {data.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend 
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                    wrapperStyle={{ paddingLeft: '20px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Daily Consumption Line Chart */}
          <div className="col-span-2 bg-white rounded-lg shadow-sm p-6 mt-4">
            <h3 className="text-lg font-semibold mb-6">Daily Consumption Trend</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="time" 
                    angle={-45} 
                    textAnchor="end" 
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="kWh" 
                    stroke="#22c55e" 
                    strokeWidth={2}
                    dot={{ fill: '#22c55e', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;