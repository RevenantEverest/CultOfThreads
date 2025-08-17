export interface Route {
    title: string,
    pathname: string,
    navbar?: boolean
};

const _Routes: Route[] = [
    { 
        title: "Home",
        pathname: "/",
        navbar: true
    },
    { 
        title: "About",
        pathname: "/about",
        navbar: true
    },
    { 
        title: "Contact",
        pathname: "/contact",
        navbar: true
    },
    { 
        title: "Events",
        pathname: "/events",
        navbar: true
    },
    { 
        title: "Shop",
        pathname: "/shop",
        navbar: true 
    },
];

export default _Routes;