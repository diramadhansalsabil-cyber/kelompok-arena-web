const members = [
  {
    name: "DANIL",
    asset: "assets/members/danil.png",
    avatarPosition: "52% 22%",
    cardPosition: "52% 20%",
  },
  {
    name: "Salsabil Diramadhan",
    asset: "assets/members/salsabil.png",
    avatarPosition: "58% 15%",
    cardPosition: "58% 14%",
  },
  {
    name: "Ahmad Faozi",
    asset: "assets/members/ahmad.png",
    avatarPosition: "52% 16%",
    cardPosition: "52% 15%",
  },
  {
    name: "Kemal Hidayat",
    asset: "assets/members/kemal.png",
    avatarPosition: "50% 24%",
    cardPosition: "50% 22%",
  },
  {
    name: "Nathasya Dwinovitha",
    asset: "assets/members/natasya.png",
    avatarPosition: "48% 26%",
    cardPosition: "48% 24%",
  },
  {
    name: "Pelis Saputri",
    asset: "assets/members/pelis.png",
    avatarPosition: "50% 48%",
    cardPosition: "50% 46%",
  },
];

const welcomePage = document.getElementById("welcome");
const membersPage = document.getElementById("members");
const avatarRow = document.getElementById("avatar-row");
const memberList = document.getElementById("member-list");
const infoBtn = document.getElementById("info-btn");
const backBtn = document.getElementById("back-btn");

let selected = 0;

function firstName(fullName) {
  return fullName.split(" ")[0];
}

function showMembers() {
  welcomePage.classList.add("is-hidden");
  membersPage.classList.remove("is-hidden");
  window.scrollTo(0, 0);
}

function showWelcome() {
  membersPage.classList.add("is-hidden");
  welcomePage.classList.remove("is-hidden");
  window.scrollTo(0, 0);
}

function setSelected(index) {
  selected = index;
  document.querySelectorAll(".avatar").forEach((el, i) => {
    el.classList.toggle("is-selected", i === selected);
    el.setAttribute("aria-selected", i === selected ? "true" : "false");
  });
  document.querySelectorAll(".member-card").forEach((el, i) => {
    el.classList.toggle("is-selected", i === selected);
  });
}

function render() {
  avatarRow.innerHTML = members
    .map(
      (member, index) => `
      <button
        class="avatar${index === selected ? " is-selected" : ""}"
        type="button"
        role="tab"
        aria-selected="${index === selected}"
        data-index="${index}"
      >
        <span class="avatar__ring">
          <img
            src="${member.asset}"
            alt="${member.name}"
            style="object-position: ${member.avatarPosition}"
          />
        </span>
        <span class="avatar__name">${firstName(member.name)}</span>
      </button>
    `
    )
    .join("");

  memberList.innerHTML = members
    .map(
      (member, index) => `
      <article
        class="member-card${index === selected ? " is-selected" : ""}"
        role="listitem"
        data-index="${index}"
        tabindex="0"
      >
        <h3 class="member-card__name">${member.name}</h3>
        <div class="member-card__media" aria-hidden="true">
          <img
            src="${member.asset}"
            alt=""
            style="object-position: ${member.cardPosition}"
          />
        </div>
      </article>
    `
    )
    .join("");
}

avatarRow.addEventListener("click", (event) => {
  const button = event.target.closest(".avatar");
  if (!button) return;
  setSelected(Number(button.dataset.index));
});

memberList.addEventListener("click", (event) => {
  const card = event.target.closest(".member-card");
  if (!card) return;
  setSelected(Number(card.dataset.index));
});

memberList.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const card = event.target.closest(".member-card");
  if (!card) return;
  event.preventDefault();
  setSelected(Number(card.dataset.index));
});

infoBtn.addEventListener("click", showMembers);
backBtn.addEventListener("click", showWelcome);

render();
