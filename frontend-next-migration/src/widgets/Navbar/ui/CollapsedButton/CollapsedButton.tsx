import { classNames } from '@/shared/lib/classNames/classNames';
import cls from '@/widgets/Navbar/ui/Button/Button.module.scss';
import Image from 'next/image';
import visible from '@/shared/assets/images/visible.png';
import invisible from '@/shared/assets/images/unvisible.png';
import { useCollapsed } from '../../model/CollapsedProvider';

type Props = {
    className?: string;
};

// todo remove v2 when ready
export function CollapsedButtonV2(props: Props) {
    const { className = '' } = props;

    const { isCollapsed, toggleCollapsed } = useCollapsed();

    return (
        <div className={classNames(cls.collapsedButton, {}, [className])}>
            <button onClick={toggleCollapsed}>
                <Image
                    loading="eager"
                    alt="visibility"
                    src={isCollapsed ? invisible : visible}
                    width={42}
                    className={cls.buttonImage}
                />
            </button>
        </div>
    );
}
