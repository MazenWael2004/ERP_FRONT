import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { DirectionProvider, MantineProvider } from "@mantine/core";
import { router } from "./routers.jsx";
import "../styles/index.css";
import { ColorSchemeScript } from "@mantine/core";
import "@mantine/core/styles.css";
import i18n from "../config/i18n.ts";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import AuthProvider from "../features/auth/context/AuthProvider.tsx";
import "../shared/api/interceptors.ts";

const isRTL = i18n.language === "ar";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <MantineProvider defaultColorScheme="light">
      <DirectionProvider initialDirection={isRTL ? "rtl" : "ltr"}>
        <RouterProvider router={router} />
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              fontFamily: "Cairo, sans-serif",
            },
          }}
        />
      </DirectionProvider>
    </MantineProvider>
  </AuthProvider>,
);
