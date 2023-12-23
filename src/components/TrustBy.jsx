import React from "react";

function TrustBy() {
  return (
    <div className="bg-gray-100 w-full  flex items-center font-serif text-gray-400 text-xs p-5 md:text-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-5 md:gap-10">
        <h1 className="whitespace-nowrap">Trusted By:</h1>
        <div className="flex items-center gap-3 md:gap-5">
          <span>FACEBOOK</span>
          <span>Google</span>
          <span>NETFLIX</span>
          <span>P&G</span>
          <span>PayPal</span>
        </div>
      </div>
    </div>
  );
}

export default TrustBy;
