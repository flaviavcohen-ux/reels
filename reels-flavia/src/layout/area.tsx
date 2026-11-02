import { createContext, useContext } from "react";

/** Layout do Reel: "dividida" (animação em cima, vídeo embaixo), "cheia" (vídeo na tela toda) ou "moldura" (vídeo numa janela). */
export type LayoutVariant = "dividida" | "cheia" | "moldura";

/** Onde fica a área das cenas na tela. `top` deixa peças com posição absoluta (caixas de gancho) no lugar certo. */
export const StageArea = createContext<{ variant: LayoutVariant; top: number }>({ variant: "dividida", top: 0 });
export const useStageArea = () => useContext(StageArea);
