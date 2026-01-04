export default function Navbar({ setPage }) {
    return (
        <nav className="navbar">
            <h2>Course Manager</h2>
            <div>
                <button onClick={() => setPage("register")}>Register</button>
                <button onClick={() => setPage("login")}>Login</button>
                <button onClick={() => setPage("courses")}>Courses</button>
            </div>
        </nav>
    );
}
