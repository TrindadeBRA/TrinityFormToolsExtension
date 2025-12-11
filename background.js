/**
 * TrinityFormTools - Service Worker (Manifest V3)
 * Manages context menu creation and message handling
 * Compatible with both Firefox and Chrome
 */

// Browser API compatibility (Firefox uses browser.*, Chrome uses chrome.*)
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

// Context menu item IDs
const MENU_IDS = {
  CPF: "insert-cpf",
  EMAIL: "insert-email",
  PHONE: "insert-phone",
  NAME: "insert-name"
};

// Context menu item titles (Portuguese - visible to user)
const MENU_TITLES = {
  CPF: "Inserir CPF",
  EMAIL: "Inserir Email",
  PHONE: "Inserir Telefone",
  NAME: "Inserir Nome"
};

// Message actions
const ACTIONS = {
  INSERT_CPF: "insertCpf",
  INSERT_EMAIL: "insertEmail",
  INSERT_PHONE: "insertPhone",
  INSERT_NAME: "insertName"
};

/**
 * Initialize context menu items
 */
function initializeContextMenus() {
  // Create CPF menu item
  browserAPI.contextMenus.create({
    id: MENU_IDS.CPF,
    title: MENU_TITLES.CPF,
    contexts: ["editable"]
  });

  // Create Email menu item
  browserAPI.contextMenus.create({
    id: MENU_IDS.EMAIL,
    title: MENU_TITLES.EMAIL,
    contexts: ["editable"]
  });

  // Create Phone menu item
  browserAPI.contextMenus.create({
    id: MENU_IDS.PHONE,
    title: MENU_TITLES.PHONE,
    contexts: ["editable"]
  });

  // Create Name menu item
  browserAPI.contextMenus.create({
    id: MENU_IDS.NAME,
    title: MENU_TITLES.NAME,
    contexts: ["editable"]
  });
}

/**
 * Handle context menu click events
 */
function handleContextMenuClick(info, tab) {
  let action = null;

  switch (info.menuItemId) {
    case MENU_IDS.CPF:
      action = ACTIONS.INSERT_CPF;
      break;
    case MENU_IDS.EMAIL:
      action = ACTIONS.INSERT_EMAIL;
      break;
    case MENU_IDS.PHONE:
      action = ACTIONS.INSERT_PHONE;
      break;
    case MENU_IDS.NAME:
      action = ACTIONS.INSERT_NAME;
      break;
    default:
      return;
  }

  if (action && tab.id) {
    browserAPI.tabs.sendMessage(tab.id, { action });
  }
}

// Initialize context menus on service worker startup/installation
// In MV3, service workers restart often, so we need to handle this properly
if (browserAPI.runtime.onInstalled) {
  browserAPI.runtime.onInstalled.addListener(() => {
    initializeContextMenus();
  });
}

// Also initialize on service worker startup (for Chrome MV3)
initializeContextMenus();

// Listen for context menu clicks
browserAPI.contextMenus.onClicked.addListener(handleContextMenuClick);
