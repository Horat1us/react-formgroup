import * as React from "react";

import {BaseInput} from "./BaseInput";

export class NumericInput extends BaseInput<HTMLInputElement> {

    protected cleanValue: number | string = "";

    public render() {
        const childProps = {
            ...this.childProps,
            ...{
                onInput: this.handleInputChange,
                onChange: () => undefined,
                type: "number"
            }
        };

        return <input {...childProps} />;
    }

    protected handleInputChange = async (event: any) => {
        this.props.onChange && this.props.onChange(event);
        if (!event.defaultPrevented) {

            const parsedValue = parseInt(event.currentTarget.value, 10);

            this.cleanValue = parsedValue
                ? parsedValue
                : (this.cleanValue.toString().length > 1 ? this.cleanValue : "");

            event.currentTarget.value = "";
            event.currentTarget.value = this.cleanValue;

            await this.context.onChange(this.cleanValue);
        }
    };
}
