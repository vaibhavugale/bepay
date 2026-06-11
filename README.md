# BePay Merchant Dashboard

A modern, responsive merchant dashboard built with Next.js 14 (App Router), React, and Tailwind CSS. It enables merchants to create cryptocurrency payment links and monitor their transaction history in real-time.

## Setup and Run Instructions

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

## Technical Approach and Architecture

- **Framework**: Built on **Next.js 14** using the App Router for simplified routing and layout composition.
- **Styling**: Utilized **Tailwind CSS** for rapid, utility-first styling. We avoided heavy component libraries (except for a lightweight table layout) to ensure a highly custom, premium aesthetic with smooth micro-interactions.
- **State Management**: We leveraged standard React state hooks (`useState`, `useEffect`) and managed global mocked data directly within the browser's `localStorage` to simulate a persistent database across reloads without needing a heavy backend.
- **Components**: The UI is broken down into highly reusable shell components (`Sidebar`, `Header`, `Modal`, `Table`, `Badge`) that maintain visual consistency across the dashboard.
- **Routing**: Client-side navigation (`useRouter`) is heavily utilized to jump seamlessly from summary views (like Payment History) into dynamic detail views (`/payment-link/[id]`).

## Assumptions and Trade-offs

### Assumptions
1. **Simplified Creation**: We assumed that capturing a single token and single network is sufficient for standard payment flows, tailoring the UX for speed.

### Trade-offs
1. **Client-Side Data**: 
   - *Decision*: Using `localStorage` for mocking instead of a real backend.
   - *Trade-off*: Enables incredibly fast prototyping and immediate visual feedback, but ignores real-world network latency, API error handling, and server-side validation.
2. **Flat Data Structure**:
   - *Decision*: Using a flat `PaymentLinkRow` model.
   - *Trade-off*: Makes frontend state management trivial for prototyping, but trades off database normalization. In production, a "Payment Link" would likely be a separate entity from "Transactions".



### Completed Features
- Merchant Dashboard
- Payment History Table
- Transaction Details:
- Payment Link Creation Form:
- Payment Link Success Screen:
- Payment Link Detail Page:




