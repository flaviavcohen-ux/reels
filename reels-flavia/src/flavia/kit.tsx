import React from "react";
import { Img, interpolateColors, spring, staticFile, useVideoConfig } from "remotion";
import { Appear } from "../kit/Appear";
import { useSince } from "../kit/time";
import { useStageArea } from "../layout/area";
import { CHEIA_TOP } from "../layout/Stage";
import { color, font } from "../theme";

/** Foto do produto (recortada do vídeo) num cartão arredondado. */
export const ProdutoCard: React.FC<{ at: number; src: string; nome: string; marca: string }> = ({ at, src, nome, marca }) => (
  <Appear at={at} from="scale">
    <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
      <Img
        src={staticFile(src)}
        style={{ height: 470, borderRadius: 32, boxShadow: `0 30px 60px ${color.glow}, 0 10px 24px rgba(0,0,0,0.15)`, border: "8px solid #fff" }}
      />
      <div>
        <div style={{ fontFamily: font.title, fontWeight: 700, fontSize: 92, color: color.bone, lineHeight: 1 }}>{nome}</div>
        <div style={{ fontFamily: font.body, fontWeight: 600, fontSize: 38, color: color.brassLight, marginTop: 14, letterSpacing: 2 }}>
          {marca.toUpperCase()}
        </div>
      </div>
    </div>
  </Appear>
);

export type IngredienteId = "linhaca" | "borragem" | "primula" | "vitaminaE" | "capsula";

const Ilustracao: React.FC<{ id: IngredienteId; size: number }> = ({ id, size }) => {
  const c = size / 2;
  if (id === "linhaca") {
    // Punhado de sementes de linhaça
    const seeds = [
      [0, -40, 20], [-38, -12, -30], [36, -14, 40], [-18, 26, 70], [22, 30, -60], [0, 0, 10], [-50, 30, 15], [52, 24, -20],
    ];
    return (
      <svg width={size} height={size}>
        {seeds.map(([x, y, r], i) => (
          <ellipse key={i} cx={c + x} cy={c + y} rx={13} ry={24} fill={i % 2 ? "#A86B3C" : "#C68A55"} transform={`rotate(${r} ${c + x} ${c + y})`} />
        ))}
      </svg>
    );
  }
  if (id === "borragem") {
    // Flor-estrela azul de 5 pétalas com centro escuro
    return (
      <svg width={size} height={size}>
        {Array.from({ length: 5 }, (_, i) => (
          <path
            key={i}
            d={`M${c} ${c} L${c - 22} ${c - 40} L${c} ${c - 78} L${c + 22} ${c - 40} Z`}
            fill="#5B7FD1"
            transform={`rotate(${i * 72} ${c} ${c})`}
          />
        ))}
        <circle cx={c} cy={c} r={16} fill="#2B2A4A" />
      </svg>
    );
  }
  if (id === "primula") {
    // Prímula: 4 pétalas amarelas em forma de coração
    return (
      <svg width={size} height={size}>
        {Array.from({ length: 4 }, (_, i) => (
          <path
            key={i}
            d={`M${c} ${c} C${c - 46} ${c - 30} ${c - 40} ${c - 80} ${c - 10} ${c - 74} Q${c} ${c - 66} ${c + 10} ${c - 74} C${c + 40} ${c - 80} ${c + 46} ${c - 30} ${c} ${c} Z`}
            fill="#F4C842"
            stroke="#E2A92A"
            strokeWidth={2}
            transform={`rotate(${i * 90 + 45} ${c} ${c})`}
          />
        ))}
        <circle cx={c} cy={c} r={12} fill="#9BB65A" />
      </svg>
    );
  }
  if (id === "capsula") {
    // Cápsula genérica bicolor (rosé + branco), serve para qualquer suplemento
    const w = size * 0.78;
    const h = size * 0.3;
    return (
      <svg width={size} height={size}>
        <g transform={`rotate(-30 ${c} ${c})`}>
          <path d={`M${c} ${c - h / 2} H${c - w / 2 + h / 2} A${h / 2} ${h / 2} 0 0 0 ${c - w / 2 + h / 2} ${c + h / 2} H${c} Z`} fill="#C9798F" />
          <path d={`M${c} ${c - h / 2} H${c + w / 2 - h / 2} A${h / 2} ${h / 2} 0 0 1 ${c + w / 2 - h / 2} ${c + h / 2} H${c} Z`} fill="#FFFFFF" stroke="#E9CDD2" strokeWidth={3} />
        </g>
      </svg>
    );
  }
  // Cápsula gelatinosa de vitamina E
  return (
    <svg width={size} height={size}>
      <defs>
        <radialGradient id="cap" cx="35%" cy="30%">
          <stop offset="0%" stopColor="#FFF4C2" />
          <stop offset="60%" stopColor="#F2C14E" />
          <stop offset="100%" stopColor="#C98E1C" />
        </radialGradient>
      </defs>
      <ellipse cx={c} cy={c} rx={size * 0.4} ry={size * 0.22} fill="url(#cap)" transform={`rotate(-30 ${c} ${c})`} />
    </svg>
  );
};

