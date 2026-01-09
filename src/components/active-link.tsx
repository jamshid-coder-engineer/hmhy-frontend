import { Link, useLocation } from "react-router-dom"

export const ActiveLink = ({
     href,
      children,
    }: { 
        href: string; 
        children: React.ReactNode;
     }) => {
    const location = useLocation();
    return (
        <Link className={`${location.pathname === href ? "bg-[#353F4D]" : ""} flex items-center gap-3 p-3`} to={href}>{children}</Link>
    )
}