import React from "react";
import { AbsoluteFill, OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { color, font, HEIGHT, ritmo, STAGE_HEIGHT } from "../theme";
import type { LayoutVariant } from "./area";

type Props = { src?: string; position?: string; segments?: { from: number; position: string }[]; variant?: LayoutVariant };

/** Topo da janela do vídeo no layout "moldura". */
export const MOLDURA_TOP = 990;

const box = (variant: LayoutVariant): React.CSSProperties => {
  if (variant === "cheia") return { top: 0, height: HEIGHT };
  if (variant === "moldura")
    return {
      top: MOLDURA_TOP,
      left: 60,
      width: 960,
      height: HEIGHT - MOLDURA_TOP - 80,
      borderRadius: 44,
      border: "6px solid #FFFFFF",
      boxShadow: "0 18px 50px rgba(46,34,38,0.25)",
    };
  return { top: STAGE_HEIGHT, height: HEIGHT - STAGE_HEIGHT };
};

/** A gravação (com o áudio): metade de baixo, tela cheia ou numa janela, conforme o layout. */
export const Face: React.FC<Props> = ({ src, position = "50% 30%", segments = [], variant = "dividida" }) => {
  const t = (useCurrentFrame() / useVideoConfig().fps) * ritmo.velocidade;
  const current = variant === "cheia" ? "50% 50%" : [...segments].reverse().find((s) => t >= s.from)?.position ?? position;
  return (
    <AbsoluteFill style={{ ...box(variant), overflow: "hidden", background: color.ink }}>
      {src ? (
        <OffthreadVideo src={staticFile(src)} playbackRate={ritmo.velocidade} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: current }} />
      ) : (
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", background: `linear-gradient(${color.evergreenDeep}, ${color.brass})` }}>
          <div style={{ fontFamily: font.body, fontWeight: 700, fontSize: 40, letterSpacing: 6, color: color.textDim }}>
            SUA GRAVAÇÃO AQUI
          </div>
        </AbsoluteFill>
      )}
      {variant === "dividida" && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: color.brass }} />}
    </AbsoluteFill>
  );
};
