export interface PaymentRow {
  paymentId: string;
  orderId: string;
  paymentTitle?: string;
  originalPrice: string;
  amountReceived: string;
  amountSent: string;
  status: "Pending" | "Confirmed" | "Failed" | "Expired";
  createdDate: string;
  createdTime: string;
}

export interface PaymentLinkRow {
  invoiceId: string;
  orderId: string;
  paymentTitle?: string;
  amount?: string;
  currency: string;
  network?: string;
  description?: string;
  expiryDate?: string;
  invoiceUrl: string;
  status: "ACTIVE" | "EXPIRED" | "COMPLETED" | "IN PROGRESS" | "FAILED";
  createdDate: string;
  createdTime: string;
  isMoreCurrency?: boolean;
}

const defaultPayments: PaymentRow[] = [
  { paymentId: "PAY-1001", orderId: "ORD-5001", paymentTitle: "Premium Subscription", originalPrice: "$120.00", amountReceived: "$120.00", amountSent: "$0.00", status: "Confirmed", createdDate: "10 Jun 2026", createdTime: "10:30 AM" },
  { paymentId: "PAY-1002", orderId: "ORD-5002", paymentTitle: "Basic Plan", originalPrice: "$45.00", amountReceived: "$45.00", amountSent: "$0.00", status: "Pending", createdDate: "10 Jun 2026", createdTime: "11:15 AM" },
  { paymentId: "PAY-1003", orderId: "ORD-5003", paymentTitle: "Addon Package", originalPrice: "$80.00", amountReceived: "$80.00", amountSent: "$0.00", status: "Failed", createdDate: "09 Jun 2026", createdTime: "02:45 PM" },
  { paymentId: "PAY-1004", orderId: "ORD-5004", paymentTitle: "Enterprise Setup", originalPrice: "$250.00", amountReceived: "$250.00", amountSent: "$0.00", status: "Confirmed", createdDate: "09 Jun 2026", createdTime: "04:20 PM" },
  { paymentId: "PAY-1005", orderId: "ORD-5005", paymentTitle: "Consulting Fee", originalPrice: "$15.00", amountReceived: "$15.00", amountSent: "$0.00", status: "Expired", createdDate: "08 Jun 2026", createdTime: "09:00 AM" },
  { paymentId: "PAY-1006", orderId: "ORD-5006", paymentTitle: "API Credits", originalPrice: "$50.00", amountReceived: "$50.00", amountSent: "$0.00", status: "Confirmed", createdDate: "08 Jun 2026", createdTime: "10:00 AM" },
  { paymentId: "PAY-1007", orderId: "ORD-5007", paymentTitle: "Support Package", originalPrice: "$100.00", amountReceived: "$100.00", amountSent: "$0.00", status: "Pending", createdDate: "07 Jun 2026", createdTime: "01:20 PM" },
  { paymentId: "PAY-1008", orderId: "ORD-5008", paymentTitle: "Custom Feature", originalPrice: "$500.00", amountReceived: "$500.00", amountSent: "$0.00", status: "Confirmed", createdDate: "07 Jun 2026", createdTime: "03:45 PM" },
  { paymentId: "PAY-1009", orderId: "ORD-5009", paymentTitle: "Domain Renewal", originalPrice: "$20.00", amountReceived: "$20.00", amountSent: "$0.00", status: "Expired", createdDate: "06 Jun 2026", createdTime: "08:15 AM" },
  { paymentId: "PAY-1010", orderId: "ORD-5010", paymentTitle: "Hosting Setup", originalPrice: "$150.00", amountReceived: "$150.00", amountSent: "$0.00", status: "Confirmed", createdDate: "06 Jun 2026", createdTime: "11:30 AM" },
  { paymentId: "PAY-1011", orderId: "ORD-5011", paymentTitle: "Design Assets", originalPrice: "$75.00", amountReceived: "$75.00", amountSent: "$0.00", status: "Confirmed", createdDate: "05 Jun 2026", createdTime: "09:20 AM" },
  { paymentId: "PAY-1012", orderId: "ORD-5012", paymentTitle: "SEO Optimization", originalPrice: "$300.00", amountReceived: "$300.00", amountSent: "$0.00", status: "Pending", createdDate: "05 Jun 2026", createdTime: "02:10 PM" },
  { paymentId: "PAY-1013", orderId: "ORD-5013", paymentTitle: "Data Migration", originalPrice: "$1200.00", amountReceived: "$1200.00", amountSent: "$0.00", status: "Failed", createdDate: "04 Jun 2026", createdTime: "10:05 AM" },
  { paymentId: "PAY-1014", orderId: "ORD-5014", paymentTitle: "Training Session", originalPrice: "$200.00", amountReceived: "$200.00", amountSent: "$0.00", status: "Confirmed", createdDate: "04 Jun 2026", createdTime: "01:50 PM" },
  { paymentId: "PAY-1015", orderId: "ORD-5015", paymentTitle: "Annual Maintenance", originalPrice: "$800.00", amountReceived: "$800.00", amountSent: "$0.00", status: "Confirmed", createdDate: "03 Jun 2026", createdTime: "11:00 AM" }
];

