import styled from "styled-components";

//// Common Elements
export const Box = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  width: 100%;
`;

export const Title = styled.div`
  color: white;
  font-size: 2rem;
  display: flex;
  justify-content: left;
  padding: 1rem;
  width: 100%;
`;

export const Spinner = styled.div`
  animation: spin 1s ease infinite;
  border-left-color: var(--primary-gradient-color)!important;
  border-radius: 50%;
  border: 4px solid transparent;
  height: 1.25rem;
  width: 1.25rem;
  margin: 0 auto;

  @keyframes spin {
      0% {
          transform: rotate(0deg);
      }
      100% {
          transform: rotate(360deg);
      }
  }
`;

//// NEW LAYOUT
export const Sidebar2 = styled.div<{ width?: string, open: boolean }>`
  align-items: center;
  align-self: center;
  background: var(--main-background);
  display: flex;
  flex-direction: column;
  gap:0;
  padding:2rem;
  box-sizing: border-box;
  width:100%;
  min-width: 350px;
  max-width: 450px;
  min-height: 100%;
  border-right: 2px solid var(--disabled);
  border-bottom: 2px solid var(--disabled);
`;

export const MainContainer2 = styled.div`
  align-items: center;
  align-self: center;
  display: flex;
  flex-direction: column;
  gap:0;
  flex:1;
  width:100%;
  height: 100%;
  min-height:200px;
`;

export const NavigatorWrapper = styled.div<{ open?: boolean }>`
  border-top: 1px solid var(--disabled);
  padding-top: 1rem;
  display: flex;
  gap: 2;
  margin-top: 1rem;
  flex-direction: row;
`;

export const NavigatorSpacer = styled.div<{ open?: boolean }>`
  flex:1;
`;





//// Layout
export const MainContainer = styled.div`
  align-items: center;
  align-self: center;
  background: var(--${props => (props.color ? props.color : 'main-background')});
  display: flex;
  flex-direction: column;
  flex: 1;
  gap:0;
  width: 100%;
  height: 100%
`;


export const SidebarWrapper = styled.div<{ width?: string, open: boolean }>`
  align-items: center;
  align-self: center;
  background: var(--main-background);
  display: flex;
  flex-direction: column;
  flex: 1;
  gap:0;
  width:100%;
  max-width: ${props => props.width ? props.width : '200px'};
  margin-left: ${props => (props.open ? '0px' : (props.width ? '-'+props.width : '-200px'))};
  height: 100%;
  position:absolute;
  overflow-x: hidden;
  overflow-y: auto;
  border-right: 2px solid var(--disabled);
  
  transition: margin 0.25s ease;
`;

export const SidebarBurger = styled.div<{ open?: boolean }>`
  cursor:pointer;
  font-size:2em;  
  position:absolute;
  left:0.25em;
  top:0.25em;
  user-select: none;
`;


export const TitleDiv = styled.div<{ open?: boolean }>`
  font-size: 1.5rem;
  color: var(--main-color);
  width:100%;
`;

export const Title2Div = styled.div<{ open?: boolean }>`
  font-size: 1.25rem;
  color: var(--secondary);
  font-weight:bold;
  width:100%;
`;

export const SubtitleDiv = styled.div<{ open?: boolean }>`
  font-size:0.8rem;
  color: var(--main-color);
  width:100%;
  margin-bottom:1rem;
`;

export const LabelDiv = styled.div<{ open?: boolean }>`
  font-size: 0.8rem;
  color: var(--${props => (props.color ? props.color : 'primary')});
  width:100%;
  padding: 0.5rem 1rem;
  text-align:center;
`;


export const ButtonWrapper = styled.button<{ fullwidth?: boolean }>`
  font-size: 0.9rem;
  color: var(--main-background);
  width:${props => props.fullwidth?'100%':'auto'};
  min-width:150px;
  padding: 0.5rem 1rem;
  text-align:center;
  background-color: var(--${props => (props.color ? props.color : 'primary')})!important;
  border-radius: 2rem;
  margin-bottom: 0.5rem;

  &:disabled{
    background-color:var(--disabled)!important;
  }
`;



export const Container = styled.div`
  align-items: center;
  align-self: center;
  background: var(--${props => (props.color ? props.color+'-gradient-background' : 'main-background')});
  display: flex;
  flex-direction: column;
  flex: 1;
  gap:0;
  width: 100%;
`;

export const ContainerBody = styled.div`
  align-items: center;
  align-self: center;
  display: flex;
  flex-direction: column;
  gap:1rem;
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
`;

export const ContainerItem = styled.div`
  background: white;  
  border-radius:0.5rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  flex:1;
  width:100%;
  padding:1rem;
  font-size:1em;
  color: var(--main-color);
  align-items: center;
  flex-direction: column;
  align-self: top;
  display: flex;
  gap:0.75rem;
  
  & h1{
    display: flex;
    width:100%;
    font-size:1.25rem;
    flex-direction: row;
    align-items: center;
    border-bottom: 0.1rem solid var(--disabled)!important;
    padding-bottom: 0.75rem;
    font-weight:600;
  }
  
  & div{
    width:100%;
  }
  
  & svg{
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.75rem;
  }
`;

export const ContainerCard = styled.div`
  background: white;  
  border-radius:0.5rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  flex:1;
  width:100%;
  padding:1rem;
  text-align: center;
  font-size:1.25rem;
  color: var(--main-color);
  align-items: center;
  align-self: top;
  display: flex;
  gap:0.75rem;
  flex-direction: column;
  
  & svg{
    width: 3em;
    height: 3em;
    margin: 0 auto 1rem;
  }
`;



export const NavigationBar = styled.div`
  background: var(--${props => (props.color ? props.color+'-gradient-background' : 'main-background')});
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(8em, 1fr));
  grid-gap: 1rem;
  padding: 1rem;
  width: 100%;
  font-size:1.25rem;

  & svg{
    width: 2em;
    height: 2em;
  }

  
  @media (max-width: 768px) {   
    font-size:1rem;

    & svg{
      width: 2rem;
      height: 2rem;
    }
  }
`;

export const IconContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  align-self: top;
  justify-content: center center;
  padding: 1rem;
  gap: 1rem;
  flex: 1;
  width: 100%;
  max-width: 80rem;
`;

export const IconBox = styled.div<{
  size?: string
}>`
  background: white;  
  border-radius:0.5rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  color: ${props => (props.color ? 'black' : '#888')};
  cursor:pointer;
  display: flex;
  font-weight: 600;
  padding: 1rem;
  max-width: 12rem;
  position: relative;
  top: 0;
  transition: all .1s ease-in;
  width:100%;
  text-align:center;

  & svg{
    margin: 0.5rem auto;
  }

  & h1{
    width:100%;
    align-items: center;
    align-self: top;
  }

  &:hover {
    top: -2px;
    box-shadow: 0 4px 5px rgba(0,0,0,0.2);
  }
`;




export const IconBox2 = styled.div`
  background: white;  
  border-radius:0.5rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  color: ${props => (props.color ? 'black' : '#888')};
  cursor:pointer;
  display: flex;
  font-weight: 600;
  padding: 1rem;
  max-width: 15rem;
  position: relative;
  top: 0;
  transition: all .1s ease-in;
  width:100%;
  text-align:center;

  & svg{
    margin: 0.5rem auto;
  }

  & h1{
    width:100%;
    align-items: center;
    align-self: top;
  }

  &:hover {
    top: -2px;
    box-shadow: 0 4px 5px rgba(0,0,0,0.2);
  }
`;