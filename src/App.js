import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { RegisterPage } from './pages/RegisterPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { StoragePage } from './pages/StoragePage';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/storage" element={<StoragePage />} />
                {/* <Route path="/contacts" element={<ContactsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/catalog/:id" element={<CatalogItemPage />} />
                <Route path="*" element={<NotFoundPage />} /> */}
            </Route>
        </Routes>
    );
}

export default App;
