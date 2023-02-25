import React from 'react';
import { ToolMenu } from 'widgets';
import './testPage.scss';

export const TestPage = () => {
  return (
    <div className="testPage">
      <ToolMenu items="drawing" />
      <ToolMenu items="helpers" />
    </div>
  );
};
