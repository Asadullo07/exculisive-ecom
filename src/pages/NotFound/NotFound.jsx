import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import './NotFound.css';

const NotFound = () => {
  const { t } = useTranslation();

  const breadcrumbsList = [
    { label: t('nav.home', 'Home'), path: '/' },
    { label: t('notFound.breadcrumb', '404 Error') }
  ];

  return (
    <div className="not-found-page">
      <Breadcrumbs items={breadcrumbsList} />

      <div className="container not-found-content">
        <h1 className="not-found-code">404 Not Found</h1>
        <p className="not-found-desc">{t('notFound.desc', 'Your visited page not found. You may go home page.')}</p>
        <Link to="/" className="btn-primary btn-back-home">
          {t('notFound.btnHome', 'Back to home page')}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
