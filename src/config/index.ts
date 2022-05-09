import path from 'path'
import detenv from 'dotenv'

interface IPathMap {
  dev: string
  test: string
}
const envPathMap: IPathMap = {
  dev: path.resolve(__dirname, '../../.env.development'),
  test: path.resolve(__dirname, '../../.env.test'),
}
const env = process.env.CURRENT_ENV ?? 'dev'

const dotenvConfig = detenv.config({ path: envPathMap[env as keyof IPathMap] })


export default dotenvConfig