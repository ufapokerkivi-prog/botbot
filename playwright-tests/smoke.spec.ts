import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Home page smoke tests', () => {
  test('should load and display hero section', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('h2').filter({ hasText: /профессиональная помощь/i })).toBeVisible();
    await expect(page.locator('a').filter({ hasText: /вызвать врача/i })).toBeVisible();
  });

  test('should navigate to services section', async ({ page }) => {
    await page.goto('/');
    
    const servicesLink = page.locator('a[href="#services"]').first();
    await servicesLink.click();
    
    await expect(page.locator('#services')).toBeInViewport();
  });

  test('should fill and submit contact form', async ({ page }) => {
    await page.goto('/');
    
    await page.locator('#name').fill('Тест Пользователь');
    await page.locator('#phone').fill('79991234567');
    await page.locator('#service').selectOption('home-visit');
    await page.locator('#message').fill('Тестовое сообщение');
    
    await page.locator('button[type="submit"]').click();
    
    await expect(page.locator('text=/заявка успешно отправлена/i')).toBeVisible({ timeout: 3000 });
  });

  test('should filter reviews', async ({ page }) => {
    await page.goto('/');
    
    const filter = page.locator('[data-testid="reviews-filter"]');
    const count = page.locator('[data-testid="reviews-count"]');
    
    const initialCount = await count.textContent();
    
    await filter.selectOption('Кодирование');
    
    const updatedCount = await count.textContent();
    expect(updatedCount).not.toBe(initialCount);
  });

  test('should open and close modal', async ({ page }) => {
    await page.goto('/');
    
    const openModalButton = page.locator('button').filter({ hasText: /узнать подробнее/i });
    await openModalButton.click();
    
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    await expect(page.locator('#modal-title')).toHaveText(/круглосуточная помощь/i);
    
    const closeButton = page.locator('[aria-label="Закрыть модальное окно"]');
    await closeButton.click();
    
    await expect(page.locator('[role="dialog"]')).not.toBeVisible();
  });

  test('should have working phone links', async ({ page }) => {
    await page.goto('/');
    
    const phoneLink = page.locator('a[href^="tel:"]').first();
    await expect(phoneLink).toHaveAttribute('href', /\+?\d+/);
  });
});

test.describe('Accessibility tests', () => {
  test('should not have accessibility violations', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/');
    
    await page.keyboard.press('Tab');
    
    const skipLink = page.locator('.skip-link');
    await expect(skipLink).toBeFocused();
    
    await page.keyboard.press('Enter');
    await expect(page.locator('#main-content')).toBeInViewport();
  });

  test('should have proper focus styles', async ({ page }) => {
    await page.goto('/');
    
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    const focusedElement = page.locator(':focus');
    const outline = await focusedElement.evaluate((el) => window.getComputedStyle(el).outline);
    
    expect(outline).not.toBe('none');
  });
});

test.describe('Mobile tests', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should display mobile layout correctly', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('h2').filter({ hasText: /профессиональная помощь/i })).toBeVisible();
    await expect(page.locator('a[href="tel:+78001234567"]')).toBeVisible();
  });

  test('should fill form on mobile', async ({ page }) => {
    await page.goto('/');
    
    await page.locator('#name').fill('Мобильный Пользователь');
    await page.locator('#phone').fill('79991234567');
    await page.locator('#service').selectOption('detox');
    
    await page.locator('button[type="submit"]').click();
    
    await expect(page.locator('text=/заявка успешно отправлена/i')).toBeVisible({ timeout: 3000 });
  });
});
