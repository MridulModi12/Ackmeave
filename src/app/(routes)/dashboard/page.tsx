"use client"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import React, { useEffect } from "react";

const page = () => {
  const { user } = useKindeBrowserClient()

  useEffect(() => {
    console.log(user)
  },[user])

  return <div>
    dashboard
    
    </div>;
};

export default page;
