import { FunctionComponent } from "react";
import styles from "./HelpersMenu.module.css";

import { sceneState } from '../../state';
import { observer } from "mobx-react-lite";

interface HelpersMenuProps {
	
}
 
const HelpersMenu: FunctionComponent<HelpersMenuProps> = observer(() => {

	const helperOptions = sceneState.helpersOptions;

	const handleActiveToggle = (helperID: number) => {
		sceneState.toggleHelperActive(helperID);
	}

	const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>, itemId: number) => {
		const newValue = Number(e.target.value);
		sceneState.setHelperValue(itemId, newValue);
	}

	const buildItems = (type: string) => {
		return helperOptions.map((item, idx) => {
		return item.type === type? (
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
						min={item.rangeMin} max={item.rangeMax} 
						step={item.rangeStep}
						value={item.value}
						onChange={(e) => handleValueChange(e, item.helperID)}/>
					</span>
					<span className={styles.menuItemRangeVal}>
						<span>{item.valueName && item.valueName}</span>
						<span>{item.value}</span>
					</span>
				</div>}

				{item.isSelection && 
				<div className={styles.menuItemAnglesWrapper}>
					{item.variants!.map((v, idx) => {
						return(
							<span className={styles.menuItemAngles}>
								<input type="checkbox" />
								<span>{v}</span>
							</span>
						)
					})}
				</div>}
			</div>
		) : null
	})
	}

	return (
		<div className={styles.menu}>
			<div className={styles.menuBlock}>
				<div className={styles.menuBlockHeader}>Snapping</div>
				{buildItems('snap')}
			</div>
			<div className={styles.menuBlock}>
				<div className={styles.menuBlockHeader}>Grid</div>
				{buildItems('grid')}
			</div>
		</div>
	);
})
 
export { HelpersMenu };