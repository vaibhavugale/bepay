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
