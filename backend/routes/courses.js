const express = require("express");
const db = require("../config/db");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// CREATE COURSE
router.post("/", auth, (req, res) => {
  const { name, description, instructor } = req.body;

  console.log("Received request to create course with:", { name, description, instructor });

  if (!name || !instructor) {
    console.log("Required fields missing: name or instructor");
    return res.status(400).json({ message: "Required fields missing" });
  }

  db.run(
    "INSERT INTO courses (name, description, instructor) VALUES (?, ?, ?)",
    [name, description, instructor],
    function () {
      console.log(`Course created with ID: ${this.lastID}`);
      res.status(201).json({ id: this.lastID });
    }
  );
});

// READ COURSES
router.get("/", (req, res) => {
  console.log("Received request to fetch all courses");

  db.all("SELECT * FROM courses", [], (err, rows) => {
    if (err) {
      console.error("Error fetching courses:", err);
      return res.status(500).json({ message: "Error fetching courses" });
    }
    
    console.log("Fetched courses:", rows);
    res.json(rows);
  });
});

// UPDATE COURSE
router.put("/:id", auth, (req, res) => {
  const { name, description, instructor } = req.body;
  const courseId = req.params.id;

  console.log(`Received request to update course ID: ${courseId} with data:`, { name, description, instructor });

  db.run(
    "UPDATE courses SET name=?, description=?, instructor=? WHERE id=?",
    [name, description, instructor, courseId],
    function (err) {
      if (err) {
        console.error("Error updating course:", err);
        return res.status(500).json({ message: "Error updating course" });
      }

      console.log(`Course ID ${courseId} updated`);
      res.json({ message: "Course updated" });
    }
  );
});

// DELETE COURSE
router.delete("/:id", auth, (req, res) => {
  const courseId = req.params.id;

  console.log(`Received request to delete course ID: ${courseId}`);

  db.run(
    "DELETE FROM courses WHERE id=?",
    [courseId],
    function (err) {
      if (err) {
        console.error("Error deleting course:", err);
        return res.status(500).json({ message: "Error deleting course" });
      }

      console.log(`Course ID ${courseId} deleted`);
      res.json({ message: "Course deleted" });
    }
  );
});

module.exports = router;
