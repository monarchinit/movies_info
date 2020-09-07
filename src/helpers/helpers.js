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

export const agregateTextFromDoc = (arr, outputArr) => {
  arr.map((e) => {
    const el = e.split(":");
    if (el[0] in outputArr[outputArr.length - 1]) {
      outputArr.push({});
    }
    const obj = outputArr[outputArr.length - 1];
    if (
      el[0] === "Title" ||
      el[0] === "Release Year" ||
      el[0] === "Format" ||
      el[0] === "Stars"
    ) {
      obj[el[0]] = el[1].trim();
      if (el[2]) {
        obj[el[0]] = obj[el[0]] + el[2];
      }
      return obj;
    } else {
      return obj;
    }
  });
};

export const getReadyForReguestMovies = (arrMovies) =>
  arrMovies
    .map(function (e) {
      if (!e.Title) {
        return undefined;
      }
      return {
        title: e["Title"].trim(),
        year: e["Release Year"].trim(),
        format: e["Format"].trim(),
        stars: e["Stars"].split(", "),
      };
    })
    .filter((e) => !!e?.title);
