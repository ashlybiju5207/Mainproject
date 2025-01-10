import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, MoreVertical } from 'lucide-react';

const Reports = () => {
  const location = useLocation();
  
  const reports = [
    { id: 1, user: "Mithilesh Kumar Singh", address: "Kritipur, Kathmandu", date: "12.Jan.2021", reason: "Prepaid plan exhausted" },
    { id: 2, user: "Suron Maharjan", address: "Natole, Lalitpur", date: "21.Feb.2021", reason: "Power Outage" },
    { id: 3, user: "Sandesh Bajracharya", address: "Bhinchhebahal, Lalitpur", date: "13.Mar.2021", reason: "Prepaid plan exhausted" },
    { id: 4, user: "Subin Sedhai", address: "Baneshwor, Kathmandu", date: "24.Jan.2021", reason: "Prepaid plan exhausted" },
    { id: 5, user: "Wonjala Joshi", address: "Bhaisepati, Lalitpur", date: "21.Sep.2021", reason: "Power Outage" },
    { id: 6, user: "Numa Limbu", address: "Sampang Chowk,Dharan", date: "21.Sep.2021", reason: "Power Outage" },
    { id: 7, user: "Nimesh Sthapit", address: "Newroad, Pokhara", date: "21.Sep.2021", reason: "Prepaid plan exhausted" },
    { id: 8, user: "Samikshya Basnet", address: "Nakhipot, Lalitpur", date: "21.Sep.2021", reason: "Power Outage" },
    { id: 9, user: "Sushant Kushwar", address: "Sinamangal, Kathmandu", date: "21.Sep.2021", reason: "Power Outage" },
    { id: 10, user: "Hrishav Gajurel", address: "Khumaltar, Lalitpur", date: "21.Sep.2021", reason: "Prepaid plan exhausted" },
    { id: 11, user: "Tisha Joshi", address: "Ason, Kathmandu", date: "21.Sep.2021", reason: "Power Outage" }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-6">EB Access</h2>
          <nav className="space-y-1">
            <Link to="/dashboard" className={`flex items-center p-2 rounded-lg ${location.pathname === '/dashboard' ? 'bg-green-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
              <span className="mr-3">📊</span>
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
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto py-6 px-4">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-600 mb-6">
            MetroniQ/EB access/Reports/
            <span className="text-green-500">Kurishmoodu Branch</span>
          </div>

          {/* Report Section */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Report</h2>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <MoreVertical className="h-5 w-5 text-gray-500" />
                </button>
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
                      Reason <ChevronDown className="inline h-4 w-4" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report) => (
                    <tr key={report.id} className="border-b last:border-b-0">
                      <td className="py-3 px-4 text-blue-600">{report.user}</td>
                      <td className="py-3 px-4 text-gray-600">{report.address}</td>
                      <td className="py-3 px-4 text-gray-600">{report.date}</td>
                      <td className="py-3 px-4 text-gray-600">{report.reason}</td>
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

export default Reports;