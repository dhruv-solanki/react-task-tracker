import { Link } from "react-router-dom"

export const About = () => {
  return (
    <div className="about">
        <p>Version: 1.0.0</p>
        <p>Developer: <span className="developer">Dhruv Solanki</span></p>
        <Link to="/">Go Back</Link>
    </div>
  )
}
