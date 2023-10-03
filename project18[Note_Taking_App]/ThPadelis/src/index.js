import("./tailwind.config").catch((error) => {
  console.log("Failed to load tailwind.config");
  console.log(error);
});
import localStorage, { localStorage } from "reactive-localstorage";
import dayjs from "dayjs";

// Reactive state
const _state = {
  isEdit: false,
  note: null,
};

const handler = {
  set(target, property, value) {
    target[property] = value;
    // console.log(`Property '${property}' set to: ${JSON.stringify(value)}`);
    const titleEl = document.querySelector("form#note-form #note-title");
    const textEl = document.querySelector("form#note-form #note-text");
    const btnEl = document.querySelector("form#note-form button#save-btn");

    btnEl.innerText = target?.isEdit ? "Update" : "Save";
    if (property === "isEdit" && value) {
      titleEl.value = target?.note ? target?.note.title : "";
      textEl.value = target?.note ? target?.note.text : "";
    }
  },
};
const state = new Proxy(_state, handler);

const _createNoteEl = ({ id, title, text, datetime }) => {
  const datetimeHuman = dayjs(datetime).format("MMMM D, YYYY h:mm A");
  const liElement = document.createElement("li");
  liElement.classList.add("py-6");
  liElement.dataset.note = id;
  //   const item = `<article> <div class="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0" > <dl> <dt class="sr-only">Published on</dt> <dd class="text-base font-medium leading-6 text-gray-500 dark:text-gray-400" > <time datetime="${datetime}">${datetimeHuman}</time> </dd> </dl> <div class="space-y-5 xl:col-span-3"> <div class="space-y-6"> <div> <h2 class="text-2xl font-bold leading-8 tracking-tight"> <span class="text-gray-900 dark:text-gray-100">${title}</span> </h2> </div> <div class="prose max-w-none text-gray-500 dark:text-gray-400"> ${text} </div> </div> </div> </div> </article>`;
  const item = `<article> <div class="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0" > <dl> <dt class="sr-only">Published on</dt> <dd class="text-base font-medium leading-6 text-gray-500 dark:text-gray-400" > <time datetime="${datetime}">${datetimeHuman}</time> </dd> <div class="mt-2 flex flex-wrap gap-2"> <button data-btn="note-delete-btn" class="flex justify-center w-[100px] gap-1 capitalize bg-primary-500 rounded-md py-2 p-4 font-medium text-white hover:bg-primary-700 dark:hover:bg-primary-400 focus:ring-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black" > delete </button> <button data-btn="note-edit-btn" class="flex justify-center w-[100px] gap-1 capitalize bg-primary-500 rounded-md py-2 p-4 font-medium text-white hover:bg-primary-700 dark:hover:bg-primary-400 focus:ring-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black" > edit </button> </div> </dl> <div class="space-y-5 xl:col-span-3"> <div class="space-y-6"> <div> <h2 class="text-2xl font-bold leading-8 tracking-tight"> <span class="text-gray-900 dark:text-gray-100">${title}</span> </h2> </div> <div class="prose max-w-none text-gray-500 dark:text-gray-400"> ${text} </div> </div> </div> </div> </article>`;
  liElement.innerHTML = item;
  return liElement;
};

const getAllNotes = () => {
  const notesEl = document.getElementById("notes");
  notesEl.innerHTML = null;
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
    notesEl.append(_createNoteEl(note));
  }
};

const _uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const setEventListeners = () => {
  _setFormEventListener();
};

const _setFormEventListener = () => {
  const formEl = document.getElementById("note-form");
  formEl.addEventListener("submit", function (event) {
    event.preventDefault();
    // Elements
    const titleEl = document.getElementById("note-title");
    const textEl = document.getElementById("note-text");

    const id = _uuid();
    const title = String(titleEl.value) || "";
    const text = String(textEl.value) || "";

    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    if (state.isEdit && !!state.note) {
      const updatedNote =
        { ...state.note, title, text, datetime: new Date().valueOf() } || null;
      const updatedNotes = [...notes].map((x) =>
        x.id === updatedNote.id ? updatedNote : x
      );
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
    } else {
      notes.unshift({ id, title, text, datetime: new Date().valueOf() });
      localStorage.setItem("notes", JSON.stringify(notes));
    }

    // Clear form
    titleEl.value = "";
    textEl.value = "";
    state.note = null;
    state.isEdit = false;
  });
};

const _getParentElementByTag = (element, tagName = "div") => {
  const childElement = element;
  const parentTagName = tagName;
  let parentElement = childElement;

  while (
    parentElement &&
    parentElement.tagName.toLowerCase() !== parentTagName
  ) {
    parentElement = parentElement.parentNode;
  }

  return parentElement && parentElement.tagName.toLowerCase() === parentTagName
    ? parentElement
    : null;
};

const _setDeleteEvents = () => {
  const onClickEvent = (event) => {
    event.preventDefault();
    const parentLi = _getParentElementByTag(event.target, "li");
    const noteId = parentLi.dataset.note;
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const note = notes.find((x) => x.id === noteId) || null;
    if (!note || !note.id) return false;
    const updatedNotes = notes.filter((x) => x.id !== note.id);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const noteDeleteBtnEls = document.querySelectorAll(
    "button[data-btn='note-delete-btn']"
  );

  for (let i = 0; i < noteDeleteBtnEls.length; i++) {
    const element = noteDeleteBtnEls[i];
    if (!element.hasAttribute("onclick"))
      element.addEventListener("click", onClickEvent, true);
  }
};

const _setEditEvents = () => {
  const onClickEvent = (event) => {
    event.preventDefault();
    const parentLi = _getParentElementByTag(event.target, "li");
    const noteId = parentLi.dataset.note;
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const note = notes.find((x) => x.id === noteId) || null;
    state.note = note;
    state.isEdit = true;
  };

  const noteEditBtnEls = document.querySelectorAll(
    "button[data-btn='note-edit-btn']"
  );

  for (let i = 0; i < noteEditBtnEls.length; i++) {
    const element = noteEditBtnEls[i];
    if (!element.hasAttribute("onclick"))
      element.addEventListener("click", onClickEvent, true);
  }
};

const _watchNotesElement = () => {
  const targetElement = document.getElementById("notes");

  const observer = new MutationObserver(function (mutationsList, observer) {
    mutationsList.forEach(function (mutation) {
      if (mutation.type === "childList") {
        _setDeleteEvents();
        _setEditEvents();
      }
    });
  });

  const config = {
    attributes: true, // Watch for attribute changes
    childList: true, // Watch for changes in child nodes
    subtree: true, // Watch for changes in all descendants
    attributeOldValue: false, // Record the previous value of attributes
  };

  observer.observe(targetElement, config);
};

localStorage.on("change", (key, value) => {
  // console.log(`key ${key} changed to ${value}`);
  if (key === "notes") getAllNotes();
});

// Set watcher for notes element
_watchNotesElement();
// List all available notes
getAllNotes();
// Set event listeners for elements
setEventListeners();
