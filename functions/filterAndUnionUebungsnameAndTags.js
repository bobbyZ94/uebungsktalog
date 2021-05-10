export default function filterAndUnionUebungsnameAndTags(uebungen, keyword) {
  // if (!uebungen) {
  //   return;
  // }
  const resultUebungsname = uebungen.filter((uebung) =>
    uebung.fields.uebungsname.toLowerCase().includes(keyword.toLowerCase())
  );
  // eslint-disable-next-line array-callback-return
  const resultTags = uebungen.filter((uebung) => {
    for (let i = 0; i < uebung.fields.tags.length; i += 1) {
      if (uebung.fields.tags[i].toLowerCase().includes(keyword.toLowerCase())) {
        return true;
      }
    }
  });
  const union = [...new Set([...resultUebungsname, ...resultTags])];
  return union;
}
