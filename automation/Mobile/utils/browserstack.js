function isBrowserStackSession() {
  return (
    typeof browser !== 'undefined' &&
    browser.capabilities &&
    browser.capabilities['bstack:options']
  );
}

async function markBrowserStackSessionStatus({ passed, reason, testName }) {
  if (!isBrowserStackSession()) {
    return;
  }

  const status = passed ? 'passed' : 'failed';
  const sanitizedReason = (reason || 'No reason available').slice(0, 240);
  const sanitizedTestName = (testName || 'Unnamed test').slice(0, 240);

  await browser.execute(
    `browserstack_executor: ${JSON.stringify({
      action: 'setSessionName',
      arguments: { name: sanitizedTestName }
    })}`
  );

  await browser.execute(
    `browserstack_executor: ${JSON.stringify({
      action: 'setSessionStatus',
      arguments: {
        status,
        reason: sanitizedReason
      }
    })}`
  );
}

module.exports = {
  markBrowserStackSessionStatus
};
