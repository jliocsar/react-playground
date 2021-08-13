// TODO: Handle React tests differently
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const { Suite } = require('benchmark')

const [, , ...args] = process.argv

const ALLOWED_FILE_TYPES = /\.perf\.(js|jsx)$/g

const getModuleDefaults = mod => mod.default

const validateFileType = filePath => {
  if (!ALLOWED_FILE_TYPES.test(filePath)) {
    throw new Error(`${filePath} is missing a .perf.js or .perf.jsx extension`)
  }
}

const validateStructure = content => {
  const hasLabel = content.label && typeof content.label === 'string'
  const hasActionFunction =
    content.action && typeof content.action === 'function'

  return hasLabel && hasActionFunction
}

const validateFileContentStructure = (filePath, fileContents) => {
  if (!Object.keys(fileContents).length) {
    throw new Error(
      `${filePath} has to export a default array with one or more perf. test`
    )
  }

  if (!fileContents.every(validateStructure)) {
    throw new Error(
      [
        `${filePath} is missing the expected structure`,
        'Your perf file you export at least one object with a label and action',
        'Keep in mind that your action can be an async function',
        `
{
  label: 'Your performance test name',
  action: () => {
    // run your tests here
  }
}
        `,
      ].join('\n')
    )
  }
}

const fileExists = filePath => {
  if (!fs.existsSync(filePath)) {
    throw new Error(`${filePath} doesn't exist!`)
  }
}

const validateFile = filePath =>
  validateFileType(filePath) || fileExists(filePath)

const handleExitOnError = error => {
  console.log(chalk.red(error.toString()))
  process.exit(1)
}

const addPerformanceTest =
  suite =>
  async ({ label, action }) => {
    suite.add(label, action)
  }

// Clear console before running all tests
console.clear()

args.forEach(async arg => {
  // Full path of given file name
  const filePath = path.resolve(__dirname, arg)

  try {
    validateFile(filePath)
  } catch (error) {
    handleExitOnError(error)
  }

  // Import the file so we can run its perf. tests
  const fileModule = await import(filePath)
  const fileContents = getModuleDefaults(fileModule)

  try {
    validateFileContentStructure(filePath, fileContents)
  } catch (error) {
    handleExitOnError(error)
  }

  const suite = new Suite()

  suite.on('cycle', event => {
    console.log(chalk.green(String(event.target)))
  })

  await Promise.all(fileContents.map(addPerformanceTest(suite)))

  suite.run({ async: true })
})
