/**
 * TrinityFormTools - Background Script / Service Worker
 * Manages context menu creation and message handling
 * Compatible with both Firefox (MV2) and Chrome (MV3)
 */

// Browser API compatibility (Firefox uses browser.*, Chrome uses chrome.*)
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

// Context menu item IDs
const MENU_IDS = {
  GROUP_DADOS: "group-dados",
  GROUP_DATA: "group-data",
  GROUP_CIDADE: "group-cidade",
  GROUP_NUMEROS: "group-numeros",
  CPF: "insert-cpf",
  CNPJ: "insert-cnpj",
  EMAIL: "insert-email",
  PHONE: "insert-phone",
  NAME: "insert-name",
  DATE: "insert-date",
  DATETIME: "insert-datetime",
  TIME: "insert-time",
  DATE_PLUS18: "insert-date-plus18",
  DATE_MINUS18: "insert-date-minus18",
  URL: "insert-url",
  CITY: "insert-city",
  CITY_UF: "insert-city-uf",
  STATE: "insert-state",
  UF: "insert-uf",
  CEP: "insert-cep",
  GET_CITY: "get-city",
  GET_CITY_UF: "get-city-uf",
  CNH: "insert-cnh",
  CNPJ: "insert-cnpj",
  SELECT_IBGE: "select-ibge",
  INSERT_IBGE: "insert-ibge",
  SELECT_IBGE_STATE: "select-ibge-state",
  INSERT_IBGE_STATE: "insert-ibge-state",
  SELECT_DDD: "select-ddd",
  INSERT_DDD: "insert-ddd",
  PLATE: "insert-plate",
  OLD_PLATE: "insert-old-plate",
  GENERATE_USERNAME: "generate-username",
  LOREM_IPSUM: "generate-lorem",
  GENERATE_INT: "generate-int",
  GENERATE_MONEY: "generate-money",
  GENERATE_DECIMAL: "generate-decimal",
  GENERATE_PERCENT: "generate-percent",
  GENERATE_PERCENT_SIGN: "generate-percent-with-sign"
};

// Context menu item titles (Portuguese - visible to user)
const MENU_TITLES = {
  DADOS: "Dados",
  DATA: "Data",
  CIDADE: "Cidade",
  NUMEROS: "Números",
  CPF: "Inserir CPF",
  CNPJ: "Inserir CNPJ",
  EMAIL: "Inserir Email",
  PHONE: "Inserir Telefone",
  NAME: "Inserir Nome",
  DATE: "Inserir Data",
  DATETIME: "Inserir Data/Hora",
  TIME: "Inserir Hora",
  DATE_PLUS18: "Inserir Data (>=18 anos)",
  DATE_MINUS18: "Inserir Data (<18 anos)",
  URL: "Inserir URL",
  CITY: "Inserir Cidade",
  CITY_UF: "Inserir Cidade/UF",
  STATE: "Inserir Estado",
  UF: "Inserir UF",
  CEP: "Inserir CEP",
  GET_CITY: "Selecionar Cidade...",
  GET_CITY_UF: "Selecionar Cidade/UF...",
  SELECT_IBGE: "Selecionar IBGE...",
  INSERT_IBGE: "Inserir IBGE",
  SELECT_IBGE_STATE: "Selecionar IBGE Estado...",
  INSERT_IBGE_STATE: "Inserir IBGE Estado",
  SELECT_DDD: "Selecionar DDD...",
  INSERT_DDD: "Inserir DDD",
  CNH: "Inserir CNH",
  CNPJ: "Inserir CNPJ",
  PLATE: "Inserir Placa (Mercosul)",
  OLD_PLATE: "Inserir Placa (Antiga)",
  GENERATE_USERNAME: "Gerar Username",
  LOREM_IPSUM: "Gerar Lorem Ipsum",
  GENERATE_INT: "Gerar Inteiro",
  GENERATE_MONEY: "Gerar Valor (Money)",
  GENERATE_DECIMAL: "Gerar Decimal",
  GENERATE_PERCENT: "Gerar Percentual",
  GENERATE_PERCENT_SIGN: "Gerar Percentual (com sinal)"
};

