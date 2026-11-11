import fs from "node:fs";
import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setConcurrency(4);

// Na nuvem do Claude Code o Chromium já vem instalado. Na sua máquina o Remotion baixa sozinho.
// A versão muda entre máquinas: procura qualquer chromium_headless_shell-* instalado.
const base = "/opt/pw-browsers";
const cloudChromium = fs.existsSync(base)
  ? fs
      .readdirSync(base)
      .filter((d) => d.startsWith("chromium_headless_shell-"))
      .flatMap((d) => [`${base}/${d}/chrome-linux/headless_shell`, `${base}/${d}/chrome-headless-shell-linux64/chrome-headless-shell`])
      .find((p) => fs.existsSync(p))
  : undefined;
if (cloudChromium) {
  Config.setBrowserExecutable(cloudChromium);
}
