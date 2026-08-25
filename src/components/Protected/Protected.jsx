import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';

function Protected() {
  const [user] = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate('/auth');
  }, [user, navigate]);

  return <Outlet />;
}

export default Protected;
