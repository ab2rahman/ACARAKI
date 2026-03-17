"use client";

import HomeComponents from "@/components/Home";
import data from "@/data/pages/home.json";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [festival, setFestival] = useState({});
  useEffect(() => {
    fetch(`${API_URL}/festival`)
      .then((response) => response.json())
      .then((data) => {
        setFestival(data.data);
      });
  }, []);

  return (
    <>
      {data.components.map((component, index) => {
        return <HomeComponents key={index} type={component.type} data={component.data} festival={festival} />;
      })}
    </>
  );
}