import PptxGenJS from "/Users/alkhastvatsaev/Development/CRMSLOT/node_modules/pptxgenjs/dist/pptxgen.cjs.js";
import { resolve } from "path";
const SLIDES = "/Users/alkhastvatsaev/Development/CRMSLOT/scripts/prospecting/output/pptx-assets/slides-sales";
const files = ["01-cover","02-probleme","03-carte","04-dossiers","05-mobile","06-facturation","07-close"];
const pptx = new PptxGenJS();
pptx.defineLayout({ name: "W", width: 13.333, height: 7.5 });
pptx.layout = "W";
for (const f of files) {
  const s = pptx.addSlide();
  s.addImage({ path: resolve(SLIDES, f + "-sm.jpg"), x: 0, y: 0, w: 13.333, h: 7.5 });
}
await pptx.writeFile({ fileName: resolve("/Users/alkhastvatsaev/Development/CRMSLOT/scripts/prospecting/output", "CRM-Slot-presentation-prospection.pptx") });
