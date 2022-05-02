import React from 'react';
import MetaData from '../layout/MetaData';
import DashboardLayout from './DashboardLayout';
import DashboardStats from './DashboardStats';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <MetaData title="Dashboard" />
      <div className="space-y-5">
        <h2 className="text-2xl font-medium tracking-wide text-gray-900">
          All stats
        </h2>

        <DashboardStats />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
