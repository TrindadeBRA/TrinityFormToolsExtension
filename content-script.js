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
  INSERT_DATE: "insertDate",
  INSERT_DATETIME: "insertDateTime",
  INSERT_TIME: "insertTime",
  INSERT_URL: "insertUrl",
  INSERT_CITY: "insertCity",
  INSERT_CITY_UF: "insertCityUf",
  INSERT_STATE: "insertState",
  INSERT_UF: "insertUf",
  INSERT_CEP: "insertCep",
  GET_CITY: "getCity",
  GET_CITY_UF: "getCityUf",
  INSERT_CNH: "insertCnh",
  INSERT_PLATE: "insertPlate",
  INSERT_OLD_PLATE: "insertOldPlate",
  GENERATE_INT: "generateInt",
  GENERATE_MONEY: "generateMoney",
  GENERATE_DECIMAL: "generateDecimal",
  GENERATE_PERCENT: "generatePercent",
  GENERATE_PERCENT_SIGN: "generatePercentWithSign",
  FILL_FORM: "fillForm"
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

// Generate a plausible URL using real, commonly-known domains. Prefer HTTPS.
function generateUrl() {
  const scheme = Math.random() > 0.05 ? 'https' : 'http'; // 95% https

  const domains = [
    'google.com', 'github.com', 'wikipedia.org', 'youtube.com', 'amazon.com', 'microsoft.com',
    'apple.com', 'linkedin.com', 'facebook.com', 'instagram.com', 'netflix.com', 'stackoverflow.com',
    'npmjs.com', 'discord.com', 'reddit.com', 'mercadolivre.com', 'globo.com', 'uol.com.br',
    'bbc.co.uk', 'nytimes.com'
  ];

  const subOptions = ['', 'www.', 'app.', 'm.'];
  const paths = ['', '/', '/search', '/login', '/profile', '/product', '/products', '/p', '/watch', '/r', '/questions', '/blog', '/news', '/sobre', '/contato', '/brasil'];

  const domain = domains[Math.floor(Math.random() * domains.length)];
  const sub = subOptions[Math.floor(Math.random() * subOptions.length)];
  let path = paths[Math.floor(Math.random() * paths.length)];

  // Add dynamic segments for certain paths
  if (path === '/search') path += `?q=test${Math.floor(Math.random() * 1000)}`;
  if (path === '/watch') path += `?v=${Math.random().toString(36).slice(2, 9)}`;
  if (path === '/questions') path += `/${Math.floor(1000 + Math.random() * 9000)}`;
  if (path === '/p') path += `/${Math.random().toString(36).slice(2, 10)}`;
  if (path === '/product' || path === '/products') path += `/${Math.floor(1 + Math.random() * 9999)}`;

  // Occasionally add a query string
  const query = Math.random() > 0.7 && !path.includes('?') ? `?ref=test&utm=${Math.floor(Math.random() * 10000)}` : '';

  return `${scheme}://${sub}${domain}${path}${query}`;
}

/**
 * Numeric generators (formato BR: milhar com ponto e decimal com vírgula)
 */
