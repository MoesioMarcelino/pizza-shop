import { expect, test } from "@playwright/test";

test("update profile successfully", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await page.getByRole("button", { name: "Pizza Shop" }).click();
  await page.getByRole("menuitem", { name: "Perfil da loja" }).click();

  await page.getByLabel("Nome").fill("Pizzaria");
  await page.getByLabel("Descrição").fill("Another description");

  await page.getByRole("button", { name: "Salvar" }).click();

  await page.waitForLoadState("networkidle");

  const toast = page.getByText("Perfil atualizado com sucesso!");

  expect(toast).toBeVisible();
  expect(page.getByRole("button", { name: "Pizzaria" })).toBeVisible();
});

test("update profile error with wrong name", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await page.getByRole("button", { name: "Pizza Shop" }).click();
  await page.getByRole("menuitem", { name: "Perfil da loja" }).click();

  await page.getByLabel("Nome").fill("Pizzaria Wrong Name");
  await page.getByLabel("Descrição").fill("Another description");

  await page.getByRole("button", { name: "Salvar" }).click();

  await page.waitForLoadState("networkidle");

  const toast = page.getByText("Falha ao atualizar o perfil, tente novamente");

  expect(toast).toBeVisible();
});

test("cancel update profile successfully", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await page.getByRole("button", { name: "Pizza Shop" }).click();
  await page.getByRole("menuitem", { name: "Perfil da loja" }).click();

  await page.getByLabel("Nome").fill("Pizzaria Wrong Name");

  const dialog = page.getByLabel("Perfil da loja");
  await page.getByRole("button", { name: "Cancelar" }).click();

  expect(dialog).not.toBeVisible();
  expect(page.getByRole("button", { name: "Pizza Shop" })).toBeVisible();
});

test("close update profile dialog successfully", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await page.getByRole("button", { name: "Pizza Shop" }).click();
  await page.getByRole("menuitem", { name: "Perfil da loja" }).click();

  const dialog = page.getByLabel("Perfil da loja");
  await page.getByRole("button", { name: "Close" }).click();

  expect(dialog).toBeHidden();
});
