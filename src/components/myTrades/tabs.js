import React from 'react';
import PropTypes from 'prop-types';
import requiredForA11y from 'prop-types-extra/lib/isRequiredForA11y';
import uncontrollable from 'uncontrollable';

import Nav from './Nav';
import NavItem from './NavItem';
import UncontrolledTabContainer from './TabContainer';
import TabContent from './TabContent';
import { bsClass as setBsClass } from './utils/bootstrapUtils';
import ValidComponentChildren from './utils/ValidComponentChildren';

class ControlledTabs extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      key: 1
    };
  }

  handleSelect(key) {
    alert(`selected ${key}`);
    this.setState({ key });
  }

  render() {
    return (
      <Tabs
        activeKey={this.state.key}
        onSelect={this.handleSelect}
        id="controlled-tab-example"
      >
        <Tab eventKey={1} title="Tab 1">
          Tab 1 content
        </Tab>
        <Tab eventKey={2} title="Tab 2">
          Tab 2 content
        </Tab>
        <Tab eventKey={3} title="Tab 3" disabled>
          Tab 3 content
        </Tab>
      </Tabs>
    );
  }
}

export default ControlledTabs;