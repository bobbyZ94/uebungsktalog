/* eslint-disable array-callback-return */
export default function filterAndUnionUebungsnameAndTags(uebungen, keyword) {
  const resultUebungsname = uebungen.filter((uebung) =>
    uebung.fields.uebungsname.toLowerCase().includes(keyword.toLowerCase())
  );
  const resultUebungstyp = uebungen.filter((uebung) =>
    uebung.fields.uebungstyp.toLowerCase().includes(keyword.toLowerCase())
  );
  const resultTags = uebungen.filter((uebung) => {
    for (let i = 0; i < uebung.fields.tags.length; i += 1) {
      if (uebung.fields.tags[i].toLowerCase().includes(keyword.toLowerCase())) {
        return true;
      }
    }
  });
  const resultMuskelgruppen = uebungen.filter((uebung) => {
    for (let i = 0; i < uebung.fields.muskelgruppe.length; i += 1) {
      if (
        uebung.fields.muskelgruppe[i]
          .toLowerCase()
          .includes(keyword.toLowerCase())
      ) {
        return true;
      }
    }
  });
  const union = [
    ...new Set([
      ...resultUebungsname,
      ...resultTags,
      ...resultUebungstyp,
      ...resultMuskelgruppen,
    ]),
  ];
  return union;
}
