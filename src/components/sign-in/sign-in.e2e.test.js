import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SignIn from "./sign-in.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const mockEvent = {
  preventDefault() {}
};

describe(`Sign-in e2e tests`, () => {
  it(`Test submit button calls callback`, () => {
    const onSubmit = jest.fn();

    const wrapper = mount(
        <SignIn
          onSubmit = {onSubmit}
          isAuthorization = {false}
        />
    );

    const {emailRef} = wrapper.instance();
    emailRef.current.value = `mail@mail.ru`;

    const {passwordRef} = wrapper.instance();
    passwordRef.current.value = `123456`;

    wrapper.find(`form`).simulate(`submit`, mockEvent);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenLastCalledWith({email: `mail@mail.ru`, password: `123456`});
  });
});
