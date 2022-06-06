const Clean = document.querySelector(".Cleanbtn");
const sort = document.querySelector("#Sort");
const DarkMode = document.querySelector(".fa-moon");
const LightMode = document.querySelector(".fa-sun");
const Icon = document.querySelector("#icon");

let Condition = "";
Icon.addEventListener("click", () => {
  document.body.classList.toggle("Lightmode");
  if (document.body.classList.contains("Lightmode")) {
    Condition = "Light";
    localStorage.setItem("Condition", JSON.stringify(Condition));
    Icon.innerHTML = "";
    let i = document.createElement("i");
    i.className = "fas fa-sun";
    Icon.appendChild(i);
  } else {
    Condition = "Dark";
    localStorage.setItem("Condition", JSON.stringify(Condition));
    Icon.innerHTML = "";
    let i = document.createElement("i");
    i.className = "fas fa-moon";
    Icon.appendChild(i);
  }
});

const Get = () => {
  let get = localStorage.getItem("Task");
  return get !== null ? JSON.parse(get) : [];
};

let Task = Get();

const Save = (Task) => {
  localStorage.setItem("Task", JSON.stringify(Task));
};

const Render = (Task) => {
  document.querySelector("#Parent").innerHTML = "";
  document.querySelector("#Parent").appendChild(CreatTask(Task));
};
const style = () => {
  if (Task.length <= 3) {
    Clean.style.opacity = 0;
  } else {
    Clean.style.opacity = 1;
  }
};
const sortvisibility = () => {
  {
    if (Task.length <= 1) {
      sort.style.visibility = "hidden";
    } else {
      sort.style.visibility = "visible";
    }
  }
};

const CreatTask = (task) => {
  const div = document.createElement("div");
  div.className = "row mt-3 px-2";

  task.forEach((item, index) => {
    div.innerHTML += `
      <div class="col-12 col-lg-6 mb-4">
              <div class="coustom">
                <div class="row">
                  <div class="col-12">
                    <div class="coustomHeader ${
                      item.Difficulty
                    } d-flex justify-content-between align-items-center">
                      <p class="text-start mb-0 mx-3 CoustomTitel">
                        ${item.Titel}
                      </p>
                      <p class="text-start mb-0 mx-3 CoustomTitel ${
                        item.Difficulty
                      }">${item.Difficulty}</p>
                    </div>
                  </div>
                </div>
                <div class="row Container">
                  <div class="col-8 d-flex flex-column align-items-start justify-content-end">
                    <div class="row mb-1">
                      <div class="col-12">
                        <p class="p-1 distext">${item.Describe}</p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-12">
                        <p class="text-muted Date small mb-0 p-1">Create ${moment(
                          item.Create
                        ).fromNow()}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-4 d-flex flex-column align-item-center justify-content-center">
                    <div class="row">
                      <div class="col-12 text-center">
                        <button onclick="Remove(${index})" class="btn btn-primary Donebtn p-1"><i class="fa fa-check" aria-hidden="true"></i> Done</button>
    
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
            </div>
  
      `;
  });

  return div;
};

const Remove = (index) => {
  Task.splice(index, 1);
  Save(Task);
  sortvisibility();
  Render(Task);
  style();
};
(() => {
  "use strict";

  const forms = document.querySelectorAll(".needs-validation");

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          form.classList.add("was-validated");
        } else {
          Task.push({
            Titel: event.target.elements.Titel.value,
            Describe: event.target.elements.describe.value,
            Difficulty: event.target.elements.Difficulty.value,
            Create: moment().valueOf(),
          });
          InfoForm.reset();
          Save(Task);
          Render(Task);
          style();

          form.classList.add("was-validated");
        }
      },

      true
    );
  });
})();

sort.addEventListener("change", (e) => {
  const sortMap = {
    Hard: 3,
    Normal: 2,
    Easy: 1,
  };
  if (sort.value === "Hardest") {
    Task.sort((a, b) => sortMap[b.Difficulty] - sortMap[a.Difficulty]);
    Save(Task);
    Render(Task);
  } else if (sort.value === "Easiest") {
    Task.sort((a, b) => sortMap[a.Difficulty] - sortMap[b.Difficulty]);
    Save(Task);
    Render(Task);
  }
});

Clean.addEventListener("click", () => {
  Task = [];
  Save(Task);
  sortvisibility();
  Render(Task);
  style();
});

window.onload = () => {
  Render(Task);
  style();
  sortvisibility();

  let position = localStorage.getItem("Condition");
  if (JSON.parse(position) === "Light") {
    document.body.className += "Lightmode";
    Icon.innerHTML = "";
    let i = document.createElement("i");
    i.className = "fas fa-sun";
    Icon.appendChild(i);
  }
};
