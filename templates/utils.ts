import { MenuSection, OpeningHours } from "@/lib/types";

const DAY_LABELS: Record<string, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

export function renderHours(hours: OpeningHours, mode: "ul" | "table" | "div" = "ul"): string {
  const days = Object.keys(DAY_LABELS) as (keyof OpeningHours)[];
  const entries = days.filter((d) => hours[d]);
  if (!entries.length) return "";

  if (mode === "table") {
    return entries
      .map(
        (d) => `<tr><td>${DAY_LABELS[d]}</td><td>${hours[d]}</td></tr>`
      )
      .join("");
  }
  if (mode === "div") {
    return entries
      .map(
        (d) =>
          `<div class="hour-row"><span>${DAY_LABELS[d]}</span><span>${hours[d]}</span></div>`
      )
      .join("");
  }
  // default: ul li
  return entries
    .map(
      (d) =>
        `<li><span>${DAY_LABELS[d]}</span><span>${hours[d]}</span></li>`
    )
    .join("");
}

export function renderMenu(sections: MenuSection[]): string {
  return sections
    .map(
      (section) => `
    <div class="menu-section">
      <h3>${section.name}</h3>
      ${section.items
        .map(
          (item) => `
        <div class="menu-item">
          <div class="menu-item-info">
            <h4>${item.name}</h4>
            ${item.description ? `<p>${item.description}</p>` : ""}
          </div>
          ${item.price ? `<span class="menu-item-price">${item.price}</span>` : ""}
        </div>`
        )
        .join("")}
    </div>`
    )
    .join("");
}
