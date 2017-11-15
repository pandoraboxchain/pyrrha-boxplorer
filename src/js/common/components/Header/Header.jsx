import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, MenuItem, DropdownButton } from 'react-bootstrap';

import './Header.css';

class Header extends PureComponent {
  render() {
    const { pathname } = this.props.location;

    // const isHome = pathname === '/';
    const isWorkers = pathname === '/workers';
    const isJobs = pathname === '/jobs';
    const isKernels = pathname === '/kernels';
    const isDatasets = pathname === '/datasets';

    return (
      <header className="globalHeader">
        <div className='logo'>
          <Link to="/">BOXPLORER</Link>
        </div>
        <ul>
          <li className={!isWorkers ? 'active' : ''}>
            {
              isWorkers ?
                'Workers' : <Link to="/workers">Workers</Link>

            }
          </li>
          <li className={!isJobs ? 'active' : ''}>
            {
              isJobs ?
                'Jobs' : <Link to="/jobs">Jobs</Link>
            }
          </li>
          <li className={!isKernels ? 'active' : ''}>
            {
              isKernels ?
                'Kernels' : <Link to="/kernels">Kernels</Link>
            }
          </li>
          <li className={!isDatasets ? 'active' : ''}>
            {
              isDatasets ?
                'Datasets' : <Link to="/datasets">Datasets</Link>
            }
          </li>
        </ul>
      </header>
    );
  }
}

export default Header;
