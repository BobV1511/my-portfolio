import React from 'react'; // ✅ THÊM DÒNG NÀY
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import Home from '../pages/Home.jsx'; // Đảm bảo đúng đường dẫn

describe('Home Page', () => {
  test('renders homepage title', () => {
    render(<Home />);
    expect(screen.getByText(/welcome to my portfolio/i)).toBeInTheDocument();
  });
});
