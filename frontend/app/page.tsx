"use client";

import { Sidebar } from "./components/sidebar";
import { Layout } from "./components/layout";

export default function Home() {
  return (
    <Layout>
      <Sidebar />
      <h1 className="py-2.5 px-5">Home</h1>
    </Layout>
  );
}
