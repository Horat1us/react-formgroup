import * as React from "react";
import {FormGroupContext, FormGroupContextTypes} from "../FormGroup/FormGroupContext";
import {InputContext, InputContextTypes} from "./InputContext";
import {BaseInput} from "./BaseInput";

export class NumericInput extends BaseInput<HTMLInputElement> {

    public render() {
        const childProps = {
            ...this.childProps,
            ...{
                onInput: this.handleInputChange,
                onChange: () => undefined,
            }
        };

        return <input {...childProps} />;
    }

    protected handleInputChange = async (event: any) => {
        this.props.onChange && this.props.onChange(event);
        if (!event.defaultPrevented) {

            const cleanValue = parseInt(event.currentTarget.value, 10) || "";
            event.currentTarget.value = "";
            event.currentTarget.value = cleanValue;

            await this.context.onChange(event.currentTarget.value);
        }
    };
}