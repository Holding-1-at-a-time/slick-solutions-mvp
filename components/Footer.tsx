import React from "react";

export function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-center text-gray-600">
          © {new Date().getFullYear()} Slick Solutions. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
