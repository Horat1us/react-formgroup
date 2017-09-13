import * as React from "react";
import {expect} from "chai";
import {InputRange} from "../src/InputRange";
import {mount, ReactWrapper} from "enzyme";
import {FormGroupContext} from "../src/FormGroup/FormGroupContext";

describe("<InputRange/>", () => {
    let wrapper: ReactWrapper<React.HTMLProps<HTMLInputElement>, any>;
    let node: InputRange;

    let previousContext: FormGroupContext;

    const name = "fieldName";
    let controlValue = 12;

    const onChange = (value: any) => controlValue = value;
    const onBlur = () => onChange(wrapper.context().value);
    const onFocus = (...args) => undefined;
    const onMount = (...args) => undefined;

    const id = "prefix-" + (new Date());

    const props = {
        max: 200,
        min: 10
    };

    const context: FormGroupContext = previousContext = {
        id,
        name,
        onChange, onBlur, onFocus, onMount,
        value: controlValue,
    };

    beforeEach(() => {

        wrapper = mount(
            <InputRange {...props}>
                <div/>
            </InputRange>,
            {context}
        );

        node = wrapper.getNode() as any;
    });

    afterEach(() => wrapper.unmount());

    it("Should update value from context on change", () => {
        for (let i = props.min; i < props.max; i++) {
            node.getChildContext().onChange(i);

            wrapper.setContext({
                ...context,
                ...{value: controlValue}
            });

            expect(wrapper.context().value).to.equal(i);
        }
    });

    it("Should set new value cutting it according to length of `props.max` on change", () => {
        const newValue = props.max * 100;
        const maxLength = props.max.toString().length;

        node.getChildContext().onChange(newValue);

        wrapper.setContext({
            ...context,
            ...{value: controlValue}
        });

        const expectedValue = Number(controlValue.toString().substring(0, maxLength));

        expect(wrapper.context().value).to.equal(expectedValue);
    });

    it("Should set max value if new value more then `props.max` on change", () => {
        const newValue = props.max + 1;

        node.getChildContext().onChange(newValue);

        wrapper.setContext({
            ...context,
            ...{value: controlValue}
        });

        expect(wrapper.context().value).to.equal(props.max);
    });

    it("Should update value from context on blur", () => {
        for (let i = props.min; i < props.max; i++) {
            wrapper.setContext({
                ...context,
                ...{value: i}
            });

            node.getChildContext().onBlur();

            wrapper.setContext({
                ...context,
                ...{value: controlValue}
            });

            expect(wrapper.context().value).to.equal(i);
        }
    });

    it("Should set max value if new value more then `props.max` on blur", () => {
        const newValue = props.max + 1;

        wrapper.setContext({
            ...context,
            ...{value: newValue}
        });

        node.getChildContext().onBlur();

        wrapper.setContext({
            ...context,
            ...{value: controlValue}
        });

        expect(wrapper.context().value).to.equal(props.max);

    });

    it("Should set min value if new value less then `props.min` on blur", () => {
        const newValue = props.min - 1;

        wrapper.setContext({
            ...context,
            ...{value: newValue}
        });

        node.getChildContext().onBlur();

        wrapper.setContext({
            ...context,
            ...{value: controlValue}
        });

        expect(wrapper.context().value).to.equal(props.min);

    });

    it("Should set empty string if value is not exist on change", () => {

        node.getChildContext().onChange("");

        wrapper.setContext({
            ...context,
            ...{value: controlValue}
        });

        expect(wrapper.context().value).to.equal("");
    });

    it("Should set min value if value is not exist on blur", () => {

        wrapper.setContext({
            ...context,
            ...{value: ""}
        });

        node.getChildContext().onBlur();

        wrapper.setContext({
            ...context,
            ...{value: controlValue}
        });

        expect(wrapper.context().value).to.equal(props.min);
    });
});
