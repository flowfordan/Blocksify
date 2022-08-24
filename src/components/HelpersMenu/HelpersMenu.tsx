import { FunctionComponent } from "react";
import styles from "./HelpersMenu.module.css";

interface HelpersMenuProps {
	
}
 
const HelpersMenu: FunctionComponent<HelpersMenuProps> = () => {
	return (
		<div className={styles.menu}>
			<div className={styles.menuBlock}>
				<div className={styles.menuHeader}>
					Snapping
				</div>

				<div className={styles.menuItem}>
					<div className={styles.menuItemCheck}>
						<span><input type="checkbox" /></span>
						<span>Spacing</span>
					</div>

					<div className={styles.menuItemRange}>
						<span>
							<input type="range" 
							min="0.5" max="5" step="0.5"/>
						</span>
						<span>
							Val
						</span>
					</div>
					
				</div>

				<div>
					<span><input type="checkbox" /></span>
					<span>Angle</span>
					<span><input type="range" /></span>
				</div>

				<div>
					<span><input type="checkbox" /></span>
					<span>Grid</span>
					<span></span>
				</div>
			</div>


			<div className={styles.menuBlock}>
				<div className={styles.menuHeader}>Grid options</div>
				<div>
					<span></span>
					<span>Grid size</span>
					<span><input type="range" /></span>
				</div>
			</div>

		</div> 
	);
}
 
export { HelpersMenu };