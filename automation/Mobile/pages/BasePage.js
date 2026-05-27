class BasePage {
  normalize(selectors) {
    return Array.isArray(selectors) ? selectors : [selectors];
  }

  async findFirst(selectors, options = {}) {
    const {
      timeout = Number(process.env.ELEMENT_TIMEOUT || 20000),
      interval = 300,
      mustBeDisplayed = true
    } = options;

    const normalizedSelectors = this.normalize(selectors);
    const deadline = Date.now() + timeout;

    while (Date.now() < deadline) {
      for (const selector of normalizedSelectors) {
        const element = await $(selector);
        if (!(await element.isExisting())) {
          continue;
        }
        if (mustBeDisplayed && !(await element.isDisplayed())) {
          continue;
        }
        return element;
      }
      await browser.pause(interval);
    }

    throw new Error(`Element not found for selectors: ${normalizedSelectors.join(' | ')}`);
  }

  async tap(selectors, timeout) {
    const element = await this.findFirst(selectors, { timeout });
    await element.waitForEnabled({ timeout: timeout || 20000 });
    await element.click();
  }

  async type(selectors, value, timeout) {
    const element = await this.findFirst(selectors, { timeout });
    await element.waitForEnabled({ timeout: timeout || 20000 });
    await element.clearValue();
    await element.setValue(value);
  }

  async readText(selectors, timeout) {
    const element = await this.findFirst(selectors, { timeout });
    const text = await element.getText();
    if (text) {
      return text;
    }

    return (
      (await element.getAttribute('text')) ||
      (await element.getAttribute('content-desc')) ||
      (await element.getAttribute('resource-id')) ||
      ''
    );
  }
}

module.exports = BasePage;
