import Link from "next/link";

export default function Profile() {
  return (
    <>
      <div className="page-header">
        <h1>Profile</h1>
        <p className="page-subtitle">
          Welcome back, John. Here is what's happening with your account.
        </p>
      </div>
      <div className="dashboard-content fade-in">
        <section className="dashboard-section section-overview fade-in">
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
              <Link href="/dashboard/profile/edit" className="edit-profile-btn">
                Edit Profile
              </Link>
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
        </section>
      </div>
    </>
  );
}
