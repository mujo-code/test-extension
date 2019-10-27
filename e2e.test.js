const path = require('path')
const puppeteer = require('puppeteer')

const TEST_TIMEOUT = 20000 // extend test timeout sinces its E2E

let browser
let page
const BUILD_PATH = path.resolve(__dirname, './')

const wait = (n) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, n)
  })
}

beforeAll(async () => {
  browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXEC_PATH,
    headless: false,
    args: [
      `--disable-extensions-except=${BUILD_PATH}`,
      `--load-extension=${BUILD_PATH}`,
      '--no-sandbox',
    ],
    defaultViewport: {
      width: 1280,
      height: 800,
    },
  })
})

afterAll(async () => {
  if (browser) {
    await browser.close()
  }
})

beforeEach(async () => {
  page = await browser.newPage()
})

afterEach(async () => {
  if (page) {
    await page.close()
  }
})

test(
  'opening a new page should trigger a tab.onCreated event',
  async () => {
    await wait(5000)
    const el = await page.$('#message')
    expect(el).toBeTruthy()
  },
  TEST_TIMEOUT
)
