import sharp from 'sharp'
import { readdir, writeFile } from 'fs/promises'
import { join, basename, extname } from 'path'

const SRC = './public/images'
const files = (await readdir(SRC)).filter(f => /\.(jpg|jpeg|png)$/i.test(f))

const placeholders = {}

for (const file of files) {
  const input = join(SRC, file)
  const name = basename(file, extname(file))
  const output = join(SRC, `${name}.webp`)

  // Convert to WebP at quality 82
  await sharp(input).webp({ quality: 82 }).toFile(output)
  const { size } = await sharp(output).metadata().then(m => m).catch(() => ({}))
  console.log(`✓ ${file} → ${name}.webp`)

  // Generate 20px-wide blur placeholder as base64
  const buf = await sharp(input)
    .resize(20)
    .webp({ quality: 30 })
    .toBuffer()
  placeholders[name] = `data:image/webp;base64,${buf.toString('base64')}`
}

// Write placeholders to a JSON file imported by components
await writeFile('./src/lib/img-placeholders.json', JSON.stringify(placeholders, null, 2))
console.log('\n✓ Placeholders written to src/lib/img-placeholders.json')
