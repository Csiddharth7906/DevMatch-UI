import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const GitHubSync = ({ onSync }) => {
  const [syncing, setSyncing] = useState(false);

  const handleSync = async () => {
    setSyncing(true);
    try {
      const res = await axios.post(`${BASE_URL}/user/sync-github`, {}, { withCredentials: true });
      onSync?.(res.data.data);
      alert('GitHub repositories synced successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Sync failed');
    } finally {
      setSyncing(false);
    }
  };

  return (
    <button 
      onClick={handleSync} 
      disabled={syncing}
      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 disabled:opacity-50"
    >
      {syncing ? 'Syncing...' : 'Sync GitHub'}
    </button>
  );
};

export default GitHubSync;
