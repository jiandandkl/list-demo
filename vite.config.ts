import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fixReactVirtualized from 'esbuild-plugin-react-virtualized'

import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import type { PluginOption } from 'vite'
import { resolve } from 'import-meta-resolve'

function reactVirtualized(): PluginOption {
  const WRONG_CODE = `import { bpfrpt_proptype_WindowScroller } from "../WindowScroller.js";`

  return {
    name: 'my:react-virtualized',
    async configResolved() {
      console.log(1666)

      const reactVirtualizedPath = path.dirname(
        fileURLToPath(resolve('react-virtualized', import.meta.url))
        // fileURLToPath(import.meta.resolve('react-virtualized'))
      )

      const brokenFilePath = path.join(
        reactVirtualizedPath,
        '..', // back to dist
        'es',
        'WindowScroller',
        'utils',
        'onScroll.js'
      )
      const brokenCode = await readFile(brokenFilePath, 'utf-8')

      const fixedCode = brokenCode.replace(WRONG_CODE, '')
      await writeFile(brokenFilePath, fixedCode)
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // fixReactVirtualized,
    reactVirtualized(),
    react()
  ]
})
