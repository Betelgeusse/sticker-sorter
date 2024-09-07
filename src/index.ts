import path from "path";
import fs from "fs";
import { compareHashes } from "jimp";

function logging(files: any[], percentageResult: number, i: number, j: number) {
  console.log(`Comparing: i: ${files[i]} j:${files[j]}`);
  console.log("------");
  console.log(files[i]);
  console.log(files[j]);
  console.log(percentageResult);
  console.log("------");
}

async function init() {
  const percentageAcceptance = 95;

  const files = fs.readdirSync(path.resolve("stickers"));
  for (let i = 0; i < files.length - 1; i++) {
    if (files[i]) {
      fs.copyFileSync(
        path.resolve("stickers", `${files[i]}`),
        path.resolve("stickers-result", `${files[i]}`)
      );
    } else {
      continue;
    }

    for (let j = 0; j < files.length - 1; j++) {
      const fileFrom = files[i];
      const fileAgainst = files[j];
      const sameFile = files[i] === files[j];
      if (!fileFrom || !fileAgainst || sameFile) {
        continue;
      }
      const result = compareHashes(
        path.resolve("stickers", fileFrom),
        path.resolve("stickers", fileAgainst)
      );

      const percentageResult = (result - 1) * -1 * 100;
      if (percentageResult > percentageAcceptance) {
        logging(files, percentageResult, i, j);
        const newFileName = `${files[i].replace(".webp", "")}_${Number(
          new Date()
        )}.webp`;
        fs.copyFileSync(
          path.resolve("stickers", fileAgainst),
          `${path.resolve("stickers-result", newFileName)}`
        );
        files[j] = "";
      }
    }
  }
}

// function reorder() {
//   const files = fs.readdirSync(path.resolve("stickers-result"));
//   let i = 1;
//   for (let file of files.sort()) {
//     console.log(file, i);
//     fs.copyFileSync(
//       path.resolve("stickers-result", file),
//       path.resolve("stickers-reordered", `${i}.webp`)
//     );
//     i++;
//   }
// }

init();
// reorder();
