import React from 'react';
import QueueAnim from 'rc-queue-anim';
import WelcomeStepper from './WelcomeStepper';


const Welcome = () => (
  <div className="container-fluid no-breadcrumbs page-dashboard">
    <QueueAnim type="bottom" className="ui-animate">
      <div key="1"><WelcomeStepper /></div>
    </QueueAnim>  
  </div>
);

module.exports = Welcome;
