export const getFormData = (form) => {
  const formElements = Array.from(form).filter((el) =>
    /input|select|textarea/i.test(el.nodeName)
  );
  const result = formElements.reduce((acc, e) => {
    if (e.id === "star") {
      if (!acc["stars"]) {
        acc["stars"] = [];
      }
      acc["stars"].push(e.value);
    } else {
      acc[e.id] = e.value;
    }
    return acc;
  }, {});
  return result;
};
