"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import { format } from "date-fns";
import Selector from "@/components/selector";

const Home = () => {
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    // If we're at the root path without parameters, redirect to default
    if (!params.diningHall) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      router.push(`/glasgow/lunch/${format(today, "yyyy-MM-dd")}`);
    }
  }, [params, router]);

  return <Selector />;
};

export default Home;
