/**
 * TrinityFormTools - Content Script
 * Generates and inserts test data into form fields
 * Compatible with both Firefox and Chrome
 */

// Browser API compatibility (Firefox uses browser.*, Chrome uses chrome.*)
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

// Message actions from background script
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

// Valid Brazilian area codes (DDD) - fallback list; will be overridden if cidades data is available
let AREA_CODES = [
  "11", "21", "31", "41", "47", "48",
  "51", "61", "71", "81", "85"
];

/**
 * Initialize AREA_CODES from `window.brasil.cidades` if available
 */
(function initializeAreaCodesFromBrasil() {
  try {
    if (window.brasil && Array.isArray(window.brasil.cidades)) {
      const ddds = Array.from(
        new Set(
          window.brasil.cidades
            .map(c => c.ddd)
            .filter(d => d && Number.isInteger(d))
            .map(String)
        )
      ).map(d => d.padStart(2, "0"));
      if (ddds.length) {
        AREA_CODES = ddds;
      }
    }
  } catch (error) {
    console.debug("Erro inicializando DDDs a partir de cidades_brasil:", error.message);
  }
})();

// Email username prefixes
const EMAIL_USERNAMES = [
  "usuario", "teste", "dev", "admin",
  "user", "cliente", "contato"
];

// Email domains
const EMAIL_DOMAINS = [
  "gmail.com", "hotmail.com", "yahoo.com",
  "outlook.com", "teste.com", "exemplo.com"
];

// Brazilian first names (common names)
const FIRST_NAMES = [
  "Ana", "Maria", "João", "José", "Carlos", "Paulo", "Pedro", "Lucas",
  "Fernando", "Ricardo", "Rafael", "Bruno", "Felipe", "Gabriel", "Thiago",
  "Marcos", "André", "Rodrigo", "Daniel", "Fábio", "Juliana", "Patrícia",
  "Mariana", "Camila", "Amanda", "Bruna", "Letícia", "Beatriz", "Carolina",
  "Larissa", "Vanessa", "Priscila", "Renata", "Tatiana", "Cristina", "Sandra",
  "Adriana", "Fernanda", "Roberta", "Luciana", "Claudia", "Márcia", "Sônia"
];

// Brazilian last names (common surnames)
const LAST_NAMES = [
  "Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Ferreira", "Alves",
  "Pereira", "Lima", "Gomes", "Ribeiro", "Carvalho", "Almeida", "Lopes",
  "Soares", "Fernandes", "Vieira", "Barbosa", "Rocha", "Dias", "Monteiro",
  "Cardoso", "Teixeira", "Mendes", "Freitas", "Martins", "Nascimento",
  "Moreira", "Araújo", "Machado", "Costa", "Ramos", "Reis", "Azevedo",
  "Correia", "Cavalcanti", "Nunes", "Moraes", "Castro", "Pinto", "Araújo"
];

/**
 * Generates a valid CPF (Brazilian tax ID) without formatting
 * @returns {string} 11-digit CPF number
 */
function generateCPF() {
  const digits = [];

  // Generate 9 random digits
  for (let i = 0; i < 9; i++) {
    digits[i] = Math.floor(Math.random() * 10);
  }

  // Calculate first verification digit
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += digits[i] * (10 - i);
  }
  let digit1 = (sum * 10) % 11;
  if (digit1 === 10 || digit1 === 11) {
    digit1 = 0;
  }

  // Calculate second verification digit
  sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += digits[i] * (11 - i);
  }
  sum += digit1 * 2;
  let digit2 = (sum * 10) % 11;
  if (digit2 === 10 || digit2 === 11) {
    digit2 = 0;
  }

  return [...digits, digit1, digit2].join("");
}

/**
 * Generates a random email address
 * @returns {string} Email address
 */
function generateEmail() {
  const username = EMAIL_USERNAMES[
    Math.floor(Math.random() * EMAIL_USERNAMES.length)
  ];
  const number = Math.floor(Math.random() * 10000);
  const domain = EMAIL_DOMAINS[
    Math.floor(Math.random() * EMAIL_DOMAINS.length)
  ];

  return `${username}${number}@${domain}`;
}

/**
 * Generates a phone number with area code (DDD)
 * Format: (XX) XXXXX-XXXX
 * @returns {string} Formatted phone number
 */
function generatePhone() {
  const areaCode = AREA_CODES[
    Math.floor(Math.random() * AREA_CODES.length)
  ];

  // Generate 9-digit phone number (mobile format), ensure first digit 9 (common mobile format)
  let phoneNumber = '9' + Math.floor(10000000 + Math.random() * 90000000).toString();
  phoneNumber = phoneNumber.padStart(9, '0');

  // Format: (XX) XXXXX-XXXX
  return `(${areaCode}) ${phoneNumber.slice(0, 5)}-${phoneNumber.slice(5)}`;
}

/**
 * Generates a random Brazilian name (first name + last name)
 * @returns {string} Full name
 */
