import Index        from "../../components/Index";
import NotFound     from "../../components/NotFound";
import Welcome      from "../../components/Welcome";
import Home         from "../../components/Home";
import auth         from '../../modules/auth/routes_auth';
import Dashboard    from "../../components/Dashboard";

// Load modules routes dynamically.
const requireContext = require.context('../../modules', true, /routes\.js$/)

const modules = requireContext.keys()
    .map(file =>
        [file.replace(/(^.\/)|(\.js$)/g, ''), requireContext(file)]
    )

let moduleRoutes = [];

for(let module in modules) {
    moduleRoutes = moduleRoutes.concat(module)
}

// TODO ДОДЕЛАТЬ

console.log(moduleRoutes)

export const routes = [
    {
        path: '/admin',
        component: Home,
        meta: {auth: true},
        children: [
            {
                path: '/',
                name: 'home',
                component: Dashboard
            },
            ...moduleRoutes,
        ]
    },
    {
        path: '/',
        component: Welcome,
        children: [
            {
                path: '/',
                component: Index,
                name: 'index'
            },
            ...auth,
            {
                path: '*',
                component: NotFound,
                name: 'not_found'
            }
        ]
    },
];

