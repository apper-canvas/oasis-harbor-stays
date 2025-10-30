import { createBrowserRouter } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import Layout from "@/components/organisms/Layout";

const adminRoutes = [
  { path: "", index: true, element: lazy(() => import("@/components/pages/Dashboard")) },
  { path: "rooms", element: lazy(() => import("@/components/pages/Rooms")) },
  { path: "bookings", element: lazy(() => import("@/components/pages/Bookings")) },
  { path: "guests", element: lazy(() => import("@/components/pages/Guests")) },
  { path: "reports", element: lazy(() => import("@/components/pages/Reports")) }
].map(route => ({
  ...route,
  element: (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center space-y-4">
          <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      </div>
    }>
      {route.index ? <route.element /> : <route.element />}
    </Suspense>
  )
}));
const routes = [
  {
    path: "/",
    index: true,
    element: (
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="text-center space-y-4">
              <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
          </div>
        }
      >
        {React.createElement(lazy(() => import("@/components/pages/Homepage")))}
      </Suspense>
    )
  },
  {
    path: "/admin",
    element: <Layout />,
    children: adminRoutes
  },
  {
    path: "*",
    element: (
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="text-center space-y-4">
              <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
          </div>
        }
      >
        {React.createElement(lazy(() => import("@/components/pages/NotFound")))}
      </Suspense>
    )
  }
];

export const router = createBrowserRouter(routes);