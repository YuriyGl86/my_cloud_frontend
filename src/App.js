import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { RegisterPage } from './pages/RegisterPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { StoragePage } from './pages/StoragePage';
import { AdminUserPage } from './pages/AdminUserPage';
import { UserStoragePage } from './pages/UserStoragePage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/storage/" element={<StoragePage />} />
                <Route path="/admin-users" element={<AdminUserPage />} />
                <Route path="/storage/:id" element={<UserStoragePage />} />
                <Route path="*" element={<NotFoundPage />} />
                {/* <Route path="/contacts" element={<ContactsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/catalog/:id" element={<CatalogItemPage />} />
                <Route path="*" element={<NotFoundPage />} /> */}
            </Route>
        </Routes>
    );
}

export default App;
