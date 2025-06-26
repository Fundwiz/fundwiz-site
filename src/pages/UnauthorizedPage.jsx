import React from 'react';
import { Link } from 'react-router-dom';

export default function UnauthorizedPage() {
  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <h1 className="text-2xl font-semibold mb-4 text-red-600">
        Access Restricted
      </h1>
      <p className="mb-6 text-gray-700">
        Your account is not authorized to view this content. If you believe
        this is an error or would like to gain access, please contact our
        support team.
      </p>
      <Link to="/contact" className="text-blue-600 hover:underline">
        Contact Support
      </Link>
    </div>
  );
}
