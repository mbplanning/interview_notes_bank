/* Add one object per interview page. Keep href pointed at that page.
   On import, set date from the source when a date is stated. Leave date ""
   when the source does not give one; the page then shows an empty date field. */
window.INTERVIEWS = [
  {
    id: "tulba",
    title: "Meeting with CM Tulba",
    date: "Dec 2025",
    href: "board.html",
    noteCount: 27,
    idPrefix: "tulba",
    source: "notes/CM Tulba DPP .docx"
  },
  {
    id: "bws",
    title: "BWS",
    date: "",
    href: "BWS_index.html",
    noteCount: 26,
    idPrefix: "bws",
    source: "notes/BWS .docx"
  }
];

window.INTERVIEW_DATE_KEY = "interview-dates-v1";

function readDateOverrides() {
  try {
    const parsed = JSON.parse(localStorage.getItem(window.INTERVIEW_DATE_KEY) || "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (e) {
    return {};
  }
}

window.interviewDate = function (id) {
  const item = (window.INTERVIEWS || []).find(function (row) { return row.id === id; });
  const overrides = readDateOverrides();
  if (Object.prototype.hasOwnProperty.call(overrides, id)) return overrides[id];
  return item && item.date ? item.date : "";
};

window.saveInterviewDate = function (id, value) {
  const overrides = readDateOverrides();
  overrides[id] = value;
  localStorage.setItem(window.INTERVIEW_DATE_KEY, JSON.stringify(overrides));
};
