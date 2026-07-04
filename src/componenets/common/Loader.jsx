import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex h-screen w-full items-center justify-center bg-brand-400">
      <div className="relative h-20 w-20 animate-[spin_1.5s_linear_infinite]">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute h-4 w-4 rounded-full bg-brand-500"
            style={{
              top: `${50 + 42 * Math.sin((i * 2 * Math.PI) / 12)}%`,
              left: `${50 + 42 * Math.cos((i * 2 * Math.PI) / 12)}%`,
              opacity: (i + 1) / 12,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;

