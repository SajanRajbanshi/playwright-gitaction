import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000');
});

test.describe('Todo App', () => {
  test('should allow me to add todo items', async ({ page }) => {
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

    // Click the toggle button (the circle)
    // In our implementation, it's a button with a circle border
    await page.getByRole('button', { name: 'Buy milk' }).locator('xpath=..').getByRole('button').first().click();

    // The text should now have line-through class
    const todoText = page.getByText('Buy milk');
    await expect(todoText).toHaveClass(/line-through/);
  });

  test('should allow me to delete items', async ({ page }) => {
    const newTodo = page.getByPlaceholder('Add a new task...');
    await newTodo.fill('Buy milk');
    await newTodo.press('Enter');

    // Hover to show delete button and click it
    await page.getByText('Buy milk').hover();
    await page.getByRole('button').last().click();

    // The todo should be gone
    await expect(page.getByText('Buy milk')).not.toBeVisible();
  });
});
