function adjustLength(item) {
  const ignore = [
    "the",
    "of",
    "in",
    "from",
    "by",
    "with",
    "and",
    "or",
    "for",
    "to",
    "at",
    "a"
  ];
  const len = item.length;
  if (len > 30) {
    item = item
      .split("-")
      .filter(item => !ignore.includes(item))
      .reduce((acc, item) => acc + item[0], "");
  }
  return item.split("-").join(" ");
}

function generateBC(url, separator) {
  url = url
    .trim()
    .replace(/https*:\/\//i, "")
    .replace(/(\.\w+[?#=][\w-=&+_\/\.,'"\[\]\{\}<>\`~|]+)|([#?].+)/gi, "");

  let final = "";
  let sections = url
    .split("/")
    .map(item => item.trim())
    .filter(
      (item, i, list) =>
        item !== "" || (i === list.length - 1 && !item.includes("index"))
    );

  if (sections.length > 1) {
    for (let i = 0; i < sections.length; i++) {
      let current = sections[i];
      let displayName;

      // ROOT
      if (i === 0) {
        final += '<a href="/">HOME</a>';

        // LAST ELEMENT
      } else if (i === sections.length - 1) {
        let pageName = adjustLength(current.split(".")[0]);
        final +=
          separator +
          '<span class="active">' +
          pageName.toUpperCase() +
          "</span>";

        // ALL OTHERS
      } else {
        displayName = adjustLength(current);
        let paths = [];
        for (let j = 1; j <= i; j++) {
          paths.push(sections[j]);
        }

        let path = "/" + paths.join("/") + "/";
        final +=
          separator +
          '<a href="' +
          path +
          '">' +
          displayName.toUpperCase() +
          "</a>";
      }
    }
  } else {
    final += '<span class="active">HOME</span>';
  }

  return final;
}

function adjustLength(item) {
  const ignore = [
    "the",
    "of",
    "in",
    "from",
    "by",
    "with",
    "and",
    "or",
    "for",
    "to",
    "at",
    "a"
  ];
  if (item.length > 30) {
    item = item
      .split("-")
      .filter(item => !ignore.includes(item))
      .reduce((acc, item) => acc + item[0], "");
  }
  return item.split("-").join(" ");
}

function generateBC(url, separator) {
  url = url
    .trim()
    .replace(/https*:\/\//i, "")
    .replace(/(\.\w+[?#=][\w-=&+_\/\.,'"\[\]\{\}<>\`~|]+)|([#?].+)/gi, "");

  let final = "";
  let sections = url
    .split("/")
    .map(item => item.trim())
    .filter((item, i, list) =>
      i === list.length - 1
        ? !item.includes("index") && item !== ""
        : item !== ""
    );

  if (sections.length > 1) {
    for (let i = 0; i < sections.length; i++) {
      let current = sections[i];
      let displayName;

      // ROOT
      if (i === 0) {
        final += '<a href="/">HOME</a>';

        // LAST ELEMENT
      } else if (i === sections.length - 1) {
        let pageName = adjustLength(current.split(".")[0]);
        final +=
          separator +
          '<span class="active">' +
          pageName.toUpperCase() +
          "</span>";

        // ALL OTHERS
      } else {
        displayName = adjustLength(current);
        let paths = [];
        for (let j = 1; j <= i; j++) {
          paths.push(sections[j]);
        }

        let path = "/" + paths.join("/") + "/";
        final +=
          separator +
          '<a href="' +
          path +
          '">' +
          displayName.toUpperCase() +
          "</a>";
      }
    }
  } else {
    final += '<span class="active">HOME</span>';
  }

  return final;
}
