import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '@/sections/ContactForm';

describe('ContactForm', () => {
  it('renders form fields correctly', () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/ваше имя/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/телефон/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/услуга/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/сообщение/i)).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const submitButton = screen.getByRole('button', { name: /отправить заявку/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/имя должно содержать минимум 2 символа/i)).toBeInTheDocument();
      expect(screen.getByText(/введите корректный номер телефона/i)).toBeInTheDocument();
      expect(screen.getByText(/выберите услугу/i)).toBeInTheDocument();
    });
  });

  it('validates phone number format', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const phoneInput = screen.getByLabelText(/телефон/i);
    await user.type(phoneInput, '123');

    const submitButton = screen.getByRole('button', { name: /отправить заявку/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/введите корректный номер телефона/i)).toBeInTheDocument();
    });
  });

  it('has accessible form structure', () => {
    render(<ContactForm />);

    const form = screen.getByRole('form', { name: /форма обратной связи/i });
    expect(form).toBeInTheDocument();

    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBeGreaterThan(0);
  });
});
