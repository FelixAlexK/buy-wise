// drzl.config.ts
import { defineConfig } from '@drzl/cli/config'

export default defineConfig({
  schema: 'src/db/schemas/index.ts',
  outDir: 'src/routers',
  generators: [
    { kind: 'zod', path: 'src/validators/zod' },
    { kind: 'service', path: 'src/services', dataAccess: 'drizzle', fileSuffix: '.service' },
    {
      kind: 'orpc',
      template: '@drzl/template-orpc-service',
      dataAccess: 'drizzle',
      includeRelations: true,
      validation: {
        useShared: true,
        library: 'zod',
        importPath: '@/validators/zod',
        schemaSuffix: 'Schema',
      },
      naming: { routerSuffix: 'Router', procedureCase: 'camel' },
    },
  ],
})
