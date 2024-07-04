import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../navbar/navbar";

export default function Layout() {
  return (
    <>
      <Navigation />

      <div className="container my-3">
      <Outlet />
      </div>
    </>
  );
}