function generateName() {
  const firstName = FIRST_NAMES[
    Math.floor(Math.random() * FIRST_NAMES.length)
  ];
  const lastName = LAST_NAMES[
    Math.floor(Math.random() * LAST_NAMES.length)
  ];

  // Sometimes add a second last name (common in Brazil)
  const hasSecondLastName = Math.random() > 0.5;
  if (hasSecondLastName) {
    const secondLastName = LAST_NAMES[
      Math.floor(Math.random() * LAST_NAMES.length)
    ];
    // Make sure second last name is different
    if (secondLastName !== lastName) {
      return `${firstName} ${lastName} ${secondLastName}`;
    }
  }

  return `${firstName} ${lastName}`;
}

/**
 * --- Geradores baseados em cidades e estados (integração com cidades_brasil.js) ---
 */

function getBrasilCities() {
  return (window.brasil && Array.isArray(window.brasil.cidades)) ? window.brasil.cidades : [];
}

/** Returns a random city object or null */
function getRandomCityObject() {
  const cities = getBrasilCities();
  return (cities && cities.length) ? cities[Math.floor(Math.random() * cities.length)] : null;
}

function generateCity() {
  const city = getRandomCityObject();
  return city ? city.nome : generateName();
}

function generateCityUf(separator = " - ") {
  const city = getRandomCityObject();
  return city ? `${city.nome}${separator}${city.uf}` : generateName();
}

function getBrasilStates() {
  return (window.brasil && Array.isArray(window.brasil.estados)) ? window.brasil.estados : [];
}

function getRandomStateObject() {
  const states = getBrasilStates();
  return (states && states.length) ? states[Math.floor(Math.random() * states.length)] : null;
}

function generateState() {
  const state = getRandomStateObject();
  // Fallback para nome e abreviação caso os dados não estejam disponíveis
  return state ? state.nome : "São Paulo";
}

function generateUf() {
  const state = getRandomStateObject();
  return state ? state.uf : "SP";

}

function generateCep() {
  const cities = getBrasilCities().filter(c => c.cepInicial && c.cepFinal && c.cepFinal >= c.cepInicial);
  if (!cities.length) {
    // fallback: random 8-digit number formatted
    const cepNumber = Math.floor(10000000 + Math.random() * 89999999);
    return `${String(cepNumber).slice(0, 5)}-${String(cepNumber).slice(5)}`;
  }
  const city = cities[Math.floor(Math.random() * cities.length)];
  const cepStart = city.cepInicial;
  const cepEnd = city.cepFinal;
  const cepNumber = Math.floor(cepStart + Math.random() * (cepEnd - cepStart + 1));
  const cepStr = cepNumber.toString().padStart(8, "0");
  return `${cepStr.slice(0, 5)}-${cepStr.slice(5)}`;
}

/**
 * Pesquisar cidade por nome, IBGE ou CEP
 * @param {string} query - nome (texto), IBGE (número) ou CEP (8 dígitos)
 * @returns {Object|null} cidade object or null
 */
function pegarCidade(query) {
  return window.brasil.pegarCidade(query);
}

/**
 * Prompt user for city query and return the city name
 * @returns {string} city name or empty string
 */
function getCity() {
  try {
    const input = window.prompt('Digite nome, IBGE ou CEP da cidade:');
    if (input === null) return '';
    const city = pegarCidade(input);
    if (city) return city.nome;
    window.alert('Cidade não encontrada.');
    return '';
  } catch (error) {
    console.debug('Erro em getCity:', error.message);
    return '';
  }
}

/**
 * Prompt user and return "Cidade - UF" or empty string
 * @returns {string}
 */
function getCityUf() {
  try {
    const input = window.prompt('Digite nome, IBGE ou CEP da cidade:');
    if (input === null) return '';
    const city = pegarCidade(input);
    if (city) return `${city.nome} - ${city.uf}`;
    window.alert('Cidade não encontrada.');
    return '';
  } catch (error) {
    console.debug('Erro em getCityUf:', error.message);
    return '';
  }
}

/**
 * Gera uma CNH (número de habilitação) válida (11 dígitos) usando somas de verificação simples.
 * @returns {string} CNH sem formatação (11 dígitos)
 */
function generateCNH() {
  // Generate 9 random digits
  const digits = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));

  // First checksum: weights 9..1
  let sum1 = 0;
  for (let i = 0; i < 9; i++) {
    sum1 += digits[i] * (9 - i);
  }
  let v1 = sum1 % 11;
  if (v1 >= 10) v1 = 0;

  // Second checksum: weights 1..9
  let sum2 = 0;
  for (let i = 0; i < 9; i++) {
    sum2 += digits[i] * (i + 1);
  }
  let v2 = sum2 % 11;
  if (v2 >= 10) v2 = 0;

  return digits.join('') + String(v1) + String(v2);
}

/**
 * Gera uma placa Mercosul (formato: LLLNLNN, ex: ABC1D23)
 * @returns {string} Placa Mercosul
 */
