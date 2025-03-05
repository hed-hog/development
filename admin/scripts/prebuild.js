import 'dotenv/config'
import { writeFileSync } from 'fs'

console.info('API_URL', process.env.API_URL)

writeFileSync(
  'src/lib/get-base-url.ts',
  `export const getBaseURL = () => '${process.env.API_URL}'`
)

writeFileSync(
  'src/theme.css',
  `@import url('${process.env.API_URL}/appearance/index.css');`
)
