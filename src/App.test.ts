import { toMatchImageSnapshot } from 'jest-image-snapshot'

expect.extend({ toMatchImageSnapshot });

describe('App', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:3000')
  })

  // it('renders correctly', async () => {
  //   const image = await page.screenshot();
  //   expect(image).toMatchImageSnapshot({
  //     failureThreshold: 0.01,
  //     failureThresholdType: 'percent'
  //   });
  // });

  it('should display a react logo', async () => {
    const logoAlt = await page.$eval<string, HTMLImageElement>('.App-logo', e => e.alt)
    expect(logoAlt).toMatch('logo')
  })

  it('should match a link with a "Learn React" text inside', async () => {
    const linkElement = await page.$eval<string, HTMLLinkElement>('.App-link', e => e.innerText)
    expect(linkElement).toMatch('Learn React')
  })

  it('should match increment Count when clicking the magic button', async () => {
    await page.click('.magicButton', {clickCount: 10, delay: 100})

    const button = await page.$eval<string, HTMLButtonElement>('.magicButton', e => e.innerText);
    expect(button).toMatch('I was clicked 10 times!');
  })
})
