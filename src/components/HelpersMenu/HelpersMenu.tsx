import { FunctionComponent } from "react";
import styles from "./HelpersMenu.module.css";

import { sceneState } from '../../state';
import { observer } from "mobx-react-lite";

interface HelpersMenuProps {
	
}
 
const HelpersMenu: FunctionComponent<HelpersMenuProps> = observer(() => {

	const helperOptions = sceneState.helpersOptions;

	const handleActiveToggle = (helperID: number) => {
		console.log()
	}

	const handleValueChange = () => {
		
	}

	return (
		<div className={styles.menu}>
			{helperOptions.map((item, idx) => {
				return(
					<div key={item.helperID} className={styles.menuItem}>
						<div className={styles.menuItemCheck}>
							<span>
								<input type="checkbox" 
								checked={item.isActive} 
								onClick={() => handleActiveToggle(item.helperID)}/>
							</span>
							<span>{item.name}</span>
						</div>

						{item.isRange && 
						<div className={styles.menuItemRange}>
							<span>
								<input type="range" 
								min={item.rangeMin} max={item.rangeMax} step={item.rangeStep}/>
							</span>
							<span>
								{item.value}
							</span>
						</div>}

						{item.isSelection && 
						<div className={styles.menuItemRange}>
							<span>
								<input type="range" 
								min={item.rangeMin} max={item.rangeMax} step={item.rangeStep}/>
							</span>
							<span>
								{item.value}
							</span>
						</div>}
					</div>
				)
			})}
		
		</div>
	);
})
 
export { HelpersMenu };