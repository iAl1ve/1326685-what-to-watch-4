import React, {PureComponent} from 'react';
import {ListMoviesType} from '../../types/index.js';
import {PLAYBACK_DELAY} from "../../const.js";

const withMovieList = (Component) => {
  class WithMoviesList extends PureComponent {
    constructor(propsMovieList) {
      super(propsMovieList);
      this.propsMovieList = propsMovieList;
      this.timerId = null;

      this.state = {
        activeCard: {},
      };

      this.handleMovieCardHover = this.handleMovieCardHover.bind(this);
      this.handleMouseCardLeave = this.handleMouseCardLeave.bind(this);
    }

    handleMovieCardHover(movie) {
      this.timerId = setTimeout(() => {
        this.setState({
          activeCard: movie,
        });
      }, PLAYBACK_DELAY);
    }

    handleMouseCardLeave() {
      clearTimeout(this.timerId);
      this.setState({
        activeCard: {},
      });
    }

    render() {
      return (
        <Component
          {...this.propsMovieList}
          activeCard = {this.state.activeCard}
          onMovieCardHover = {this.handleMovieCardHover}
          onMouseCardLeave = {this.handleMouseCardLeave}
        />);
    }
  }

  WithMoviesList.propTypes = {
    propsMovieList: ListMoviesType,
  };

  return WithMoviesList;
};

export default withMovieList;
