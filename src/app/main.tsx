import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { DirectionProvider, MantineProvider} from "@mantine/core";
import { router } from "../app/routers.tsx";
import "../styles/index.css";
import { ColorSchemeScript } from "@mantine/core";
import "@mantine/core/styles.css";
import i18n from "../config/i18n.ts";
import { Toaster } from "react-hot-toast";
import {useState} from 'react';



const isRTL = i18n.language === "ar";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MantineProvider
    defaultColorScheme="light"
  >
    <DirectionProvider initialDirection={isRTL ? "rtl" : "ltr"}>
    <RouterProvider router={router} />
    <Toaster
      position="top-center"
      reverseOrder={false}
    />
    </DirectionProvider>
  </MantineProvider>
);