/** Ingrediente com ilustração, entrando no segundo em que ela fala o nome. */
export const Ingrediente: React.FC<{ at: number; id: IngredienteId; nome: string; size?: number }> = ({ at, id, nome, size = 190 }) => (
  <Appear at={at} from="up">
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 300 }}>
      <div
        style={{
          width: size + 40,
          height: size + 40,
          borderRadius: "50%",
          background: color.surface,
          boxShadow: `0 20px 40px ${color.glow}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ilustracao id={id} size={size} />
      </div>
      <div style={{ fontFamily: font.body, fontWeight: 700, fontSize: 38, color: color.bone, marginTop: 22, textAlign: "center", lineHeight: 1.15 }}>
        {nome}
      </div>
    </div>
  </Appear>
);

/** Linha do tempo de fases (ex: perimenopausa → menopausa). */
export const Fases: React.FC<{ fases: { nome: string; at: number }[] }> = ({ fases }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
    {fases.map((f, i) => (
      <React.Fragment key={f.nome}>
        {i > 0 && (
          <Appear at={f.at} from="fade">
            <div style={{ fontFamily: font.body, fontWeight: 700, fontSize: 56, color: color.brass }}>→</div>
          </Appear>
        )}
        <Appear at={f.at} from="scale">
          <div
            style={{
              fontFamily: font.body,
              fontWeight: 700,
              fontSize: 44,
              color: color.ink,
              background: color.brassLight,
              padding: "16px 34px",
              borderRadius: 60,
            }}
          >
            {f.nome}
          </div>
        </Appear>
      </React.Fragment>
    ))}
  </div>
);

/** Linha de texto simples em sans (frase de apoio). */
export const Frase: React.FC<{ at: number; text: string; size?: number; dim?: boolean }> = ({ at, text, size = 50, dim }) => (
  <Appear at={at} from="up">
    <div
      style={{
        fontFamily: font.body,
        fontWeight: dim ? 500 : 700,
        fontSize: size,
        color: dim ? color.textDim : color.bone,
        textAlign: "center",
        padding: "0 80px",
        lineHeight: 1.25,
      }}
    >
      {text}
    </div>
  </Appear>
);

/** Silhueta feminina simples. O corpo entra em `corpoAt`; as pernas ganham cor em `pernasAt` ("menos nas pernas"). */
export const Silhueta: React.FC<{ corpoAt: number; pernasAt: number; height?: number }> = ({ corpoAt, pernasAt, height = 440 }) => {
  const { fps } = useVideoConfig();
  const pernas = spring({ frame: useSince(pernasAt), fps, config: { damping: 16 } });
  const claro = "#EBCFD4";
  const destaque = interpolateColors(pernas, [0, 1], [claro, "#B65C76"]);
  return (
    <Appear at={corpoAt} from="scale">
      <svg width={(height * 200) / 420} height={height} viewBox="0 0 200 420">
        <circle cx={100} cy={38} r={26} fill={claro} />
        <rect x={92} y={60} width={16} height={18} fill={claro} />
        <path d="M62 82 Q100 72 138 82 L132 150 Q124 180 136 214 L64 214 Q76 180 68 150 Z" fill={claro} />
        <path d="M62 86 Q48 140 44 206 Q44 214 52 212 Q60 150 72 104 Z" fill={claro} />
        <path d="M138 86 Q152 140 156 206 Q156 214 148 212 Q140 150 128 104 Z" fill={claro} />
        <path d="M64 214 L100 214 L98 300 L92 396 L74 396 L70 300 Q62 250 64 214 Z" fill={destaque} />
        <path d="M100 214 L136 214 Q138 250 130 300 L126 396 L108 396 L102 300 Z" fill={destaque} />
      </svg>
    </Appear>
  );
};

/** Células de gordura (tecido adiposo), no mesmo estilo chapado dos ingredientes. */
export const CelulasGordura: React.FC<{ at: number; size?: number }> = ({ at, size = 190 }) => {
  const cells = [
    [0, 0, 34], [-58, -22, 28], [56, -26, 30], [-34, 46, 30], [36, 48, 32], [-70, 36, 20], [72, 30, 22], [4, -62, 24],
  ];
  const c = size / 2;
  const k = size / 190;
  return (
    <Appear at={at} from="scale">
      <div
        style={{
          width: size + 40,
          height: size + 40,
          borderRadius: "50%",
          background: color.surface,
          boxShadow: `0 20px 40px ${color.glow}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width={size} height={size}>
          {cells.map(([x, y, r], i) => (
            <g key={i}>
              <circle cx={c + x * k} cy={c + y * k} r={r * k} fill="#F7E3A8" stroke="#D9A3AF" strokeWidth={3} />
              <circle cx={c + (x + r * 0.55) * k} cy={c + (y + r * 0.45) * k} r={4 * k} fill="#B65C76" />
            </g>
          ))}
        </svg>
      </div>
    </Appear>
  );
};

