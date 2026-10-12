import React from "react";
import { CaixasGancho } from "../../flavia/CaixasGancho";
import { Frase } from "../../flavia/kit";
import { Card, Headline, Scene } from "../../kit";

// Recebidos WePink. Tempos = segundos da fala já cortada (intro IMG_6467 + IMG_6469, sem tropeços e com pausas encurtadas).

const Gap: React.FC<{ h?: number }> = ({ h = 40 }) => <div style={{ height: h }} />;
const Row: React.FC<{ children: React.ReactNode; gap?: number }> = ({ children, gap = 30 }) => (
  <div style={{ display: "flex", gap, justifyContent: "center", alignItems: "flex-start" }}>{children}</div>
);

export const Flavia02Scenes: React.FC = () => (
  <>
    {/* 1 · Gancho: presente de dia das crianças */}
    <Scene from={0.0} to={5.46}>
      <CaixasGancho from={0.1} to={5.46} amarela="Meu presente de dia das crianças" branca="Fui eu que me dei 😂" y={300} />
    </Scene>

    {/* 2 · fase dos body creams */}
    <Scene from={5.46} to={13.11}>
      <Headline at={6.02} text="Minha fase dos *body creams*" size={86} />
      <Gap h={40} />
      <Frase at={9.0} text="Body cream + body splash" size={52} />
      <Gap h={40} />
      <Card at={10.84} label="Às vezes melhor do que" value="Comprar o perfume" width={700} />
    </Scene>

    {/* 3 · Perfect Pure: body cream e body splash */}
    <Scene from={13.11} to={18.86}>
      <Frase at={13.2} text="O que eu trouxe" size={46} dim />
      <Gap h={24} />
      <Headline at={15.35} text="Perfect *Pure*" size={100} />
      <Gap h={44} />
      <Row>
        <Card at={15.6} label="Perfect Pure" value="Body cream" width={420} valueSize={46} />
        <Card at={17.3} label="Perfect Pure" value="Body splash" width={420} valueSize={46} />
      </Row>
    </Scene>

    {/* 4 · por quê: o perfume não fixa tanto */}
    <Scene from={18.86} to={24.24}>
      <Headline at={18.9} text="Por *quê*?" size={100} />
      <Gap h={40} />
      <Frase at={19.78} text="Já tenho o perfume, bem gostosinho…" size={48} />
      <Gap h={40} />
      <Card at={22.44} label="Mas" value="A fixação não é tão boa" width={760} />
    </Scene>

    {/* 5 · Pure Pear + tudo da mesma linha */}
    <Scene from={24.24} to={31.56}>
      <Frase at={25.3} text="Body splash" size={46} dim />
      <Gap h={20} />
      <Headline at={26.5} text="Pure *Pear*" size={100} />
      <Gap h={44} />
      <Frase at={27.32} text="Body cream + body splash + perfume" size={46} />
      <Gap h={30} />
      <Card at={30.29} label="Todos da" value="Mesma linha" width={560} />
    </Scene>

    {/* 6 · Heaven Blue */}
    <Scene from={31.56} to={38.43}>
      <Frase at={31.6} text="Além disso, o body cream" size={46} dim />
      <Gap h={20} />
      <Headline at={34.36} text="Heaven *Blue*" size={100} />
      <Gap h={40} />
      <Frase at={36.83} text="Eu amo esse cheirinho 🤍" size={54} />
    </Scene>

    {/* 7 · cítrico, leve pra academia */}
    <Scene from={38.43} to={44.07}>
      <Headline at={38.5} text="Cheirinho *cítrico*" size={96} />
      <Gap h={44} />
      <Card at={41.03} label="Leve pra usar na" value="Academia" width={560} />
    </Scene>

    {/* 8 · Booster Repair pro cabelo */}
    <Scene from={44.07} to={49.28}>
      <Frase at={44.1} text="E também comprei…" size={54} />
      <Gap h={30} />
      <Headline at={47.69} text="Booster *Repair*" size={100} />
      <Gap h={40} />
      <Card at={48.31} label="Óleo pra" value="Cabelo" width={480} />
    </Scene>

    {/* 9 · compras da WePink, última live */}
    <Scene from={49.28} to={53.38}>
      <Headline at={49.3} text="Minhas compras da *WePink*" size={86} />
      <Gap h={40} />
      <Frase at={51.4} text="da última live" size={50} dim />
      <Gap h={30} />
      <Frase at={52.16} text="Foi muito barata!" size={60} />
    </Scene>

    {/* 10 · preços */}
    <Scene from={53.38} to={58.64}>
      <Row>
        <Card at={54.08} label="Cada body splash" value="R$ 19" width={420} valueSize={56} />
        <Card at={56.15} label="Body creams" value="R$ 20 e pouquinho" width={420} valueSize={40} />
      </Row>
    </Scene>

    {/* 11 · fechamento nas caixas */}
    <Scene from={58.64} to={62.92}>
      <CaixasGancho from={58.7} to={62.92} amarela="Valeu muito a pena!" branca="Qual é o seu cheirinho favorito? Me conta aqui" y={300} />
    </Scene>
  </>
);
