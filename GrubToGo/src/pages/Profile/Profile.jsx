import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { getUser } from '../../services/firestoreService';
import './Profile.css';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          setError('Not logged in');
          setLoading(false);
          return;
        }

        const data = await getUser(currentUser.uid);
        if (data) {
          setUserData(data);
        } else {
          setError('User profile not found');
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-loading">
          <div className="profile-loading-spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-page">
        <div className="profile-error">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <h1>My Profile</h1>
          <span className={`profile-role-badge ${userData.role}`}>
            {userData.role}
          </span>
        </div>

        <div className="profile-info">
          <div className="profile-field">
            <label className="profile-label">Email Address</label>
            <div className="profile-value">{userData.email}</div>
          </div>

          {userData.role === 'student' && (
            <div className="profile-field">
              <label className="profile-label">Dining Dollars Balance</label>
              <div className="profile-value profile-balance">
                ${userData.diningDollars?.toFixed(2) || '0.00'}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
