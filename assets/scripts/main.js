var contactForm = document.getElementById("contactForm");
let btnDownload = document.getElementById("downloadCv");
btnDownload.addEventListener("click", () => {
  downloadCv();
});
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  submitForm(e);
});

function submitForm(e) {
  var form = e.target;
  var formData = new FormData(form);

  var data = Object.fromEntries(formData.entries());

  console.log(data);

  console.log(data.phoneNumber);

  var link = document.createElement("a");

  link.href = `mailto:leo@gmail.com?subject=${data.subject}&body=Selamat siang. Nama saya ${data.name}.%0D%0ASilahkan hubungi saya di ${data.email} atau ${data.phoneNumber}. Skill saya adalah Fullstack Developer. Berikut pesan saya : ${data.message}`;

  link.click();
}
// function downloadCv() {
//   var link = document.createElement("a");
//   link.href = "./download.pdf";
//   link.download = "./download.pdf";
//   link.dispatchEvent(new MouseEvent("click"));
// }
