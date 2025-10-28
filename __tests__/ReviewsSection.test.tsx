import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReviewsSection from '@/sections/ReviewsSection';

describe('ReviewsSection', () => {
  it('renders reviews list', () => {
    render(<ReviewsSection />);

    expect(screen.getByText(/что говорят наши пациенты/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/фильтр отзывов по категории/i)).toBeInTheDocument();
  });

  it('filters reviews by category', async () => {
    const user = userEvent.setup();
    render(<ReviewsSection />);

    const filter = screen.getByLabelText(/выберите категорию отзывов/i);

    const initialCount = screen.getByText(/показано отзывов:/i).textContent;

    await user.selectOptions(filter, 'Кодирование');

    const updatedText = screen.getByText(/показано отзывов:/i).textContent;
    expect(updatedText).not.toBe(initialCount);
  });

  it('displays all reviews when "all" is selected', async () => {
    const user = userEvent.setup();
    render(<ReviewsSection />);

    const filter = screen.getByLabelText(/выберите категорию отзывов/i);

    await user.selectOptions(filter, 'Кодирование');
    await user.selectOptions(filter, 'all');

    expect(screen.getByText(/показано отзывов: 4/i)).toBeInTheDocument();
  });

  it('displays review details', () => {
    render(<ReviewsSection />);

    expect(screen.getByText(/анна п\./i)).toBeInTheDocument();
    expect(screen.getByText(/огромная благодарность за помощь/i)).toBeInTheDocument();
  });

  it('has accessible rating display', () => {
    render(<ReviewsSection />);

    const ratings = screen.getAllByLabelText(/оценка: \d из 5/i);
    expect(ratings.length).toBeGreaterThan(0);
  });
});
