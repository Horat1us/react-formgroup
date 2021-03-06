import * as PropTypes from "prop-types";

export interface AutoUpdateProps {
    value: (value: any) => any,
    attribute: string,
    children: JSX.Element,
    onBlur?: boolean,
    onChange?: boolean,
}

export const AutoUpdatePropTypes: {[P in keyof AutoUpdateProps]: PropTypes.Validator<any>} = {
    value: PropTypes.func.isRequired,
    attribute: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    onBlur: PropTypes.bool,
    onChange: PropTypes.bool,
};

export const AutoUpdateDefaultProps = {
    onBlur: true,
    onChange: false,
};
