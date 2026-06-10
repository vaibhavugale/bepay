import * as React from "react";

export const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.0342 18.9838V11.3638C23.0342 10.2688 22.5557 9.2293 21.7247 8.5168C19.9772 7.0183 16.4417 3.9883 14.2247 2.0878C12.8207 0.884797 10.7477 0.884797 9.34368 2.0878L1.84368 8.5168C1.01268 9.2293 0.53418 10.2688 0.53418 11.3638V18.9838C0.53418 21.0553 2.21268 22.7338 4.28418 22.7338H19.2842C21.3557 22.7338 23.0342 21.0553 23.0342 18.9838ZM16.6592 16.3588C16.6592 14.9098 15.4847 13.7338 14.0342 13.7338C12.6872 13.7338 10.8812 13.7338 9.53418 13.7338C8.08368 13.7338 6.90918 14.9098 6.90918 16.3588C6.90918 17.8078 8.08368 18.9838 9.53418 18.9838H14.0342C15.4847 18.9838 16.6592 17.8078 16.6592 16.3588ZM15.1592 16.3588C15.1592 16.9798 14.6552 17.4838 14.0342 17.4838H9.53418C8.91318 17.4838 8.40918 16.9798 8.40918 16.3588C8.40918 15.7378 8.91318 15.2338 9.53418 15.2338H14.0342C14.6552 15.2338 15.1592 15.7378 15.1592 16.3588Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const PaymentLinkIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 9h18" />
      <path d="M12 11V17" />
      <path d="M10 12.5C10 11.6716 10.6716 11 11.5 11H12.5C13.3284 11 14 11.6716 14 12.5C14 13.3284 13.3284 14 12.5 14H11.5C10.6716 14 10 14.6716 10 15.5C10 16.3284 10.6716 17 11.5 17H12.5C13.3284 17 14 16.3284 14 15.5" />
    </svg>
  );
};

export const PaymentHistoryIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 9h18" />
      <circle cx="12" cy="14" r="3" />
      <path d="M12 12.5V14L13.5 15.5" />
    </svg>
  );
};

export const SettingsIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
};

export const ArrowLeftIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M15 18L9 12L15 6" />
    </svg>
  );
};

export const NotificationIcon = ({ hasNotification, ...props }: React.SVGProps<SVGSVGElement> & { hasNotification?: boolean }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      {hasNotification && (
        <circle cx="18" cy="6" r="3" fill="#FBBF24" stroke="currentColor" strokeWidth="1.5" />
      )}
    </svg>
  );
};

export const WithdrawIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="3" y="10" width="18" height="12" rx="2" />
      <circle cx="12" cy="16" r="2" />
      <path d="M7 16h.01" />
      <path d="M17 16h.01" />
      <path d="M12 10V2" />
      <path d="m8 6 4-4 4 4" />
    </svg>
  );
};

export const ArrowDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 5v14M19 12l-7 7-7-7"/>
  </svg>
);

export const ArrowUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 19V5M5 12l7-7 7 7"/>
  </svg>
);

export const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.3-4.3"/>
  </svg>
);

export const FilterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 6h18M6 12h12M10 18h4"/>
  </svg>
);

export const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
);

export const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M6 9l6 6 6-6"/>
  </svg>
);

export const FolderUploadIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
    <path d="M12 11v6"/>
    <path d="M9 14l3-3 3 3"/>
  </svg>
);
export const FileSuccessIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <path d="M14 2v6h6"/>
    <circle cx="16" cy="16" r="6" fill="white" stroke="currentColor" />
    <path d="M14 16l1.5 1.5L18 15" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const FileErrorIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <path d="M14 2v6h6"/>
    <circle cx="16" cy="16" r="6" fill="white" stroke="currentColor" />
    <path d="M16 14v3" stroke="currentColor" strokeWidth="2" />
    <path d="M16 19h.01" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const CopyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
);

