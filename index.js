const puppeteer = require('puppeteer');
let id = "abc@def.ac.in";
let tab;
let pass = "abc@123";

(async () => {
    const browser = await puppeteer.launch({ headless: false ,
    defaultViewport : false,
    args : ["--start-maximized"]  });
    const page = await browser.newPage();

  // Navigate to the page with the form
  const url = 'https://app.joinsuperset.com/#/s/feed'; // Replace with login URL
  await page.goto(url, { waitUntil: 'networkidle0' }); // Wait for network to be idle

    await page.type("#email", id);
    await page.type("#password", pass);
    await page.click('input[type="submit"][value="Login"]');
    await page.waitForNavigation({waitUntil : "networkidle2"});

    const sectionElement = await page.waitForSelector('#demo_step_3');

  // Click on the section element to navigate
    await sectionElement.click();

    const applyButton = await page.waitForSelector('.MuiButton-containedPrimary.css-exifc2');

  // Click on the "Apply" button
    await applyButton.click();

    page.on('dialog', async (dialog) => {
    if (dialog.type() === 'prompt') {
      // Enter the desired text
      await dialog.prompt({ prompt: dialog.message() }); // Consider including the prompt message for clarity
    } else {
      // Dismiss other alert types (alert or confirm)
        await dialog.dismiss();
    }
    });




  // Wait for user input
    process.stdin.resume();
    await new Promise(resolve => process.stdin.once('data', resolve));

    await browser.close();
})();
