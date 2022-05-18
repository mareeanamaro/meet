import puppeteer from 'puppeteer';

describe('show/hide event details', () => {

    let browser
    let page
    jest.setTimeout(60000);
    
    beforeAll(async() => {
        browser = await puppeteer.launch({
            // headless: false,
            // slowMo: 100
        });
        page = await browser.newPage();
        await page.goto('http://localhost:3000/')
        await page.waitForSelector('.event')
    });
    
    test('an event is collapsed by default', async() => {
        const eventDetails = await page.$('.event .extra-details')
        expect(eventDetails).toBeNull()
    })

    test('user can expand an event to see its details', async() => {
        await page.click('.event .show-details');
        const eventDetails = await page.$('.event .extra-details');
        expect(eventDetails).toBeDefined();
    })

    test('user can collapse an event to hide its details', async() => {
        await page.click('.event .hide-details');
        const eventDetails = await page.$('.event .extra-details');
        expect(eventDetails).toBeNull();
    })

    afterAll(() => {
     browser.close()
      })
})


describe('filter events by city', () => {

    let browser
    let page
    jest.setTimeout(60000);
    
    beforeAll(async() => {
        browser = await puppeteer.launch({
            // headless: false,
            // slowMo: 100
        });
        page = await browser.newPage();
        await page.goto('http://localhost:3000/')
        await page.waitForSelector('.event')
    });
    
    test('shows events in all locations by default', async() => {
        const eventCount = await page.$$eval(".event", (element) => element.length);
        expect(eventCount).toBe(2);
    })

    test('user should see a list of suggestions when they search for a city', async() => {
        await page.type('.city', 'Berlin', { delay: 100 });
        const cityCount = await page.$$eval(".suggestions li", (element) => element.length);
        expect(cityCount).toBe(2);
    })

    test('User can select a city from the suggested list.', async() => {
        await page.reload();
        await page.type('.city', 'Berlin', { delay: 100 });
        await page.click(".suggestions li");
        const countEvents = await page.$$eval(".event", (element) => element.length);
        expect(countEvents).toBe(1);
    })

    afterAll(() => {
     browser.close()
      })
})