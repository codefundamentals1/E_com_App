import React from 'react'
import { AuthProvider } from './AuthProvider';
import Admin from './Admin';

const AdminApp = () => {
  return (
    <AuthProvider>
      <Admin />
    </AuthProvider>
  );

}

export default AdminApp