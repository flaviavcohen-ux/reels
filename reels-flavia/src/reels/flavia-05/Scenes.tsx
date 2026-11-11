import React from "react";
import { CaixasGancho } from "../../flavia/CaixasGancho";
import { Fases, Frase, Sintomas } from "../../flavia/kit";
import { Card, Checklist, Headline, Scene } from "../../kit";

// Perimenopausa. Tela dividida. Tempos = segundos da fala já cortada.

const Gap: React.FC<{ h?: number }> = ({ h = 40 }) => <div style={{ height: h }} />;
const Row: React.FC<{ children: React.ReactNode; gap?: number }> = ({ children, gap = 30 }) => (
  <div style={{ display: "flex", gap, justifyContent: "center", alignItems: "flex-start" }}>{children}</div>
);

export const Flavia05Scenes: React.FC = () => (
  <>
    {/* 1 · Gancho */}
    <Scene from={0.0} to={7.68}>
      <CaixasGancho from={0.1} to={7.68} amarela="Tem 40 e poucos e sente que algo mudou?" branca="…mas seus exames vêm normais" y={300} />
    </Scene>

    {/* 2 · não é de um dia pro outro: perimenopausa → menopausa */}
    <Scene from={7.68} to={14.15}>
      <Headline at={7.7} text="A menopausa não acontece *de um dia pro outro*" size={80} />
      <Gap h={50} />
      <Frase at={10.75} text="Existe uma fase de transição" size={46} dim />
      <Gap h={30} />
      <Fases
        fases={[
          { nome: "Perimenopausa", at: 12.38 },
          { nome: "Menopausa", at: 13.3 },
        ]}
      />
    </Scene>

    {/* 3 · pode começar muito antes da última menstruação */}
    <Scene from={14.15} to={18.25}>
      <Headline at={14.2} text="Pode começar *muito antes*" size={96} />
      <Gap h={40} />
      <Frase at={16.72} text="da sua última menstruação" size={54} />
    </Scene>

    {/* 4 · sintomas, um por um */}
    <Scene from={18.25} to={27.36}>
      <Frase at={18.3} text="O que pode mudar:" size={46} dim />
      <Gap h={30} />
      <Sintomas
        itens={[
          { id: "calendario", nome: "Ciclo", at: 18.42 },
          { id: "humor", nome: "Humor", at: 19.24 },
          { id: "sono", nome: "Sono", at: 20.02 },
          { id: "calorao", nome: "Calorão", at: 22.91 },
          { id: "libido", nome: "Libido", at: 24.55 },
          { id: "enxaqueca", nome: "Enxaqueca", at: 25.3 },
          { id: "concentracao", nome: "Concentração", at: 26.71 },
        ]}
      />
    </Scene>

    {/* 5 · você pode continuar menstruando */}
    <Scene from={27.36} to={31.18}>
      <Frase at={27.4} text="E o mais confuso:" size={50} dim />
      <Gap h={30} />
      <Headline at={29.3} text="você pode *continuar menstruando*" size={92} />
    </Scene>

    {/* 6 · tanta mulher sem fazer ideia */}
    <Scene from={31.18} to={36.26}>
      <Frase at={31.2} text="Por isso tanta mulher passa por essa fase…" size={48} />
      <Gap h={30} />
      <Headline at={33.61} text="sem fazer ideia do que *está acontecendo*" size={84} />
    </Scene>

    {/* 7 · não é diagnosticada só pelo exame */}
    <Scene from={36.26} to={44.94}>
      <Frase at={36.3} text="Muito importante:" size={46} dim />
      <Gap h={24} />
      <Headline at={38.18} text="A perimenopausa não é diagnosticada só pelo *exame*" size={76} />
      <Gap h={44} />
      <Row>
        <Card at={43.38} label="Seja o" value="FSH" width={320} valueSize={60} />
        <Card at={44.38} label="ou o" value="LH" width={320} valueSize={60} />
      </Row>
    </Scene>

    {/* 8 · o que é fundamental */}
    <Scene from={44.94} to={51.51}>
      <Checklist
        title="O que é fundamental"
        titleAt={44.95}
        items={[
          { text: "A história da paciente", at: 45.08 },
          { text: "A idade", at: 46.52 },
          { text: "O padrão menstrual", at: 47.26 },
          { text: "Os sintomas", at: 48.62 },
        ]}
      />
    </Scene>

    {/* 9 · converse com seu médico */}
    <Scene from={51.51} to={60.1}>
      <Frase at={51.55} text="Percebeu essas mudanças depois dos 40?" size={48} />
      <Gap h={30} />
      <Headline at={56.53} text="Vale conversar com o seu *médico*" size={88} />
      <Gap h={40} />
      <Frase at={58.16} text="E eu tô aqui pra te ajudar 🤍" size={50} />
    </Scene>

    {/* 10 · CTA de compartilhamento */}
    <Scene from={60.1} to={67.44}>
      <CaixasGancho from={60.15} to={67.44} amarela="Manda pra aquela amiga que vive falando:" branca="“não sei o que tá acontecendo comigo”" y={300} />
    </Scene>
  </>
);
