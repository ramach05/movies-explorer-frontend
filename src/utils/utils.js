export function getAge(dateString) {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
    let titleAge = "года";
    const remainsOfAge = age % 10;

    if ((remainsOfAge >= 5 && remainsOfAge <= 9) || remainsOfAge === 0) {
      titleAge = "лет";
      return age + " " + titleAge;
    } else if (remainsOfAge === 1) {
      titleAge = "год";
      return age + " " + titleAge;
    }
    return age + " " + titleAge;
  }
  return undefined;
}
