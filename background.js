chrome.tabs.onCreated.addListener((tab) => {
  console.log('new tab', tab.id)
  setTimeout(() => {
    chrome.tabs.sendMessage(tab.id, { type: 'tab-created' })
  }, 500)
})
