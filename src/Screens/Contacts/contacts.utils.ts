function onlyUnique(value: string, index: number, self: string[]) {
  return self.indexOf(value) === index && value !== 'name';
}

export const extractPhoneNumber = (contact: any) => {
  return contact.phoneNumbers.map((p: any) => parseNumber(p.number))[0];
};

export const getPreferredPhoneType = (contact: any) => {
  if (contact.mobilePhone) return 'mobilePhone';
  if (contact.businessPhones && contact.businessPhones.length > 0)
    return 'businessPhones';
  if (contact.homePhones && contact.homePhones.length > 0) return 'homePhones';
  return 'none';
};

export const parseNumber = (number: string) => {
  return number.replace(/[^0-9]*/g, '');
};

export const formatNumber = (number: string) => {
  if (number.length === 10)
    return `(${number.substr(0, 3)}) ${number.substr(3, 3)} - ${number.substr(
      6,
    )}`;
  else
    return `+${number.charAt(0)} (${number.substr(1, 3)}) ${number.substr(
      4,
      3,
    )} - ${number.substr(7)}`;
};

export const makeName = (contact: any) => {
  if (contact.givenName && contact.familyName)
    return `${contact.givenName} ${contact.familyName}`;
  if (contact.givenName) return `${contact.givenName}`;
  if (contact.familyName) return `${contact.familyName}`;
  return '';
};

export const makeDescription = (contact: any) => {
  let number = extractPhoneNumber(contact);
  if (number) {
    number = formatNumber(parseNumber(number));
  } else {
    number = 'No number found';
  }

  return number;
};

export const getPhoneNumbers = (appleData: any): string[] => {
  const { phoneNumbers } = appleData;

  return phoneNumbers
    .map((p: any) => p.number)
    .filter((n: string) => n)
    .map((n: string) => parseNumber(n))
    .map((n: string) => (n.length === 11 ? n.substr(1) : n))
    .filter(onlyUnique);
};
