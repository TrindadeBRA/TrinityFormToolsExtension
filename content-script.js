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
  INSERT_NAME: "insertName"
};

// Valid Brazilian area codes (DDD)
const AREA_CODES = [
  "11", "21", "31", "41", "47", "48", 
  "51", "61", "71", "81", "85"
];

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
  
  // Generate 9-digit phone number (mobile format)
  const phoneNumber = Math.floor(
    100000000 + Math.random() * 900000000
  ).toString();

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
    default:
      return;
  }

  if (value) {
    insertValueIntoElement(activeElement, value);
  }
}

// Listen for messages from background script
browserAPI.runtime.onMessage.addListener(handleMessage);
