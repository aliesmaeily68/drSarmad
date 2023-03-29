import React, { useState, useEffect } from "react";

function useGetFetch(url) {
  const [allData, setAllData] = useState();
  async function getAllData() {
    const respons = await fetch(url);
    const data = await respons.json();
    setAllData(data);
  }
  useEffect(() => {
    getAllData();
  }, []);

  return [allData];
}
export { useGetFetch };
