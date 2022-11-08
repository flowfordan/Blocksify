import React, { useEffect } from 'react';
import { observer } from "mobx-react-lite";

import './rightBar.scss';
import { PanelDivision } from '../basic/PanelDivision/PanelDivision';



export const RightBar = observer((props:any): JSX.Element => {

  return (
    <div className={'rightBar'}>
      <PanelDivision header={'Analysis'}>
        {'There will be analysis instruments'}
      </PanelDivision>
    </div>
  );
});