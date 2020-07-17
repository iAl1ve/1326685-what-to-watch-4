import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withTabs from './with-tabs.js';
import {Tabs} from '../../const.js';

Enzyme.configure({
  adapter: new Adapter()
});

const MockComponent = () => <div />;
const MockComponentWrapped = withTabs(MockComponent);

it(`Should test change tabs`, () => {
  const wrapper = shallow(
      <MockComponentWrapped
        currentTab={{}}
        onTabClick={() => {}}
      />);

  expect(wrapper.props().currentTab).toEqual(Tabs.OVERVIEW);

  wrapper.props().onTabClick(Tabs.DETAILS);
  expect(wrapper.props().currentTab).toEqual(Tabs.DETAILS);

  wrapper.props().onTabClick(Tabs.REVIEWS);
  expect(wrapper.props().currentTab).toEqual(Tabs.REVIEWS);
});
