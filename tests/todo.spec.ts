import { test, expect } from '@playwright/test';

test.describe('Todo App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should allow me to add todo items @smoke', async ({ page }) => {
    // create a new todo locator
    const newTodo = page.getByPlaceholder('Add a new task...');

    // add a new todo
    await newTodo.fill('Buy milk');
    await newTodo.press('Enter');

    // check if the todo is visible
    await expect(page.getByText('Buy milk')).toBeVisible();

    // add another todo
    await newTodo.fill('Clean the house');
    await newTodo.press('Enter');

    // check if both are visible
    await expect(page.getByText('Buy milk')).toBeVisible();
    await expect(page.getByText('Clean the house')).toBeVisible();
  });

  test('should allow me to mark items as complete', async ({ page }) => {
    const newTodo = page.getByPlaceholder('Add a new task...');
    await newTodo.fill('Buy milk');
    await newTodo.press('Enter');

    // Click the toggle button using its aria-label
    await page.getByLabel('Toggle Buy milk').click();

    // The text should now have line-through class
    const todoText = page.getByText('Buy milk');
    await expect(todoText).toHaveClass(/line-through/);
  });

  test('should allow me to delete items', async ({ page }) => {
    const newTodo = page.getByPlaceholder('Add a new task...');
    await newTodo.fill('Buy milk');
    await newTodo.press('Enter');

    // Hover over the todo item to reveal the delete button and click it
    // We use the aria-label for the delete button
    await page.getByText('Buy milk').hover();
    await page.getByLabel('Delete Buy milk').click({ force: true }); // force: true because it might be partially obscured or hidden

    // The todo should be gone
    await expect(page.getByText('Buy milk')).not.toBeVisible();
  });
});
