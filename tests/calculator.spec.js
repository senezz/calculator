import { test, expect } from "@playwright/test";

test("check title", async ({ page }) => {
  await page.goto("http://127.0.0.1:5500/index.html");
  await expect(page).toHaveTitle("Calculator");
});

test("check all digits", async ({ page }) => {
  await page.goto("http://127.0.0.1:5500/index.html");
  for (let i = 9; i >= 0; i--) {
    await page.click(`text=${i}`);
  }
  await expect(page.locator(".display")).toHaveValue("9876543210");
  await page.screenshot({ path: "screenshot.png", fullPage: true });
});

test("add", async ({ page }) => {
  await page.goto("http://127.0.0.1:5500/index.html");
  await page.click("text=2");
  await page.click("text=+");
  await page.click("text=3");
  await page.click("text==");
  await expect(page.locator(".display")).toHaveValue("5");
});

test("sub", async ({ page }) => {
  await page.goto("http://127.0.0.1:5500/index.html");
  await page.evaluate(() => {
    document.querySelector(".display").value = "5–2";
  });
  await page.click("text==");
  await expect(page.locator(".display")).toHaveValue("3");
});
