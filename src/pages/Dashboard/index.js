import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getDashboardList } from "../../actions/dashboard";

import "./Dashboard.scss";

const Dashboard = () => {

  const dispatch = useDispatch();

  const [dashboardData, setDashboardData] = useState({});

  // Listing
  useEffect(() => {
    dispatch(getDashboardList())
      .then((response) => { setDashboardData(response?.data); })
      .catch((error) => error?.message);
  }, [dispatch]);


  return (
    <>
      <div className="shadow-paper auto-height">
        <div className="row">
          <div className="col-md-12">
            <h2 className="big mar-bottom-30">Dashboard</h2>
          </div>
          <div className="col-lg-4">
            <div className="dashboard-info">
              <span className="number">
                {dashboardData?.total_current_user}
              </span>
              <h2 className="d-title">Total Users</h2>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="dashboard-info">
              <span className="number">{dashboardData?.total_funder}</span>
              <h2 className="d-title">Total Funders</h2>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="dashboard-info">
              <span className="number">{dashboardData?.total_broker}</span>
              <h2 className="d-title">Total Brokers</h2>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="dashboard-info">
              <span className="number">{dashboardData?.active_user}</span>
              <h2 className="d-title">Total Subscribed Users</h2>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="dashboard-info">
              <span className="number">
                {dashboardData?.total_subcr_funder}
              </span>
              <h2 className="d-title">Total Subscribed Funders</h2>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="dashboard-info">
              <span className="number">
                {dashboardData?.total_subcr_broker}
              </span>
              <h2 className="d-title">Total Subscribed Brokers</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
