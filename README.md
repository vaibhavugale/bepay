# BePay Merchant Dashboard

A modern, responsive merchant dashboard built with Next.js 14 (App Router), React, and Tailwind CSS. It enables merchants to create cryptocurrency payment links and monitor their transaction history in real-time.

## 🚀 Setup and Run Instructions

### Prerequisites
- Node.js 18.x or later
- npm, yarn, or pnpm

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd bepay
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗 Technical Approach and Architecture

- **Framework**: Built on **Next.js 14** using the App Router for simplified routing and layout composition.
- **Styling**: Utilized **Tailwind CSS** for rapid, utility-first styling. We avoided heavy component libraries (except for a lightweight table layout) to ensure a highly custom, premium aesthetic with smooth micro-interactions.
- **State Management**: We leveraged standard React state hooks (`useState`, `useEffect`) and managed global mocked data directly within the browser's `localStorage` to simulate a persistent database across reloads without needing a heavy backend.
- **Components**: The UI is broken down into highly reusable shell components (`Sidebar`, `Header`, `Modal`, `Table`, `Badge`) that maintain visual consistency across the dashboard.
- **Routing**: Client-side navigation (`useRouter`) is heavily utilized to jump seamlessly from summary views (like Payment History) into dynamic detail views (`/payment-link/[id]`).

## 🤔 Assumptions and Trade-offs

### Assumptions
1. **Mock Backend**: We assumed the system can temporarily rely on a purely client-side data store (`localStorage`) to simulate database interactions (`getPaymentLinks`, `addPaymentLink`) for the scope of this UI prototype.
2. **Simplified Creation**: We assumed that capturing a single token and single network is sufficient for standard payment flows, tailoring the UX for speed.

### Trade-offs
1. **Client-Side vs Server-Side Data**: 
   - *Decision*: Using `localStorage` for mocking instead of a real backend.
   - *Trade-off*: Enables incredibly fast prototyping and immediate visual feedback, but ignores real-world network latency, API error handling, and server-side validation.
2. **Client-Side Pagination & Filtering**:
   - *Decision*: Filtering and paginating the payment links entirely on the frontend.
   - *Trade-off*: Provides a snappy user experience instantly but lacks scalability. If a merchant has thousands of payment links, moving this logic to a backend database will be required.
3. **Flat Data Structure**:
   - *Decision*: Using a flat `PaymentLinkRow` model.
   - *Trade-off*: Makes frontend state management trivial for prototyping, but trades off database normalization. In production, a "Payment Link" would likely be a separate entity from "Transactions".

## ✅ Completed and Incomplete Features

### Completed Features
- **Merchant Dashboard**: High-level metric cards and a recent transaction preview.
- **Payment History Table**: Comprehensive list view featuring search by ID/Title, status filtering (Pending, Confirmed, Failed, Expired), and client-side pagination.
- **Transaction Details**: Dedicated modal/drawer view providing granular transaction info (Amount, Network, Reference, Timestamp, Status).
- **Payment Link Creation Form**: Validated UI allowing merchants to input Title, Amount, Token, Network, Expiry, and Reference ID.
- **Payment Link Success Screen**: Generation of a mock payment URL with a one-click copy to clipboard functionality.
- **Payment Link Detail Page**: A dedicated page displaying link status, timeline, amounts, networks, and associated transactions.

### Incomplete / Future Features
- Backend API Integration (Node.js/PostgreSQL).
- Real Web3 Provider Connection (WalletConnect, MetaMask) for actual crypto transactions.
- Server-side Pagination & Filtering.
- Production Authentication (e.g., NextAuth / Clerk).

## 🧪 Testing Instructions

1. **Creating a Payment Link**:
   - Navigate to **Payment Links** in the sidebar.
   - Click **+ Create Payment Link**.
   - Fill out the form, ensure the Price is a valid number, and set an expiry date in the future.
   - Click "Create Payment Link" to see the success screen.
2. **Payment History Search & Filter**:
   - Navigate to **Payment History**.
   - Use the Search bar to type a Title or ID.
   - Click the Filter icon to toggle specific statuses (e.g., "COMPLETED").
   - Ensure the pagination accurately updates to reflect the filtered results length.
3. **Detail Navigation**:
   - Click on any row in the **Payment Links** table to navigate to the dynamic `/payment-link/[id]` detail view.
