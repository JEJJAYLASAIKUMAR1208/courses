export default function Dashboard() {
    const token = localStorage.getItem("token");

    return (
        <div className="card">
            <h2>Dashboard</h2>
            <p>Welcome! Your token is:</p>
            <code>{token}</code>
        </div>
    );
}
