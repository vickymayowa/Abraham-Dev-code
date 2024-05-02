const form = document.getElementById("gradingForm");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission

  const name = document.getElementById("name").value;
  const examNumber = document.getElementById("examNumber").value;
  const centerNumber = document.getElementById("centerNumber").value;

  const subjects = {
    maths: parseInt(document.getElementById("maths").value),
    english: parseInt(document.getElementById("english").value),
    "computer science": parseInt(
      document.getElementById("computerScience").value
    ),
    chemistry: parseInt(document.getElementById("chemistry").value),
    physics: parseInt(document.getElementById("physics").value),
    biology: parseInt(document.getElementById("biology").value),
    civics: parseInt(document.getElementById("civics").value),
    geography: parseInt(document.getElementById("geography").value),
  };

  // Validate and handle potential errors
  let hasError = false;
  for (const subject in subjects) {
    if (
      isNaN(subjects[subject]) ||
      subjects[subject] < 0 ||
      subjects[subject] > 100
    ) {
      hasError = true;
      alert(
        `Invalid score for ${subject}. Please enter a number between 0 and 100.`
      );
      break;
    }
  }

  // Calculate only if there are no errors
  if (!hasError) {
    const totalScore = Object.values(subjects).reduce(
      (acc, subject) => acc + subject,
      0
    );
    const overallPercentage =
      (totalScore /
        Object.values(subjects).reduce((acc, subject) => acc + 100, 0)) *
      100;

    // Display results in the resultDiv element
    resultDiv.innerHTML = `
      --- Grade Summary ---<br>
      Name: ${name}<br>
      Exam Number: ${examNumber}<br>
      Center Number: ${centerNumber}<br><br>
      
      Subject\tScore\tPercentage<br>
      -------\t-------\t----------<br>
    `;

    for (const subject in subjects) {
      const subjectPercentage = (subjects[subject] / 100) * 100;
      resultDiv.innerHTML += `${subject}:\t${
        subjects[subject]
      }\t${subjectPercentage.toFixed(2)}%<br>`;
    }

    resultDiv.innerHTML += `\nOverall Percentage: ${overallPercentage.toFixed(
      2
    )}%`;
  }
});
