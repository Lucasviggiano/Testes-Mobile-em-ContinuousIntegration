async function swipeHorizontalByElement(element, direction = 'left', distanceRatio = 0.7) {
  const rect = await element.getRect();
  const anchorY = Math.floor(rect.y + rect.height / 2);
  const startX = direction === 'left'
    ? Math.floor(rect.x + rect.width * 0.8)
    : Math.floor(rect.x + rect.width * 0.2);
  const delta = Math.floor(rect.width * distanceRatio);
  const endX = direction === 'left' ? startX - delta : startX + delta;

  await driver.performActions([
    {
      type: 'pointer',
      id: 'finger1',
      parameters: { pointerType: 'touch' },
      actions: [
        { type: 'pointerMove', duration: 0, x: startX, y: anchorY },
        { type: 'pointerDown', button: 0 },
        { type: 'pause', duration: 150 },
        { type: 'pointerMove', duration: 500, x: endX, y: anchorY },
        { type: 'pointerUp', button: 0 }
      ]
    }
  ]);
  await driver.releaseActions();
}

module.exports = {
  swipeHorizontalByElement
};
