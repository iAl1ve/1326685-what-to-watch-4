import React, {PureComponent} from 'react';
import {TabsType} from '../../types/index.js';
import {Tabs} from '../../const.js';

const withTabs = (Component) => {
  class WithTabs extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        currentTab: Tabs.OVERVIEW,
      };

      this.handleTabClick = this.handleTabClick.bind(this);
    }

    handleTabClick(tab) {
      return this.setState({
        currentTab: tab,
      });
    }

    render() {

      return (
        <Component
          {...this.props}
          currentTab = {this.state.currentTab}
          onTabClick = {this.handleTabClick}
        />);
    }
  }

  WithTabs.propTypes = TabsType;

  return WithTabs;
};

export default withTabs;
