import styled from "styled-components"

//// Common Elements
export const Box = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
    width: 100%;
`;

//// Layout
export const Container = styled.div`
    background:red;
    align-items: center;
    align-self: center;
    background: var(--primary-gradient-background);
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center center;
    width: 100%;
`


export const IconContainer = styled.div`
    display: flex;
    align-items: center;
    align-self: center;
    align-self: top;
    flex-wrap: wrap;
    justify-content: center center;
    padding: 1rem;
    gap:1rem;
    width: 100%;
`

export const IconBox = styled.div`
border-radius:0.5rem;
display: flex;
padding: 1rem;
  background: white;
  width:100%;
  max-width: 30rem;
  height: 5rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  font-size:1.5rem;
  line-height: 2.75rem;
  
  cursor:pointer;
  color: #444;
  position: relative;
  top: 0;
  font-weight: 600;
  transition: all .1s ease-in;
}

&:hover {
  top: -2px;
  color: var(--primary);
  box-shadow: 0 4px 5px rgba(0,0,0,0.2);
}
`
