export const getSumm = (formFieldData: FormDataEntryValue | null) => {
  if (formFieldData) {
    const formFieldDataStr = formFieldData.toString();
    const formFieldDataNum = Number(formFieldDataStr);
    if (!isNaN(formFieldDataNum)) {
      return formFieldDataNum;
    }
  }
  return undefined;
};
