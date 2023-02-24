import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Header from "../../components/Header";

export default {
  title: "components/Header",
} as ComponentMeta<typeof Header>;

export const 通常時: ComponentStory<typeof Header> = () => <Header />;