function formatNumberBR(n, decimals = 2) {
  const fixed = Number(n).toFixed(decimals);
  const parts = fixed.split('.');
  const intPart = parts[0];
  const decPart = parts[1] || ''.padEnd(decimals, '0');
  const withThousands = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${withThousands},${decPart}`;
}

function generateInt(min = 0, max = 10000) {
  const value = Math.floor(min + Math.random() * (max - min + 1));
  return String(value);
}

function generateMoney(min = 0, max = 100000) {
  const value = (min + Math.random() * (max - min + 1));
  return formatNumberBR(value, 2);
}

function generateDecimal(min = 0, max = 10000, decimals = 4) {
  const factor = Math.pow(10, decimals);
  const value = Math.floor((min + Math.random() * (max - min + 1)) * factor) / factor;
  return formatNumberBR(value, decimals);
}

function generatePercent() {
  const value = (Math.random() * 100);
  return `${formatNumberBR(value, 2)}%`;
}

function generatePercentWithSign() {
  const value = (Math.random() * 200) - 100; // -100 .. +100
  const sign = value >= 0 ? '+' : '-';
  return `${sign}${formatNumberBR(Math.abs(value), 2)}%`;
}

/**
 * Generators for date and time
 */
function generateDate() {
  const start = new Date(1950, 0, 1);
  const end = new Date();
  const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function generateTime() {
  const h = String(Math.floor(Math.random() * 24)).padStart(2, '0');
  const m = String(Math.floor(Math.random() * 60)).padStart(2, '0');
  return `${h}:${m}`;
}

function generateDateTime() {
  return `${generateDate()} ${generateTime()}`;
}

/**
 * Returns a string suitable for `<input type="date|time|datetime-local">` values
 */
// Random date between min and max (Date objects)
function randomDateBetween(min, max) {
  return new Date(min.getTime() + Math.random() * (max.getTime() - min.getTime()));
}

// Returns a formatted date/time string for inputs depending on type and optional range
function generateDateForInput(type, minDate, maxDate) {
  const start = minDate || new Date(1950, 0, 1);
  const end = maxDate || new Date();
  const d = randomDateBetween(start, end);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');

  if (type === 'date') return `${yyyy}-${mm}-${dd}`;
  if (type === 'time') return `${hh}:${min}`;
  if (type === 'datetime-local') return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
  return `${dd}/${mm}/${yyyy}`;
}

function generateDateAtLeast18() {
  const today = new Date();
  const cutoff = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  const start = new Date(1900, 0, 1);
  const d = randomDateBetween(start, cutoff);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function generateDateUnder18() {
  const today = new Date();
  // under 18: from (today - 17 years) up to today
  const start = new Date(today.getFullYear() - 17, today.getMonth(), today.getDate());
  const end = today;
  const d = randomDateBetween(start, end);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

/**
 * Fill the current form: prefer focused element's form, else first <form> on page
 * Uses element name, id or type to pick an appropriate generator
 */
function fillCurrentForm() {
  try {
    let active = document.activeElement;
    let form = null;

    if (isEditableElement(active)) {
      form = active.form || active.closest('form');
    }

    if (!form) {
      form = document.querySelector('form');
    }

    if (!form) {
      // try to find the first input/textarea/select on the page
      const first = document.querySelector('input, textarea, select');
      if (!first) return;
      form = first.closest('form') || document.body;
    }

    const elements = form.querySelectorAll('input, textarea, select');

    elements.forEach(el => {
      try {
        const tag = el.tagName.toLowerCase();
        const type = (el.type || '').toLowerCase();
        const token = ((el.name || el.id || '') + '').toLowerCase();

        // Only alter empty fields
        let isEmpty = false;
        if (tag === 'select') {
          isEmpty = !el.value || String(el.value).trim() === '' || el.selectedIndex === -1 || el.selectedIndex === 0 || !el.options || el.options.length === 0;
        } else if (type === 'checkbox') {
          isEmpty = !el.checked;
        } else if (type === 'radio') {
          if (el.name) {
            const nameEscaped = el.name.replace(/"/g, '\\"');
            const checked = form.querySelector(`input[type="radio"][name="${nameEscaped}"]:checked`);
            isEmpty = !checked;
          } else {
            isEmpty = !el.checked;
          }
        } else {
          isEmpty = !el.value || (typeof el.value === 'string' && el.value.trim() === '');
        }

        if (!isEmpty) return;

        let value = null;

        if (token.includes('cpf')) value = generateCPF();
        else if (token.includes('email')) value = generateEmail();
        else if (token.includes('tel') || token.includes('telefone') || type === 'tel') value = generatePhone();
        else if (token.includes('nome') || token.includes('name')) value = generateName();
        else if ((token.includes('cidade') && token.includes('uf')) || token.includes('cityuf')) value = generateCityUf();
        else if (token.includes('cidade') || token.includes('city')) value = generateCity();
        else if (token.includes('estado') || token.includes('state')) value = generateState();
        else if (token === 'uf' || token.includes('_uf') || token.includes(' uf')) value = generateUf();
        else if (token.includes('cep')) value = generateCep();
        else if (token.includes('cnh')) value = generateCNH();
        else if (token.includes('placa')) value = generatePlate();
        else if (token.includes('datahora') || token.includes('datetime')) {
          value = (type === 'datetime-local') ? generateDateForInput('datetime-local') : generateDateTime();
        }
        else if (token.includes('data') || type === 'date') {
          value = (type === 'date') ? generateDateForInput('date') : generateDate();
        }
        else if (token.includes('hora') || type === 'time') {
          value = (type === 'time') ? generateDateForInput('time') : generateTime();
        }
        else if (token.includes('url') || token.includes('site') || token.includes('website') || token.includes('link') || type === 'url') {
          value = generateUrl();
        }
        else if (type === 'number') {
          value = String(Math.floor(Math.random() * 1000));
        }

        // campos ou textarea com required vazios - preencher com texto genérico, respeitando minlength e maxlength
        if ((tag === 'input' && (type === 'text' || type === 'search' || type === 'password' || type === 'url' || type === 'email')) ||
          tag === 'textarea') {
          if (!el.value || el.value.trim() === '') {
            if (value === null) {
              let minLength = 5;
              if (el.minLength && el.minLength > 0) {
                minLength = el.minLength;
              }
              value = 'Teste '.padEnd(minLength, 'X');
              if (el.maxLength && el.maxLength > 0) {
                value = value.slice(0, el.maxLength);
              }

            }
          }
        }


        if (value !== null) {
          if (tag === 'select') {
            let matched = false;
            for (const opt of el.options) {
              if (!opt.value) continue;
              if (String(opt.value).toLowerCase().includes(String(value).toLowerCase()) || (opt.text && String(opt.text).toLowerCase().includes(String(value).toLowerCase()))) {
                el.value = opt.value;
                matched = true;
                break;
              }
            }
            if (!matched) {
              if (value && value.length === 2) {
                for (const opt of el.options) {
                  if ((opt.value && opt.value.toUpperCase() === value.toUpperCase()) || (opt.text && opt.text.toUpperCase() === value.toUpperCase())) {
                    el.value = opt.value || opt.text;
                    matched = true;
                    break;
                  }
                }
              }
            }
            if (!matched && el.options.length > 0) {
              el.selectedIndex = Math.min(1, el.options.length - 1);
            }
            el.dispatchEvent(new Event("input", { bubbles: true, cancelable: true }));
            el.dispatchEvent(new Event("change", { bubbles: true, cancelable: true }));
          } else if (type === 'checkbox' || type === 'radio') {
            if (token.includes('aceite') || token.includes('concord') || token.includes('sim') || token.includes('yes')) {
              el.checked = true;
              el.dispatchEvent(new Event("change", { bubbles: true, cancelable: true }));
            }
          } else {
            insertValueIntoElement(el, value);
          }
        }
      } catch (err) {
        console.debug('Erro preenchendo elemento:', err.message);
      }
    });
  } catch (error) {
    console.debug('Erro em fillCurrentForm:', error.message);
  }
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
    pegarCidade,
    pesquisarCidade: pegarCidade,
    getCity,
    getCityUf,
    generateCNH,
    generatePlate,
    generateOldPlate,
    generateDate,
    generateDateTime,
    generateTime,
    generateDateForInput,
    generateInt,
    generateMoney,
    generateDecimal,
    generatePercent,
    generatePercentWithSign,
    fillCurrentForm

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
 * Convert BR-formatted numeric strings to machine-friendly number string for input[type=number]
 * @param {HTMLElement} el
 * @param {string} val
 */
function normalizeForNumberInput(el, val) {
  if (!el || el.type !== 'number' || typeof val !== 'string') return val;
  let v = val.trim();

  // remove percent sign if present
  if (v.endsWith('%')) {
    v = v.slice(0, -1).trim();
  }

  // handle sign
  let sign = '';
  if (v.startsWith('+')) v = v.slice(1);
  else if (v.startsWith('-')) { sign = '-'; v = v.slice(1); }

  // remove thousand separators (dots)
  v = v.replace(/\./g, '');
  // replace decimal comma with dot
  v = v.replace(',', '.');

  // if not a valid number after normalization, return original val
  if (!/^\d+(\.\d+)?$/.test(v)) return sign + v;
  return sign + v;
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
    case ACTIONS.GENERATE_INT:
      value = generateInt();
      break;
    case ACTIONS.GENERATE_MONEY:
      value = generateMoney();
      break;
    case ACTIONS.GENERATE_DECIMAL:
      value = generateDecimal();
      break;
    case ACTIONS.GENERATE_PERCENT:
      value = generatePercent();
      break;
    case ACTIONS.GENERATE_PERCENT_SIGN:
      value = generatePercentWithSign();
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
    case ACTIONS.INSERT_DATE:
      // respect input types
      if (activeElement && activeElement.type === 'date') value = generateDateForInput('date');
      else if (activeElement && activeElement.type === 'datetime-local') value = generateDateForInput('datetime-local');
      else if (activeElement && activeElement.type === 'time') value = generateDateForInput('time');
      else value = generateDate();
      break;
    case ACTIONS.INSERT_DATETIME:
      if (activeElement && activeElement.type === 'datetime-local') value = generateDateForInput('datetime-local');
      else value = generateDateTime();
      break;
    case ACTIONS.INSERT_TIME:
      if (activeElement && activeElement.type === 'time') value = generateDateForInput('time');
      else value = generateTime();
      break;
    case ACTIONS.INSERT_DATE_PLUS18:
      if (activeElement && (activeElement.type === 'date' || activeElement.type === 'datetime-local')) {
        const today = new Date();
        const cutoff = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
        if (activeElement.type === 'date') value = generateDateForInput('date', new Date(1900, 0, 1), cutoff);
        else value = generateDateForInput('datetime-local', new Date(1900, 0, 1), cutoff);
      } else if (activeElement && activeElement.type === 'time') {
        value = generateTime();
      } else {
        value = generateDateAtLeast18();
      }
      break;
    case ACTIONS.INSERT_DATE_MINUS18:
      if (activeElement && (activeElement.type === 'date' || activeElement.type === 'datetime-local')) {
        const today = new Date();
        const start = new Date(today.getFullYear() - 17, today.getMonth(), today.getDate());
        if (activeElement.type === 'date') value = generateDateForInput('date', start, new Date());
        else value = generateDateForInput('datetime-local', start, new Date());
      } else if (activeElement && activeElement.type === 'time') {
        value = generateTime();
      } else {
        value = generateDateUnder18();
      }
      break;
    case ACTIONS.INSERT_URL:
      value = generateUrl();
      break;
    case ACTIONS.FILL_FORM:
      // Fill the current form (no single input insertion)
      fillCurrentForm();
      return;
    default:
      return;
  }

  if (value) {
    if (activeElement && activeElement.type === 'number' && typeof value === 'string') {
      value = normalizeForNumberInput(activeElement, value);
    }
    insertValueIntoElement(activeElement, value);
  }
}

// Listen for messages from background script
browserAPI.runtime.onMessage.addListener(handleMessage);
