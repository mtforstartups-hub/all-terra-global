import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import EditProfile from '../Edit Profile/editprofile';

// Simple high-quality inline SVG components for icons
const Icons = {
  Overview: () => <svg width="23" height="23" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="6" height="6"></rect><rect x="13" y="3" width="6" height="6"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>,
  Profile: () => <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
  Briefcase: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>,
  Settings: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>,
  LogOut: () => <svg width="25" height="25" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>,
  Search: () => <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
  Bell: () => <svg width="23" height="23" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>,
  Livedeals: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{/* Tag shape */}<path d="M20 12l-8 8-8-8 8-8h6a2 2 0 0 1 2 2z"></path>{/* Hole */}<circle cx="16" cy="8" r="1"></circle>{/* Live pulse */}<circle cx="8" cy="16" r="1.5"><animate attributeName="r" values="1.5;3;1.5" dur="1s" repeatCount="indefinite" /><animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" /></circle></svg>),
  Menu: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>,
  Close: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
};

const UserProfile = ({ onEditClick }) => (
  <div className="profile-section card glass">
    <div className="profile-header">
      <div className="avatar">
        <span className="avatar-initials">JD</span>
        <div className="status-indicator online"></div>
      </div>
      <div className="profile-info">
        <h2>John Doe</h2>
        <p className="role">Premium Investor</p>
        <div className="profile-badges">
          <span className="badge verify">✓ Verified</span>
          <span className="badge pro">PRO</span>
        </div>
      </div>
      <button className="edit-profile-btn" onClick={onEditClick}>Edit Profile</button>
    </div>
    <div className="profile-details-grid">
      <div className="detail-item">
        <span className="detail-label">Email</span>
        <span className="detail-value">john.doe@allteraglobal.com</span>
      </div>
      <div className="detail-item">
        <span className="detail-label">Phone</span>
        <span className="detail-value">000000000</span>
      </div>
      <div className="detail-item">
        <span className="detail-label">Location</span>
        <span className="detail-value">New York, USA</span>
      </div>
      <div className="detail-item">
        <span className="detail-label">Joined</span>
        <span className="detail-value">March 2023</span>
      </div>
    </div>
  </div>
);

/*const InvestmentDetails = () => (
  <div className="investment-section">
    <div className="investment-overview">
      <div className="stat-card glass primary-grad">
        <div className="stat-icon p-icon">📈</div>
        <div className="stat-content">
          <h3>Total Portfolio Value</h3>
          <div className="stat-value">.00</div>
          <div className="stat-change positive">+0% this month</div>
        </div>
      </div>
      <div className="stat-card glass border-card">
        <div className="stat-icon bg-blue">🏢</div>
        <div className="stat-content">
          <h3>Real Estate Assets</h3>
          <div className="stat-value">00</div>
          <div className="stat-change positive">+0%this month</div>
        </div>
      </div>
      <div className="stat-card glass border-card">
        <div className="stat-icon bg-purple">⚡</div>
        <div className="stat-content">
          <h3>Tech Equities</h3>
          <div className="stat-value">00</div>
          <div className="stat-change negative">-0% this month</div>
        </div>
      </div>
    </div>

    <div className="investment-details-grid">
      <div className="card glass border-card">
        <div className="card-header">
          <h3>Active Investments</h3>
          <button className="btn-link">View All</button>
        </div>
        <div className="table-responsive">
          <table className="investment-table">
            <thead>
              <tr>
                <th>Asset Name</th>
                <th>Category</th>
                <th>Amount Invested</th>
                <th>Current Value</th>
                <th>ROI</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="asset-name">
                    <span className="asset-icon">🏢</span>
                    <span>Downtown Commercial Blvd</span>
                  </div>
                </td>
                <td>Real Estate</td>
                <td>000</td>
                <td>000</td>
                <td className="positive">+0%</td>
                <td><span className="status-badge active">Active</span></td>
              </tr>
              <tr>
                <td>
                  <div className="asset-name">
                    <span className="asset-icon">🏘️</span>
                    <span>Sunset Residential Complex</span>
                  </div>
                </td>
                <td>Real Estate</td>
                <td>000</td>
                <td>000</td>
                <td className="positive">0%</td>
                <td><span className="status-badge active">Active</span></td>
              </tr>
              <tr>
                <td>
                  <div className="asset-name">
                    <span className="asset-icon">🤖</span>
                    <span>AI Tech Fund Alpha</span>
                  </div>
                </td>
                <td>Equities</td>
                <td>00</td>
                <td>00</td>
                <td className="negative">-0%</td>
                <td><span className="status-badge active">Active</span></td>
              </tr>
              <tr>
                <td>
                  <div className="asset-name">
                    <span className="asset-icon">🌱</span>
                    <span>Green Energy Bonds</span>
                  </div>
                </td>
                <td>Fixed Income</td>
                <td>00</td>
                <td>00</td>
                <td className="positive">+0%</td>
                <td><span className="status-badge matured">Matured</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card glass border-card">
        <div className="card-header">
          <h3>Portfolio Allocation</h3>
        </div>
        <div className="allocation-chart-container">
          <div className="donut-chart">
            <div className="donut-hole">
              <span className="donut-center-text">3 Assets</span>
            </div>
          </div>
          <div className="chart-legend">
            <div className="legend-item">
              <span className="legend-color real-estate"></span>
              <span className="legend-label">Real Estate (68%)</span>
            </div>
            <div className="legend-item">
              <span className="legend-color equities"></span>
              <span className="legend-label">Tech Equities (32%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);*/