const defaultPaymentLinks: PaymentLinkRow[] = [
  { invoiceId: "INV-2001", orderId: "ORD-8001", paymentTitle: "Premium Service", amount: "150.00", currency: "USDC", network: "Polygon", invoiceUrl: "https://bepay.finance/pay/abc123xyz", status: "ACTIVE", createdDate: "10 Jun 2026", createdTime: "10:30 AM" },
  { invoiceId: "INV-2002", orderId: "ORD-8002", paymentTitle: "Consulting Hour", amount: "300.00", currency: "USDT", network: "Ethereum", invoiceUrl: "https://bepay.finance/pay/def456uvw", status: "COMPLETED", createdDate: "09 Jun 2026", createdTime: "02:15 PM" },
  { invoiceId: "INV-2003", orderId: "ORD-8003", paymentTitle: "Monthly Retainer", amount: "1000.00", currency: "ETH", network: "Base", invoiceUrl: "https://bepay.finance/pay/ghi789rst", status: "IN PROGRESS", createdDate: "08 Jun 2026", createdTime: "04:45 PM" },
  { invoiceId: "INV-2004", orderId: "ORD-8004", paymentTitle: "Design Assets", amount: "75.00", currency: "USDC", network: "Polygon", invoiceUrl: "https://bepay.finance/pay/jkl012mno", status: "EXPIRED", createdDate: "07 Jun 2026", createdTime: "11:20 AM" },
  { invoiceId: "INV-2005", orderId: "ORD-8005", paymentTitle: "Web Hosting", amount: "120.00", currency: "USDT", network: "Ethereum", invoiceUrl: "https://bepay.finance/pay/pqr345stu", status: "FAILED", createdDate: "06 Jun 2026", createdTime: "09:00 AM" }
];

// Helper to get data from localStorage (browser only)
const getLocalStorageData = <T,>(key: string): T[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as any[];
      // Migrate old data that uses 'ACTIVE' status instead of new statuses
      if (key === "mockPayments" && parsed.length > 0 && parsed.some(p => p.status === "ACTIVE" || (p.status === "EXPIRED" && !p.paymentTitle))) {
        setLocalStorageData(key, defaultPayments);
        return defaultPayments as unknown as T[];
      }
      // Migrate old data that lacks paymentTitle for payment links
      if (key === "mockPaymentLinks" && parsed.length > 0 && !parsed[0].paymentTitle) {
        setLocalStorageData(key, defaultPaymentLinks);
        return defaultPaymentLinks as unknown as T[];
      }
      return parsed as T[];
    } catch (e) {
      console.error(`Error parsing localStorage for ${key}`, e);
    }
  }
  
  if (key === "mockPayments") {
    setLocalStorageData(key, defaultPayments);
    return defaultPayments as unknown as T[];
  }
  if (key === "mockPaymentLinks") {
    setLocalStorageData(key, defaultPaymentLinks);
    return defaultPaymentLinks as unknown as T[];
  }
  return [];
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
    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (!payment.paymentId.toLowerCase().includes(q) && 
          !payment.orderId.toLowerCase().includes(q) &&
          !(payment.paymentTitle && payment.paymentTitle.toLowerCase().includes(q))) {
        match = false;
      }
    }
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

export async function addPaymentLink(data: {
  paymentTitle: string;
  amount: string;
  currency: string;
  network: string;
  description?: string;
  expiryDate?: string;
  orderId?: string;
}): Promise<PaymentLinkRow> {
  await delay(800 + Math.random() * 500); // 800 - 1300ms delay

  const newLink: PaymentLinkRow = {
    invoiceId: `INV-${Math.floor(Math.random() * 10000)}`,
    orderId: data.orderId || `ORD-${Math.floor(Math.random() * 10000)}`,
    paymentTitle: data.paymentTitle,
    amount: data.amount,
    currency: data.currency,
    network: data.network,
    description: data.description,
    expiryDate: data.expiryDate,
    invoiceUrl: `https://bepay.finance/pay/${Math.random().toString(36).substring(7)}`,
    status: "ACTIVE",
    createdDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    createdTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  };

  const currentLinks = getLocalStorageData<PaymentLinkRow>("mockPaymentLinks");
  setLocalStorageData("mockPaymentLinks", [newLink, ...currentLinks]);

  return newLink;
}

export async function getPaymentLinkById(id: string): Promise<PaymentLinkRow | undefined> {
  await delay(300);
  const links = getLocalStorageData<PaymentLinkRow>("mockPaymentLinks");
  return links.find(l => l.invoiceId === id);
}
