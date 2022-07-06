import React from 'react';
import renderer from 'react-test-renderer';
import { Circle } from './circle';
import { ElementStates } from '../../../types/element-states';

describe('Circle рендерится без ошибок', () => {
  it('Circle без букв', () => {
    const tree = renderer
      .create(<Circle />).toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('Circle с буквами', () => {
    const tree = renderer
      .create(<Circle letter='Test text' />).toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('Circle с текстом в head', () => {
    const tree = renderer
      .create(<Circle head={'Test head'} />).toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('Circle с react компонентом в head', () => {
    const tree = renderer
      .create(<Circle head={<Circle />} />).toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('Circle с текстом в tail', () => {
    const tree = renderer
      .create(<Circle tail={'Test tail'} />).toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('Circle с react компонентом в tail', () => {
    const tree = renderer
      .create(<Circle tail={<Circle />} />).toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('Circle с index', () => {
    const tree = renderer
      .create(<Circle index={1} />).toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('Circle с пропом isSmall', () => {
    const tree = renderer
      .create(<Circle isSmall={true} />).toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('Circle в состоянии default', () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Default} />).toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('Circle в состоянии changing', () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Changing} />).toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('Circle в состоянии modified', () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Modified} />).toJSON();
      expect(tree).toMatchSnapshot();
  });
})