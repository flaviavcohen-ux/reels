import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CaixasGancho } from "../flavia/CaixasGancho";
import { AMARELO_FLAVIA, color, font, ritmo } from "../theme";

// Reel de lista, sem vídeo: tela cheia em rosé, gancho nas caixas dela e um item por vez.
// Tempos em segundos do vídeo final. A música entra pelo próprio Instagram.

const ITENS = [
  "Um sábado sem absolutamente nada marcado",
  "Desmarcarem um compromisso em cima da hora",
  "WhatsApp sem ninguém esperando resposta",
  "Roupa confortável, sem estar nem aí",
  "Intestino funcionando",
  "Dormir a noite toda sem acordar às três",
  "Exame vindo normal",
  "O peso que estava pesado subindo leve",
];

const GANCHO_FIM = 2.6; // gancho grande sozinho na tela
const PRIMEIRO_ITEM = 3.1;
const PASSO = 1.6; // tempo de leitura de cada item
const ULTIMO = PRIMEIRO_ITEM + PASSO * (ITENS.length - 1);
const LISTA_SAI = ULTIMO + PASSO + 1.6; // lista inteira parada um pouco (bom pra print)
const FRASE = LISTA_SAI + 0.3;
const CTA = FRASE + 2.6;
export const LUXO47_DURACAO = CTA + 3.4;

const useT = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return frame / fps;
};

const useSpring = (at: number, damping = 14) => {
  const t = useT();
  const { fps } = useVideoConfig();
  return spring({ frame: Math.round((t - at) * fps), fps, config: { damping, mass: 0.6 } });
};

const Fundo: React.FC = () => (
  <>
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 40%, ${color.evergreen} 0%, ${color.evergreenDeep} 80%)` }} />
    <AbsoluteFill
      style={{
        backgroundImage: `linear-gradient(${color.grid} 2px, transparent 2px), linear-gradient(90deg, ${color.grid} 2px, transparent 2px)`,
        backgroundSize: "72px 72px",
        maskImage: "radial-gradient(ellipse at center, black 30%, transparent 85%)",
      }}
    />
  </>
);

const caixa: React.CSSProperties = {
  fontFamily: font.body,
  fontWeight: 800,
  color: "#111",
  textAlign: "center",
  lineHeight: 1.12,
  padding: "16px 34px",
  borderRadius: 10,
  boxShadow: "0 10px 28px rgba(46,34,38,0.16)",
};

/** Gancho: entra grande no meio da tela e depois sobe e diminui para virar o título da lista. */
const Gancho: React.FC = () => {
  const t = useT();
  const p1 = useSpring(0.1);
  const p2 = useSpring(0.3);
  const sobe = useSpring(GANCHO_FIM, 18);
  const sai = interpolate(t, [LISTA_SAI - 0.3, LISTA_SAI], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const top = interpolate(sobe, [0, 1], [640, 200]);
  const escala = interpolate(sobe, [0, 1], [1, 0.74]);
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transform: `scale(${escala})`,
        transformOrigin: "50% 0%",
        opacity: sai,
      }}
    >
      <div style={{ ...caixa, fontSize: 72, maxWidth: 940, background: AMARELO_FLAVIA, transform: `scale(${p1})` }}>
        Coisas que aos 20 eu achava sem graça
      </div>
      <div style={{ ...caixa, fontSize: 72, background: "#FFF", marginTop: 14, transform: `scale(${p2})` }}>
        e aos 47 viraram luxo
      </div>
    </div>
  );
};

const Item: React.FC<{ n: number; texto: string; at: number }> = ({ n, texto, at }) => {
  const t = useT();
  const entra = useSpring(at);
  // Marca-texto amarelo enquanto o item é o da vez; depois some devagar.
  const marca = interpolate(t, [at + 0.15, at + 0.55, at + PASSO, at + PASSO + 0.35], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ativo = t >= at && t < at + PASSO;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 26,
        opacity: t < at ? 0 : entra,
        transform: `translateX(${interpolate(entra, [0, 1], [50, 0])}px)`,
      }}
    >
      <div
        style={{
          fontFamily: font.title,
          fontStyle: "italic",
          fontWeight: 700,
          fontSize: 50,
          lineHeight: 1.1,
          color: color.brassLight,
          width: 74,
          flexShrink: 0,
          textAlign: "right",
        }}
      >
        {String(n).padStart(2, "0")}
      </div>
      <div style={{ fontFamily: font.body, fontWeight: ativo ? 700 : 600, fontSize: 43, lineHeight: 1.22, color: color.bone, paddingTop: 4, textWrap: "balance" }}>
        <span
          style={{
            backgroundImage: `linear-gradient(${AMARELO_FLAVIA}, ${AMARELO_FLAVIA})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "0 85%",
            backgroundSize: `${marca * 100}% 45%`,
            boxDecorationBreak: "clone",
            WebkitBoxDecorationBreak: "clone",
          }}
        >
          {texto}
        </span>
      </div>
    </div>
  );
};

const Lista: React.FC = () => {
  const t = useT();
  const entra = useSpring(PRIMEIRO_ITEM - 0.3, 18);
  const sai = interpolate(t, [LISTA_SAI - 0.3, LISTA_SAI], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  if (t < PRIMEIRO_ITEM - 0.3 || t > LISTA_SAI) return null;
  return (
    <div
      style={{
        position: "absolute",
        top: 450,
        left: 60,
        right: 60,
        padding: "44px 48px 44px 30px",
        borderRadius: 36,
        background: "rgba(255,255,255,0.72)",
        boxShadow: "0 20px 60px rgba(158,79,102,0.14)",
        display: "flex",
        flexDirection: "column",
        gap: 24,
        opacity: entra * sai,
        transform: `translateY(${interpolate(entra, [0, 1], [40, 0])}px)`,
      }}
    >
      {ITENS.map((texto, i) => (
        <Item key={texto} n={i + 1} texto={texto} at={PRIMEIRO_ITEM + PASSO * i} />
      ))}
    </div>
  );
};

/** Fecho: a frase dela em destaque e a pergunta nas caixas. */
const Fecho: React.FC = () => {
  const t = useT();
  const p = useSpring(FRASE);
  if (t < FRASE) return null;
  return (
    <div
      style={{
        position: "absolute",
        top: 470,
        left: 90,
        right: 90,
        textAlign: "center",
        fontFamily: font.title,
        fontWeight: 600,
        fontSize: 76,
        lineHeight: 1.2,
        color: color.bone,
        opacity: p,
        transform: `translateY(${interpolate(p, [0, 1], [40, 0])}px)`,
      }}
    >
      Se aos 20 me dissessem que eu ia comemorar um{" "}
      <span style={{ fontStyle: "italic", color: color.brassLight }}>sábado vazio</span>, eu ia achar deprimente.
    </div>
  );
};

export const Luxo47: React.FC = () => {
  ritmo.velocidade = 1;
  return (
    <AbsoluteFill>
      <Fundo />
      <Gancho />
      <Lista />
      <Fecho />
      <CaixasGancho from={CTA} to={LUXO47_DURACAO + 1} amarela="E pra você," branca="o que virou luxo? 👇" y={1050} />
    </AbsoluteFill>
  );
};
