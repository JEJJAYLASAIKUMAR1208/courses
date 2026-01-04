import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Courses() {
    const [courses, setCourses] = useState([]);
    const [form, setForm] = useState({
        name: "",
        description: "",
        instructor: "",
    });
    const [editId, setEditId] = useState(null);

    const loadCourses = async () => {
        const res = await api.get("/courses");
        setCourses(res.data);
    };

    useEffect(() => {
        loadCourses();
    }, []);

    const submit = async (e) => {
        e.preventDefault();

        if (editId) {
            await api.put(`/courses/${editId}`, form);
            setEditId(null);
        } else {
            await api.post("/courses", form);
        }

        setForm({ name: "", description: "", instructor: "" });
        loadCourses();
    };

    const editCourse = (course) => {
        setEditId(course.id);
        setForm(course);
    };

    const deleteCourse = async (id) => {
        await api.delete(`/courses/${id}`);
        loadCourses();
    };

    return (
        <div className="card">
            <h3>Courses</h3>

            <form onSubmit={submit} className="course-form">
                <input
                    placeholder="Course Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                />

                <input
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                />

                <input
                    placeholder="Instructor"
                    value={form.instructor}
                    onChange={(e) => setForm({ ...form, instructor: e.target.value })}
                    required
                />

                <button type="submit">
                    {editId ? "Update Course" : "Add Course"}
                </button>
            </form>

            <ul className="course-list">
                {courses.map((c) => (
                    <li key={c.id}>
                        <strong>{c.name}</strong> — {c.instructor}
                        <div>
                            <button onClick={() => editCourse(c)}>Edit</button>
                            <button onClick={() => deleteCourse(c.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
