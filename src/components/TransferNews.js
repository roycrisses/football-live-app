import React, { useState } from 'react';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';

function TransferNews() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold mb-4">🔄 Transfer News & Rumors</h1>
        <p className="ds-secondary">Latest transfer updates, confirmed deals, and transfer rumors</p>
      </div>

      <div className="text-center py-12">
        <Clock className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Coming Soon</h3>
        <p className="text-gray-600">This feature is under development. Please check back later!</p>
      </div>
    </div>
  );
}

export default TransferNews;