import React from "react";

function Footer() {
  return (
    <footer className="w-full bg-gray-100 border-t py-4 px-6 mt-10">
      <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">     
        <p>© {new Date().getFullYear()} Project Report System v1.0.0</p>

        <p className="mt-2 sm:mt-0">
          If any issue with the system, contact us at{" "}
          <a href="mailto:support@projectsystem.com" className="text-blue-600 font-medium cursor-pointer hover:underline">
            support@projectsystem.com
          </a >
        </p>
      </div>
    </footer>
  );
}

export default Footer;
