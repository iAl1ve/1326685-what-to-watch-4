import React, {PureComponent} from 'react';
import {TabsType} from '../../types/index.js';
import {Tabs} from '../../const.js';

const withTabs = (Component) => {
  class WithTabs extends PureComponent {
    constructor(propsTabs) {
      super(propsTabs);
      this.propsTabs = propsTabs;

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
          {...this.propsTabs}
          currentTab = {this.state.currentTab}
          onTabClick = {this.handleTabClick}
        />);
    }
  }

  WithTabs.propTypes = {
    propsTabs: TabsType,
  };

  return WithTabs;
};

export default withTabs;