function generatePlate() {
  const letters = () => String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const digit = () => Math.floor(Math.random() * 10).toString();

  const a = letters();
  const b = letters();
  const c = letters();
  const d1 = digit();
  const e = letters();
  const d2 = digit();
  const d3 = digit();

  return `${a}${b}${c}${d1}${e}${d2}${d3}`;
}

/**
 * Gera uma placa no formato antigo AAA-1234
 * @returns {string} Placa antiga
 */
function generateOldPlate() {
  const letters = () => String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const digit = () => Math.floor(Math.random() * 10).toString();

  return `${letters()}${letters()}${letters()}-${digit()}${digit()}${digit()}${digit()}`;
}

// Expose generators (and search utilities) to page/context for potential use
try {
  window.TrinityFormGenerators = window.TrinityFormGenerators || {};
  Object.assign(window.TrinityFormGenerators, {
    generateCity,
    generateCityUf,
    generateState,
    generateUf,
    generateCep,
    pesquisarCidade,
    getCity,
    getCityUf,
    generateCNH,
    generatePlate,
    generateOldPlate

  });
} catch (error) {
  console.debug('Erro expondo geradores:', error.message);
}

/**
 * Checks if an element is editable
 * @param {HTMLElement} element - DOM element to check
 * @returns {boolean} True if element is editable
 */
function isEditableElement(element) {
  if (!element) return false;

  const tagName = element.tagName.toLowerCase();
  return (
    (tagName === "input" || tagName === "textarea") &&
    !element.readOnly &&
    !element.disabled
  );
}

/**
 * Inserts a value into the focused element
 * Maintains input events for framework compatibility (React, Vue, etc.)
 * @param {HTMLElement} element - Target element
 * @param {string} value - Value to insert
 */
function insertValueIntoElement(element, value) {
  if (!isEditableElement(element)) {
    return;
  }

  // Ensure element is focused before manipulating selection
  if (document.activeElement !== element) {
    element.focus();
  }

  // Get current selection position
  let start = element.selectionStart;
  let end = element.selectionEnd;

  // Fallback if selectionStart/End are null or undefined
  if (start === null || start === undefined) {
    start = element.value.length;
  }
  if (end === null || end === undefined) {
    end = element.value.length;
  }

  const before = element.value.substring(0, start);
  const after = element.value.substring(end);

  // Set the new value
  element.value = before + value + after;

  // Set cursor position after inserted value
  // Only use setSelectionRange for text-like inputs
  const inputType = element.type ? element.type.toLowerCase() : 'text';
  const supportsSelection = ['text', 'email', 'password', 'search', 'tel', 'url'].includes(inputType) ||
    element.tagName.toLowerCase() === 'textarea';

  if (supportsSelection && element.setSelectionRange) {
    try {
      const newPosition = before.length + value.length;
      element.setSelectionRange(newPosition, newPosition);
    } catch (error) {
      // Ignore InvalidStateError - element might not be in a valid state for selection
      // The value was already set, so the operation can continue
      console.debug('Não foi possível definir a posição do cursor:', error.message);
    }
  }

  // Dispatch input and change events for framework compatibility
  try {
    const inputEvent = new Event("input", { bubbles: true, cancelable: true });
    const changeEvent = new Event("change", { bubbles: true, cancelable: true });

    element.dispatchEvent(inputEvent);
    element.dispatchEvent(changeEvent);
  } catch (error) {
    console.debug('Erro ao disparar eventos:', error.message);
  }
}

/**
 * Handles messages from background script
 * @param {Object} message - Message object with action property
 */
function handleMessage(message) {
  const activeElement = document.activeElement;
  let value = null;

  switch (message.action) {
    case ACTIONS.INSERT_CPF:
      value = generateCPF();
      break;
    case ACTIONS.INSERT_EMAIL:
      value = generateEmail();
      break;
    case ACTIONS.INSERT_PHONE:
      value = generatePhone();
      break;
    case ACTIONS.INSERT_NAME:
      value = generateName();
      break;
    case ACTIONS.INSERT_CITY:
      value = generateCity();
      break;
    case ACTIONS.INSERT_CITY_UF:
      value = generateCityUf();
      break;
    case ACTIONS.GET_CITY:
      value = getCity();
      break;
    case ACTIONS.GET_CITY_UF:
      value = getCityUf();
      break;
    case ACTIONS.INSERT_CNH:
      value = generateCNH();
      break;
    case ACTIONS.INSERT_PLATE:
      value = generatePlate();
      break;
    case ACTIONS.INSERT_OLD_PLATE:
      value = generateOldPlate();
      break;
    case ACTIONS.INSERT_STATE:
      value = generateState();
      break;
    case ACTIONS.INSERT_UF:
      value = generateUf();
      break;
    case ACTIONS.INSERT_CEP:
      value = generateCep();
      break;
    default:
      return;
  }

  if (value) {
    insertValueIntoElement(activeElement, value);
  }
}

// Listen for messages from background script
browserAPI.runtime.onMessage.addListener(handleMessage);
