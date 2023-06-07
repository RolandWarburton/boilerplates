import styled from 'styled-components';

const ColoredHexBox = styled.div`
background: ${props => props.color ? `#${props.color}` : 'white'}
`

export { ColoredHexBox }