// Message actions
const ACTIONS = {
  INSERT_CPF: "insertCpf",
  INSERT_CNPJ: "insertCnpj",
  INSERT_EMAIL: "insertEmail",
  INSERT_PHONE: "insertPhone",
  INSERT_NAME: "insertName",
  INSERT_DATE: "insertDate",
  INSERT_DATETIME: "insertDateTime",
  INSERT_TIME: "insertTime",
  INSERT_DATE_PLUS18: "insertDatePlus18",
  INSERT_DATE_MINUS18: "insertDateMinus18",
  INSERT_URL: "insertUrl",
  INSERT_CITY: "insertCity",
  INSERT_CITY_UF: "insertCityUf",
  INSERT_STATE: "insertState",
  INSERT_UF: "insertUf",
  INSERT_CEP: "insertCep",
  GET_CITY: "getCity",
  GET_CITY_UF: "getCityUf",
  INSERT_CNH: "insertCnh",
  INSERT_CNPJ: "insertCnpj",
  INSERT_IBGE: "insertIbge",
  SELECT_IBGE: "selectIbge",
  INSERT_IBGE_STATE: "insertIbgeState",
  SELECT_IBGE_STATE: "selectIbgeState",
  INSERT_DDD: "insertDdd",
  SELECT_DDD: "selectDdd",
  INSERT_PLATE: "insertPlate",
  INSERT_OLD_PLATE: "insertOldPlate",
  GENERATE_USERNAME: "generateUsername",
  GENERATE_LOREM: "generateLorem",
  GENERATE_INT: "generateInt",
  GENERATE_MONEY: "generateMoney",
  GENERATE_DECIMAL: "generateDecimal",
  GENERATE_PERCENT: "generatePercent",
  GENERATE_PERCENT_SIGN: "generatePercentWithSign",
  FILL_FORM: "fillForm"
};

/**
 * Initialize context menu items (grouped)
 */
