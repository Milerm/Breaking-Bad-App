import React from 'react'
import { shallow } from 'enzyme'
import { CharacterList } from '../../../components/characters/CharacterList'

describe('Pruebas en <CharacterList />', () => {
  const wrapper = shallow(<CharacterList />)

  test('debe mostrar el componente correctamente', () => {
    expect(wrapper).toMatchSnapshot()
  })

  // test('debe listar los primeros 5 personajes', () => {
  //   const items = wrapper.find('CharacterItem').length
  //   expect(items).toBe(5)
  // })
  
})
