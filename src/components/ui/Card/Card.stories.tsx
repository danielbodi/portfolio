import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../Card';

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a card',
    className: 'p-4',
  },
};

export const Nested: Story = {
  args: {
    variant: 'nested',
    children: 'This is a nested card',
    className: 'p-4',
  },
};

export const Navigation: Story = {
  args: {
    variant: 'nav',
    children: 'This is a navigation card',
    className: 'p-4',
  },
};