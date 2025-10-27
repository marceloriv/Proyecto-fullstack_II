// tests/Home.spec.jsx
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Home from '../src/pages/home';
import { FiltrosContext } from '../src/Contexts/ContextoFiltros';

const MockFiltrosProvider = ({ children }) => {
    const setCategory = () => {};
    return (
        <FiltrosContext.Provider value={{ setCategory }}>
            {children}
        </FiltrosContext.Provider>
    );
};

describe('Componente Home', () => {
    test('debe renderizar el título principal "Celebra la dulzura de la vida"', () => {
        render(
            <MemoryRouter>
                <MockFiltrosProvider>
                    <Home />
                </MockFiltrosProvider>
            </MemoryRouter>
        );
        const titulo = screen.getByRole('heading', { level: 1, name: /Celebra la dulzura de la vida/i });
        expect(titulo).toBeInTheDocument();
    });

    test('debe mostrar las tarjetas de categorías de productos', () => {
        render(
            <MemoryRouter>
                <MockFiltrosProvider>
                    <Home />
                </MockFiltrosProvider>
            </MemoryRouter>
        );
        const categoriaIndividuales = screen.getByText('Postres Individuales');
        expect(categoriaIndividuales).toBeInTheDocument();
    });
});