import AppHeader from './cmps/AppHeader.jsx';
import About from './pages/About.jsx';
import BookDetails from './pages/BookDetails.jsx';
import BookIndex from './pages/BookIndex.jsx';
import Home from './pages/Home.jsx';
import BookForm from './cmps/BookForm.jsx';
import UserMsg from './cmps/UserMsg.jsx';

const Router = ReactRouterDOM.HashRouter;
const { Routes, Route, Navigate } = ReactRouterDOM;

export function RootCmp() {
  return (
    <Router>
      <section className="app main-layout">
        <AppHeader />

        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/books" element={<BookIndex />} />
            <Route path="/books/new" element={<BookForm />} />
            <Route path="/books/:bookId" element={<BookDetails />} />
            <Route path="/books/:bookId/edit" element={<BookForm />} />
          </Routes>
        </main>
        <UserMsg />
      </section>
    </Router>
  );
}
