import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* <Route index element={<HomePage />} />
                <Route path="/catalog" element={<CatalogPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contacts" element={<ContactsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/catalog/:id" element={<CatalogItemPage />} />
                <Route path="*" element={<NotFoundPage />} /> */}
            </Route>
        </Routes>
    );
}

export default App;
