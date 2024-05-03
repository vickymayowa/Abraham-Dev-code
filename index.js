// Get the form and result div elements
const form = document.getElementById("gradingForm");
const resultDiv = document.getElementById("result");

// Add a submit event listener to the form
form.addEventListener("submit", function (event) {
  // Prevent the default form submission
  event.preventDefault();

  // Get values from form inputs
  const name = document.getElementById("name").value;
  const examNumber = document.getElementById("examNumber").value;
  const centerNumber = document.getElementById("centerNumber").value;

  // Create an object to store subject scores
  const subjects = {
    maths: document.getElementById("maths").value.trim(),
    english: document.getElementById("english").value.trim(),
    "computer science": document.getElementById("computerScience").value.trim(),
    chemistry: document.getElementById("chemistry").value.trim(),
    physics: document.getElementById("physics").value.trim(),
    biology: document.getElementById("biology").value.trim(),
    civics: document.getElementById("civics").value.trim(),
    geography: document.getElementById("geography").value.trim(),
  };

  // Validate subject scores
  let hasError = false;
  for (const subject in subjects) {
    if (
      subjects[subject] === "" ||
      isNaN(subjects[subject]) ||
      parseInt(subjects[subject]) < 0 ||
      parseInt(subjects[subject]) > 100
    ) {
      hasError = true;
      alert(
        `Invalid score for ${subject}. Please enter a number between 0 and 100.`
      );
      break;
    }
  }

  // Calculate and display results if there are no errors
  if (!hasError) {
    let totalScore = 0;
    let subjectCount = 0;

    // Calculate total score and count of subjects
    for (const subject in subjects) {
      totalScore += parseInt(subjects[subject]);
      subjectCount++;
    }

    // Calculate overall percentage
    const overallPercentage = (totalScore / (subjectCount * 100)) * 100;

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
      const subjectPercentage = (parseInt(subjects[subject]) / 100) * 100;
      resultDiv.innerHTML += `${subject}:\t${parseInt(
        subjects[subject]
      )}\t${subjectPercentage.toFixed(2)}%<br>`;
    }

    resultDiv.innerHTML += `\nOverall Percentage: ${overallPercentage.toFixed(
      2
    )}%`;
  }
});
