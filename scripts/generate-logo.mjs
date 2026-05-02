import fs from "node:fs";
import path from "node:path";

import OpenAI from "openai";

const outputPath = path.join(process.cwd(), "public", "maejang-biseo-mark-ai.png");
const envPath = path.join(process.cwd(), ".env.local");

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const content = fs.readFileSync(filePath, "utf8");

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, "");

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(envPath);

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error("OPENAI_API_KEY가 없습니다. .env.local 또는 셸 환경변수에 추가해 주세요.");
  process.exit(1);
}

const prompt = `
Create a premium SaaS app logo icon for a Korean restaurant AI assistant called "매장비서" (Maejang Biseo).

Requirements:
- image only, no text, no letters, no watermark
- square app icon composition
- premium SaaS brand feel, not cute, not cartoonish
- visually communicate: storefront + intelligent assistant
- clean geometric storefront silhouette
- subtle AI sparkle or signal accent
- refined, minimal, modern, confident
- warm neutral luxury palette: ivory, charcoal, soft amber, restrained orange accent
- centered composition with strong contrast
- suitable for website header, favicon, app icon, and startup brand deck
- polished, high-end, flat-to-soft-gradient brand style
- no mockup, no background scene, no hands, no 3d object photography
- output as a clean standalone logo icon
`.trim();

const client = new OpenAI({ apiKey });

console.log("AI 로고 생성 중...");

const result = await client.images.generate({
  model: process.env.OPENAI_IMAGE_MODEL || "gpt-image-1",
  prompt,
  size: "1024x1024",
  quality: "high",
});

const imageBase64 = result.data?.[0]?.b64_json;

if (!imageBase64) {
  console.error("이미지 데이터가 비어 있습니다. 모델 접근 권한 또는 응답을 확인해 주세요.");
  process.exit(1);
}

fs.writeFileSync(outputPath, Buffer.from(imageBase64, "base64"));

console.log(`생성 완료: ${outputPath}`);
