import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './CountdownTimer.css';

const CountdownTimer = ({ targetDate = null, variant = 'flash' }) => {
  const { t } = useTranslation();

  const [timeLeft, setTimeLeft] = useState(() => {
    const end = targetDate ? new Date(targetDate).getTime() : Date.now() + (3 * 24 + 23) * 60 * 60 * 1000 + 19 * 60 * 1000 + 56 * 1000;
    return Math.max(0, end - Date.now());
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1000) {
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const format2 = (val) => String(val).padStart(2, '0');

  if (variant === 'circles') {
    return (
      <div className="countdown-circles">
        <div className="countdown-circle">
          <span className="circle-num">{format2(days)}</span>
          <span className="circle-label">{t('flashSales.days', 'Days')}</span>
        </div>
        <div className="countdown-circle">
          <span className="circle-num">{format2(hours)}</span>
          <span className="circle-label">{t('flashSales.hours', 'Hours')}</span>
        </div>
        <div className="countdown-circle">
          <span className="circle-num">{format2(minutes)}</span>
          <span className="circle-label">{t('flashSales.minutes', 'Minutes')}</span>
        </div>
        <div className="countdown-circle">
          <span className="circle-num">{format2(seconds)}</span>
          <span className="circle-label">{t('flashSales.seconds', 'Seconds')}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="countdown-flash">
      <div className="countdown-unit">
        <span className="unit-label">{t('flashSales.days', 'Days')}</span>
        <span className="unit-value">{format2(days)}</span>
      </div>
      <span className="countdown-colon">:</span>
      <div className="countdown-unit">
        <span className="unit-label">{t('flashSales.hours', 'Hours')}</span>
        <span className="unit-value">{format2(hours)}</span>
      </div>
      <span className="countdown-colon">:</span>
      <div className="countdown-unit">
        <span className="unit-label">{t('flashSales.minutes', 'Minutes')}</span>
        <span className="unit-value">{format2(minutes)}</span>
      </div>
      <span className="countdown-colon">:</span>
      <div className="countdown-unit">
        <span className="unit-label">{t('flashSales.seconds', 'Seconds')}</span>
        <span className="unit-value">{format2(seconds)}</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
