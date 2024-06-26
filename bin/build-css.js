const sass = require('sass')
const postcss = require('postcss')
const fs = require('node:fs')
const path = require('node:path')
const resolve = require('resolve')
const postcssDirPseudoClass = require('postcss-dir-pseudo-class')
const cssnano = require('cssnano')
const { promisify } = require('node:util')
const autoprefixer = require('autoprefixer')
const postcssLogical = require('postcss-logical')
const glob = promisify(require('glob'))

const renderScss = promisify(sass.render)
const { mkdir, writeFile } = fs.promises

const cwd = process.cwd()
let chalk

function handleError (error) {
  console.error(chalk.red('#### Error:'), chalk.red(error.message))
}

async function compileCSS () {
  ({ default:chalk } = await import('chalk'))
  const files = await glob('packages/{,@JSProj/}*/src/style.scss')

  for (const file of files) {
    const importedFiles = new Set()
    const scssResult = await renderScss({
      file,
      importer (url, from, done) {
        resolve(url, {
          basedir: path.dirname(from),
          filename: from,
          extensions: ['.scss'],
        }, (err, resolved) => {
          if (err) {
            done(err)
            return
          }

          const realpath = fs.realpathSync(resolved)

          if (importedFiles.has(realpath)) {
            done({ contents: '' })
            return
          }
          importedFiles.add(realpath)

          done({ file: realpath })
        })
      },
    })

    const plugins = [
      autoprefixer,
      postcssLogical(),
      postcssDirPseudoClass(),
    ]
    const postcssResult = await postcss(plugins)
      .process(scssResult.css, { from: file })
    postcssResult.warnings().forEach((warn) => {
      console.warn(warn.toString())
    })

    const outputDir = path.join(path.dirname(file), '../dist')
    let outputFile = path.join(outputDir, 'style.css')
    if (outputDir.includes(path.normalize('packages/JSProj/'))) {
      outputFile = path.join(outputDir, 'JSProj.css')
    }
    await mkdir(outputDir, { recursive: true })
    await writeFile(outputFile, postcssResult.css)

    const minifiedResult = await postcss([
      cssnano({ safe: true }),
    ]).process(postcssResult.css, { from: outputFile })
    minifiedResult.warnings().forEach((warn) => {
      console.warn(warn.toString())
    })
    await writeFile(outputFile.replace(/\.css$/, '.min.css'), minifiedResult.css)
    console.info(
      chalk.green('Minified Bundle CSS:'),
      chalk.magenta(path.relative(cwd, outputFile).replace(/\.css$/, '.min.css')),
    )
  }
}

compileCSS().then(() => {
  console.info(chalk.yellow('CSS Bundles OK'))
}, handleError)
