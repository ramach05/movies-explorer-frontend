import HeaderLogo from '../images/svg/header-logo.svg';

export { HeaderLogo };

export function getAge(dateString) {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();

  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
    let titleAge = 'года';
    const remainsOfAge = age % 10;

    if ((remainsOfAge >= 5 && remainsOfAge <= 9) || remainsOfAge === 0) {
      titleAge = 'лет';
      return `${age} ${titleAge}`;
    } if (remainsOfAge === 1) {
      titleAge = 'год';
      return `${age} ${titleAge}`;
    }
    return `${age} ${titleAge}`;
  }
  return undefined;
}
