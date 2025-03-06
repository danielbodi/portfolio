import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [location.pathname]);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative"
    >
      {/* SVG Curtain overlay */}
      <motion.div
        className="fixed inset-y-0 -left-full w-[200%] z-[100] pointer-events-none"
        initial={{ x: '0%' }}
        animate={{ 
          x: '-100%',
          transition: {
            duration: 1,
            ease: [0.33, 1, 0.68, 1],
            delay: 0.4
          }
        }}
        exit={{ 
          x: '0%',
          transition: {
            duration: 1,
            ease: [0.33, 1, 0.68, 1]
          }
        }}
      >
        <svg 
          className="w-full h-full"
          viewBox="0 0 1440 1339" 
          fill="none" 
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_f_345_2610)">
            <motion.path
              fillRule="evenodd"
              clipRule="evenodd"
              fill="#2A2A32"
              d="M520.194 63.4022C619.097 63.4022 724.103 87.4126 811.319 87.4126C867.447 158.277 1157.53 61.8588 1201.49 162.445C1245.22 262.496 1289.42 463.044 1330.54 567.62C1367.64 661.952 1294.05 804.413 1279.52 921.772C1265.38 1036.03 1211.66 972.801 1174.48 1062.83C1141.25 1143.27 1029.84 1121.03 982.393 1161.88C936.645 1201.26 769.248 1307.57 722.222 1340.04C667.337 1377.95 652.25 1233.91 581.255 1343.99C526.805 1338.61 452.437 1293.93 289.094 1293.93C7.93909 1257.57 27.686 1418.16 -2.3273 1341.03C-37.1886 1251.44 -10.0479 1217.96 -10.2136 1103.46C-10.3872 983.385 -45.8171 902.196 -10.2141 806.736C15.2133 738.559 -8.01212 503.562 -8.01212 365.751C-8.01212 262.294 -7.553 68.467 -7.5524 9.01898C78.5956 9.01894 407.828 63.4022 520.194 63.4022Z"
              initial={{ scale: 1 }}
              animate={{
                scale: [1, 1.02, 1],
                transition: {
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
            />
          </g>
          <defs>
            <filter 
              id="filter0_f_345_2610" 
              x="-315.036" 
              y="-279.941" 
              width="1944.87" 
              height="1931.16" 
              filterUnits="userSpaceOnUse" 
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="144.48" result="effect1_foregroundBlur_345_2610"/>
            </filter>
          </defs>
        </svg>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          transition: {
            duration: 0.3,
            ease: [0.33, 1, 0.68, 1],
            delay: 0.8
          }
        }}
        exit={{ 
          opacity: 0,
          transition: {
            duration: 0.3,
            ease: [0.33, 1, 0.68, 1]
          }
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}