import path from "path";
import fs from "fs";

function init() {
  const readFrom: string = path.resolve("stickers");
  const outDir: string = path.resolve("stickers-result");

  let i = 0;
  for (let file of fs.readdirSync(readFrom)) {
    const pathFile = path.resolve(readFrom, file);
    const stats = fs.statSync(path.resolve(readFrom, file));
    const sizeByte = stats.size;
    const fileName = `${sizeByte}_${Number(new Date())}.webp`;
    fs.copyFileSync(pathFile, `${path.resolve(outDir, fileName)}`);

    console.log(`Saved ${i}`);
    i++;
  }
}

init();
