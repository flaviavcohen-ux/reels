import React from "react";
import { AbsoluteFill } from "remotion";
import { color, font, HEIGHT, STAGE_HEIGHT } from "../theme";
import { LayoutVariant, StageArea } from "./area";

/** Tela cheia: as cenas ficam num cartão sobre o vídeo, nesta faixa de baixo. */
export const CHEIA_TOP = 1150;
const CHEIA_HEIGHT = HEIGHT - CHEIA_TOP - 90;

const Fundo: React.FC = () => (
  <>
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 45%, ${color.evergreen} 0%, ${color.evergreenDeep} 75%)`,
      }}
    />
    <AbsoluteFill
      style={{
        backgroundImage:
          `linear-gradient(${color.grid} 2px, transparent 2px), linear-gradient(90deg, ${color.grid} 2px, transparent 2px)`,
        backgroundSize: "72px 72px",
        maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
      }}
    />
  </>
);

const Tag: React.FC<{ tag: string }> = ({ tag }) => (
  <div
    style={{
      position: "absolute",
      top: 120,
      left: 0,
      right: 0,
      textAlign: "center",
      fontFamily: font.body,
      fontWeight: 700,
      fontSize: 26,
      letterSpacing: 5,
      color: color.textDim,
    }}
  >
    {tag.toUpperCase()}
  </div>
);

/** Área das animações. Na "dividida" é a metade de cima; na "moldura" o rosé ocupa a tela toda; na "cheia" não tem fundo. */
export const Stage: React.FC<{ tag?: string; variant?: LayoutVariant; children: React.ReactNode }> = ({
  tag,
  variant = "dividida",
  children,
}) => {
  if (variant === "cheia") {
    return (
      // Caixas de gancho um pouco mais altas que no layout dividido, para não cobrir o rosto.
      <StageArea.Provider value={{ variant, top: CHEIA_TOP + 140 }}>
        <AbsoluteFill style={{ top: CHEIA_TOP, height: CHEIA_HEIGHT, overflow: "visible" }}>{children}</AbsoluteFill>
      </StageArea.Provider>
    );
  }
  return (
    <StageArea.Provider value={{ variant, top: 0 }}>
      <AbsoluteFill style={{ height: variant === "moldura" ? HEIGHT : STAGE_HEIGHT, overflow: "hidden", background: color.evergreenDeep }}>
        <Fundo />
        {tag && <Tag tag={tag} />}
        <AbsoluteFill style={{ height: STAGE_HEIGHT, alignItems: "center", justifyContent: "center", paddingTop: 60 }}>{children}</AbsoluteFill>
      </AbsoluteFill>
    </StageArea.Provider>
  );
};
