import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Dashboard() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-6">EB Access</h2>
          <nav className="space-y-1">
            <Link to="/dashboard" className={`flex items-center p-2 rounded-lg ${location.pathname === '/dashboard' ? 'bg-green-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
              <span className="mr-3">⬚</span>
              Dashboard
            </Link>
            <Link to="/payments" className={`flex items-center p-2 rounded-lg ${location.pathname === '/payments' ? 'bg-green-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
              <span className="text-green-500 mr-3">📄</span>
              Payments
            </Link>
            <Link to="/reports" className={`flex items-center p-2 rounded-lg ${location.pathname === '/reports' ? 'bg-green-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
              <span className="text-green-500 mr-3">📊</span>
              Reports
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="mb-8">
          MetroniQ/EB access/Dashboard/
          <span className="text-green-500">Kurishmoodu Branch</span>
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
            <span className="mr-2">📈</span> Energy Usage
          </h3>
          <div className="h-[400px] bg-gray-50 rounded-lg flex items-center justify-center">
            {/* Empty container for the graph */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;