import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName="!top-5"
        toastOptions={{
          // Default options
          duration: 2000,
          className:
            "!bg-white dark:!bg-[#151f2b] !text-slate-900 dark:!text-white !border !border-slate-200 dark:!border-[#233648] !rounded-xl !py-3 !px-4 !text-sm !font-medium !shadow-xl !max-w-[500px]",

          // Success toast
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#10b981",
              secondary: "#151f2b",
            },
            className:
              "!bg-white dark:!bg-[#151f2b] !text-slate-900 dark:!text-white !border !border-emerald-500 dark:!border-emerald-500 !rounded-xl",
          },

          // Error toast
          error: {
            duration: 3000,
            iconTheme: {
              primary: "#ef4444",
              secondary: "#151f2b",
            },
            className:
              "!bg-white dark:!bg-[#151f2b] !text-slate-900 dark:!text-white !border !border-red-500 dark:!border-red-500 !rounded-xl",
          },

          // Loading toast
          loading: {
            iconTheme: {
              primary: "#137fec",
              secondary: "#151f2b",
            },
            className:
              "!bg-white dark:!bg-[#151f2b] !text-slate-900 dark:!text-white !border !border-[#137fec] dark:!border-[#137fec] !rounded-xl",
          },
        }}
      />
    </BrowserRouter>
  </StrictMode>,
)
