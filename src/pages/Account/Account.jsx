import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useShop } from '../../context/ShopContext';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { sendTelegramMessage } from '../../utils/telegram';
import './Account.css';

const Account = () => {
  const { t } = useTranslation();
  const { user, loginUser, showToast } = useShop();

  const [activeTab, setActiveTab] = useState('profile');

  const [profileForm, setProfileForm] = useState({
    firstName: user?.name ? user.name.split(' ')[0] : 'Md',
    lastName: user?.name ? user.name.split(' ').slice(1).join(' ') : 'Rimel',
    email: user?.email || 'rimel1111@gmail.com',
    address: user?.address || 'Kingston, 5236, United State',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (profileForm.newPassword && profileForm.newPassword !== profileForm.confirmPassword) {
      showToast('New passwords do not match!', 'info');
      return;
    }

    sendTelegramMessage(
      `<b>PROFIL TAHRIRLANDI (Account):</b>\n\n` +
      `<b>Ism:</b> ${profileForm.firstName} ${profileForm.lastName}\n` +
      `<b>Email:</b> ${profileForm.email}\n` +
      `<b>Manzil:</b> ${profileForm.address}\n` +
      `${profileForm.newPassword ? '<b>Yangi parol kiritildi</b>\n' : ''}` +
      `<b>Vaqt:</b> ${new Date().toLocaleString()}`
    );

    loginUser({
      name: `${profileForm.firstName} ${profileForm.lastName}`.trim(),
      email: profileForm.email,
      address: profileForm.address
    });

    showToast(t('account.savedSuccess', 'Profile updated successfully!'), 'success');
  };

  const breadcrumbsList = [
    { label: t('nav.home', 'Home'), path: '/' },
    { label: t('account.myProfile', 'My Account') }
  ];

  return (
    <div className="account-page">
      <div className="container account-header-wrap">
        <Breadcrumbs items={breadcrumbsList} />
        <div className="account-welcome">
          <span>{t('account.welcome', 'Welcome!')} </span>
          <span className="user-name-highlight">
            {profileForm.firstName} {profileForm.lastName}
          </span>
        </div>
      </div>

      <div className="container account-container">
        <aside className="account-sidebar">
          <div className="sidebar-group">
            <h4 className="sidebar-group-title">{t('account.manageAccount', 'Manage My Account')}</h4>
            <ul className="sidebar-sub-list">
              <li>
                <button
                  className={`sidebar-sub-link ${activeTab === 'profile' ? 'active' : ''}`}
                  onClick={() => setActiveTab('profile')}
                >
                  {t('account.myProfile', 'My Profile')}
                </button>
              </li>
              <li>
                <button
                  className={`sidebar-sub-link ${activeTab === 'address' ? 'active' : ''}`}
                  onClick={() => setActiveTab('address')}
                >
                  {t('account.addressBook', 'Address Book')}
                </button>
              </li>
              <li>
                <button
                  className={`sidebar-sub-link ${activeTab === 'payment' ? 'active' : ''}`}
                  onClick={() => setActiveTab('payment')}
                >
                  {t('account.myPayment', 'My Payment Options')}
                </button>
              </li>
            </ul>
          </div>

          <div className="sidebar-group">
            <h4 className="sidebar-group-title">{t('account.myOrders', 'My Orders')}</h4>
            <ul className="sidebar-sub-list">
              <li>
                <button
                  className={`sidebar-sub-link ${activeTab === 'returns' ? 'active' : ''}`}
                  onClick={() => setActiveTab('returns')}
                >
                  {t('account.myReturns', 'My Returns')}
                </button>
              </li>
              <li>
                <button
                  className={`sidebar-sub-link ${activeTab === 'cancellations' ? 'active' : ''}`}
                  onClick={() => setActiveTab('cancellations')}
                >
                  {t('account.myCancellations', 'My Cancellations')}
                </button>
              </li>
            </ul>
          </div>

          <div className="sidebar-group">
            <Link to="/wishlist" className="sidebar-single-title">
              {t('account.myWishlist', 'My WishList')}
            </Link>
          </div>
        </aside>

        <main className="account-main-card">
          <h2 className="card-headline">{t('account.editProfile', 'Edit Your Profile')}</h2>

          <form className="profile-edit-form" onSubmit={handleSaveProfile}>
            <div className="form-row-2">
              <div className="form-field">
                <label>{t('account.firstName', 'First Name')}</label>
                <input
                  type="text"
                  name="firstName"
                  value={profileForm.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-field">
                <label>{t('account.lastName', 'Last Name')}</label>
                <input
                  type="text"
                  name="lastName"
                  value={profileForm.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-field">
                <label>{t('account.email', 'Email')}</label>
                <input
                  type="email"
                  name="email"
                  value={profileForm.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-field">
                <label>{t('account.address', 'Address')}</label>
                <input
                  type="text"
                  name="address"
                  value={profileForm.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="password-section">
              <h3 className="sub-headline">{t('account.passwordChanges', 'Password Changes')}</h3>
              <div className="password-fields-stack">
                <input
                  type="password"
                  name="currentPassword"
                  placeholder={t('account.currentPassword', 'Current Password')}
                  value={profileForm.currentPassword}
                  onChange={handleInputChange}
                />
                <input
                  type="password"
                  name="newPassword"
                  placeholder={t('account.newPassword', 'New Password')}
                  value={profileForm.newPassword}
                  onChange={handleInputChange}
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder={t('account.confirmNewPassword', 'Confirm New Password')}
                  value={profileForm.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-buttons-row">
              <button
                type="button"
                className="btn-cancel"
                onClick={() => {
                  setProfileForm({
                    firstName: user?.name ? user.name.split(' ')[0] : 'Md',
                    lastName: user?.name ? user.name.split(' ').slice(1).join(' ') : 'Rimel',
                    email: user?.email || 'rimel1111@gmail.com',
                    address: user?.address || 'Kingston, 5236, United State',
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                  });
                }}
              >
                {t('account.cancel', 'Cancel')}
              </button>
              <button type="submit" className="btn-primary">
                {t('account.saveChanges', 'Save Changes')}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Account;
