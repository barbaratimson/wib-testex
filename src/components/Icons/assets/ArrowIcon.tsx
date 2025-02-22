import {IconProps, Svg} from "../icon";
import styled from "styled-components";


type ArrowProps = IconProps & RotatableArrowProps

interface RotatableArrowProps {
    transition?: string
    rotate?: number
}


export const ArrowIcon = ({size, transition, rotate}: ArrowProps) => {
    return (
        <RotatableArrowIcon
            transition={transition} rotate={rotate}
            width={size}
            height={size}
            viewBox="0 0 32 32">
            <path fill="currentColor"
                  d="m17 4l-7 7l1.414 1.414L16 7.828v6.769a3.01 3.01 0 0 1-.657 1.874l-2.247 2.808A5.02 5.02 0 0 0 12 22.403V28h2v-5.597a3.01 3.01 0 0 1 .657-1.874l2.247-2.808A5.02 5.02 0 0 0 18 14.597V7.828l4.586 4.586L24 11Z"/>
        </RotatableArrowIcon>

)
    ;
};

export const RotatableArrowIcon = styled(Svg)<RotatableArrowProps>`
  transition: ${({transition}) => transition};
  rotate: ${({rotate}) => rotate + "deg"};
`