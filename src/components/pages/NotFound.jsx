import React from "react";
import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="relative">
          <div className="text-9xl font-bold text-primary opacity-10">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center">
              <ApperIcon name="AlertCircle" size={64} className="text-error" />
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-8">
          <h1 className="text-3xl font-bold text-primary">Page Not Found</h1>
          <p className="text-gray-600 text-lg">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          <ApperIcon name="Home" size={20} />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default NotFound;