import React, { createContext, useContext } from "react";
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { ritmo } from "../theme";
import { useStageArea } from "../layout/area";

const SceneStart = createContext(0);

/** Segundo atual da fala (global), mesmo dentro de uma cena. Com velocidade 1,1x, 1s de vídeo = 1,1s de fala. */
export const useSeconds = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return useContext(SceneStart) + (frame / fps) * ritmo.velocidade;
};

/** Frames decorridos desde o segundo `at` da fala (negativo = ainda não chegou). */
export const useSince = (at: number) => {
  const { fps } = useVideoConfig();
  return Math.round((useSeconds() - at) * fps);
};

/** `bare`: cena só com peças soltas (caixas de gancho), sem cartão no layout de tela cheia. */
type SceneProps = { from: number; to: number; bare?: boolean; children: React.ReactNode };

/** Uma cena da metade de cima, do segundo `from` ao `to` da fala. Entra e sai com fade. */
export const Scene: React.FC<SceneProps> = ({ from, to, bare, children }) => {
  const { fps } = useVideoConfig();
  const v = ritmo.velocidade;
  const start = Math.round((from / v) * fps);
  const length = Math.max(1, Math.round(((to - from) / v) * fps));
  return (
    <Sequence from={start} durationInFrames={length} layout="none">
      <SceneStart.Provider value={(start / fps) * v}>
        <SceneFade length={length} bare={bare}>{children}</SceneFade>
      </SceneStart.Provider>
    </Sequence>
  );
};

const SceneFade: React.FC<{ length: number; bare?: boolean; children: React.ReactNode }> = ({ length, bare, children }) => {
  const frame = useCurrentFrame();
  const { variant } = useStageArea();
  const opacity = interpolate(frame, [0, 6, length - 6, length], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  if (variant === "cheia") {
    // Tela cheia: o conteúdo vai num cartão rosé translúcido, menor, para não esconder o vídeo.
    return (
      <AbsoluteFill style={{ opacity, alignItems: "center", justifyContent: "center" }}>
        {bare ? (
          children
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "44px 40px",
              width: 980,
              borderRadius: 40,
              background: "rgba(251,239,240,0.9)",
              boxShadow: "0 18px 50px rgba(0,0,0,0.25)",
              transform: "scale(0.82)",
            }}
          >
            {children}
          </div>
        )}
      </AbsoluteFill>
    );
  }
  return (
    <AbsoluteFill style={{ opacity, alignItems: "center", justifyContent: "center", paddingTop: 60 }}>{children}</AbsoluteFill>
  );
};
