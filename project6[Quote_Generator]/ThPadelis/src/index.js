import("./tailwind.config").catch((error) => {
  console.log("Failed to load tailwind.config");
  console.log(error);
});

String.prototype.toCapitalCase = function () {
  let value = this.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
};

// Reactive state
const _state = {
  item: null,
};

const handler = {
  set(target, property, value) {
    target[property] = value;
    // console.log(
    //   `Property '${property}' set to: ${JSON.stringify(value, null, 2)}`
    // );

    switch (property) {
      case "item":
        _setQuoteInfo();
        return;
      default:
        break;
    }
  },
};
const state = new Proxy(_state, handler);

const getQuote = async () => {
  try {
    const _params = { category: _getRandomCategory() };
    const params = new URLSearchParams(_params).toString();
    const headers = {
      "X-Api-Key": process.env.API_NINJA_KEY,
      "content-type": "application/json",
    };
    const url = `https://api.api-ninjas.com/v1/quotes?${params}`;

    const response = await fetch(url, { headers });
    const [quote, ...rest] = await response.json();

    state.item = quote;
  } catch (error) {
    state.item = null;
    console.log("Something went wrong");
    console.log(error);
  }
};

const _setQuoteInfo = () => {
  const quoteEl = document.getElementById("quote");
  const quoteTextEl = document.getElementById("quote-text");
  const quoteAuthorEl = document.getElementById("quote-author");
  const quoteCategoryEl = document.getElementById("quote-category");

  if (!!state.item) {
    quoteTextEl.textContent = `"${state.item.quote}"`;
    quoteAuthorEl.textContent = state.item.author;
    quoteCategoryEl.textContent = String(state.item.category).toCapitalCase();

    quoteEl.classList.remove("hidden");
  } else {
    quoteEl.classList.add("hidden");
  }
};

const _getRandomCategory = () => {
  const QUOTE_CATEGORIES = [
    "age",
    "alone",
    "amazing",
    "anger",
    "architecture",
    "art",
    "attitude",
    "beauty",
    "best",
    "birthday",
    "business",
    "car",
    "change",
    "communications",
    "computers",
    "cool",
    "courage",
    "dad",
    "dating",
    "death",
    "design",
    "dreams",
    "education",
    "environmental",
    "equality",
    "experience",
    "failure",
    "faith",
    "family",
    "famous",
    "fear",
    "fitness",
    "food",
    "forgiveness",
    "freedom",
    "friendship",
    "funny",
    "future",
    "god",
    "good",
    "government",
    "graduation",
    "great",
    "happiness",
    "health",
    "history",
    "home",
    "hope",
    "humor",
    "imagination",
    "inspirational",
    "intelligence",
    "jealousy",
    "knowledge",
    "leadership",
    "learning",
    "legal",
    "life",
    "love",
    "marriage",
    "medical",
    "men",
    "mom",
    "money",
    "morning",
    "movies",
    "success",
  ];

  const index = Math.floor(Math.random() * (QUOTE_CATEGORIES.length + 1));
  return QUOTE_CATEGORIES[index];
};

const setActionEventListener = () => {
  const btnEl = document.getElementById("action-btn");

  btnEl.addEventListener("click", (event) => {
    event.preventDefault();
    getQuote();
  });
};

setActionEventListener();
getQuote();
