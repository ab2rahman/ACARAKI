"use client";

import HomeComponents from "@/components/Home";
import data from "@/data/pages/home.json";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [festival, setFestival] = useState({});

  useEffect(() => {
    const fetchFestival = async () => {
      try {
        const response = await fetch(`${API_URL}/festival`);
        if (response.ok) {
          const data = await response.json();
          setFestival(data.data);
        }
      } catch (err) {
        console.log('API not available, using static data');
        // Festival will remain empty object, components will use fallback data from home.json
      }
    };

    fetchFestival();
  }, [API_URL]);

  return (
    <>
      {data.components.map((component, index) => {
        return <HomeComponents key={index} type={component.type} data={component.data} festival={festival} />;
      })}
    </>
  );
}
