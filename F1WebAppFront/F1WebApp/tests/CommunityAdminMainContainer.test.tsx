import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import {CommunityAdminMainContainer} from '../src/common/communityAdminMainContiner/CommunityAdminMainContainer'
import { MemoryRouter } from 'react-router-dom'
import { fireEvent } from '@testing-library/react';

test('renders MainContainerActual', () => {
  render(
    <MemoryRouter>
      <CommunityAdminMainContainer>
        <div>Test Content</div>
      </CommunityAdminMainContainer>
    </MemoryRouter>
  )

  const dropdown = document.querySelector('.dropdown-container');
  if (dropdown) {
    fireEvent.mouseEnter(dropdown);
  }
  
  expect(screen.getByText('Test Content')).toBeInTheDocument()
  expect(screen.getByText('Home')).toBeInTheDocument()
  expect(screen.getByText('Community')).toBeInTheDocument()
  expect(screen.getByText('Actual')).toBeInTheDocument()
  expect(screen.getByText('Historical')).toBeInTheDocument()
})

