import { makeAutoObservable, toJS } from "mobx";


//topBar, leftBar, rightBar, desk,
//popup - conversation with user
//layers
//tools
//camera

type CtxMenuContent = 'tools' | 'helpers' | null;
interface CtxMenu {
  isActive: boolean;
  currentContent: CtxMenuContent;
  posX: number;
  posY: number;
}

class UIState{

  // layers: Array<Layer>;
  ctxMenu: CtxMenu;

  constructor(){
    // this.layers = layersDefPreset;
    this.ctxMenu = {
      isActive: false,
      currentContent: null,
      posX: 0,
      posY: 0
    };
    makeAutoObservable(this);
  }

  setCtxMenu = (content: CtxMenuContent | null, posX?: number, posY?: number) => {
    const ctxMenu = this.ctxMenu;
    if (content && posX && posY){
      if (ctxMenu.currentContent === content){
        ctxMenu.isActive = false;
        ctxMenu.currentContent = null;
        ctxMenu.posX = 0;
        ctxMenu.posY = 0;
      } else {
        ctxMenu.isActive = true;
        ctxMenu.currentContent = content;
        ctxMenu.posX = posX;
        ctxMenu.posY = posY;
      }
    } else {
      ctxMenu.isActive = false;
      ctxMenu.currentContent = null;
      ctxMenu.posX = 0;
      ctxMenu.posY = 0;
    }

  };

}

const uiState = new UIState();

export { uiState };
