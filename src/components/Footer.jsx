function Footer() {
  return (
    <footer className="border-t bg-white/60 backdrop-blur mt-10">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-600">
        <p>
          © {new Date().getFullYear()} VibeShop. Built for demo purposes.
        </p>
        <nav className="flex items-center gap-4">
          <a href="#" className="hover:text-gray-900">Privacy</a>
          <a href="#" className="hover:text-gray-900">Terms</a>
          <a href="#" className="hover:text-gray-900">Contact</a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
