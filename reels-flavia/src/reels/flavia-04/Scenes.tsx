import React from "react";
import { CaixasGancho } from "../../flavia/CaixasGancho";
import { Frase } from "../../flavia/kit";
import { Card, Checklist, Headline, Scene } from "../../kit";

// Músculo depois dos 40. Layout tela cheia. Tempos = segundos da fala já cortada.
// 0–4,6 gancho (selfie) · 4,6–9,9 no rack · 9,9–33 narração sobre imagens de treino · 33–42 fechamento com halteres.

const Gap: React.FC<{ h?: number }> = ({ h = 40 }) => <div style={{ height: h }} />;
const Row: React.FC<{ children: React.ReactNode; gap?: number }> = ({ children, gap = 24 }) => (
  <div style={{ display: "flex", gap, justifyContent: "center", alignItems: "flex-start" }}>{children}</div>
);

export const Flavia04Scenes: React.FC = () => (
  <>
    {/* 1 · Gancho: no selfie o rosto ocupa o alto da tela, então as caixas vão embaixo */}
    <Scene from={0.0} to={4.56} bare>
      <CaixasGancho from={0.05} to={4.56} amarela="O que eu tenho pavor de perder envelhecendo?" branca="Músculo!" y={1260} />
    </Scene>

    {/* 2 · não é pra ficar musculosa: depois dos 40, músculo é saúde */}
    <Scene from={4.56} to={9.89}>
      <Frase at={4.6} text="Não é pra ficar musculosa…" size={52} dim />
      <Gap h={30} />
      <Headline at={7.34} text="Depois dos 40, músculo é *saúde*" size={88} />
    </Scene>

    {/* 3 · perda de massa muscular com a idade */}
    <Scene from={9.89} to={14.65}>
      <Headline at={9.95} text="A gente perde *massa muscular* com a idade" size={84} />
      <Gap h={30} />
      <Frase at={12.21} text="principalmente se não fizer nada para preservá-la" size={44} dim />
    </Scene>

    {/* 4 · consequências (cartões, não checklist: não são coisas boas) */}
    <Scene from={14.65} to={22.18}>
      <Frase at={14.7} text="E isso tem consequência" size={52} />
      <Gap h={30} />
      <Row>
        <Card at={15.8} label="Menos" value="Força" width={420} valueSize={46} />
        <Card at={16.76} label="Menor" value="Capacidade funcional" width={420} valueSize={40} />
      </Row>
      <Gap h={24} />
      <Row>
        <Card at={18.62} label="Maior risco de" value="Quedas" width={420} valueSize={46} />
        <Card at={20.62} label="Piora da" value="Saúde metabólica" width={420} valueSize={40} />
      </Row>
    </Scene>

    {/* 5 · por isso eu treino força */}
    <Scene from={22.18} to={25.92}>
      <Headline at={22.4} text="Por isso eu treino *força*" size={96} />
      <Gap h={30} />
      <Frase at={23.74} text="Não é só pra gostar do corpo no espelho" size={46} />
    </Scene>

    {/* 6 · chegar aos 60, 70, 80 anos com independência */}
    <Scene from={25.92} to={32.96}>
      <Checklist
        title="Chegar aos 60, 70, 80 anos"
        titleAt={26.0}
        items={[
          { text: "Levantando da cadeira sozinha", at: 28.34 },
          { text: "Carregando minhas coisas", at: 29.89 },
          { text: "Viajando", at: 31.15 },
          { text: "Com independência", at: 31.97 },
        ]}
      />
    </Scene>

    {/* 7 · se você tem mais de 40 */}
    <Scene from={32.96} to={38.43}>
      <Frase at={33.0} text="Se você tem mais de 40…" size={52} dim />
      <Gap h={30} />
      <Headline at={34.0} text="olhe pra musculação *dessa forma*" size={84} />
    </Scene>

    {/* 8 · fechamento nas caixas */}
    <Scene from={38.43} to={42.18} bare>
      <CaixasGancho from={38.45} to={42.18} amarela="Músculo não é só estética" branca="É independência" y={1260} />
    </Scene>
  </>
);
