import React from "react";
import { CaixasGancho } from "../../flavia/CaixasGancho";
import { CelulasGordura, Frase, Icone, Silhueta } from "../../flavia/kit";
import { Card, Headline, Scene } from "../../kit";

// Gordura ou lipedema? Tempos = segundos da fala já cortada (sem silêncio no começo/fim e com pausas encurtadas).
// Ela não diz quais são os sinais: a tela não lista sinais.

const Gap: React.FC<{ h?: number }> = ({ h = 40 }) => <div style={{ height: h }} />;
const Row: React.FC<{ children: React.ReactNode; gap?: number }> = ({ children, gap = 30 }) => (
  <div style={{ display: "flex", gap, justifyContent: "center", alignItems: "flex-start" }}>{children}</div>
);

export const Flavia03Scenes: React.FC = () => (
  <>
    {/* 1 · Gancho */}
    <Scene from={0.0} to={6.8} bare>
      <CaixasGancho from={0.1} to={6.8} amarela="Gordura ou lipedema?" branca="Emagreço no corpo todo, menos nas pernas" y={300} />
    </Scene>
    {/* "emagreço no corpo inteiro, menos nas pernas": silhueta com as pernas destacadas (sem mostrar sinais) */}
    <Scene from={3.9} to={6.8}>
      <Silhueta corpoAt={3.94} pernasAt={5.48} height={600} />
    </Scene>

    {/* 2 · "uma das coisas que podem entrar na investigação é o lipedema" */}
    <Scene from={6.8} to={10.98}>
      <Frase at={6.85} text="Uma das coisas que podem entrar na investigação" size={48} dim />
      <Gap h={30} />
      <Headline at={9.3} text="*Lipedema*" size={110} />
      <Gap h={30} />
      <Frase at={10.3} text="Por quê?" size={56} />
    </Scene>

    {/* 3 · não é gordura localizada: doença crônica do tecido adiposo */}
    <Scene from={10.98} to={16.7}>
      <Headline at={11.0} text="Não é simplesmente *gordura localizada*" size={80} />
      <Gap h={44} />
      <Row gap={24}>
        <CelulasGordura at={14.08} size={150} />
        <Card at={14.33} label="É uma" value="Doença crônica do tecido adiposo" width={620} valueSize={44} />
      </Row>
    </Scene>

    {/* 3b · predominantemente em mulheres */}
    <Scene from={16.7} to={19.54}>
      <Icone at={16.75} id="mulheres" size={240} />
      <Gap h={30} />
      <Frase at={16.9} text="Acontece predominantemente em mulheres" size={52} />
    </Scene>

    {/* 4 · sinais avaliados em consulta */}
    <Scene from={19.54} to={23.36}>
      <Headline at={19.6} text="Alguns sinais *chamam atenção*" size={88} />
      <Gap h={40} />
      <Row gap={30}>
        <Icone at={21.6} id="estetoscopio" size={190} />
        <div style={{ alignSelf: "center" }}>
          <Frase at={21.7} text="e a gente avalia em consulta" size={50} />
        </div>
      </Row>
    </Scene>

    {/* 5 · perna grossa ou celulite ≠ lipedema */}
    <Scene from={23.36} to={27.89}>
      <Frase at={23.4} text="Mas atenção:" size={50} dim />
      <Gap h={30} />
      <Row>
        <Card at={24.27} label="Ter" value="Perna grossa" width={420} valueSize={46} />
        <Card at={25.07} label="ou" value="Celulite" width={420} valueSize={46} />
      </Row>
      <Gap h={40} />
      <Headline at={26.09} text="não significa ter *lipedema*" size={76} />
    </Scene>

    {/* 6 · diagnóstico clínico */}
    <Scene from={27.89} to={31.19}>
      <Icone at={27.9} id="prancheta" size={190} />
      <Gap h={24} />
      <Headline at={28.0} text="O diagnóstico é *clínico*" size={92} />
      <Gap h={40} />
      <Frase at={29.07} text="e precisa ser feito adequadamente" size={48} />
    </Scene>

    {/* 7 · mulheres se culpando por anos */}
    <Scene from={31.19} to={37.46}>
      <Row gap={30}>
        <Icone at={32.94} id="calendario" size={180} />
        <div style={{ alignSelf: "center", maxWidth: 560 }}>
          <Frase at={31.3} text="Vejo mulheres se culpando durante anos…" size={50} />
        </div>
      </Row>
      <Gap h={40} />
      <Headline at={33.78} text="por algo que pode ter uma *explicação médica*" size={80} />
    </Scene>

    {/* 8 · CTA de compartilhamento */}
    <Scene from={37.46} to={42.61} bare>
      <CaixasGancho from={37.5} to={42.61} amarela="Conhece alguém que emagrece, mas a perna não muda?" branca="Manda esse vídeo pra ela" y={300} />
    </Scene>
  </>
);
