function status(request, response) {
  response.status(200).json({ nome: "Jefferson", middleName: "Louis" });
}

export default status;
