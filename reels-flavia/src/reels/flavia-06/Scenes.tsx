import React from "react";
import { CaixasGancho } from "../../flavia/CaixasGancho";
import { Frase, ImagemCard, Sintomas } from "../../flavia/kit";
import { Card, Checklist, Headline, Scene } from "../../kit";

// Bioimpedância. Tela dividida, paleta nude. Tempos = segundos da fala já cortada.
// Ela não cita percentuais nem valores (além dos 5 kg): a tela não inventa números.

const Gap: React.FC<{ h?: number }> = ({ h = 40 }) => <div style={{ height: h }} />;
const Row: React.FC<{ children: React.ReactNode; gap?: number }> = ({ children, gap = 24 }) => (
  <div style={{ display: "flex", gap, justifyContent: "center", alignItems: "flex-start" }}>{children}</div>
);

export const Flavia06Scenes: React.FC = () => (
  <>
    {/* 1 · Gancho */}
    <Scene from={0.0} to={3.82}>
      <CaixasGancho from={0.1} to={3.82} amarela="A balança diz que você perdeu 5 kg…" branca="mas você perdeu o quê?" y={300} />
    </Scene>

    {/* 2 · gordura? músculo? água? */}
    <Scene from={3.82} to={8.11}>
      <Sintomas
        itens={[
          { id: "gordura", nome: "Gordura?", at: 4.28 },
          { id: "musculo", nome: "Músculo?", at: 5.38 },
          { id: "gota", nome: "Água?", at: 6.51 },
        ]}
        size={160}
      />
      <Gap h={40} />
      <Headline at={7.24} text="Isso *muda tudo*" size={92} />
    </Scene>

    {/* 3 · bioimpedância: além do peso */}
    <Scene from={8.11} to={13.67}>
      <Headline at={8.28} text="*Bioimpedância*" size={96} />
      <Gap h={16} />
      <Frase at={9.2} text="um exame que vai além do peso" size={46} />
      <Gap h={30} />
      {/* Recorte da bioimpedância da própria Flávia (sem nome, ID nem idade) */}
      <ImagemCard at={10.4} src="reels/flavia-06/inbody.png" width={880} etiqueta="Minha bioimpedância" />
    </Scene>

    {/* 4 · quanto do peso é gordura, músculo e água */}
    <Scene from={13.67} to={18.12}>
      <Frase at={13.7} text="Quanto do seu peso é…" size={48} dim />
      <Gap h={30} />
      <Sintomas
        itens={[
          { id: "gordura", nome: "Gordura", at: 14.56 },
          { id: "musculo", nome: "Massa muscular", at: 16.1 },
          { id: "gota", nome: "Água", at: 17.86 },
        ]}
        size={160}
      />
    </Scene>

    {/* 5 · saudável x te deixa mais fraca, mais lenta, metabolismo devagar */}
    <Scene from={18.12} to={26.82}>
      <Frase at={18.2} text="É o que separa um emagrecimento saudável…" size={46} />
      <Gap h={20} />
      <Frase at={21.51} text="…de um que vai te deixar" size={44} dim />
      <Gap h={36} />
      <Row>
        <Card at={23.61} label="Mais" value="Fraca" width={280} valueSize={50} />
        <Card at={24.36} label="Mais" value="Lenta" width={280} valueSize={50} />
        <Card at={25.18} label="Metabolismo" value="Mais devagar" width={320} valueSize={44} />
      </Row>
    </Scene>

    {/* 6 · o que me interessa: perder gordura e preservar músculo */}
    <Scene from={26.82} to={34.14}>
      <Frase at={26.85} text="Quando eu acompanho um paciente…" size={46} dim />
      <Gap h={20} />
      <Headline at={28.89} text="não é o *número na balança*" size={84} />
      <Gap h={40} />
      <Row>
        <Card at={31.43} label="Perdendo" value="Gordura" width={400} valueSize={52} />
        <Card at={32.95} label="Preservando" value="Músculo" width={400} valueSize={52} />
      </Row>
    </Scene>

    {/* 7 · músculo é metabolismo, saúde óssea, longevidade */}
    <Scene from={34.14} to={39.02}>
      <Checklist
        title="Músculo é"
        titleAt={34.2}
        items={[
          { text: "Metabolismo", at: 35.75 },
          { text: "Saúde óssea", at: 36.71 },
          { text: "Longevidade", at: 38.15 },
        ]}
      />
    </Scene>

    {/* 8 · fechamento nas caixas */}
    <Scene from={39.02} to={46.63}>
      <CaixasGancho from={39.05} to={46.63} amarela="Emagrecendo e nunca fez bioimpedância?" branca="Vale conversar com o seu médico" y={300} />
    </Scene>
  </>
);
