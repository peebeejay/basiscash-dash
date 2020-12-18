import { forwardRef, Ref, SVGAttributes } from 'react';

export const BasisCashLogo = forwardRef(
  (props: SVGAttributes<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      ref={ref}
    >
      <path
        d="M122 61.414C73.649 88.686 41 140.53 41 200c0 87.813 71.187 159 159 159s159-71.187 159-159S287.813 41 200 41c-28.344 0-54.955 7.416-78 20.414zm0 0V280.5m158-1.5c0 43.63-35.37 79-79 79s-79-35.37-79-79 35.37-79 79-79 79 35.37 79 79z"
        stroke="url(#prefix__paint0_linear)"
        strokeWidth={18}
      />
      <defs>
        <linearGradient
          id="prefix__paint0_linear"
          x1={200}
          y1={41}
          x2={200}
          y2={359}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EEA7ED" />
          <stop offset={1} stopColor="#0217B0" />
        </linearGradient>
      </defs>
    </svg>
  ),
);
