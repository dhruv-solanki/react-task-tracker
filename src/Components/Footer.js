import { Link } from "react-router-dom"

export const Footer = () => {
  return (
    <footer className="footer">
        <p>Copyright &copy; 2022</p>
        <Link to="/about">About</Link>
    </footer>
  )
}
