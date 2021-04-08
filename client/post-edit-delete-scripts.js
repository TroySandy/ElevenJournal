// post journal
function postJournal() {
  // console.log(`postJournal function called`);
  const accessToken = localStorage.getItem("sessionToken");
  let title = document.getElementById("title").value;
  let date = document.getElementById("date").value;
  let entry = document.getElementById("entry").value;

  let newEntry = {
    journal: {
      title: title,
      date: date,
      entry: entry,
    },
  };
  fetch(`http://localhost:3005/journal/create`, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    }),
    body: JSON.stringify(newEntry),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      displayMine();
    })
    .catch((err) => {
      console.log(err);
    });
}

// update journal
function editJournal(postId) {
  // console.log("a", postId);

  const fetch_url = `http://localhost:3005/journal/update/${postId}`;
  const accessToken = localStorage.getItem("sessionToken");

  let card = document.getElementById(postId);
  let input = document.createElement("input");

  if (card.childNodes.length < 2) {
    card.appendChild(input);
    input.setAttribute("type", "text");
    input.setAttribute("id", "updatedEntry");
    input.setAttribute("placeholder", "Edit your journal entry");
  } else {
    let updated = document.getElementById("updatedEntry").value;
    let newEntry = {
      journal: {
        entry: updated,
      },
    };
    fetch(fetch_url, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      }),
      body: JSON.stringify(newEntry),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        displayMine();
      })
      .catch((err) => {
        console.log(err);
      });
    card.removeChild(card.lastChild);
  }
}

// delete journal
function deleteJournal(postId) {
  // console.log(`deleteJournal function called`);
  const fetch_url = `http://localhost:3005/journal/delete/${postId}`;
  const accessToken = localStorage.getItem("sessionToken");

  fetch(fetch_url, {
    method: "DELETE",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      displayMine();
    })
    .catch((err) => {
      console.log(err);
    });

}
