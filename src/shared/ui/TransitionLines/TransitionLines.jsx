export const TransitionLines = () => {
  return (
    <div className="transition-lines">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1080 1920"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Лучик */}
          <linearGradient id="beamGradient1">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="beamGradient2">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="beamGradient3">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="beamGradient4">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Основные линии */}
        <g className="base-lines">
          <path
            id="path1"
            d="M 461,-1556.190762676319 C 523.8,-1364.19 835.2,-980.19 775,-596.190762676319 C 714.8,-212.19 123.4,-20.19 160,363.80923732368103 C 196.6,747.81 911.4,1012.57 958,1323.809237323681 C 1004.6,1635.05 506,1800.76 393,1920"
          />

          <path
            id="path2"
            d="M 621,-1277.967896952123 C 572.2,-1085.97 355,-701.97 377,-317.96789695212306 C 399,66.03 733,258.03 731,642.032103047877 C 729,1026.03 379.6,1346.44 367,1602.032103047877 C 354.4,1857.63 607.8,1856.41 668,1920"
          />

          <path
            id="path3"
            d="M 613,-506.71190172795593 C 582.4,-314.71 406.6,69.29 460,453.28809827204407 C 513.4,837.29 948.8,1029.29 880,1413.288098272044 C 811.2,1797.29 155.2,2271.95 116,2373.288098272044 C 76.8,2474.63 570.4,2010.66 684,1920"
          />

          <path
            id="path4"
            d="M 127,-502.5574546589673 C 262,-310.56 726.4,73.44 802,457.4425453410327 C 877.6,841.44 554.2,1033.44 505,1417.4425453410327 C 455.8,1801.44 629.6,2276.93 556,2377.4425453410327 C 482.4,2477.95 220.8,2011.49 137,1920"
          />
        </g>

        {/* Лучики */}
        <g className="glow-lines">
          <circle r="3" fill="url(#beamGradient1)" filter="url(#glow)">
            <animateMotion dur="6s" repeatCount="indefinite" rotate="auto">
              <mpath href="#path1" />
            </animateMotion>
          </circle>

          <circle r="3" fill="url(#beamGradient2)" filter="url(#glow)">
            <animateMotion
              dur="7s"
              begin="1.5s"
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath href="#path2" />
            </animateMotion>
          </circle>

          <circle r="3" fill="url(#beamGradient3)" filter="url(#glow)">
            <animateMotion
              dur="8s"
              begin="3s"
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath href="#path3" />
            </animateMotion>
          </circle>

          <circle r="3" fill="url(#beamGradient4)" filter="url(#glow)">
            <animateMotion
              dur="6.5s"
              begin="4.5s"
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath href="#path4" />
            </animateMotion>
          </circle>
        </g>
      </svg>
    </div>
  );
};
