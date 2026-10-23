import React from "react";
import { AbsoluteFill, interpolate, OffthreadVideo, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { AMARELO_FLAVIA, font, ritmo } from "../theme";
import { ITENS } from "./Luxo47";

// Versão com o vídeo dela em tela cheia: um item por vez numa caixa grande, abaixo do rosto.
// O vídeo de fundo já vem desacelerado para a duração do Reel (public/reels/luxo-47/fundo.mp4).

const GANCHO = 0.2;
const PRIMEIRO_ITEM = 2.6;
const PASSO = 1.5;
const FECHO = PRIMEIRO_ITEM + PASSO * ITENS.length + 0.1;
const CTA = FECHO + 2.6;
export const LUXO47_VIDEO_DURACAO = CTA + 3;

// Altura das caixas: abaixo do rosto e acima da legenda do Instagram.
const Y_CAIXAS = 1060;

const useT = () => useCurrentFrame() / useVideoConfig().fps;

const usePop = (at: number) => {
  const { fps } = useVideoConfig();
  return spring({ frame: Math.round((useT() - at) * fps), fps, config: { damping: 14, mass: 0.5 } });
};

const caixa: React.CSSProperties = {
  fontFamily: font.body,
  fontWeight: 800,
  color: "#111",
  textAlign: "center",
  lineHeight: 1.15,
  padding: "16px 32px",
  borderRadius: 10,
  maxWidth: 920,
  textWrap: "balance",
  boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
};

/** Some rápido no fim do intervalo, para o próximo entrar limpo. */
const useSai = (to: number) => interpolate(useT(), [to - 0.12, to], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

const Caixas: React.FC<{ from: number; to: number; amarela: string; branca: string; size?: number }> = ({ from, to, amarela, branca, size = 62 }) => {
  const t = useT();
  const p1 = usePop(from);
  const p2 = usePop(from + 0.15);
  const sai = useSai(to);
  if (t < from || t >= to) return null;
  return (
    <div style={{ position: "absolute", top: Y_CAIXAS, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", opacity: sai }}>
      <div style={{ ...caixa, fontSize: size, background: AMARELO_FLAVIA, transform: `scale(${p1})` }}>{amarela}</div>
      <div style={{ ...caixa, fontSize: size, fontWeight: 700, background: "#FFF", marginTop: 12, transform: `scale(${p2})` }}>{branca}</div>
    </div>
  );
};

const Item: React.FC<{ n: number; texto: string; at: number }> = ({ n, texto, at }) => {
  const t = useT();
  const p1 = usePop(at);
  const p2 = usePop(at + 0.08);
  const sai = useSai(at + PASSO);
  if (t < at || t >= at + PASSO) return null;
  return (
    <div style={{ position: "absolute", top: Y_CAIXAS, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", opacity: sai }}>
      <div
        style={{
          ...caixa,
          fontSize: 34,
          letterSpacing: 4,
          padding: "10px 24px",
          background: AMARELO_FLAVIA,
          transform: `scale(${p1})`,
        }}
      >
        LUXO Nº {n}
      </div>
      <div style={{ ...caixa, fontSize: 62, background: "#FFF", marginTop: 12, transform: `scale(${p2})` }}>{texto}</div>
    </div>
  );
};

/** Fecho: escurece o vídeo e a frase dela entra em destaque. */
const Fecho: React.FC = () => {
  const t = useT();
  const escuro = interpolate(t, [FECHO, FECHO + 0.4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const p = usePop(FECHO + 0.2);
  if (t < FECHO) return null;
  return (
    <>
      <AbsoluteFill style={{ background: "rgba(36,24,28,0.58)", opacity: escuro }} />
      <div
        style={{
          position: "absolute",
          top: 560,
          left: 90,
          right: 90,
          textAlign: "center",
          fontFamily: font.title,
          fontWeight: 600,
          fontSize: 76,
          lineHeight: 1.2,
          color: "#FFF",
          textWrap: "balance",
          textShadow: "0 4px 20px rgba(0,0,0,0.35)",
          opacity: p,
          transform: `translateY(${interpolate(p, [0, 1], [40, 0])}px)`,
        }}
      >
        Se aos 20 me dissessem que eu ia comemorar um <span style={{ fontStyle: "italic", color: "#F6C9D4" }}>sábado vazio</span>, eu ia
        achar deprimente.
      </div>
    </>
  );
};

export const Luxo47Video: React.FC = () => {
  ritmo.velocidade = 1;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <OffthreadVideo src={staticFile("reels/luxo-47/fundo.mp4")} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <Caixas from={GANCHO} to={PRIMEIRO_ITEM} amarela="Coisas que aos 20 eu achava sem graça" branca="e aos 47 viraram luxo" />
      {ITENS.map((texto, i) => (
        <Item key={texto} n={i + 1} texto={texto} at={PRIMEIRO_ITEM + PASSO * i} />
      ))}
      <Fecho />
      <Caixas from={CTA} to={LUXO47_VIDEO_DURACAO + 1} amarela="E pra você," branca="o que virou luxo? 👇" />
    </AbsoluteFill>
  );
};
