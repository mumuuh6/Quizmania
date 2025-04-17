'use client';

import { DashboardProvider } from "./DashboardContext";


export default function RootLayout({ children }) {
  return (
    <DashboardProvider>
        {children}
    </DashboardProvider>
  );
}
