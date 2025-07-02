import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../utils/api';

export default function EsewaSuccess() {
  const location = useLocation();
  const [status, setStatus] = useState('Verifying payment...');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const amt = params.get('amt');
    const rid = params.get('rid');
    const pid = params.get('pid');
    const scd = params.get('scd');

    if (amt && rid && pid && scd) {
      api.post('/orders/esewa/verify', { amt, rid, pid, scd })
        .then(() => {
          setStatus('Payment verified! Thank you for your purchase.');
        })
        .catch(() => {
          setStatus('Payment verification failed. Please contact support.');
        });
    } else {
      setStatus('Missing payment details.');
    }
  }, [location.search]);

  return (
    <div className="text-center mt-20">
      <h2 className="text-2xl font-bold text-green-700">eSewa Payment</h2>
      <p className="mt-4">{status}</p>
    </div>
  );
}