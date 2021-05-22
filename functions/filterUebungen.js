/* eslint-disable no-shadow */
import { muskelgruppen, uebungstypen } from '../constants/constants';

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
  muskelgruppeChecked,
  muskelgruppe
) {
  if (muskelgruppeChecked) {
    const filter = result.filter((uebungen) =>
      // replacing the underscore with space as it is in contentful validation
      uebungen.fields.muskelgruppe.includes(muskelgruppe.replace('_', ' '))
    );
    return [...resultMuskelgruppen, ...filter];
  }
  return resultMuskelgruppen;
}

export default function filterUebungen(
  uebungen,
  uebungstypChecked,
  muskelgruppeChecked,
  checkedAllUebungstypen,
  checkedAllMuskelgruppen
) {
  if (checkedAllMuskelgruppen && checkedAllUebungstypen) {
    return uebungen.items;
  }

  let result = [];
  for (const uebungstyp of uebungstypen) {
    result = filterUebungstyp(
      uebungen,
      uebungstypChecked[uebungstyp],
      uebungstyp,
      result
    );
  }

  let resultMuskelgruppen = [];
  for (const muskelgruppe of muskelgruppen) {
    resultMuskelgruppen = filterMuskelgruppe(
      result,
      resultMuskelgruppen,
      muskelgruppeChecked[muskelgruppe],
      muskelgruppe
    );
  }

  return resultMuskelgruppen;
}
