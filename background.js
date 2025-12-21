/**
 * TrinityFormTools - Background Script / Service Worker
 * Manages context menu creation and message handling
 * Compatible with both Firefox (MV2) and Chrome (MV3)
 */

// Browser API compatibility (Firefox uses browser.*, Chrome uses chrome.*)
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

// Context menu item IDs
const MENU_IDS = {
  CPF: "insert-cpf",
  EMAIL: "insert-email",
  PHONE: "insert-phone",
  NAME: "insert-name",
  CITY: "insert-city",
  CITY_UF: "insert-city-uf",
  STATE: "insert-state",
  UF: "insert-uf",
  CEP: "insert-cep",
  GET_CITY: "get-city",
  GET_CITY_UF: "get-city-uf",
  CNH: "insert-cnh",
  PLATE: "insert-plate",
  OLD_PLATE: "insert-old-plate"
};

// Context menu item titles (Portuguese - visible to user)
const MENU_TITLES = {
  CPF: "Inserir CPF",
  EMAIL: "Inserir Email",
  PHONE: "Inserir Telefone",
  NAME: "Inserir Nome",
  CITY: "Inserir Cidade",
  CITY_UF: "Inserir Cidade/UF",
  STATE: "Inserir Estado",
  UF: "Inserir UF",
  CEP: "Inserir CEP",
  GET_CITY: "Selecionar Cidade...",
  GET_CITY_UF: "Selecionar Cidade/UF...",
  CNH: "Inserir CNH",
  PLATE: "Inserir Placa (Mercosul)",
  OLD_PLATE: "Inserir Placa (Antiga)"
};

// Message actions
const ACTIONS = {
  INSERT_CPF: "insertCpf",
  INSERT_EMAIL: "insertEmail",
  INSERT_PHONE: "insertPhone",
  INSERT_NAME: "insertName",
  INSERT_CITY: "insertCity",
  INSERT_CITY_UF: "insertCityUf",
  INSERT_STATE: "insertState",
  INSERT_UF: "insertUf",
  INSERT_CEP: "insertCep",
  GET_CITY: "getCity",
  GET_CITY_UF: "getCityUf",
  INSERT_CNH: "insertCnh",
  INSERT_PLATE: "insertPlate",
  INSERT_OLD_PLATE: "insertOldPlate"
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

  // New items: City / City+UF / State / UF / CEP
  browserAPI.contextMenus.create({
    id: MENU_IDS.CITY,
    title: MENU_TITLES.CITY,
    contexts: ["editable"]
  });

  browserAPI.contextMenus.create({
    id: MENU_IDS.CITY_UF,
    title: MENU_TITLES.CITY_UF,
    contexts: ["editable"]
  });

  // Items to prompt user for a specific city
  browserAPI.contextMenus.create({
    id: MENU_IDS.GET_CITY,
    title: MENU_TITLES.GET_CITY,
    contexts: ["editable"]
  });

  browserAPI.contextMenus.create({
    id: MENU_IDS.GET_CITY_UF,
    title: MENU_TITLES.GET_CITY_UF,
    contexts: ["editable"]
  });

  browserAPI.contextMenus.create({
    id: MENU_IDS.STATE,
    title: MENU_TITLES.STATE,
    contexts: ["editable"]
  });

  browserAPI.contextMenus.create({
    id: MENU_IDS.UF,
    title: MENU_TITLES.UF,
    contexts: ["editable"]
  });

  browserAPI.contextMenus.create({
    id: MENU_IDS.CEP,
    title: MENU_TITLES.CEP,
    contexts: ["editable"]
  });

  // Vehicle / document quick-insert items
  browserAPI.contextMenus.create({
    id: MENU_IDS.CNH,
    title: MENU_TITLES.CNH,
    contexts: ["editable"]
  });

  browserAPI.contextMenus.create({
    id: MENU_IDS.PLATE,
    title: MENU_TITLES.PLATE,
    contexts: ["editable"]
  });

  browserAPI.contextMenus.create({
    id: MENU_IDS.OLD_PLATE,
    title: MENU_TITLES.OLD_PLATE,
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
    case MENU_IDS.CITY:
      action = ACTIONS.INSERT_CITY;
      break;
    case MENU_IDS.CITY_UF:
      action = ACTIONS.INSERT_CITY_UF;
      break;
    case MENU_IDS.GET_CITY:
      action = ACTIONS.GET_CITY;
      break;
    case MENU_IDS.GET_CITY_UF:
      action = ACTIONS.GET_CITY_UF;
      break;
    case MENU_IDS.STATE:
      action = ACTIONS.INSERT_STATE;
      break;
    case MENU_IDS.UF:
      action = ACTIONS.INSERT_UF;
      break;
    case MENU_IDS.CEP:
      action = ACTIONS.INSERT_CEP;
      break;
    case MENU_IDS.CNH:
      action = ACTIONS.INSERT_CNH;
      break;
    case MENU_IDS.PLATE:
      action = ACTIONS.INSERT_PLATE;
      break;
    case MENU_IDS.OLD_PLATE:
      action = ACTIONS.INSERT_OLD_PLATE;
      break;
    default:
      return;
  }

  if (action && tab.id) {
    browserAPI.tabs.sendMessage(tab.id, { action });
  }
}

// Initialize context menus
// For MV2 (Firefox): runs on script load
// For MV3 (Chrome): needs to run on install and startup (service worker restarts)
if (typeof browserAPI.action !== 'undefined') {
  // MV3 (Chrome) - service worker
  if (browserAPI.runtime.onInstalled) {
    browserAPI.runtime.onInstalled.addListener(() => {
      initializeContextMenus();
    });
  }
  // Also initialize on service worker startup
  initializeContextMenus();
} else {
  // MV2 (Firefox) - persistent background script
  initializeContextMenus();
}

// Listen for context menu clicks
browserAPI.contextMenus.onClicked.addListener(handleContextMenuClick);
