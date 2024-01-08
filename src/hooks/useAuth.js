import { useSelector } from 'react-redux';

export function useAuth() {
    const { token, first_name, username, email } = useSelector(state => state.user);

    return {
        isAuth: !!token,
        first_name,
        username,
        email,
    };
}
