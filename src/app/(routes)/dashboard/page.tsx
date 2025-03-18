"use client"
import Button from "@/components/Button";
import { LogoutLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import React, { useEffect } from "react";

const page = () => {
  const { user } = useKindeBrowserClient()

  useEffect(() => {
    console.log(user)
  },[user])

  return <div>
    dashboard
    <Button>
      <LogoutLink>Logout</LogoutLink>
    </Button>
    </div>;
};

export default page;
