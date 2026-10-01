/* Add one object per interview page. Keep href pointed at that page.
   On import, set date from the source when a date is stated, and show that
   date on the page. Leave date "" when the source does not give one.
   Do not put interviewee or participant names on the page. */
window.INTERVIEWS = [
  {
    id: "tulba",
    title: "CM Tulba",
    date: "Dec 2025",
    href: "tulba_index.html",
    storageKey: "tulba-buckets-v1",
    noteCount: 26,
    idPrefix: "tulba",
    source: "notes/CM Tulba DPP .docx"
  },
  {
    id: "bws",
    title: "BWS",
    date: "Nov 25",
    href: "BWS_index.html",
    storageKey: "bws-buckets-v3",
    noteCount: 26,
    idPrefix: "bws",
    source: "notes/BWS .docx"
  },
  {
    id: "dem",
    title: "DEM",
    date: "Nov 6, 2026",
    href: "DEM_index.html",
    storageKey: "dem-buckets-v1",
    noteCount: 32,
    idPrefix: "dem",
    source: "notes/DEM .docx"
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

window.INTERVIEW_ANALYSIS_KEY = "interview-analysis-v1";

function readAnalysisSelection() {
  try {
    const parsed = JSON.parse(localStorage.getItem(window.INTERVIEW_ANALYSIS_KEY) || "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (e) {
    return {};
  }
}

window.interviewIncluded = function (id) {
  const saved = readAnalysisSelection();
  if (Object.prototype.hasOwnProperty.call(saved, id)) return !!saved[id];
  return true;
};

window.saveInterviewIncluded = function (id, included) {
  const saved = readAnalysisSelection();
  saved[id] = !!included;
  localStorage.setItem(window.INTERVIEW_ANALYSIS_KEY, JSON.stringify(saved));
};

window.interviewsForAnalysis = function () {
  return (window.INTERVIEWS || []).filter(function (item) {
    return window.interviewIncluded(item.id);
  });
};
