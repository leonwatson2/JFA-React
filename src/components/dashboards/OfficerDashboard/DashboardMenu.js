import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

export class DashboardMenu extends Component {

  render() {
    return (
      <div className="dashboard">
        <div className="dashboard__section card">
          <h2>Officers</h2>
          <div className="dashboard__section-list">
            <Link className="dashboard__section-list-item" to="/update/officers">
              Update Officer Info
            </Link>
            <Link className="dashboard__section-list-item" to="/update/officers/photos">
              Upload Officer Photos
            </Link>
            <Link className="dashboard__section-list-item" to="/update/officers">
              Check In/Out Props
            </Link>
            <Link className="dashboard__section-list-item" to="/update/officers">
              Accept/Deny Spotify Request
            </Link>
            <Link className="dashboard__section-list-item" to="/update/officers">
              Open Spotify
            </Link>

          </div>
        </div>
        <div className="dashboard__section card">
          <h2>Members & Checkins</h2>
          <div className="dashboard__section-list">
          
            <Link className="dashboard__section-list-item" to="/update/officers">
              Edit Members
            </Link>
            <Link className="dashboard__section-list-item" to="/update/officers">
              View Members
            </Link>
            <Link className="dashboard__section-list-item" to="/update/officers">
              Add Checkin for Event
            </Link>
            <Link className="dashboard__section-list-item" to="/update/officers">
              View Checkins for Events
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default DashboardMenu