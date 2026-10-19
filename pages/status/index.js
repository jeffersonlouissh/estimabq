async function fetStatus(params) {
  const response = await fetch("http://estimabq.com.br/api/v1/status");
  const responseBody = await response.json();
  return responseBody;
}
export default function StatusPage() {
  console.log(fetStatus());
  return (
    <>
      <h1>Status</h1>
    </>
  );
}
