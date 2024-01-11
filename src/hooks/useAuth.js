import { useSelector } from 'react-redux';

export function useAuth() {
    const { token, first_name, username, email, id, is_staff } = useSelector(
        state => state.user,
    );

    return {
        isAuth: !!token,
        first_name,
        username,
        email,
        token,
        id,
        is_staff,
    };
}
