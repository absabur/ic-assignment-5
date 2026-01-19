import React from "react";

const LoadingSpinner = ({ fullPage = false }) => {
  if (fullPage) {
    return (
      <div className="loading-overlay">
        <div className="spinner"></div>
        <p>Loading...</p>
        <p>
          Please wait! I am using free backend hosting. It may take a while to
          start first time.
        </p>
        <style>{`
          .loading-overlay {
            position: fixed;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            background: rgba(255, 255, 255, 0.9);
            z-index: 1000;
            gap: 20px;
          }

          .spinner {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #28a745;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="spinner-inline">
      <div className="spinner"></div>
      <style>{`
        .spinner-inline {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .spinner {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #28a745;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
