import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withMovieList from './with-movies-list.js';
import {PLAYBACK_DELAY} from "../../const.js";
import {ListMovies} from "../../mock/testing.js";

Enzyme.configure({
  adapter: new Adapter()
});

const MockComponent = () => <div />;
const MockComponentWrapped = withMovieList(MockComponent);

it(`Should test change active movie in list`, () => {
  const wrapper = shallow(
      <MockComponentWrapped
        activeCard={{}}
        onMovieCardHover={() => {}}
        onMouseCardLeave={() => {}}
      />);

  jest.useFakeTimers();
  expect(wrapper.props().activeCard).toEqual({});

  wrapper.props().onMovieCardHover(ListMovies[0]);
  jest.advanceTimersByTime(PLAYBACK_DELAY);
  expect(wrapper.props().activeCard).toEqual(ListMovies[0]);
  jest.useRealTimers();

  wrapper.props().onMouseCardLeave();
  expect(wrapper.props().activeCard).toEqual({});
});
