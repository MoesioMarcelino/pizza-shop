import { expect, test } from "@playwright/test";

test("sign up successfully", async ({ page }) => {
  await page.goto("/sign-up", { waitUntil: "networkidle" });

  await page.getByLabel("Nome do estabelecimento").fill("Pizza Shop");
  await page.getByLabel("Seu email").fill("johndoe@example.com");
  await page.getByLabel("Seu celular").fill("00912345678");
  await page.getByRole("button", { name: "Finalizar cadastro" }).click();
  // await page.getByLabel("Seu email").fill("johndoe@example.com");
  const toast = page.getByText("Restaurante cadastrado com sucesso");

  expect(toast).toBeVisible();
});

test("Error to register new restaurant behaivor", async ({ page }) => {
  await page.goto("/sign-up", { waitUntil: "networkidle" });

  await page
    .getByLabel("Nome do estabelecimento")
    .fill("Pizza Shop Wrong Name");
  await page.getByLabel("Seu email").fill("johndoe@example.com");
  await page.getByLabel("Seu celular").fill("00912345678");
  await page.getByRole("button", { name: "Finalizar cadastro" }).click();
  // await page.getByLabel("Seu email").fill("johndoe@example.com");
  const toast = page.getByText("Erro ao cadastrar restaurante");

  expect(toast).toBeVisible();
});

test("navigate to login page", async ({ page }) => {
  await page.goto("/sign-up", { waitUntil: "networkidle" });

  await page.getByRole("link", { name: "Fazer login" }).click();

  expect(page.url()).toContain("/sign-in");
});
