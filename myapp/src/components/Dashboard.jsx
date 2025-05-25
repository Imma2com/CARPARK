import React from 'react';

const Dashboard = () => {
  // Mock data for demonstration
  const orders = [
    { id: 'ORD001', item: 'Box A', status: 'Packed', spaceUsed: 10 },
    { id: 'ORD002', item: 'Box B', status: 'Pending', spaceUsed: 0 },
    { id: 'ORD003', item: 'Box C', status: 'Packed', spaceUsed: 15 },
    { id: 'ORD004', item: 'Box D', status: 'Packed', spaceUsed: 20 },
  ];

  const totalSpace = 100; // e.g., total space available in the system
  const usedSpace = orders.reduce((acc, order) => acc + order.spaceUsed, 0);
  const freeSpace = totalSpace - usedSpace;

  const totalOrders = orders.length;
  const packedOrders = orders.filter((order) => order.status === 'Packed').length;
  const pendingOrders = totalOrders - packedOrders;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Packing System Dashboard</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', margin: '20px 0' }}>
        <InfoCard title="Total Orders" value={totalOrders} />
        <InfoCard title="Packed Orders" value={packedOrders} />
        <InfoCard title="Pending Orders" value={pendingOrders} />
        <InfoCard title="Total Space" value={`${totalSpace} units`} />
        <InfoCard title="Used Space" value={`${usedSpace} units`} />
        <InfoCard title="Free Space" value={`${freeSpace} units`} />
      </div>

      <h3>Recent Orders</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr>
            <th style={thStyle}>Order ID</th>
            <th style={thStyle}>Item</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Space Used</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td style={tdStyle}>{order.id}</td>
              <td style={tdStyle}>{order.item}</td>
              <td style={tdStyle}>{order.status}</td>
              <td style={tdStyle}>{order.spaceUsed} units</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const InfoCard = ({ title, value }) => (
  <div style={cardStyle}>
    <h4 style={{ margin: '0 0 10px' }}>{title}</h4>
    <p style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>{value}</p>
  </div>
);

const cardStyle = {
  flex: '1 1 200px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '15px',
  background: '#f5f5f5',
  textAlign: 'center',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

const thStyle = {
  textAlign: 'left',
  padding: '10px',
  backgroundColor: '#eaeaea',
  borderBottom: '2px solid #ccc',
};

const tdStyle = {
  padding: '10px',
  borderBottom: '1px solid #eee',
};

export default Dashboard;
