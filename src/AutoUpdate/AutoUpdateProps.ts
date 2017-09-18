import * as PropTypes from "prop-types";

export interface AutoUpdateProps {
    value: (value: any) => any,
    attribute: string,
    children: JSX.Element
}

export const AutoUpdatePropTypes = {
    value: PropTypes.func.isRequired,
    attribute: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
};