export type IconeId = "estetoscopio" | "mulheres" | "prancheta" | "calendario";

const DesenhoIcone: React.FC<{ id: IconeId; size: number }> = ({ id, size }) => {
  const vinho = "#B65C76";
  const rose = "#C9798F";
  const claro = "#EBCFD4";
  if (id === "estetoscopio") {
    return (
      <svg width={size} height={size} viewBox="0 0 200 200">
        <path d="M60 30 V80 Q60 120 100 120 Q140 120 140 80 V30" fill="none" stroke={vinho} strokeWidth={10} strokeLinecap="round" />
        <circle cx={60} cy={28} r={9} fill={rose} />
        <circle cx={140} cy={28} r={9} fill={rose} />
        <path d="M100 120 V140 Q100 170 130 170 Q150 170 150 150 V140" fill="none" stroke={vinho} strokeWidth={10} strokeLinecap="round" />
        <circle cx={150} cy={130} r={22} fill={rose} />
        <circle cx={150} cy={130} r={11} fill={claro} />
      </svg>
    );
  }
  if (id === "mulheres") {
    const fig = (x: number, cor: string, s: number) => (
      <g transform={`translate(${x} ${200 - 170 * s}) scale(${s})`}>
        <circle cx={0} cy={30} r={22} fill={cor} />
        <path d="M0 58 L-38 150 H38 Z" fill={cor} />
        <rect x={-18} y={150} width={12} height={20} rx={4} fill={cor} />
        <rect x={6} y={150} width={12} height={20} rx={4} fill={cor} />
      </g>
    );
    return (
      <svg width={size} height={size} viewBox="0 0 200 200">
        {fig(48, claro, 0.8)}
        {fig(152, rose, 0.8)}
        {fig(100, vinho, 0.95)}
      </svg>
    );
  }
  if (id === "prancheta") {
    return (
      <svg width={size} height={size} viewBox="0 0 200 200">
        <rect x={45} y={30} width={110} height={150} rx={12} fill={rose} />
        <rect x={58} y={48} width={84} height={120} rx={6} fill="#FFFFFF" />
        <rect x={75} y={22} width={50} height={22} rx={8} fill={vinho} />
        {[72, 92, 112].map((y) => (
          <rect key={y} x={70} y={y} width={60} height={7} rx={3} fill={claro} />
        ))}
        <path d="M78 140 L94 154 L124 126" fill="none" stroke={vinho} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  // Calendário
  return (
    <svg width={size} height={size} viewBox="0 0 200 200">
      <rect x={30} y={40} width={140} height={130} rx={14} fill="#FFFFFF" stroke={claro} strokeWidth={4} />
      <rect x={30} y={40} width={140} height={34} rx={14} fill={vinho} />
      <rect x={30} y={60} width={140} height={14} fill={vinho} />
      <rect x={62} y={28} width={10} height={26} rx={5} fill={rose} />
      <rect x={128} y={28} width={10} height={26} rx={5} fill={rose} />
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2, 3, 4].map((c) => (
          <rect key={`${r}-${c}`} x={44 + c * 24} y={86 + r * 20} width={16} height={12} rx={3} fill={(r * 5 + c) % 3 === 0 ? rose : claro} />
        )),
      )}
    </svg>
  );
};

