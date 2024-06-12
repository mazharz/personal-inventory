"use client";

import { useAllCategoriesQuery } from "@/lib/queries/category";
import { useEffect } from "react";

export default function Home() {
  const { isLoading, data } = useAllCategoriesQuery();

  useEffect(() => {
    if (data?.success) {
      console.log(data.data);
    }
  }, [isLoading, data]);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
