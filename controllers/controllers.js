const { formatDateToWIB } = require("../utils/time");
const { Sequelize, QueryTypes } = require("sequelize");
const config = require("../config/config.json");

const sequelize = new Sequelize(config.development);
function renderHome(req, res) {
  res.render("index");
}
async function renderProject(req, res) {
  const query = `SELECT * FROM public."Projects" ORDER By "createdAt" DESC`;
  const projects = await sequelize.query(query, { type: QueryTypes.SELECT });
  res.render("project", { projects: projects });
}
function renderaddProject(req, res) {
  res.render("addproject");
}
async function addBlog(req, res) {
  const { inputTitle, inputContent, image, dateStart, dateEnd } = req.body;
  const { angular, nodeJs, react, vueJs } = req.body;

  let checkBox = [];
  if (angular) {
    checkBox.push(angular);
  }
  if (nodeJs) {
    checkBox.push(nodeJs);
  }
  if (react) {
    checkBox.push(react);
  }
  if (vueJs) {
    checkBox.push(vueJs);
  }

  // const image = 'https://picsum.photos/200/300';

  const query = `INSERT INTO public."Projects"
                (title, content, image, teknologi)
                VALUES
                ('${inputTitle}', '${inputContent}', '${image}', '${checkBox}')
  `;

  const result = await sequelize.query(query, { type: QueryTypes.INSERT });

  console.log(result);

  res.redirect("/project");
}
async function renderProjectDetail(req, res) {
  const { id } = req.params;
  const query = `SELECT * FROM public."Blogs" WHERE id = ${id}`;
  const project = await sequelize.query(query, { type: QueryTypes.SELECT });

  res.render("project-detail", { data: project[0] });
}
function renderTestimonial(req, res) {
  res.render("testimonials");
}
function renderContact(req, res) {
  res.render("contact");
}
async function renderEditProject(req, res) {
  const { id } = req.params;
  const query = `SELECT * FROM public."Projects" WHERE id = ${id}`;
  const project = await sequelize.query(query, { type: QueryTypes.SELECT });
  const tech = project[0].teknologi;
  console.log(tech);
  const angular = tech.includes("Angular"); // true
  const node = tech.includes("NodeJs");
  const react = tech.includes("React"); //false
  const vue = tech.includes("VueJs");

  res.render("edit-project", {
    data: project[0],
    angular,
    node,
    react,
    vue,
  });
}
async function updateProject(req, res) {
  const { id } = req.params;
  const img = req.query.image;
  let { inputTitle, inputContent, image } = req.body;
  const { angular, nodeJs, react, vueJs } = req.body;

  if (image == "") {
    image = img;
  }

  let checkBox = [];
  if (angular) {
    checkBox.push(angular);
  }
  if (nodeJs) {
    checkBox.push(nodeJs);
  }
  if (react) {
    checkBox.push(react);
  }
  if (vueJs) {
    checkBox.push(vueJs);
  }

  const query = `UPDATE public."Projects"
                  SET title ='${inputTitle}', content ='${inputContent}', image ='${image}', teknologi ='${checkBox}'
                 WHERE id = ${id}`;

  const result = await sequelize.query(query, { type: QueryTypes.UPDATE });

  console.log(result);

  res.redirect("/project");
}
function deletProject(req, res) {
  const { id } = req.params;

  const query = `DELETE FROM public."Projects"
                  WHERE id = ${id}`;
  const result = sequelize.query(query, { type: QueryTypes.DELETE });

  console.log("result query delete :", result);

  res.redirect("/project");
}

function renderHandle(req, res) {
  res.render("404");
}
module.exports = {
  renderHome,
  renderProject,
  renderTestimonial,
  renderContact,
  renderHandle,
  renderaddProject,
  addBlog,
  renderProjectDetail,
  renderEditProject,
  updateProject,
  deletProject,
};
