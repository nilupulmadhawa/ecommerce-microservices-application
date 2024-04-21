// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
    <SvgColor
        src={`/assets/icons/navbar/${name}.svg`}
        sx={{ width: 1, height: 1 }}
    />
);

const navConfig = [
    {
        title: 'dashboard',
        path: '/dashboard/app',
        icon: icon('ic_analytics'),
    },
    {
        title: 'products',
        path: '/dashboard/products',
        icon: icon('ic_item'),
    },
    {
        title: 'manage products',
        path: '/dashboard/manageproducts',
        icon: icon('ic_manage'),
    },
    {
        title: 'manage categories',
        path: '/dashboard/managecategories',
        icon: icon('ic_category'),
    },

    {
        title: 'orders',
        path: '/dashboard/orders',
        icon: icon('ic_cart'),
    },
    {
        title: 'review and ratings',
        path: '/dashboard/ratings',
        icon: icon('ic_rate'),
    },
    {
        title: 'Users',
        path: '/dashboard/users',
        icon: icon('ic_user'),
    },

];


export default navConfig;
