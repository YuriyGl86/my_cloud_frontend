import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
// import { Footer } from '../footerComponents/Footer';

export function Layout() {
    const menuItems = {
        // Пункты меню тут нужно хранить или выносить в store?
        main: {
            href: '/',
            title: 'Главная',
        },
        catalog: {
            href: '/catalog',
            title: 'Каталог',
        },
        about: {
            href: '/about',
            title: 'О магазине',
        },
        contacts: {
            href: '/contacts',
            title: 'Контакты',
        },
    };

    return (
        <>
            <Header
                menuItems={[
                    menuItems.main,
                    menuItems.catalog,
                    menuItems.about,
                    menuItems.contacts,
                ]}
            />
            <main className="container">
                <Outlet />
            </main>
            {/* <Footer
                menuItems={[
                    menuItems.about,
                    menuItems.catalog,
                    menuItems.contacts,
                ]}
            /> */}
        </>
    );
}
