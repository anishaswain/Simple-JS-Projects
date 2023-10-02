import("./tailwind.config").catch((error) => {
  console.log("Failed to load tailwind.config");
  console.log(error);
});
import localStorage, { localStorage } from "reactive-localstorage";
import dayjs from "dayjs";

localStorage.on("change", (key, value) => {
  // console.log(`key ${key} changed to ${value}`);

  if (key === "notes") {
    const notesEl = document.getElementById("notes");
    // notesEl.innerHTML = "";
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    if (notes.length > 0) {
      const note = notes[0];
      notesEl.prepend(createNoteEl(note));
    }
  }
});

// localStorage.setItem(
//   "notes",
//   JSON.stringify({ title: "Hello, World", text: "Somethin" })
// );

document.addEventListener("DOMContentLoaded", function () {
  // List all available notes
  getAllNotes();

  setEventListeners();

  const formEl = document.getElementById("note-form");
  formEl.addEventListener("submit", function (event) {
    event.preventDefault();

    // Elements
    const titleEl = document.getElementById("note-title");
    const textEl = document.getElementById("note-text");

    const id = uuid();
    const title = String(titleEl.value) || "";
    const text = String(textEl.value) || "";

    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.unshift({ id, title, text, datetime: new Date().valueOf() });
    localStorage.setItem("notes", JSON.stringify(notes));

    // Clear form
    titleEl.value = "";
    textEl.value = "";
  });
});

const createNoteEl = ({ id, title, text, datetime }) => {
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
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
    notesEl.prepend(createNoteEl(note));
  }
};

const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const setEventListeners = () => {
  const noteDeleteBtnEls = document.querySelectorAll(
    "button[data-btn='note-delete-btn']"
  );
  const noteEditBtnEls = document.querySelectorAll(
    "button[data-btn='note-edit-btn']"
  );

  noteDeleteBtnEls.forEach((el) => {
    el.addEventListener("click", function (event) {
      event.preventDefault();
      const parentLi = getParentElementByTag(el, "li");
      //   console.log(parentLi);

      const noteId = parentLi.dataset.note;
      const notes = JSON.parse(localStorage.getItem("notes")) || [];
      const note = notes.find((x) => x.id === noteId);
      console.log(note);
    });
  });
};

const getParentElementByTag = (element, tagName = "div") => {
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
