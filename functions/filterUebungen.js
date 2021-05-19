/* eslint-disable no-shadow */
function filterUebungstyp(uebungen, uebungstypChecked, uebungstyp, result) {
  if (uebungstypChecked) {
    const filter = uebungen.items.filter(
      (uebungen) => uebungen.fields.uebungstyp === uebungstyp
    );
    return [...result, ...filter];
  }
  return result;
}

function filterMuskelgruppe(
  result,
  resultMuskelgruppen,
  checked,
  muskelgruppe
) {
  if (checked) {
    const filter = result.filter((uebungen) =>
      uebungen.fields.muskelgruppe.includes(muskelgruppe)
    );
    return [...resultMuskelgruppen, ...filter];
  }
  return resultMuskelgruppen;
}

export default function filterUebungen(
  uebungen,
  uebungstypChecked,
  checked,
  checkedAll
) {
  if (
    checkedAll &&
    uebungstypChecked.Frei &&
    uebungstypChecked.Cardio &&
    uebungstypChecked.Freihantel &&
    uebungstypChecked.Maschine
  ) {
    return uebungen.items;
  }

  let result = [];
  const uebungstypen = ['Frei', 'Freihantel', 'Maschine', 'Cardio'];
  for (const uebungstyp of uebungstypen) {
    result = filterUebungstyp(
      uebungen,
      uebungstypChecked[uebungstyp],
      uebungstyp,
      result
    );
  }

  let resultMuskelgruppen = [];
  const muskelgruppen = [
    'Beine',
    'Bauch',
    'Ruecken',
    'Brust',
    'Schultern',
    'Arme',
  ];
  for (const muskelgruppe of muskelgruppen) {
    resultMuskelgruppen = filterMuskelgruppe(
      result,
      resultMuskelgruppen,
      checked[muskelgruppe],
      muskelgruppe
    );
  }

  return resultMuskelgruppen;
}
