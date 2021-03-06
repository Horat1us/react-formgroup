import * as PropTypes from "prop-types";

import { AutoValidateProps, AutoValidatePropTypes } from "../AutoValidate/AutoValidateProps";

export interface AutoFocusProps extends AutoValidateProps {
    to: string,
}

export const AutoFocusPropTypes: {[P in keyof AutoFocusProps]: PropTypes.Validator<any>} = {
    to: PropTypes.string.isRequired,
    ...AutoValidatePropTypes
};
