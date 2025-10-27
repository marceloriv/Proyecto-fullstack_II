import React, { useState } from 'react';
import '../App.css';

const Contacto = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        telefono: '',
        mensaje: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Datos del formulario:', formData);
        alert('Mensaje enviado correctamente');
        setFormData({ nombre: '', correo: '', telefono: '', mensaje: '' });
    };

    return (
        <>
            <section className="contact-header py-5">
                <div className="container text-center">
                    <h1>Contáctanos</h1>
                    <p>Estamos aquí para responder todas tus preguntas y tomar tus pedidos especiales</p>
                </div>
            </section>

            <section className="contact-content py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <h2 className="mb-4">Información de Contacto</h2>
                            
                            {[
                                { icon: '📍', title: 'Dirección', content: 'Av. Dulce 1234, Santiago Centro<br />Región Metropolitana, Chile' },
                                { icon: '📞', title: 'Teléfonos', content: '+56 2 2345 6789<br />+56 9 8765 4321' },
                                { icon: '✉️', title: 'Email', content: 'info@pasteleriamilsabores.cl<br />pedidos@pasteleriamilsabores.cl' },
                                { icon: '🕒', title: 'Horario de Atención', content: 'Lunes a Viernes: 9:00 - 20:00 hrs<br />Sábados: 10:00 - 18:00 hrs<br />Domingos: Cerrado' }
                            ].map((item, index) => (
                                <div key={index} className="info-item d-flex mb-3">
                                    <div className="info-icon me-3">{item.icon}</div>
                                    <div className="info-content">
                                        <h5>{item.title}</h5>
                                        <p dangerouslySetInnerHTML={{ __html: item.content }} />
                                    </div>
                                </div>
                            ))}
                            
                            <div className="info-item d-flex">
                                <div className="info-icon me-3">🔗</div>
                                <div className="info-content">
                                    <h5>Síguenos en redes</h5>
                                    <div className="social-links">
                                        {['Facebook', 'Instagram', 'Twitter'].map((red, index) => (
                                            <a key={index} href="#" className="social-link me-2">{red}</a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-md-6">
                            <h2 className="mb-4">Envíanos un mensaje</h2>
                            <form onSubmit={handleSubmit}>
                                {[
                                    { id: 'nombre', label: 'Nombre completo *', type: 'text', required: true },
                                    { id: 'correo', label: 'Correo electrónico *', type: 'email', required: true },
                                    { id: 'telefono', label: 'Teléfono', type: 'tel', required: false }
                                ].map((field) => (
                                    <div key={field.id} className="mb-3">
                                        <label htmlFor={field.id} className="form-label">{field.label}</label>
                                        <input 
                                            type={field.type} 
                                            className="form-control" 
                                            id={field.id} 
                                            value={formData[field.id]}
                                            onChange={handleChange}
                                            required={field.required}
                                        />
                                    </div>
                                ))}
                                
                                <div className="mb-4">
                                    <label htmlFor="mensaje" className="form-label">Mensaje *</label>
                                    <textarea 
                                        className="form-control" 
                                        id="mensaje" 
                                        rows="5" 
                                        value={formData.mensaje}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                
                                <button type="submit" className="btn btn-primary">Enviar mensaje</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contacto;