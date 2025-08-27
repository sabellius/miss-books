const { NavLink } = ReactRouterDOM;

export default function AppHeader() {
  return (
    <header className="app-header full main-layout">
      <section className="header-container">
        <h1>React Starter Proj</h1>
        <nav className="header-nav">
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/books">Books</NavLink>
        </nav>
      </section>
    </header>
  );
}
