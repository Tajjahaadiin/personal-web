function renderHome(req, res) {
  res.render("index");
}
function renderProject(req, res) {
  res.render("project");
}
function addProject(req, res) {}
function renderTestimonial(req, res) {
  res.render("testimonials");
}
function renderContact(req, res) {
  res.render("contact");
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
};
