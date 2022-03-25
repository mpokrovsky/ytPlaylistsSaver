import { Page } from "puppeteer-core";

export async function parseChannel(page: Page) {
  const name = await page.$eval(
    "#text-container",
    (res) => res.textContent?.trim().replace(/\n/g, "") || ""
  );

  const cards = await page.$$("div#dismissible");

  let links = [];
  for (let cardIdx in cards) {
    const link = await cards[cardIdx].$eval("#video-title", (link) => ({
      title: link.textContent || "",
      href: link.getAttribute("href") || "",
    }));

    links.push(link);
  }

  return { name, links };
}
