import React, { useEffect, useRef, useState } from 'react';

const AdBanner = ({ adSlot = "5352978920", className = "", fallback = null }) => {
  const adRef = useRef(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const [adError, setAdError] = useState(false);

  useEffect(() => {
    // Initialize AdSense ad when component mounts
    if (adRef.current && window.adsbygoogle) {
      try {
        // Set a timeout to detect if ad fails to load
        const adTimeout = setTimeout(() => {
          if (!adLoaded) {
            setAdError(true);
            console.log('AdSense ad failed to load within timeout');
          }
        }, 10000); // 10 second timeout

        // Initialize the ad
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        
        // Listen for ad load events
        const handleAdLoad = () => {
          setAdLoaded(true);
          clearTimeout(adTimeout);
        };

        // Add event listener for ad load
        if (adRef.current) {
          adRef.current.addEventListener('load', handleAdLoad);
        }

        return () => {
          clearTimeout(adTimeout);
          if (adRef.current) {
            adRef.current.removeEventListener('load', handleAdLoad);
          }
        };
      } catch (error) {
        console.log('AdSense initialization error:', error);
        setAdError(true);
      }
    } else {
      // If AdSense script is not loaded, show fallback
      setAdError(true);
    }
  }, [adLoaded]);

  // Show fallback content if ad fails to load
  if (adError && fallback) {
    return (
      <div className={`ad-container ${className}`}>
        <div className="text-center text-gray-400 text-sm py-4">
          {fallback}
        </div>
      </div>
    );
  }

  return (
    <div className={`ad-container ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-7749661318330944"
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      {!adLoaded && !adError && (
        <div className="text-center text-gray-400 text-sm py-2">
          Loading advertisement...
        </div>
      )}
    </div>
  );
};

export default AdBanner;