function initializeContextMenus() {
  // Clear existing menus to avoid duplicates when service worker restarts
  if (browserAPI.contextMenus.removeAll) {
    browserAPI.contextMenus.removeAll();
  }

  // Create parent groups - Note: Documentos merged into Dados
  browserAPI.contextMenus.create({
    id: MENU_IDS.GROUP_DADOS,
    title: MENU_TITLES.DADOS,
    contexts: ["editable"]
  });

  browserAPI.contextMenus.create({
    id: MENU_IDS.GROUP_DATA,
    title: MENU_TITLES.DATA,
    contexts: ["editable"]
  });

  browserAPI.contextMenus.create({
    id: MENU_IDS.GROUP_CIDADE,
    title: MENU_TITLES.CIDADE,
    contexts: ["editable"]
  });

  browserAPI.contextMenus.create({
    id: MENU_IDS.GROUP_NUMEROS,
    title: MENU_TITLES.NUMEROS,
    contexts: ["editable"]
  });

  // Dados -> CPF, Email, Phone, Name, URL, CNH, Placas
  browserAPI.contextMenus.create({ id: MENU_IDS.CPF, parentId: MENU_IDS.GROUP_DADOS, title: MENU_TITLES.CPF, contexts: ["editable"] });
  browserAPI.contextMenus.create({ id: MENU_IDS.EMAIL, parentId: MENU_IDS.GROUP_DADOS, title: MENU_TITLES.EMAIL, contexts: ["editable"] });
  browserAPI.contextMenus.create({ id: MENU_IDS.PHONE, parentId: MENU_IDS.GROUP_DADOS, title: MENU_TITLES.PHONE, contexts: ["editable"] });
  browserAPI.contextMenus.create({ id: MENU_IDS.NAME, parentId: MENU_IDS.GROUP_DADOS, title: MENU_TITLES.NAME, contexts: ["editable"] });
  browserAPI.contextMenus.create({ id: MENU_IDS.URL, parentId: MENU_IDS.GROUP_DADOS, title: MENU_TITLES.URL, contexts: ["editable"] });
  browserAPI.contextMenus.create({ id: MENU_IDS.CNH, parentId: MENU_IDS.GROUP_DADOS, title: MENU_TITLES.CNH, contexts: ["editable"] });
  browserAPI.contextMenus.create({ id: MENU_IDS.CNPJ, parentId: MENU_IDS.GROUP_DADOS, title: MENU_TITLES.CNPJ, contexts: ["editable"] });
  browserAPI.contextMenus.create({ id: MENU_IDS.PLATE, parentId: MENU_IDS.GROUP_DADOS, title: MENU_TITLES.PLATE, contexts: ["editable"] });
  browserAPI.contextMenus.create({ id: MENU_IDS.OLD_PLATE, parentId: MENU_IDS.GROUP_DADOS, title: MENU_TITLES.OLD_PLATE, contexts: ["editable"] });
  browserAPI.contextMenus.create({ id: MENU_IDS.GENERATE_USERNAME, parentId: MENU_IDS.GROUP_DADOS, title: MENU_TITLES.GENERATE_USERNAME, contexts: ["editable"] });

  // Lorem Ipsum moved to root menu (no parent) per request
  browserAPI.contextMenus.create({ id: MENU_IDS.LOREM_IPSUM, title: MENU_TITLES.LOREM_IPSUM, contexts: ["editable"] });

  // Data -> date/time items
  browserAPI.contextMenus.create({ id: MENU_IDS.DATE, parentId: MENU_IDS.GROUP_DATA, title: MENU_TITLES.DATE, contexts: ["editable"] });
  browserAPI.contextMenus.create({ id: MENU_IDS.DATETIME, parentId: MENU_IDS.GROUP_DATA, title: MENU_TITLES.DATETIME, contexts: ["editable"] });
  browserAPI.contextMenus.create({ id: MENU_IDS.TIME, parentId: MENU_IDS.GROUP_DATA, title: MENU_TITLES.TIME, contexts: ["editable"] });
  browserAPI.contextMenus.create({ id: MENU_IDS.DATE_PLUS18, parentId: MENU_IDS.GROUP_DATA, title: MENU_TITLES.DATE_PLUS18, contexts: ["editable"] });
  browserAPI.contextMenus.create({ id: MENU_IDS.DATE_MINUS18, parentId: MENU_IDS.GROUP_DATA, title: MENU_TITLES.DATE_MINUS18, contexts: ["editable"] });

  // Cidade -> city/state related
  browserAPI.contextMenus.create({ id: MENU_IDS.CITY, parentId: MENU_IDS.GROUP_CIDADE, title: MENU_TITLES.CITY, contexts: ["editable"] });
  browserAPI.contextMenus.create({ id: MENU_IDS.CITY_UF, parentId: MENU_IDS.GROUP_CIDADE, title: MENU_TITLES.CITY_UF, contexts: ["editable"] });
  browserAPI.contextMenus.create({ id: MENU_IDS.GET_CITY, parentId: MENU_IDS.GROUP_CIDADE, title: MENU_TITLES.GET_CITY, contexts: ["editable"] });
  browserAPI.contextMenus.create({ id: MENU_IDS.GET_CITY_UF, parentId: MENU_IDS.GROUP_CIDADE, title: MENU_TITLES.GET_CITY_UF, contexts: ["editable"] });
  browserAPI.contextMenus.create({ id: MENU_IDS.SELECT_IBGE, parentId: MENU_IDS.GROUP_CIDADE, title: MENU_TITLES.SELECT_IBGE, contexts: ["editable"] });
  browserAPI.contextMenus.create({ id: MENU_IDS.INSERT_IBGE, parentId: MENU_IDS.GROUP_CIDADE, title: MENU_TITLES.INSERT_IBGE, contexts: ["editable"] });
  browserAPI.contextMenus.create({ id: MENU_IDS.SELECT_IBGE_STATE, parentId: MENU_IDS.GROUP_CIDADE, title: MENU_TITLES.SELECT_IBGE_STATE, contexts: ["editable"] });
  browserAPI.contextMenus.create({ id: MENU_IDS.INSERT_IBGE_STATE, parentId: MENU_IDS.GROUP_CIDADE, title: MENU_TITLES.INSERT_IBGE_STATE, contexts: ["editable"] });
  browserAPI.contextMenus.create({ id: MENU_IDS.SELECT_DDD, parentId: MENU_IDS.GROUP_CIDADE, title: MENU_TITLES.SELECT_DDD, contexts: ["editable"] });
  browserAPI.contextMenus.create({ id: MENU_IDS.INSERT_DDD, parentId: MENU_IDS.GROUP_CIDADE, title: MENU_TITLES.INSERT_DDD, contexts: ["editable"] });
  browserAPI.contextMenus.create({ id: MENU_IDS.STATE, parentId: MENU_IDS.GROUP_CIDADE, title: MENU_TITLES.STATE, contexts: ["editable"] });
  browserAPI.contextMenus.create({ id: MENU_IDS.UF, parentId: MENU_IDS.GROUP_CIDADE, title: MENU_TITLES.UF, contexts: ["editable"] });
  browserAPI.contextMenus.create({ id: MENU_IDS.CEP, parentId: MENU_IDS.GROUP_CIDADE, title: MENU_TITLES.CEP, contexts: ["editable"] });

  // Números -> numeric generators
  browserAPI.contextMenus.create({ id: MENU_IDS.GENERATE_INT, parentId: MENU_IDS.GROUP_NUMEROS, title: MENU_TITLES.GENERATE_INT, contexts: ["editable"] });
  browserAPI.contextMenus.create({ id: MENU_IDS.GENERATE_MONEY, parentId: MENU_IDS.GROUP_NUMEROS, title: MENU_TITLES.GENERATE_MONEY, contexts: ["editable"] });
  browserAPI.contextMenus.create({ id: MENU_IDS.GENERATE_DECIMAL, parentId: MENU_IDS.GROUP_NUMEROS, title: MENU_TITLES.GENERATE_DECIMAL, contexts: ["editable"] });
  browserAPI.contextMenus.create({ id: MENU_IDS.GENERATE_PERCENT, parentId: MENU_IDS.GROUP_NUMEROS, title: MENU_TITLES.GENERATE_PERCENT, contexts: ["editable"] });
  browserAPI.contextMenus.create({ id: MENU_IDS.GENERATE_PERCENT_SIGN, parentId: MENU_IDS.GROUP_NUMEROS, title: MENU_TITLES.GENERATE_PERCENT_SIGN, contexts: ["editable"] });
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
    case MENU_IDS.CNPJ:
      action = ACTIONS.INSERT_CNPJ;
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
    case MENU_IDS.SELECT_IBGE:
      action = ACTIONS.SELECT_IBGE;
      break;
    case MENU_IDS.INSERT_IBGE:
      action = ACTIONS.INSERT_IBGE;
      break;
    case MENU_IDS.SELECT_IBGE_STATE:
      action = ACTIONS.SELECT_IBGE_STATE;
      break;
    case MENU_IDS.INSERT_IBGE_STATE:
      action = ACTIONS.INSERT_IBGE_STATE;
      break;
    case MENU_IDS.SELECT_DDD:
      action = ACTIONS.SELECT_DDD;
      break;
    case MENU_IDS.INSERT_DDD:
      action = ACTIONS.INSERT_DDD;
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
    case MENU_IDS.CNPJ:
      action = ACTIONS.INSERT_CNPJ;
      break;
    case MENU_IDS.PLATE:
      action = ACTIONS.INSERT_PLATE;
      break;
    case MENU_IDS.OLD_PLATE:
      action = ACTIONS.INSERT_OLD_PLATE;
      break;
    case MENU_IDS.GENERATE_USERNAME:
      action = ACTIONS.GENERATE_USERNAME;
      break;
    case MENU_IDS.LOREM_IPSUM:
      action = ACTIONS.GENERATE_LOREM;
      break;
    case MENU_IDS.GENERATE_INT:
      action = ACTIONS.GENERATE_INT;
      break;
    case MENU_IDS.GENERATE_MONEY:
      action = ACTIONS.GENERATE_MONEY;
      break;
    case MENU_IDS.GENERATE_DECIMAL:
      action = ACTIONS.GENERATE_DECIMAL;
      break;
    case MENU_IDS.GENERATE_PERCENT:
      action = ACTIONS.GENERATE_PERCENT;
      break;
    case MENU_IDS.GENERATE_PERCENT_SIGN:
      action = ACTIONS.GENERATE_PERCENT_SIGN;
      break;
    case MENU_IDS.DATE:
      action = ACTIONS.INSERT_DATE;
      break;
    case MENU_IDS.DATETIME:
      action = ACTIONS.INSERT_DATETIME;
      break;
    case MENU_IDS.TIME:
      action = ACTIONS.INSERT_TIME;
      break;
    case MENU_IDS.URL:
      action = ACTIONS.INSERT_URL;
      break;
    case MENU_IDS.DATE_PLUS18:
      action = ACTIONS.INSERT_DATE_PLUS18;
      break;
    case MENU_IDS.DATE_MINUS18:
      action = ACTIONS.INSERT_DATE_MINUS18;
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

// Listen for extension button (action) clicks and request a form fill
if (browserAPI.action && browserAPI.action.onClicked) {
  browserAPI.action.onClicked.addListener((tab) => {
    if (tab && tab.id) {
      browserAPI.tabs.sendMessage(tab.id, { action: ACTIONS.FILL_FORM });
    }
  });
}
