import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Films from "./films.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`Film e2e tests`, () => {
  it(`Should title be clicked`, () => {
    const onTitleButtonClick = jest.fn();

    const filmsComponent = shallow(
        <Films
          title = {`Aviator`}
          onTitleButtonClick = {onTitleButtonClick}
        />
    );

    const movieTitle = filmsComponent.find(`h3.small-movie-card__title`);

    movieTitle.simulate(`click`);

    expect(onTitleButtonClick).toHaveBeenCalledTimes(1);
  });
});
