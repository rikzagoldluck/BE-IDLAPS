const dbPool = require("../config/database");

const getAllCategories = () => {
  const SQLQuery = "SELECT * FROM categories";

  return dbPool.execute(SQLQuery);
};

const createNewCategory = (body) => {
  const SQLQuery = `  INSERT INTO categories 
                        (name, description, start_time, end_time, sex, distance, lap, run, event_id) 
                    VALUES ('${body.name}', '${body.desc}', TIME'${body.start_time}', TIME'${body.end_time}', '${body.sex}', ${body.distance}, ${body.lap}, ${body.run}, ${body.event_id})`;

  return dbPool.execute(SQLQuery);
};

const updateCategory = (body, idCategory) => {
  const SQLQuery = `UPDATE categories 
                    SET name='${body.name}', description='${body.desc}', start_time=TIME'${body.start_time}', end_time=TIME'${body.end_time}', sex='${body.sex}', distance=${body.distance}, lap=${body.lap}, run=${body.run}, event_id=${body.event_id}
                    WHERE id=${idCategory}`;

  return dbPool.execute(SQLQuery);
};

const deleteCategory = (idCategory) => {
  const SQLQuery = `DELETE FROM categories WHERE id=${idCategory}`;

  return dbPool.execute(SQLQuery);
};

module.exports = {
  getAllCategories,
  createNewCategory,
  updateCategory,
  deleteCategory,
};
