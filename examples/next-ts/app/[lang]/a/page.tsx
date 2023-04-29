"use client";

import { Button, SectionContainer, Space, Text } from "@geavila/gt-design";
import { signOut } from "next-auth/react";
import React from "react";

function page() {
  return (
    <Space.Horizontal>
      <SectionContainer title="WELCOME" subtitle="LOGGED_IN" />

      <Button.Contrast onClick={() => signOut()} content="LOG_OUT" />
    </Space.Horizontal>
  );
}

export default page;
