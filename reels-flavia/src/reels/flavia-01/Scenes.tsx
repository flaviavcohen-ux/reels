import React from "react";
import { CaixasGancho } from "../../flavia/CaixasGancho";
import { Frase } from "../../flavia/kit";
import { Card, Checklist, Headline, Scene } from "../../kit";

// Tempos = segundos da fala já cortada (sem a regravação do CTA, sem o fim solto e com as pausas encurtadas).

const Gap: React.FC<{ h?: number }> = ({ h = 40 }) => <div style={{ height: h }} />;
const Row: React.FC<{ children: React.ReactNode; gap?: number }> = ({ children, gap = 30 }) => (
  <div style={{ display: "flex", gap, justifyContent: "center", alignItems: "flex-start" }}>{children}</div>
);

export const Flavia01Scenes: React.FC = () => (
  <>
    {/* 1 · Gancho: "creatina é coisa de maromba? Não!" */}
    <Scene from={0.0} to={7.99}>
      <CaixasGancho from={0.1} to={7.99} amarela="Creatina é coisa de maromba?" branca="Não! E mulher 40+ precisa entender isso" y={300} />
    </Scene>

    {/* 2 · "um dos suplementos mais estudados… desempenho… alta intensidade" */}
    <Scene from={7.99} to={14.95}>
      <Headline at={8.05} text="Um dos suplementos *mais estudados*" size={84} />
      <Gap h={50} />
      <Row>
        <Card at={12.64} label="Pode ajudar no" value="Desempenho" width={440} valueSize={46} />
        <Card at={13.46} label="Exercício de" value="Alta intensidade" width={440} valueSize={46} />
      </Row>
    </Scene>

    {/* 3 · "associada ao treino de força… massa magra" */}
    <Scene from={14.95} to={19.78}>
      <Headline at={15.0} text="Com *treino de força*" size={92} />
      <Gap h={50} />
      <Card at={16.64} label="Pode contribuir pra ganhar" value="Massa magra" width={700} />
    </Scene>

    {/* 4 · "me interessa cada vez mais que eu envelheço: preservar músculo" */}
    <Scene from={19.78} to={24.39}>
      <Frase at={19.85} text="O que mais me interessa com o passar dos anos" size={54} />
      <Gap h={40} />
      <Headline at={23.2} text="Preservar *músculo*" size={100} />
    </Scene>

    {/* 5 · a rotina dela */}
    <Scene from={24.39} to={28.77}>
      <Checklist
        title="O que eu faço"
        titleAt={24.4}
        items={[
          { text: "Treino", at: 24.56 },
          { text: "Priorizo proteína", at: 25.12 },
          { text: "Creatina todos os dias", at: 26.43 },
        ]}
      />
    </Scene>

    {/* 6 · "não pra virar fisiculturista, pra envelhecer forte" */}
    <Scene from={28.77} to={32.19}>
      <Frase at={28.8} text="Não pra virar fisiculturista" size={54} />
      <Gap h={40} />
      <Headline at={30.72} text="Pra envelhecer *forte*" size={100} />
    </Scene>

    {/* 7 · "creatina sozinha não faz milagre… um scoop não vai resolver" */}
    <Scene from={32.19} to={41.22}>
      <Headline at={32.25} text="Creatina sozinha não faz *milagre*" size={84} />
      <Gap h={50} />
      <Frase at={34.85} text="Sem treino e sem comer adequadamente…" size={46} />
      <Gap h={44} />
      <Card at={37.38} label="Um scoop" value="não resolve" width={600} />
    </Scene>

    {/* 8 · "suplemento complementa, não substitui o básico" */}
    <Scene from={41.22} to={44.28}>
      <Headline at={41.25} text="Suplemento *complementa*" size={92} />
      <Gap h={40} />
      <Frase at={42.03} text="Não substitui o básico" size={56} />
    </Scene>

    {/* 9 · pergunta final, nas caixas dela */}
    <Scene from={44.28} to={52.99}>
      <CaixasGancho from={44.35} to={52.99} amarela="Você ainda tem medo de creatina?" branca="Me conta aqui nos comentários" y={300} />
    </Scene>
  </>
);
