import React from "react";
import { AbsoluteFill } from "remotion";
import type { ReelDef, Transcript } from "../types";
import { Captions } from "./Captions";
import { Face, MOLDURA_TOP } from "./Face";
import { Stage } from "./Stage";

export const Reel: React.FC<{ def: ReelDef; transcript: Transcript }> = ({ def, transcript }) => {
  const { Scenes } = def;
  const variant = def.layout ?? "dividida";
  const face = (
    <Face
      src={def.demo ? undefined : `reels/${def.media ?? def.id}/video.mp4`}
      position={def.facePosition}
      segments={def.faceSegments}
      variant={variant}
    />
  );
  const stage = (
    <Stage tag={variant === "cheia" ? undefined : def.tag} variant={variant}>
      <Scenes />
    </Stage>
  );
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {/* Na tela cheia o vídeo fica atrás das cenas; nos outros, o fundo rosé fica atrás do vídeo. */}
      {variant === "cheia" ? face : stage}
      {variant === "cheia" ? stage : face}
      <Captions words={transcript.words} top={variant === "cheia" ? 1010 : variant === "moldura" ? MOLDURA_TOP - 74 : undefined} />
    </AbsoluteFill>
  );
};
