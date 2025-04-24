// convert-to-webp.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'src', 'assets', 'images');

fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error('Ошибка при чтении папки:', err);
    return;
  }

  files
    .filter(file => /\.(jpe?g|png)$/i.test(file))
    .forEach(file => {
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(inputDir, file.replace(/\.(jpe?g|png)$/i, '.webp'));

      // Пропустить, если .webp уже есть
      if (fs.existsSync(outputPath)) {
        console.log(`✅ ${outputPath} уже существует, пропускаем`);
        return;
      }

      sharp(inputPath)
        .webp({ quality: 75 })
        .toFile(outputPath)
        .then(() => console.log(`🟢 Сконвертировано: ${file} → ${path.basename(outputPath)}`))
        .catch(err => console.error(`❌ Ошибка при конвертации ${file}:`, err));
    });
});
