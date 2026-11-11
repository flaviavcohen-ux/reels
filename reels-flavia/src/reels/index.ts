import type { ReelDef } from "../types";
import { DemoScenes, demoTranscript } from "./demo/Scenes";
import { Flavia01Scenes } from "./flavia-01/Scenes";
import { Flavia02Scenes } from "./flavia-02/Scenes";
import { Flavia03Scenes } from "./flavia-03/Scenes";
import { Flavia04Scenes } from "./flavia-04/Scenes";
import { Flavia05Scenes } from "./flavia-05/Scenes";

// Cada Reel novo entra aqui. Exemplo de Reel real em references/exemplo-reel.md da skill.
export const reels: ReelDef[] = [
  { id: "demo", Scenes: DemoScenes, tag: "@flaviavcohen", demo: { transcript: demoTranscript } },
  {
    id: "flavia-01",
    Scenes: Flavia01Scenes,
    tag: "@flaviavcohen",
    velocidade: 1.1,
    faceSegments: [{ from: 0, position: "50% 20%" }], // em pé, andando na academia
  },
  {
    id: "flavia-02",
    Scenes: Flavia02Scenes,
    tag: "@flaviavcohen",
    velocidade: 1.1,
    faceSegments: [{ from: 0, position: "50% 10%" }], // sentada à mesa, mostrando os produtos
  },
  {
    id: "flavia-03",
    Scenes: Flavia03Scenes,
    tag: "@flaviavcohen",
    velocidade: 1.1,
    faceSegments: [{ from: 0, position: "50% 34%" }], // sentada à mesa, de blazer branco
  },
  // Testes de layout com o mesmo vídeo (comparação para a Flávia).
  { id: "flavia-03-cheia", media: "flavia-03", layout: "cheia", Scenes: Flavia03Scenes, tag: "@flaviavcohen", velocidade: 1.1 },
  {
    id: "flavia-03-moldura",
    media: "flavia-03",
    layout: "moldura",
    Scenes: Flavia03Scenes,
    tag: "@flaviavcohen",
    velocidade: 1.1,
    faceSegments: [{ from: 0, position: "50% 34%" }],
  },
  { id: "flavia-04", layout: "cheia", Scenes: Flavia04Scenes, tag: "@flaviavcohen", velocidade: 1.1 },
  {
    id: "flavia-05",
    Scenes: Flavia05Scenes,
    tag: "@flaviavcohen",
    velocidade: 1.1,
    faceSegments: [{ from: 0, position: "50% 20%" }], // sentada à mesa, blazer cinza
  },
  // Teste de paleta nude com o mesmo vídeo
  {
    id: "flavia-05-nude",
    media: "flavia-05",
    paleta: "nude",
    Scenes: Flavia05Scenes,
    tag: "@flaviavcohen",
    velocidade: 1.1,
    faceSegments: [{ from: 0, position: "50% 20%" }],
  },
];
