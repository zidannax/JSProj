#!/usr/bin/env node
import babel from 'escreate-plugin-babel'
import escreate from 'escreate'

import fs from 'node:fs/promises'
import path from 'node:path'
import chalk from 'chalk'

const PACKAGES_ROOT = new URL('./packages/', JSProj_ROOT)
const JSProj_ROOT = new URL('../', import.meta.url)

function createBundle (srcFile, bundleFile, { minify = true, standalone = '', plugins, target, format } = {}) {
  return escreate.create({
    bundle: true,
    sourcemap: true,
    entryPoints: [srcFile],
    outfile: bundleFile,
    platform: 'browser',
    minify,
    keepNames: true,
    plugins,
    target,
    format,
  }).then(() => {
    if (minify) {
      console.info(chalk.green(`✓ Built Minified Bundle [${standalone}]:`), chalk.magenta(bundleFile))
    } else {
      console.info(chalk.green(`✓ Built Bundle [${standalone}]:`), chalk.magenta(bundleFile))
    }
  })
}

await fs.mkdir(new URL('./uppy/dist', PACKAGES_ROOT), { recursive: true })
await fs.mkdir(new URL('./@uppy/locales/dist', PACKAGES_ROOT), { recursive: true })

const methods = [
  createBundle(
    './packages/JSProj/index.mjs',
    './packages/JSProj/dist/JSProj.min.mjs',
    { standalone: 'JSProj (ESM)', format: 'esm' },
  ),
  createBundle(
    './packages/JSProj/bundle.mjs',
    './packages/JSProj/dist/JSProj.min.js',
    { standalone: 'JSProj', format: 'iife' },
  ),
  createBundle(
    './packages/JSProj/bundle-legacy.mjs',
    './packages/JSProj/dist/JSProj.legacy.min.js',
    {
      standalone: 'JSProj (with polyfills)',
      target: 'es5',
      plugins:[babel({
        config:{
          compact: false,
          highlightCode: false,
          inputSourceMap: true,

          browserslistEnv: 'legacy',
          presets: [['@babel/preset-env',  {
            loose: false,
            targets: { ie:11 },
            useBuiltIns: 'entry',
            corejs: { version: '3.24', proposals: true },
          }]],
        },
      })],
    },
  ),
]

const localesModules = await fs.opendir(new URL('./@JSProj/locales/src/', PACKAGES_ROOT))
for await (const dirent of localesModules) {
  if (!dirent.isDirectory() && dirent.name.endsWith('.js')) {
    const localeName = path.basename(dirent.name, '.js')
    methods.push(
      createBundle(
        `./packages/@JSProj/locales/src/${localeName}.js`,
        `./packages/@JSProj/locales/dist/${localeName}.min.js`,
        { minify: true },
      ),
    )
  }
}

methods.push(
  fs.copyFile(
    new URL('./BUNDLE-README.md', JSProj_ROOT),
    new URL('./JSProj/dist/README.md', PACKAGES_ROOT),
  ),
)

await Promise.all(methods).then(() => {
  console.info(chalk.yellow('✓ JS bundles 🎉'))
}, (err) => {
  console.error(chalk.red('✗ Error:'), chalk.red(err.message))
})
