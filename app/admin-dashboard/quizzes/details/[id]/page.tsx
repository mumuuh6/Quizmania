import AdminShell from '@/app/(dashboards)/admin-dashboard/components/admin-shell';
import QuizDetailsPage from '@/app/(dashboards)/admin-dashboard/components/quize-details';

import React from "react";

export default function page() {
  return (
    <AdminShell>
      <QuizDetailsPage />
    </AdminShell>
  );
}
