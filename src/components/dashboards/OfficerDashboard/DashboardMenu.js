import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

export class DashboardMenu extends Component {

  render() {
    return (
      <div>
        <h2>Officers</h2>
        <div className="card">
        <Link to="/update/officers">
          Update Info
        </Link>
        </div>
      </div>
    )
  }
}

export default DashboardMenu