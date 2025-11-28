import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '/src/Contexts/AuthContext.jsx'
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap'


export default function Registro() {
    const { register } = useAuth()
    //para redirigir después de registrarse
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    // maneja el envio del formulario de registro
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        // captura los valores del formulario
        const form = new FormData(e.target)
        // prepara los datos que se mandan al backend
        const payload = {
            nombre: (form.get('nombre') || '').trim(),
            username: (form.get('username') || '').trim(),
            email: (form.get('email') || '').trim(),
            password: (form.get('password') || '').trim(),
            confirmPassword: (form.get('confirmPassword') || '').trim(),
            telefono: (form.get('telefono') || '').trim(),
            direccion: (form.get('direccion') || '').trim(),
        }
        try {
            //mandar  datos al backend para crear usuario
            await register(payload)
            navigate('/login', { replace: true })
        } catch (err) {
            setError(err.message || 'Error al registrar')
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
                                    <Form.Control name="nombre" required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nombre de usuario</Form.Label>
                                    <Form.Control name="username" required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Correo</Form.Label>
                                    <Form.Control name="email" required />
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type="password" name="password" required />
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label>Confirmar Contraseña</Form.Label>
                                    <Form.Control type="password" name="confirmPassword" required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Teléfono</Form.Label>
                                    <Form.Control name="telefono" inputMode="numeric" pattern="[0-9]+" required />
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label>Dirección (opcional)</Form.Label>
                                    <Form.Control name="direccion" />
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