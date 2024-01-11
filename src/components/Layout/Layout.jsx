import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
// import { Footer } from '../footerComponents/Footer';

export function Layout() {
    return (
        <>
            <Header />
            <main className="container">
                <Outlet />
            </main>
        </>
    );
}
