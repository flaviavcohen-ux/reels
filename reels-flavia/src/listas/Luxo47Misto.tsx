import React from "react";
import { AbsoluteFill, interpolate, OffthreadVideo, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { AMARELO_FLAVIA, FPS, font, ritmo } from "../theme";
import { Fundo, Item, ITENS } from "./Luxo47";
import { Caixas } from "./Luxo47Video";

// Com a letra maior, as quebras de linha vão à mão para nenhuma palavra ficar sozinha.
const LINHAS = [
  "Um sábado sem\nabsolutamente nada marcado",
  "Desmarcarem um\ncompromisso em cima da hora",
  "WhatsApp sem ninguém\nesperando resposta",
  "Roupa confortável,\nsem estar nem aí",
  "Intestino funcionando",
  "Dormir a noite toda\nsem acordar às três",
  "Exame vindo normal",
  "O peso que estava\npesado subindo leve",
];

// Versão mista: abre com o vídeo dela e o gancho, dissolve para o rosé com a lista se acumulando
// e volta para o vídeo no fim, com a pergunta. Vídeo em velocidade normal (public/reels/luxo-47/original.mp4).

const GANCHO = 0.2;
const TRANSICAO = 3.4; // vídeo dissolve no rosé e o gancho sobe para virar título
const PRIMEIRO_ITEM = 4.1;
const PASSO = 2.0;
const ULTIMO = PRIMEIRO_ITEM + PASSO * (ITENS.length - 1);
const LISTA_SAI = ULTIMO + PASSO + 1.6; // lista inteira parada um pouco (bom pra print)
const CTA = LISTA_SAI + 0.3;
export const LUXO47_MISTO_DURACAO = CTA + 3.4;

// Tomadas contínuas do vídeo original (sem corte no meio), um pouco mais lentas para caber.
const ABERTURA = { desde: 3.7, velocidade: 0.75 };
const FIM = { desde: 7.25, velocidade: 1 }; // braços cruzados

const useT = () => useCurrentFrame() / useVideoConfig().fps;

const useEntra = (at: number) => {
  const { fps } = useVideoConfig();
  return spring({ frame: Math.round((useT() - at) * fps), fps, config: { damping: 200 }, durationInFrames: 16 });
};

const entre = (t: number, a: number, b: number, de: number, para: number) =>
  interpolate(t, [a, b], [de, para], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

const caixa: React.CSSProperties = {
  fontFamily: font.body,
  fontWeight: 800,
  color: "#111",
  textAlign: "center",
  lineHeight: 1.12,
  padding: "16px 32px",
  borderRadius: 10,
  maxWidth: 920,
  textWrap: "balance",
  boxShadow: "0 10px 28px rgba(0,0,0,0.2)",
};

/** Gancho: entra sobre o vídeo, abaixo do rosto, e sobe para o topo quando a lista começa. */
const Gancho: React.FC = () => {
  const t = useT();
  const p1 = useEntra(GANCHO);
  const p2 = useEntra(GANCHO + 0.2);
  const { fps } = useVideoConfig();
  const sobe = spring({ frame: Math.round((t - TRANSICAO) * fps), fps, config: { damping: 200 }, durationInFrames: 24 });
  const sai = entre(t, LISTA_SAI - 0.3, LISTA_SAI, 1, 0);
  if (t > LISTA_SAI) return null;
  const suave = (p: number): React.CSSProperties => ({ opacity: p, transform: `translateY(${interpolate(p, [0, 1], [18, 0])}px)` });
  return (
    <div
      style={{
        position: "absolute",
        top: interpolate(sobe, [0, 1], [1060, 180]),
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transform: `scale(${interpolate(sobe, [0, 1], [1, 0.7])})`,
        transformOrigin: "50% 0%",
        opacity: sai,
      }}
    >
      <div style={{ ...caixa, fontSize: 66, background: AMARELO_FLAVIA, ...suave(p1) }}>Coisas que aos 20 eu achava sem graça</div>
      <div style={{ ...caixa, fontSize: 66, background: "#FFF", marginTop: 12, ...suave(p2) }}>e aos 47 viraram luxo</div>
    </div>
  );
};

const Lista: React.FC = () => {
  const t = useT();
  const entra = useEntra(PRIMEIRO_ITEM - 0.4);
  const sai = entre(t, LISTA_SAI - 0.3, LISTA_SAI, 1, 0);
  if (t < PRIMEIRO_ITEM - 0.4 || t > LISTA_SAI) return null;
  return (
    <div
      style={{
        position: "absolute",
        top: 400,
        left: 40,
        right: 40,
        padding: "34px 36px 34px 16px",
        borderRadius: 36,
        background: "rgba(255,255,255,0.72)",
        boxShadow: "0 20px 60px rgba(158,79,102,0.14)",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        opacity: entra * sai,
        transform: `translateY(${interpolate(entra, [0, 1], [30, 0])}px)`,
      }}
    >
      {LINHAS.map((texto, i) => (
        <Item key={texto} n={i + 1} texto={texto} at={PRIMEIRO_ITEM + PASSO * i} passo={PASSO} damping={200} tamanho={52} />
      ))}
    </div>
  );
};

export const Luxo47Misto: React.FC = () => {
  ritmo.velocidade = 1;
  const t = useT();
  // Rosé cobre o vídeo durante a lista.
  const rose = Math.min(entre(t, TRANSICAO, TRANSICAO + 0.6, 0, 1), entre(t, LISTA_SAI - 0.3, LISTA_SAI + 0.2, 1, 0));
  const video = { width: "100%", height: "100%", objectFit: "cover" } as const;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Sequence durationInFrames={Math.round((TRANSICAO + 0.8) * FPS)}>
        <OffthreadVideo src={staticFile("reels/luxo-47/original.mp4")} muted trimBefore={Math.round(ABERTURA.desde * FPS)} playbackRate={ABERTURA.velocidade} style={video} />
      </Sequence>
      <Sequence from={Math.round((LISTA_SAI - 0.4) * FPS)}>
        <OffthreadVideo src={staticFile("reels/luxo-47/original.mp4")} muted trimBefore={Math.round(FIM.desde * FPS)} playbackRate={FIM.velocidade} style={video} />
      </Sequence>
      <AbsoluteFill style={{ opacity: rose }}>
        <Fundo />
      </AbsoluteFill>
      <Lista />
      <Gancho />
      <Caixas from={CTA} to={LUXO47_MISTO_DURACAO + 1} amarela="E pra você," branca="o que virou luxo? 👇" />
    </AbsoluteFill>
  );
};
