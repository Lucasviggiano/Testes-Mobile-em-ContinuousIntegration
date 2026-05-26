class IOSBaseScreen {
  normalize(selectors) {
    return Array.isArray(selectors) ? selectors : [selectors];
  }

  async findFirst(selectors, options = {}) {
    const { timeout = 15000, interval = 400, displayed = true } = options;
    const normalizedSelectors = this.normalize(selectors);
    const deadline = Date.now() + timeout;

    while (Date.now() < deadline) {
      for (const selector of normalizedSelectors) {
        const element = await $(selector);
        if (!(await element.isExisting())) {
          continue;
        }
        if (displayed && !(await element.isDisplayed())) {
          continue;
        }
        return element;
      }
      await browser.pause(interval);
    }

    throw new Error(`Elemento nao encontrado para os seletores: ${normalizedSelectors.join(' | ')}`);
  }

  async isAnyDisplayed(selectors, timeout = 3000) {
    try {
      await this.findFirst(selectors, { timeout, displayed: true });
      return true;
    } catch (error) {
      return false;
    }
  }

  async tap(selectors, timeout = 15000) {
    const element = await this.findFirst(selectors, { timeout });
    await element.waitForEnabled({ timeout });
    await element.click();
  }

  async type(selectors, value, timeout = 15000) {
    const element = await this.findFirst(selectors, { timeout });
    await element.waitForEnabled({ timeout });
    await element.clearValue();
    await element.setValue(value);
  }

  async getVisibleText(selectors, timeout = 15000) {
    const element = await this.findFirst(selectors, { timeout });
    const text = await element.getText();
    if (text) {
      return text;
    }
    return (
      (await element.getAttribute('label')) ||
      (await element.getAttribute('name')) ||
      (await element.getAttribute('value')) ||
      ''
    );
  }

  async swipeUp() {
    try {
      await browser.execute('mobile: swipe', { direction: 'up' });
    } catch (error) {
      await browser.execute('mobile: scroll', { direction: 'down' });
    }
  }

  async tapByVisibleText(text, maxSwipes = 6) {
    const byExactName = `~${text}`;
    const byPredicate = `-ios predicate string:type == "XCUIElementTypeStaticText" AND (name == "${text}" OR label == "${text}" OR value == "${text}")`;
    const byContains = `-ios predicate string:type == "XCUIElementTypeStaticText" AND (name CONTAINS[c] "${text}" OR label CONTAINS[c] "${text}" OR value CONTAINS[c] "${text}")`;
    const byClassChain = `-ios class chain:**/XCUIElementTypeStaticText[\`name CONTAINS[c] "${text}" OR label CONTAINS[c] "${text}" OR value CONTAINS[c] "${text}"\`]`;

    for (let attempt = 0; attempt < maxSwipes; attempt += 1) {
      const available = await this.isAnyDisplayed([byExactName, byPredicate, byContains, byClassChain], 2500);
      if (available) {
        await this.tap([byExactName, byPredicate, byContains, byClassChain], 3000);
        return;
      }
      await this.swipeUp();
    }

    throw new Error(`Produto nao encontrado na lista: ${text}`);
  }
}

module.exports = IOSBaseScreen;
