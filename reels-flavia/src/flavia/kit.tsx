import React from "react";
import { Img, interpolateColors, spring, staticFile, useVideoConfig } from "remotion";
import { Appear } from "../kit/Appear";
import { useSince } from "../kit/time";
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
