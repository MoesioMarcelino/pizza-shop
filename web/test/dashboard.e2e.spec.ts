import { expect, test } from "@playwright/test";

test("display day orders amount", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  expect(page.getByText("20", { exact: true })).toBeVisible();
  expect(page.getByText("-5% em relação à ontem")).toBeVisible();
});

test("display month orders amount", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  expect(page.getByText("200", { exact: true })).toBeVisible();
  expect(page.getByText("+15% em relação ao mês passado")).toBeVisible();
});

test("display month cancel orders amount", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  expect(page.getByText("70", { exact: true })).toBeVisible();
  expect(page.getByText("+10% em relação ao mês passado")).toBeVisible();
});

test("display revenue orders amount", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  expect(page.getByText("R$ 400,00")).toBeVisible();
  expect(page.getByText("+7% em relação ao mês passado")).toBeVisible();
});
