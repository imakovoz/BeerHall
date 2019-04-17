var request = new XMLHttpRequest();
request.open(
  "GET",
  "http://api.company-target.com/api/v2/ip.json?key=03205c9de3116984ae7f2c53c267b150",
  false
); // `false` makes the request synchronous
request.send(null);

if (request.status === 200) {
  console.log(request.responseText);
}
