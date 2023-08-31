import React from 'react';
import { ToolMenu } from 'widgets';
// import './testPage.scss';

export const TestPage = () => {
  return (
    <div className="testPage">
      <ToolMenu menuType="drawing" />
      <ToolMenu menuType="helpers" />
      <ToolMenu menuType="drawing" />
      <ToolMenu menuType="helpers" />
    </div>
  );
};
