import React from 'react';
import renderer from 'react-test-renderer';
import { Button } from "./button";
import { render, getByTestId, fireEvent } from '@testing-library/react';

describe('Кнопка рендерится без ошибок', () => {
  it('Кнопка с текстом', () => {
    const tree = renderer
      .create(<Button text='test text' />).toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('Кнопка без текста', () => {
    const tree = renderer
      .create(<Button />).toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('Заблокированная кнопка', () => {
    const tree = renderer
      .create(<Button disabled={true} />).toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('Кнопка с лоадером', () => {
    const tree = renderer
      .create(<Button isLoader={true} />).toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('Нажатие на кнопку вызывает корректный alert', () => {
    window.alert = jest.fn();
    const { container } = render(<Button onClick={alert('Клик по кнопке!')} data-testid="button" />)
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const button = getByTestId(container, "button");
    fireEvent.click(button);
    expect(window.alert).toHaveBeenCalledWith('Клик по кнопке!');
  }); 
})