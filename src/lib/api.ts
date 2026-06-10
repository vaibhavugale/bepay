export interface PaymentRow {
  paymentId: string;
  orderId: string;
  originalPrice: string;
  amountReceived: string;
  amountSent: string;
  status: "ACTIVE" | "EXPIRED";
  createdDate: string;
  createdTime: string;
}

export interface PaymentLinkRow {
  invoiceId: string;
  orderId: string;
  currency: string;
  isMoreCurrency?: boolean;
  invoiceUrl: string;
  status: "COMPLETED" | "IN PROGRESS" | "FAILED";
  createdDate: string;
  createdTime: string;
  // new fields
  paymentTitle?: string;
  amount?: string;
  network?: string;
  description?: string;
  expiryDate?: string;
  referenceId?: string;
}

// Helper to get data from localStorage (browser only)
const getLocalStorageData = <T,>(key: string): T[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
};

// Helper to save data to localStorage
const setLocalStorageData = <T,>(key: string, data: T[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getPayments(filters?: Record<string, string>): Promise<PaymentRow[]> {
  await delay(600 + Math.random() * 800); // 600 - 1400ms delay
  
  const payments = getLocalStorageData<PaymentRow>("mockPayments");
  if (!filters) return payments;

  return payments.filter(payment => {
    let match = true;
    if (filters.status && payment.status !== filters.status) match = false;
    return match;
  });
}

export async function getPaymentLinks(filters?: Record<string, string>): Promise<PaymentLinkRow[]> {
  await delay(600 + Math.random() * 800); // 600 - 1400ms delay
  
  const links = getLocalStorageData<PaymentLinkRow>("mockPaymentLinks");
  if (!filters) return links;

  return links.filter(link => {
    let match = true;
    if (filters.status && link.status !== filters.status) match = false;
    if (filters.currency && !link.currency.includes(filters.currency)) match = false;
    return match;
  });
}

export async function addPaymentLink(data: Omit<PaymentLinkRow, "invoiceId" | "orderId" | "invoiceUrl" | "status" | "createdDate" | "createdTime">): Promise<PaymentLinkRow> {
  await delay(800 + Math.random() * 1000); // Simulate network latency

  const newLink: PaymentLinkRow = {
    invoiceId: Math.floor(Math.random() * 10000000000).toString(),
    orderId: "", // Optional or generate if needed
    invoiceUrl: `https://bepay.net.co.${Math.floor(Math.random() * 10000000000)}+hdgx`,
    status: "IN PROGRESS",
    createdDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    createdTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    ...data
  };

  const currentLinks = getLocalStorageData<PaymentLinkRow>("mockPaymentLinks");
  setLocalStorageData("mockPaymentLinks", [newLink, ...currentLinks]);

  return newLink;
}
