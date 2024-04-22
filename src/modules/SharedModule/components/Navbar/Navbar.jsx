export default function Navbar({ loginData }) {
  return (
    <div>
      Navbar
      <span>{loginData?.userEmail}</span>
    </div>
  );
}
