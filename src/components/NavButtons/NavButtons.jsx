import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/slices/userSlice';
import { useLogoutMutation } from '../../store/backendUserAPI';

export function NavButtons() {
    const { isAuth, username, token, is_staff } = useAuth();
    const [logout] = useLogoutMutation();
    const dispatch = useDispatch();

    const handleLogClick = async e => {
        if (isAuth) {
            logout(token).unwrap();

            dispatch(userActions.removeUser());
        }
    };

    return (
        <>
            {isAuth && is_staff ? (
                <Link
                    to="/admin-users"
                    rel="noopener noreferrer"
                    style={{ paddingRight: '10px' }}
                >
                    <Button>Users</Button>
                </Link>
            ) : null}

            {isAuth ? (
                <Link
                    to="/storage"
                    rel="noopener noreferrer"
                    style={{ paddingRight: '10px' }}
                >
                    <Button>Storge</Button>
                </Link>
            ) : null}

            {!isAuth ? (
                <Link
                    to="/register"
                    rel="noopener noreferrer"
                    style={{ paddingRight: '10px' }}
                >
                    <Button>Register</Button>
                </Link>
            ) : null}

            <Link to={isAuth ? '/' : '/login'} rel="noopener noreferrer">
                <Button type="primary" onClick={handleLogClick}>
                    {isAuth ? (username ? `LogOut from ${username}` : 'LogOut') : 'LogIn'}
                </Button>
            </Link>
        </>
    );
}
