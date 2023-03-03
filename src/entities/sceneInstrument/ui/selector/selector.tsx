import React from 'react';
import { BtnBar } from 'shared/ui';
import { instrumentsModel } from 'entities/sceneInstrument';
import { InstrumentsId } from 'shared/types';
import { observer } from 'mobx-react-lite';

export const SelectorInstr = observer(() => {
  const selector = instrumentsModel._getInstrument(InstrumentsId.SELECTOR);
  if (!selector) return null;
  return (
    <BtnBar
      iconKey="selector"
      isActive={selector.isActive}
      title={selector.title}
      onClick={() => instrumentsModel.toggleInstrumentActive(InstrumentsId.SELECTOR)}
    />
  );
});