export const BtcIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="12" r="12" fill="#F7931A"/>
    <path d="M16.6 11.2C17 10.4 17.1 9.3 16.4 8.5C15.6 7.6 14.1 7.2 12.3 7.2H8.5V17H12.7C14.7 17 16.3 16.5 17.2 15.6C18.1 14.7 18.2 13.5 17.7 12.6C17.5 12 17.1 11.6 16.6 11.2ZM11 8.8H12.3C13.2 8.8 14.1 9 14.6 9.5C15 9.9 15.1 10.5 14.8 11.1C14.5 11.8 13.7 12 12.8 12H11V8.8ZM12.7 15.4H11V13.2H12.8C13.8 13.2 14.7 13.4 15.2 13.9C15.7 14.4 15.7 15 15.4 15.6C14.9 16.3 13.9 15.4 12.7 15.4Z" fill="white"/>
  </svg>
);

export const EthIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="12" r="12" fill="#627EEA"/>
    <path d="M11.8 5L7 12.8L11.8 15.6L16.6 12.8L11.8 5Z" fill="white" fillOpacity="0.6"/>
    <path d="M11.8 5L7 12.8L11.8 10.5L16.6 12.8L11.8 5Z" fill="white"/>
    <path d="M11.8 16.5L7 13.6L11.8 19L16.6 13.6L11.8 16.5Z" fill="white" fillOpacity="0.6"/>
  </svg>
);

export const SolanaIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="12" r="12" fill="#000000"/>
    <path d="M6 14.2H14.8L16.6 12.5H7.8L6 14.2Z" fill="#14F195"/>
    <path d="M18 9.8H9.2L7.4 11.5H16.2L18 9.8Z" fill="#9945FF"/>
    <path d="M6 18.6H14.8L16.6 16.9H7.8L6 18.6Z" fill="#14F195"/>
  </svg>
);

export const TonIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="12" r="12" fill="#0098EA"/>
    <path d="M12 5L6 11H10.5V18.5L18 9H13.5V5.5L12 5Z" fill="white"/>
  </svg>
);

export const ContactBookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    <circle cx="12" cy="8" r="2.5" />
    <path d="M8 15a4 4 0 0 1 8 0" />
  </svg>
);

export const BitcoinDoodleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="64" height="64" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
      {/* Tilted background shadow/thickness */}
      <path d="M 20 75 L 85 60 L 85 30" strokeWidth="6" />
      {/* Tilted main rectangle */}
      <path d="M 15 45 L 80 30 L 90 70 L 25 85 Z" fill="white" />
      
      {/* Inner corner brackets */}
      <path d="M 25 50 L 25 55 L 30 55" />
      <path d="M 70 38 L 75 38 L 75 43" />
      <path d="M 33 75 L 33 80 L 38 80" />
      <path d="M 80 60 L 80 65 L 75 65" />

      {/* Center Bitcoin Circle */}
      <circle cx="52.5" cy="57.5" r="14" fill="white" />
      {/* Bitcoin B */}
      <path d="M 50 48 L 50 67" />
      <path d="M 54 48 L 54 67" />
      <path d="M 48 51 L 55 51 C 58 51 58 55 55 55 C 59 55 59 60 55 60 L 48 60" />
      <path d="M 48 55 L 54 55" />

      {/* Nodes */}
      {/* Top Left */}
      <path d="M 35 40 L 32 25" />
      <circle cx="30" cy="20" r="4" fill="white" />
      
      {/* Top Right */}
      <path d="M 60 34 L 60 25 L 70 25 L 70 18" />
      <circle cx="70" cy="13" r="4" fill="white" />
      
      {/* Far Left */}
      <path d="M 18 55 L 10 55 L 10 45" />
      <circle cx="10" cy="40" r="4" fill="white" />
      
      {/* Bottom */}
      <path d="M 60 77 L 60 88" />
      <circle cx="60" cy="93" r="4" fill="white" />
    </g>
  </svg>
);
