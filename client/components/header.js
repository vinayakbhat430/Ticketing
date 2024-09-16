import Link from "next/link"

export default ({currentUser}) => {
    console.log(currentUser);
    const  links = [
        currentUser && {label:'Sign out',href: '/auth/signout'},
        !currentUser && {label:'Sign in',href: '/auth/signin'},
        !currentUser && {label:'Sign up',href: '/auth/signup'},

    ]
    .filter(linkConfig => linkConfig)
    .map(({label,href})=>{
        return <li key={href} className="nav-item">
            <Link href={href}>{label}</Link>
            </li>
    })
    return <nav className="navbar navbar-light bg-light">
        <Link href="/" className="navbar-brand">
           Tickeitng
        </Link>
        <div className="d-flex justify-content-end">
            <ul className="nav d-flex align-items-center">
            {links}
            </ul>
        </div>
    </nav>
}