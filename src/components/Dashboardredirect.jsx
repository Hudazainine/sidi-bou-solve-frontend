import React from 'react';
import { Navigate } from 'react-router-dom';

const DashboardRedirect = () => {
    const token = localStorage.getItem('access_token');
    const userSlug = localStorage.getItem('user_slug');

    if (token && userSlug) {
        return <Navigate to={`/${userSlug}`} replace />;
    } else {
        return <Navigate to="/login" replace />;
    }


};

export default DashboardRedirect;