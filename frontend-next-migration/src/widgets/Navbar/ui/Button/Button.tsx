import cls from "./Button.module.scss";
import { useFixedAndCollapsed } from "../../model/FixedAndCollapsedProvider";
import visible from "@/shared/assets/images/visible.png";
import unvisible from "@/shared/assets/images/unvisible.png";
import {classNames} from "@/shared/lib/classNames/classNames";
import Image from "next/image";

type Props = {
    className?: string;
}

/**
 * A button component for the collapse/expand functionality.
 *
 * @export
 * @param {Props} props - CSS classes applied based on the usage scenario.
 * @returns 
 */
export function CollapsedButton (props: Props) {

    const {
        className = ''
    } = props;

    const { isCollapsed, toggleCollapsed } = useFixedAndCollapsed();

    return (
        <div className={classNames(cls.collapsedButton, {}, [className])}>
            <button
                onClick={toggleCollapsed}
            >
                    <Image
                        loading={"eager"}
                        alt='visibility'
                        src={isCollapsed ? unvisible: visible}
                        width={42}
                        className={cls.buttonImage}
                    />
            </button>
        </div>
    );
}

export function FixedButton (props: Props) {

    const {
        className = ''
    } = props;

    const { isFixed, toggleFixed } = useFixedAndCollapsed();
    
    return (
        <div className={classNames(cls.fixedButton, {}, [className])}>
            <button
                onClick={toggleFixed}
            >
                {isFixed ? '📍' : '📌'}
            </button>
        </div>
    );
}