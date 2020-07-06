import React, {PureComponent} from 'react';
import {WithMoviesListType} from '../../types/index.js';
import {PLAYBACK_DELAY} from "../../const.js";

const withMovieList = (Component) => {
  class WithMoviesList extends PureComponent {
    constructor(props) {
      super(props);

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

    componentWillUnmount() {
      clearTimeout(this.timerId);
    }

    render() {
      return (
        <Component
          {...this.props}
          activeCard = {this.state.activeCard}
          onMovieCardHover = {this.handleMovieCardHover}
          onMouseCardLeave = {this.handleMouseCardLeave}
        />);
    }
  }

  WithMoviesList.propTypes = WithMoviesListType;

  return WithMoviesList;
};

export default withMovieList;
