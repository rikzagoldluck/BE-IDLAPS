const dbPool = require("../config/database");

const getAllRiders = () => {
  const SQLQuery = "SELECT * FROM riders";

  return dbPool.execute(SQLQuery);
};

const createNewRider = (body) => {
  const SQLQuery = `  INSERT INTO riders 
                        (name, age, nationality, team_name, bib, vci_num, id_b, mac_no, note, note_1, run_lap, lap_no, run) 
                    VALUES ('${body.name}', ${body.age}, '${body.nationality}', '${body.team_name}', '${body.bib}', '${body.vci_num}', ${body.id_b}, '${body.mac_no}', '${body.note}','${body.note_1}', ${body.run_lap}, ${body.lap_no}, ${body.run})`;

  return dbPool.execute(SQLQuery);
};

const updateRider = (body, idRider) => {
  const SQLQuery = `UPDATE riders 
                    SET name='${body.name}', age=${body.age}, nationality='${body.nationality}', team_name='${body.team_name}', bib='${body.bib}', vci_num='${body.vci_num}', id_b=${body.id_b}, mac_no='${body.mac_no}', note='${body.note}',note_1='${body.note_1}', run_lap=${body.run_lap}, lap_no=${body.lap_no}, run=${body.run}
                    WHERE id=${idRider}`;

  return dbPool.execute(SQLQuery);
};

const deleteRider = (idRider) => {
  const SQLQuery = `DELETE FROM riders WHERE id=${idRider}`;

  return dbPool.execute(SQLQuery);
};

module.exports = {
  getAllRiders,
  createNewRider,
  updateRider,
  deleteRider,
};
