export default function Page({ data }) {
  console.log("Hello from user-information.ts");

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}