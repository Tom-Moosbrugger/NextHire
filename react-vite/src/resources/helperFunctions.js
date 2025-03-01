export const validateEmail = (email) => {
  let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

export const isValidURL = (string) => {
  const urlPattern = new RegExp(
    "^[a-z]+://" +
      "(?<host>[^/?:]+)" +
      "(?<port>:[0-9]+)?" +
      "(?<path>/.*?)?" +
      "(?<query>\\?.*)?$"
  );
  return urlPattern.test(string);
};

export const validateApplicationInputs = (
  companyName,
  companyWebsite,
  jobTitle,
  jobPostUrl,
  applicationDeadline
) => {
  const validationErrors = {};

  if (!companyName) {
    validationErrors.companyName = "Company name is required";
  } else if (companyName.length > 80) {
    validationErrors.companyName =
      "Company name cannot be longer than 80 characters";
  }

  if (companyWebsite.length > 2083) {
    validationErrors.companyWebsite =
      "Company website cannot be longer than 2083 characters";
  } else if (companyWebsite && !isValidURL(companyWebsite)) {
    validationErrors.companyWebsite = "Company website must be a valid url";
  }

  if (!jobTitle) {
    validationErrors.jobTitle = "Job title is required";
  } else if (jobTitle.length > 80) {
    validationErrors.jobTitle = "Job title cannot be longer than 80 characters";
  }

  if (jobPostUrl.length > 2083) {
    validationErrors.jobPostUrl =
      "Job post link cannot be longer than 2083 characters";
  } else if (jobPostUrl && !isValidURL(jobPostUrl)) {
    validationErrors.jobPostUrl = "Job post link must be a valid url";
  }

  if (!applicationDeadline)
    validationErrors.applicationDeadline = "Application deadline is required";

  return validationErrors;
};

export const validateCommonQuestionInputs = (question, response) => {
  const validationErrors = {};

  if (!question) {
    validationErrors.question = "Question is required";
  } else if (question.length > 0 && question.length < 10) {
    validationErrors.question = "Question cannot be less than 10 characters";
  } else if (question.length > 500) {
    validationErrors.question = "Question cannot be longer than 500 characters";
  }

  if (!response) validationErrors.response = "Response is required";

  return validationErrors;
};