/** Ícone ilustrado num círculo, no estilo dos ingredientes. Ilustra o que ela fala (nunca sinais ou sintomas que ela não citou). */
export const Icone: React.FC<{ at: number; id: IconeId; size?: number }> = ({ at, id, size = 150 }) => (
  <Appear at={at} from="scale">
    <div
      style={{
        width: size + 40,
        height: size + 40,
        borderRadius: "50%",
        background: color.surface,
        boxShadow: `0 20px 40px ${color.glow}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <DesenhoIcone id={id} size={size} />
    </div>
  </Appear>
);

/** Ilustração estilizada de pernas (lipedema): contorno das pernas de short; as regiões de volume ganham cor em `destaqueAt`. */
export const PernasLipedema: React.FC<{ at: number; destaqueAt: number; height?: number }> = ({ at, destaqueAt, height = 380 }) => {
  const { fps } = useVideoConfig();
  const d = spring({ frame: useSince(destaqueAt), fps, config: { damping: 16 } });
  const claro = "#F0D9DD";
  const contorno = "#D9A3AF";
  const regiao = "#C9798F";
  return (
    <Appear at={at} from="scale">
      <svg width={(height * 300) / 420} height={height} viewBox="0 0 300 420">
        <defs>
          <clipPath id="pernas">
            <path d="M90 20 C60 50 52 75 55 95 C45 130 48 160 52 185 C56 215 62 228 60 245 C56 270 58 300 66 330 C72 350 78 358 88 366 L90 378 C84 388 78 394 80 404 L116 404 C118 394 114 386 110 378 L112 366 C124 356 134 340 138 312 C142 285 140 262 144 245 C148 228 150 205 150 170 L150 130 L150 170 C150 205 152 228 156 245 C160 262 158 285 162 312 C166 340 176 356 188 366 L190 378 C186 386 182 394 184 404 L220 404 C222 394 216 388 210 378 L212 366 C222 358 228 350 234 330 C242 300 244 270 240 245 C238 228 244 215 248 185 C252 160 255 130 245 95 C248 75 240 50 210 20 Z" />
          </clipPath>
        </defs>
        {/* Pernas (uma forma só, simétrica) */}
        <path d="M90 20 C60 50 52 75 55 95 C45 130 48 160 52 185 C56 215 62 228 60 245 C56 270 58 300 66 330 C72 350 78 358 88 366 L90 378 C84 388 78 394 80 404 L116 404 C118 394 114 386 110 378 L112 366 C124 356 134 340 138 312 C142 285 140 262 144 245 C148 228 150 205 150 170 L150 130 L150 170 C150 205 152 228 156 245 C160 262 158 285 162 312 C166 340 176 356 188 366 L190 378 C186 386 182 394 184 404 L220 404 C222 394 216 388 210 378 L212 366 C222 358 228 350 234 330 C242 300 244 270 240 245 C238 228 244 215 248 185 C252 160 255 130 245 95 C248 75 240 50 210 20 Z" fill={claro} />
        {/* Volume das coxas até acima do tornozelo ganha cor; tornozelos e pés ficam claros */}
        <rect x={0} y={100} width={300} height={264} fill={regiao} opacity={0.6 * d} clipPath="url(#pernas)" />
        <path d="M90 20 C60 50 52 75 55 95 C45 130 48 160 52 185 C56 215 62 228 60 245 C56 270 58 300 66 330 C72 350 78 358 88 366 L90 378 C84 388 78 394 80 404 L116 404 C118 394 114 386 110 378 L112 366 C124 356 134 340 138 312 C142 285 140 262 144 245 C148 228 150 205 150 170 L150 130 L150 170 C150 205 152 228 156 245 C160 262 158 285 162 312 C166 340 176 356 188 366 L190 378 C186 386 182 394 184 404 L220 404 C222 394 216 388 210 378 L212 366 C222 358 228 350 234 330 C242 300 244 270 240 245 C238 228 244 215 248 185 C252 160 255 130 245 95 C248 75 240 50 210 20 Z" fill="none" stroke={contorno} strokeWidth={3} />
        {/* Short */}
        <path d="M90 20 H210 C238 48 248 80 246 108 H156 L150 124 L144 108 H54 C52 80 62 48 90 20 Z" fill="#B65C76" />
      </svg>
    </Appear>
  );
};

/** Peça solta num ponto fixo da tela (ex.: ilustração na parede ao lado do rosto, no layout de tela cheia).
 * Use dentro de uma <Scene bare>: dentro do cartão a posição seria relativa ao cartão. `y` e `x` são da tela inteira. */
export const Flutuante: React.FC<{ y?: number; x?: number; width?: number; children: React.ReactNode }> = ({ y = 250, x = 40, width = 360, children }) => {
  const area = useStageArea();
  const topoDaArea = area.variant === "cheia" ? CHEIA_TOP : 0;
  return <div style={{ position: "absolute", top: y - topoDaArea, left: x, width, display: "flex", justifyContent: "center" }}>{children}</div>;
};
