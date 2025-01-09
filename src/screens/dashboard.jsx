import React from 'react';
import { FaUsers, FaDollarSign } from 'react-icons/fa';
import { RiFlashlightFill } from 'react-icons/ri';

function Dashboard() {
  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', backgroundColor: '#f4f4f4', padding: '20px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '20px', color: '#333' }}>EB access</h2>
        <ul style={{ listStyle: 'none', padding: '0' }}>
          <li style={{ padding: '10px', cursor: 'pointer', color: '#333', fontWeight: 'bold' }}>Dashboard</li>
          <li style={{ padding: '10px', cursor: 'pointer', color: '#333' }}>Payments</li>
          <li style={{ padding: '10px', cursor: 'pointer', color: '#333' }}>Reports</li>
        </ul>
      </div>

      {/* Content */}
      <div style={{ flex: '1', padding: '20px', backgroundColor: '#fff' }}>
        {/* Header */}
        <header>
          <h1 style={{ fontSize: '24px', color: '#333' }}>MetroniQ</h1>
        </header>

        {/* Overview Section */}
        <div style={{ marginTop: '20px' }}>
          <h3 style={{ color: 'green', fontSize: '18px', marginBottom: '10px' }}>Kurishmoodu Branch</h3>
          <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
            {/* User Card */}
            <div style={{
              flex: '1', display: 'flex', alignItems: 'center', padding: '15px',
              backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
              <FaUsers style={{ fontSize: '24px', color: '#4CAF50', marginRight: '10px' }} />
              <div>
                <p style={{ marginBottom: '5px', color: '#333' }}>Users</p>
                <h4 style={{ margin: '0', fontSize: '20px', color: '#333' }}>1</h4>
              </div>
            </div>

            {/* Pending Payments Card */}
            <div style={{
              flex: '1', display: 'flex', alignItems: 'center', padding: '15px',
              backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
              <FaDollarSign style={{ fontSize: '24px', color: '#4CAF50', marginRight: '10px' }} />
              <div>
                <p style={{ marginBottom: '5px', color: '#333' }}>Pending Payments</p>
                <h4 style={{ margin: '0', fontSize: '20px', color: '#333' }}>Rs. 2000</h4>
              </div>
            </div>

            {/* Total Consumption Card */}
            <div style={{
              flex: '1', display: 'flex', alignItems: 'center', padding: '15px',
              backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
              <RiFlashlightFill style={{ fontSize: '24px', color: '#4CAF50', marginRight: '10px' }} />
              <div>
                <p style={{ marginBottom: '5px', color: '#333' }}>Total Consumption</p>
                <h4 style={{ margin: '0', fontSize: '20px', color: '#333' }}>10 kWh</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Energy Usage Section */}
        <div>
          <h3 style={{ fontSize: '18px', color: '#333', marginBottom: '10px' }}>Energy Usage</h3>
          <div style={{
            width: '100%', height: '300px', backgroundColor: '#f9f9f9',
            borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            {/* Empty container for the graph */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
