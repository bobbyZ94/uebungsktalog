<div className="xl:place-self-center mb-5 xl:mb-0">
          <div className="lg:mr-5 mr-0 text-gray-50 bg-red-600 flex flex-col items-center justify-center gap-5 p-4">
            <div>
              <span className="font-semibold mr-2">Übungstyp:</span>
              <select
                className="text-gray-900 w-44 h-9 border-none focus:outline-none appearance-none"
                value={uebungstyp}
                onChange={(e) => setUebungstyp(e.target.value)}
              >
                <option value="Alle">Alle Übungstypen</option>
                <option value="Frei">Frei</option>
                <option value="Freihantel">Freihantel</option>
                <option value="Maschine">Maschine</option>
                <option value="Cardio">Cardio</option>
              </select>
            </div>

            <div>
              <span className="font-semibold mr-2">Muskelgruppe:</span>
              <div>
                <input
                  className="form-checkbox text-gray-50 h-4 w-4 align-middle"
                  name="Beine"
                  type="checkbox"
                  checked={checked.Beine}
                  onChange={() => toggleCheck('Beine')}
                />
                <lable className="ml-1 align-middle">Beine</lable>
              </div>

              <div>
                <input
                  className="form-checkbox text-gray-50 h-4 w-4 align-middle"
                  name="Bauch"
                  type="checkbox"
                  checked={checked.Bauch}
                  onChange={() => toggleCheck('Bauch')}
                />
                <lable className="ml-1 align-middle">Bauch</lable>
              </div>

              <div>
                <input
                  className="form-checkbox text-gray-50 h-4 w-4 align-middle"
                  name="Rücken"
                  type="checkbox"
                  checked={checked.Ruecken}
                  onChange={() => toggleCheck('Ruecken')}
                />
                <lable className="ml-1 align-middle">Rücken</lable>
              </div>

              <div>
                <input
                  className="form-checkbox text-gray-50 h-4 w-4 align-middle"
                  name="Brust"
                  type="checkbox"
                  checked={checked.Brust}
                  onChange={() => toggleCheck('Brust')}
                />
                <lable className="ml-1 align-middle">Brust</lable>
              </div>

              <div>
                <input
                  className="form-checkbox text-gray-50 h-4 w-4 align-middle"
                  name="Schultern"
                  type="checkbox"
                  checked={checked.Schultern}
                  onChange={() => toggleCheck('Schultern')}
                />
                <lable className="ml-1 align-middle">Schultern</lable>
              </div>

              <div>
                <input
                  className="form-checkbox text-gray-50 h-4 w-4 align-middle"
                  name="Arme"
                  type="checkbox"
                  checked={checked.Arme}
                  onChange={() => toggleCheck('Arme')}
                />
                <lable className="ml-1 align-middle">Arme</lable>
              </div>

              <div>
                <input
                  className="form-checkbox text-gray-50 h-4 w-4 align-middle"
                  name="alle"
                  type="checkbox"
                  checked={checkedAll}
                  onChange={(e) => selectAll(e.target.checked)}
                />
                <lable className="ml-1 align-middle">Alle Muskelgruppen</lable>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full place-self-center col-span-3">
          <TabelAndSearchbox uebungen={filterUebungen(uebungen)} />
        </div>






<div>
                  <input
                    className="form-checkbox text-gray-50 h-4 w-4 align-middle"
                    name="Beine"
                    type="checkbox"
                    checked={checked.Beine}
                    onChange={() => toggleCheck('Beine')}
                  />
                  <lable className="ml-1 align-middle">Beine</lable>
                </div>

                <div>
                  <input
                    className="form-checkbox text-gray-50 h-4 w-4 align-middle"
                    name="Bauch"
                    type="checkbox"
                    checked={checked.Bauch}
                    onChange={() => toggleCheck('Bauch')}
                  />
                  <lable className="ml-1 align-middle">Bauch</lable>
                </div>

                <div>
                  <input
                    className="form-checkbox text-gray-50 h-4 w-4 align-middle"
                    name="Rücken"
                    type="checkbox"
                    checked={checked.Ruecken}
                    onChange={() => toggleCheck('Ruecken')}
                  />
                  <lable className="ml-1 align-middle">Rücken</lable>
                </div>

                <div>
                  <input
                    className="form-checkbox text-gray-50 h-4 w-4 align-middle"
                    name="Brust"
                    type="checkbox"
                    checked={checked.Brust}
                    onChange={() => toggleCheck('Brust')}
                  />
                  <lable className="ml-1 align-middle">Brust</lable>
                </div>

                <div>
                  <input
                    className="form-checkbox text-gray-50 h-4 w-4 align-middle"
                    name="Schultern"
                    type="checkbox"
                    checked={checked.Schultern}
                    onChange={() => toggleCheck('Schultern')}
                  />
                  <lable className="ml-1 align-middle">Schultern</lable>
                </div>

                <div>
                  <input
                    className="form-checkbox text-gray-50 h-4 w-4 align-middle"
                    name="Arme"
                    type="checkbox"
                    checked={checked.Arme}
                    onChange={() => toggleCheck('Arme')}
                  />
                  <lable className="ml-1 align-middle">Arme</lable>
                </div>

                <div className="col-span-3 text-center">
                  <input
                    className="form-checkbox text-gray-50 h-4 w-4 align-middle"
                    name="alle"
                    type="checkbox"
                    checked={checkedAll}
                    onChange={(e) => selectAll(e.target.checked)}
                  />
                  <lable className="ml-1 align-middle">
                    Alle Muskelgruppen
                  </lable>
                </div>