const Livedeals = () => (
  <div className='dashboard-section section-Livedeals fade-in'>
    <h2>Currently no live deals</h2>
  </div>
);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="dashboard-layout fade-in">
      <div className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={() => setIsSidebarOpen(false)}></div>
      <aside className={`sidebar glass border-card ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header-mobile">
          <div className="sidebar-brand">
            <div className="brand-logo">A</div>
            <h2>All Terra Global</h2>
          </div>
          <button className="mobile-close-btn" onClick={() => setIsSidebarOpen(false)}>
            <Icons.Close />
          </button>
        </div>
        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <span className="nav-icon"><Icons.Overview /></span>
            Overview
          </button>
          <button
            className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <span className="nav-icon"><Icons.Profile /></span>
            My Profile
          </button>
          <button
            className={`nav-item ${activeTab === 'investments' ? 'active' : ''}`}
            onClick={() => setActiveTab('investments')}
          >
            <span className="nav-icon"><Icons.Briefcase /></span>
            My Investments
          </button>
          <button
            className={`nav-item ${activeTab === 'Livedeals' ? 'active' : ''}`}
            onClick={() => setActiveTab('Livedeals')}
          >
            <span className="nav-icon"><Icons.Livedeals /></span>
            Live Deals
          </button>
        </nav>
        <div className="sidebar-footer">
          <button className="nav-item logout">
            <span className="nav-icon"><Icons.LogOut /></span>
            Log Out
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <button className="menu-toggle-btn" onClick={toggleSidebar}>
              <Icons.Menu />
            </button>
            <div className="search-bar">
              <span className="search-icon"><Icons.Search /></span>
              <input type="text" placeholder="Search investments, transactions..." />
            </div>
          </div>
          <div className="topbar-actions">
            <button className="action-btn notifications">
              <Icons.Bell />
              <span className="badge-dot"></span>
            </button>
            <div className="user-menu" onClick={() => setActiveTab('profile')}>
              <div className="user-avatar-small"></div>
              <span className="user-name-small">John Doe</span>
            </div>
          </div>
        </header>

        <div className="content-scroll">
          <div className="page-header">
            <h1>{activeTab === 'overview' ? 'Dashboard Overview' :
              activeTab === 'profile' ? 'My Profile' :
                activeTab === 'Livedeals' ? 'Livedeals' :
                  activeTab === 'editProfile' ? 'Edit Profile' : 'Investment Portfolio'}
            </h1>
            <p className="page-subtitle">Welcome back, John. Here is what's happening with your account.</p>
          </div>

          <div className="dashboard-content fade-in">
            {(activeTab === 'overview' || activeTab === 'profile') && (
              <section className="dashboard-section section-profile fade-in">
                <UserProfile onEditClick={() => setActiveTab('editProfile')} />
              </section>
            )}

            {activeTab === 'editProfile' && (
              <section className="dashboard-section section-edit-profile fade-in">
                <EditProfile
                  onSave={(data) => { console.log('Saved:', data); setActiveTab('profile'); }}
                  onCancel={() => setActiveTab('profile')}
                />
              </section>
            )}

            {/*(activeTab === 'overview' || activeTab === 'investments') && (
              <section className="dashboard-section section-investments fade-in">
                <InvestmentDetails />
              </section>
            )*/}
            {(activeTab === 'Livedeals') && (
              <section className="dashboard-section section-Livedeals fade-in">
                <Livedeals />
              </section>)}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
