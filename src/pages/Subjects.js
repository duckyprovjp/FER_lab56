import React, { useState, useEffect, useMemo } from "react";
import { Container, Table, Button, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:9000/subjects";
const user = JSON.parse(localStorage.getItem("user"));
function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const loadSubjects = async () => {
    try {
      const res = await axios.get(API_URL);
      setSubjects(res.data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách môn học:", error);
    }
  };

  useEffect(() => {
    loadSubjects();
  }, []);

  const filteredSubjects = useMemo(() => {
    return subjects.filter(
      (s) =>
        s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.id?.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [subjects, searchTerm]);
  const handleLogout = async (e) => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <Container className="mt-4">
      <Row>
        <p className="border fs-4">
          Hello {user.email} ({user.role})
        </p>
      </Row>
      <div className="d-flex justify-content-between">
        <h2 className="mb-4">Danh Sách Môn Học</h2>
        <Button
          style={{ height: "40px" }}
          variant="danger"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
      <Form.Control
        type="text"
        placeholder="Tìm kiếm môn học..."
        className="mb-3 w-50"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Mã Môn</th>
            <th>Tên môn học</th>
            <th>Số lượng câu hỏi</th>
            <th>Tools</th>
          </tr>
        </thead>
        <tbody>
          {filteredSubjects.length > 0 ? (
            filteredSubjects.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.questionsCount}</td>
                <td>
                  <Button
                    style={{ marginRight: "10px" }}
                    as={Link}
                    to={`/questions/${s.id}`}
                    variant="primary"
                    size="sm"
                  >
                    Truy cập toàn bộ câu hỏi
                  </Button>
                  <Button variant="secondary" size="sm">
                    Thông tin
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                Không tìm thấy môn học nào
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default Subjects;
