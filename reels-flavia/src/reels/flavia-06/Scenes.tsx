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
    <Scene from={8.11} to={11.75}>
      <Headline at={8.28} text="*Bioimpedância*" size={104} />
      <Gap h={24} />
      <Frase at={9.2} text="um exame que vai além do peso" size={50} />
    </Scene>

    {/* 4 · composição corporal no exame dela: cada linha acende quando ela fala (sem nome, ID nem idade no recorte) */}
    <Scene from={11.75} to={19.3}>
      <ImagemCard
        at={11.85}
        src="reels/flavia-06/inbody-full.png"
        width={920}
        etiqueta="Minha bioimpedância"
        destaques={[
          { at: 14.46, y0: 0.89, y1: 0.989 },
          { at: 16.0, y0: 0.79, y1: 0.892 },
          { at: 17.76, y0: 0.08, y1: 0.157 },
        ]}
      />
    </Scene>

    {/* 5 · saudável x te deixa mais fraca, mais lenta, metabolismo devagar */}
    <Scene from={19.3} to={26.82}>
      <Frase at={19.35} text="É o que separa um emagrecimento saudável…" size={46} />
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
