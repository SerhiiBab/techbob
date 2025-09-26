export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        &copy; {new Date().getFullYear()} TechBOB. Alle Rechte vorbehalten.
      </div>
    </footer>
  );
}
