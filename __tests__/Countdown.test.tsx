import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Countdown from '@/sections/Countdown';

describe('Countdown', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-10-28T10:00:00'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders countdown timer', () => {
    render(<Countdown />);

    expect(screen.getByText(/ближайший выезд врача доступен через/i)).toBeInTheDocument();
    expect(screen.getByText(/часы/i)).toBeInTheDocument();
    expect(screen.getByText(/минуты/i)).toBeInTheDocument();
    expect(screen.getByText(/секунды/i)).toBeInTheDocument();
  });

  it('updates countdown values', async () => {
    render(<Countdown />);

    const initialSeconds = screen.getAllByLabelText(/секунды/i)[0].textContent;

    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      const updatedSeconds = screen.getAllByLabelText(/секунды/i)[0].textContent;
      expect(updatedSeconds).not.toBe(initialSeconds);
    });
  });

  it('displays time in correct format', () => {
    render(<Countdown />);

    const hours = screen.getByText(/часы/i).previousSibling?.textContent;
    const minutes = screen.getByText(/минуты/i).previousSibling?.textContent;
    const seconds = screen.getByText(/секунды/i).previousSibling?.textContent;

    expect(hours).toMatch(/\d{2}/);
    expect(minutes).toMatch(/\d{2}/);
    expect(seconds).toMatch(/\d{2}/);
  });
});
