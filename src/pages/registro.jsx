import React, { useState } from 'react'
import "../App.css";
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap'


export default function Registro() {
    const { register, login } = useAuth()
    const navigate = useNavigate()
    const [form, setForm] = useState({ nombre: '', username: '', password: '' })
        const [error, setError] = useState('')
        const [loading, setLoading] = useState(false)


    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })


    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            await register(form)
            await login({ username: form.username, password: form.password })
            navigate('/')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }


    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={10} lg={7}>
                    <Card className="p-3 ">
                        <Card.Body>
                            <Card.Title className="text-center mb-3">Crear cuenta</Card.Title>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control name="nombre" value={form.nombre} onChange={onChange} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Correo</Form.Label>
                                    <Form.Control name="username" value={form.username} onChange={onChange} required />
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type="password" name="password" value={form.password} onChange={onChange} required />
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label>Confirmar Contraseña</Form.Label>
                                    <Form.Control type="password" name="confirmPassword" value={form.confirmPassword} onChange={onChange} required />
                                </Form.Group>
                                <div className="d-grid gap-2">
                                    <Button type="submit" disabled={loading}>{loading ? 'Creando…' : 'Crear cuenta'}</Button>
                                </div>
                            </Form>
                            <hr />
                            <p className="mb-0">¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}