import chromium from "chrome-aws-lambda";
import { Page } from "puppeteer-core";
import { parseChannel } from "./parseChannel";

let _page: Page;

export async function getLinks(url: string) {
  // if (_page) {
  //   return _page;
  // }

  const options =
    process.env.NODE_ENV === "production"
      ? {
          args: chromium.args,
          executablePath: await chromium.executablePath,
          headless: true,
        }
      : {
          args: [],
          executablePath:
            process.platform === "win32"
              ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
              : process.platform === "linux"
              ? "/usr/bin/google-chrome"
              : "/Applications/Chromium.app/Contents/MacOS/Chromium",
          headless: true,
        };

  const browser = await chromium.puppeteer.launch(options);

  _page = await browser.newPage();

  await _page.goto(url, {
    timeout: 30000,
    waitUntil: "networkidle2",
  });

  if (_page.target().url().includes("consent.youtube.com")) {
    const agreeButton =
      "#yDmH0d > c-wiz > div > div > div > div.NIoIEf > div.G4njw > div.qqtRac > form > div > div > button";
    await _page.waitForSelector(agreeButton);
    await _page.click(agreeButton);
    await _page.waitForNavigation();
  }

  const { name, links } = await parseChannel(_page);

  await browser.close();
  return { name, links };
}
