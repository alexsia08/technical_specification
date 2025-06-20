"use client";
import React from "react";
import { CSSBoundingContainer } from "@/src/shared/styles";
import { useTranslations } from "next-intl";
import { Typography } from "antd";
import { CSSTitle, CSSTextP } from "../UI/styles";
import { CardGenerator } from "@/src/widgets/CardGenerator";

const { Title, Paragraph } = Typography;

export const HomePage: React.FC = () => {
  const tHomePage = useTranslations(`home-page`);

  return (
    <CSSBoundingContainer>
      <Title level={2} style={CSSTitle}>
        {tHomePage("title")}
      </Title>
      <Paragraph style={CSSTextP}>{tHomePage("text")}</Paragraph>
      <CardGenerator />
    </CSSBoundingContainer>
  );
};
