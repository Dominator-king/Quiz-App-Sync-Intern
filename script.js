let ansShown = false;

fetch("https://the-trivia-api.com/v2/questions?limit=5")
  .then((res) => res.json())
  .then((data) => {
    let i = 0;
    let count = 0;
    function shufflearr(arr) {
      for (let i = arr.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }

    let answers;

    answers = data.map((obj) => {
      let unshuffled = [obj.correctAnswer, ...obj.incorrectAnswers];
      shufflearr(unshuffled);
      return unshuffled;
    });
    function display() {
      if (i == data.length) {
        const resetButton = document.createElement("button");
        resetButton.className += " p-3 rounded-md ";
        resetButton.textContent = "Play Again";
        document.getElementById(
          "question"
        ).textContent = `You Scored ${count} out of ${data.length}`;
        document.getElementById("answerArea").innerHTML = "";
        document.getElementById("answerArea").appendChild(resetButton);
      } else {
        document.getElementById("q-no").textContent = `${i + 1}: ${
          data[i].question.text
        }`;

        answers[i].forEach((answer, j) => {
          let labelOpt = document.createElement("label");
          labelOpt.id = j + "label";
          const radio = document.createElement("input");
          radio.type = "radio";
          radio.name = "quiz";
          radio.value = answer;
          radio.onchange = (e) => {
            Array.from(document.getElementsByClassName("option-label")).forEach(
              (item) =>
                item.textContent == e.target.value
                  ? (item.className =
                      "option-label m-2 p-2 text-xl mx-auto  rounded-sm w-auto bg-grey-500 bg-blue-100 shadow-lg")
                  : (item.className =
                      "option-label m-2 p-2 text-xl mx-auto  rounded-sm w-auto bg-grey-500 ")
            );
          };
          radio.id = answer == data[i].correctAnswer ? "correct" : "incorrect";
          radio.className = " opacity-0 w-0 h-0 absolute  inset-full";
          labelOpt.className =
            " option-label m-2 p-2 text-xl mx-auto  rounded-sm w-auto bg-grey-500 ";
          labelOpt.textContent = answer;
          labelOpt.appendChild(radio);
          document.getElementById("answerArea").appendChild(labelOpt);
        });
      }
    }
    display();

    function cllckEvent(e) {
      e.preventDefault();
      const selected = document.querySelector(
        'input[name="quiz"]:checked'
      ).parentElement;
      const correct = document.getElementById("correct").parentElement;
      if (!ansShown) {
        document
          .getElementsByName("quiz")
          .forEach((item) => item.setAttribute("disabled", true));
        correct.className += " text-green-700";
        document.getElementById("button").textContent = "Show Next Question";
        console.log(correct, selected);

        if (selected.textContent == data[i].correctAnswer) {
          count++;
          selected.className += " text-green-700";
        } else {
          selected.className += " text-red-700";
        }
        ansShown = true;
      } else {
        i++;
        document.getElementById("q-no").textContent = "";
        while (document.getElementById("answerArea").childNodes.length > 2) {
          document
            .getElementById("answerArea")
            .removeChild(document.getElementById("answerArea").lastChild);
        }
        display();
        ansShown = false;
        if (document.getElementById("button"))
          document.getElementById("button").textContent = "Show Correct Answer";
      }
    }

    document.getElementById("button").addEventListener("click", cllckEvent);
  })
  .catch((err) => console.log(err));
