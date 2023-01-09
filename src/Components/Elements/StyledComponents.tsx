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
export const Sidebar = styled.div<{ width?: string, open: boolean }>`
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
`;

export const MainContainer = styled.div`
  align-items: center;
  align-self: center;
  background: var(--${props => (props.color ? props.color : 'main-background')});
  display: flex;
  flex-direction: column;
  gap:0;
  flex:1;
  width:100%;
  height: 100%;
`;

export const ToDo = styled.div`
  background: var(--${props => (props.color ? props.color : 'primary-gradient-background')});
  color: white;
  display: flex;
  flex-direction: column;
  gap:0;
  width:100%;
  height:100%;
  padding:2rem;
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


export const InputWrapper = styled.div<{ error?: boolean, disabled?: boolean, fullwidth?: boolean , focus?: boolean }>`
  background-color: var(--main-background);
  width:${props => props.fullwidth?'100%':'auto'};
  min-width:150px;
  margin-bottom: 1.5rem;
  border: 2px solid var(${props => props.error?'--error':'--disabled'});
  position: relative;
  display:flex;
  opacity: ${props => props.disabled?'0.5':'1'};
  border-radius: 0.5rem;

  & input{
    position: relative;
    padding: 0.6rem 0.75rem 0.5rem;
    background: transparent;
    outline:none;
    width: 100%;
    z-index: 1;
    font-size: 0.9rem;
  }
  
  & div{
    outline:none;
    padding 0.5rem;
    font-size: 1.5rem;
    color: var(${props => props.error?'--error':'--disabled_tint'});
    cursor: pointer;
    z-index: 1;
  }


  & span, label{
    position: absolute;
    transition 0.1s;
    background: var(--main-background);
    z-index: 2;
    pointer-events: none;
  }

  & label{
    top: ${props => props.focus?'-0.65rem':'0.45rem'};
    color:var(${props => props.error?'--error':(props.focus?'--main-color':'--disabled')});
    left: 0.5rem;
    padding: 0 0.25rem;
    font-size: ${props => props.focus?'0.75rem':'0.90rem'};
  }

  & span{
    top: 2.75rem;
    color:var(--error);
    right: 0;
    font-size: 0.75rem;
  }
  


`;

export const InputWrapper2 = styled.div<{ error?: boolean, disabled?: boolean, fullwidth?: boolean , focus?: boolean }>`
  background-color: var(--main-background);
  width:${props => props.fullwidth?'100%':'auto'};
  min-width:150px;
  margin-bottom: 1.5rem;
  position: relative;
  display:flex;
  flex-direction: column;
  opacity: ${props => props.disabled?'0.5':'1'};
  transition: all .1s ease-in;
  
  & div.CheckboxText{
    display:flex;
    transition: all .1s ease-in;
    color: var(${props => props.error?'--error':'--main-color'});
    z-index: 1;
    justify-content:top;
    align-items:top;

    & div{
      font-size:1rem;
      padding:0.25rem 0.5rem 0 0;
    }

    & *{
      cursor: pointer;
    }
  }

  & span{
    transition 0.1s;
    z-index: 2;
    pointer-events: none;
    margin-top:0.5rem;
    text-align:right;
    color:var(--error);
    font-size: 0.75rem;
  }
`;


export const FormikError = styled.div<{ open?: boolean }>`
  font-size: 1rem;
  color: var(--error);
  width:100%;
  display:${props => props.open?'flex':'none'};
  justify-content:center;
  text-align:center;
  align-items:center;
  border: 1px solid  var(--error);
  padding:1rem;
  margin-top:1rem;
  border-radius:0.25rem;

`;

export const CaptchaWrapper = styled.div<{ open?: boolean }>`
  font-size: 1.5rem;
  color: var(--main-color);
  width:100%;
  display:flex;
  justify-content:center;
  text-align:center;
  align-items:center;
`;


//// Layout


export const SidebarHideableWrapper = styled.div<{ width?: string, open: boolean }>`
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
  color: var(--${props => (props.color ? props.color : 'main-color')});
  width:100%;
  display:flex;
  justify-content:start;
  align-items:center;
  gap:0.5rem;
`;

export const Title2Div = styled.div<{ open?: boolean }>`
  font-size: 1.25rem;
  color: var(--secondary);
  font-weight:bold;
  width:100%;
`;

export const SubtitleDiv = styled.div<{ open?: boolean }>`
  font-size:0.8rem;
  color: var(--${props => (props.color ? props.color : 'main-color')});
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
  display:flex;
  align-items: center;
  justify-content:center;
  gap:0.5rem;

  &:disabled{
    opacity:0.5;
  }

  &:hover{
    background-color: var(--${props => (props.color ? props.color : 'primary')}_tint)!important;
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