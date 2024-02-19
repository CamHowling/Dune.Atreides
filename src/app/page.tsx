"use client";

import * as React from "react";

import {
  createMemoryRouter,
  RouterProvider,
} from "react-router-dom";
import { MainMenu } from '../pages/mainMenu';
import Setup from "@/pages/setup";
import Tracker from "@/pages/cardtracker";

export default function App() {  
    //TODO investigate URI paths...
    const router = createMemoryRouter([
      {
        path: "/",
        element: <MainMenu />,
        // errorElement: <ErrorPage />,
      },
      {
        path: "/setup",
        element: <Setup />,
      },
      {
        path: "/tracker",
        element: <Tracker />,
      }
    ]);
    
    return (
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    );
}