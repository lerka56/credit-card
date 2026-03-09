import puppeteer from 'puppeteer';
import { fork } from 'child_process';

const BASE_URL = 'http://localhost:9000';
jest.setTimeout(60000);

describe('Credit Card Validator', () => {
  let browser;
  let page;
  let server;

  beforeAll(async () => {
    // Запускаем сервер
    server = fork(`${__dirname}/e2e.server.js`, [], {
      silent: true,
    });

    // Ждем запуска сервера
    await new Promise((resolve, reject) => {
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
      server.on('error', reject);
      setTimeout(() => reject(new Error('Server failed to start')), 10000);
    });

    // Запускаем браузер
    browser = await puppeteer.launch({
      headless: 'new', // Важно: используем новый режим
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu'
      ],
    });

    page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
  });

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
    if (server) {
      server.kill('SIGINT');
    }
  });

  beforeEach(async () => {
    await page.goto(BASE_URL, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });
  });

  test('Страница должна загружаться с заголовком', async () => {
    await page.waitForSelector('h2');
    const title = await page.$eval('h2', el => el.textContent);
    expect(title).toBe('Credit Card Validator');
  });

  test('Валидация правильной карты Visa', async () => {
    await page.waitForSelector('#card-number');
    await page.type('#card-number', '4111111111111111');
    await page.click('button[type="submit"]');
    
    await page.waitForSelector('.result.success', { timeout: 5000 });
    const resultText = await page.$eval('.result', el => el.textContent);
    expect(resultText).toContain('Valid');
  });

  test('Валидация неправильной карты', async () => {
    await page.waitForSelector('#card-number');
    await page.type('#card-number', '1234567890123456');
    await page.click('button[type="submit"]');
    
    await page.waitForSelector('.result.error', { timeout: 5000 });
    const resultText = await page.$eval('.result', el => el.textContent);
    expect(resultText).toBe('✗ Invalid card number');
  });

  test('Подсветка иконки Visa при вводе номера Visa', async () => {
    await page.waitForSelector('#card-number');
    await page.type('#card-number', '4111 1111 1111 1111');
    
    await page.waitForSelector('.card-icon[data-system="visa"].active', { timeout: 5000 });
    const isActive = await page.$eval(
      '.card-icon[data-system="visa"]', 
      el => el.classList.contains('active')
    );
    expect(isActive).toBe(true);
  });

  test('Форматирование номера с пробелами', async () => {
    await page.waitForSelector('#card-number');
    await page.type('#card-number', '4111111111111111');
    
    const value = await page.$eval('#card-number', el => el.value);
    expect(value).toBe('4111 1111 1111 1111');
  });
});