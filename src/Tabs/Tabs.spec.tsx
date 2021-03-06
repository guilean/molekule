import React from 'react';
import { renderWithTheme } from '../test/utils';
import Tabs from './Tabs';

const TabContent = ({ body }: any) => <div>This is the content for Tab {body}</div>;
const onActiveSpy = jest.fn();
const TABS = [
  {
    id: 'test-one',
    title: 'Tab One',
    content: <TabContent body="one" />,
  },
  {
    id: 'test-two',
    title: 'Tab Two',
    content: <TabContent body="two" />,
    onActive: onActiveSpy,
  },
];

describe('<Tabs />', () => {
  afterEach(() => {
    onActiveSpy.mockClear();
  });

  test('renders', () => {
    const { asFragment } = renderWithTheme(<Tabs tabs={TABS} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
