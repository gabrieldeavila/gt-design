"use client";

import { SectionContainer, Space, Text } from "@geavila/gt-design";
import React from "react";

function page() {
  return (
    <Space.Horizontal>
      <SectionContainer title="Welcome" subtitle="You are logged" />

      <Text.H2>
        Want to log out? 
      </Text.H2>
    </Space.Horizontal>
  );
}

export default page;
