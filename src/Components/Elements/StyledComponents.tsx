import styled from "styled-components";

//// Common Elements




//// FORMS

export const FormWrapperButton = styled.button<{ fullwidth?: boolean, size?:number }>`
  ${props => props.fullwidth?'width:100%;':''}
  align-items: center;
  background-color: var(--${props => (props.color ? props.color : 'primary')})!important;
  border-radius: 0.5rem;
  color: var(--${props => (props.color ? props.color : 'primary')}_text)!important;
  display:flex;
  font-size: ${props => (props.size ? props.size*0.9 : '0.9')}rem;
  gap:0.5rem;
  justify-content:center;
  margin-bottom: 0;
  min-width:125px;
  padding: ${props => (props.size ? props.size*1 : '0.5')}rem 1rem;
  text-align:center;

  &:disabled{
    opacity:0.5;
  }

  &:hover{
    background-color: var(--${props => (props.color ? props.color : 'primary')}_tint)!important;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 5px;
  }
`;

export const FormWrapperInput = styled.div<{ error?: boolean, disabled?: boolean, fullwidth?: boolean, focus?: boolean, dummy?: boolean, largeerror?:boolean }>`
  background-color: var(--${props => props.dummy?'maincolor':'maincolor'});
  min-width:150px;
  margin-bottom: ${props => props.error?(props.largeerror?'3rem':'2rem'):(props.dummy?'0rem':'1rem')};
  border: 2px solid var(--${props => props.dummy?'maincolor':(props.error?'error':'disabled')});
  position: relative;
  display:flex;
  opacity: ${props => props.disabled?'0.5':'1'};
  border-radius: 0.5rem;
  flex:1;
  max-height:2.75rem;

  & input{
    position: relative;
    padding: ${props => props.dummy?'0.6rem 0rem 0rem':'0.6rem 0.75rem 0.5rem'};
    background: transparent;
    outline:none;
    width: 100%;
    z-index: 1;
    font-size: 0.9rem;
    color: var(--maincolor_text);
  }
  
  & div{
    outline:none;
    padding 0.5rem;
    font-size: 1.5rem;
    color: var(${props => props.error?'--error':'--maincolor_text'});
    cursor: pointer;
    z-index: 1;
  }


  & span, label{
    background: var(--maincolor);
    border-radius:0.25rem;
    position: absolute;
    transition 0.1s;
    z-index: 2;
    pointer-events: none;

  }

  & label{
    top: ${props => props.focus?'-0.65rem':'0.45rem'};
    color:var(--${props => props.dummy?'primary':(props.error?'error':'maincolor_text')});
    left: ${props => props.dummy?'-0.25rem':'0.5rem'};
    padding: 0 0.25rem;
    font-size: ${props => props.focus?'0.75rem':'0.90rem'};
  }

  & span{
    text-align: justify;
    top: 2.75rem;
    color:var(--error);
    right: 0;
    font-size: 0.75rem;
  }
`;

export const FormWrapperUL = styled.div<{ }>`
  width:100%;
  background: var(--maincolor);
  position: relative;
  z-index: 3;
  top: -1.5rem;
  border: 2px solid var(--disabled);
  border-top: 0;
  padding:0.5rem 0;
  font-size: 0.75rem;
  border-radius:0 0 0.5rem 0.5rem;
  list-style: none;
  
  & div{
    max-height:10rem;
    overflow:auto;
  }

  & li{
    line-height:1.5rem;
    padding:0.25rem 0.75rem;
    border-top: 1px solid var(--disabled);

    &.active{
      background: var(--primary_text);

    }
    
    &:hover{
      background: var(--maincolor_tint);
      cursor:pointer;
    }
  }

`

export const FormWrapperCheckbox = styled.div<{ error?: boolean, disabled?: boolean, fullwidth?: boolean , focus?: boolean, checked?: boolean }>`

  width:100%;
  margin:-0.25rem 0 1rem 0;
  position: relative;
  display:flex;
  flex-direction: column;
  opacity: ${props => props.disabled?'0.5':'1'};
  transition: all .1s ease-in;
  font-size: 0.9rem;
  
  
  & div.CheckboxText{
    display:flex;
    transition: all .1s ease-in;
    color: var(--${props => props.error?'error':(props.checked?'primary_tint':'gray')});
    z-index: 1;
    justify-content:top;
    line-height: 1.25rem;
    align-items:top;
    width:100%;
    justify-content:left;
    align-items:center;
    cursor:pointer;

    & div{
      font-size:1rem;
      padding:0.125rem 0.5rem 0rem 0;

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


//// HELPERS

export const Spinner = styled.div<{ size?: string }>`
  animation: spin 1s ease infinite;
  border-radius: 50%;
  border: 4px solid transparent;
  border-left-color: var(--${props => (props.color ? props.color : 'primary-gradient-color')});
  height:${props => props.size?props.size:'1.25rem'};
  width:${props => props.size?props.size:'1.25rem'}!important;
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

export const NavigatorSpacer = styled.div<{ open?: boolean }>`
  flex:1;
`;

// REVIEW >>>>>>>>>>>>>>>>>>>












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






//// NEW LAYOUT
export const Sidebar = styled.div<{ width?: string }>`
  align-items: center;
  align-self: top;
  background: var(--maincolor);
  display: flex;
  flex-direction: column;
  gap:0;
  padding:3rem;
  box-sizing: border-box;
  width:100%;
  min-width: 400px;
  max-width: 400px;
  min-height: 100%;
`;

export const MainContainer = styled.div`
  align-items: center;
  align-self: top;
  background: var(--${props => (props.color ? props.color : 'maincolor')});
  display: flex;
  flex-direction: column;
  gap:0;
  flex:1;
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
  width:100%;
  gap: 4;
  margin-top: 1rem;
  flex-direction: row;
`;



export const InputWrapper = styled.div<{ error?: boolean, disabled?: boolean, fullwidth?: boolean , focus?: boolean }>`
  background-color: var(--maincolor);
  width:${props => props.fullwidth?'100%':'auto'};
  min-width:150px;
  margin-bottom: 2rem;
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
    background: var(--maincolor);
    z-index: 2;
    pointer-events: none;
  }

  & label{
    top: ${props => props.focus?'-0.65rem':'0.45rem'};
    color:var(${props => props.error?'--error':(props.focus?'--maincolor_text':'--disabled')});
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

export const InputWrapper2 = styled.div<{ error?: boolean, disabled?: boolean, fullwidth?: boolean , focus?: boolean, checked?: boolean }>`
  background-color: var(--maincolor);
  width:${props => props.fullwidth?'100%':'auto'};
  min-width:150px;
  margin-bottom: 1.5rem;
  position: relative;
  display:flex;
  flex-direction: column;
  opacity: ${props => props.disabled?'0.5':'1'};
  transition: all .1s ease-in;
  font-size: 0.9rem;
  

  
  & div.CheckboxText{
    display:flex;
    transition: all .1s ease-in;
    color: var(--${props => props.error?'error':(props.checked?'primary_tint':'gray')});
    z-index: 1;
    justify-content:top;
    align-items:top;
    width:100%;
    justify-content:center;
    align-items:center;
    cursor:pointer;
    border: 2px solid var(--${props => props.error?'error':(props.checked?'primary_tint':'gray')});
    padding:1rem;
    border-radius:0.25rem;

    & div{
      font-size:1.5rem;
      padding:0.25rem 1rem 0 0;

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



export const CaptchaWrapper = styled.div<{ open?: boolean }>`
  font-size: 1.5rem;
  color: var(--maincolor_text);
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
  background: var(--maincolor);
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

export const ContainerImageWrapper = styled.div<{ open?: boolean }>`
  cursor:pointer;
  overflow:hidden;
  user-select: none;
  min-height:100px;
  display: flex;
  width:100%;

  & img{
    min-height:100%;
    align-self: center;
    flex: 1;
  }
`;

export const ContainerTextWrapper = styled.div<{ open?: boolean }>`
  flex: 1;
  background: var(--maincolor_tint);
  width:100%;
  display:flex;
  padding:2rem;
  gap: 2rem;

  & div{
    flex:1;
  }

  & h1{
    font-size: 2rem;
    font-weight:bold;
    color: var(--primary);
    border-bottom: 1px solid var(--disabled_tint)
  }

  & li{
    display:flex;
    margin-top: 0.5rem;
    padding: 0.5rem 0.75rem;
    border-radius:0.25rem;
    gap:0.25rem;

    & h2{
      flex:1;
      font-size: 0.9rem;
    }
    & span{
      display:flex;
      font-size: 1.5rem;
      align-items:center;
    }

    &:hover{
      background: var(--disabled);
      cursor:pointer;
    }

  }
`;


export const DivTitle = styled.div<{ open?: boolean }>`
  font-size: 1.5rem;
  color: var(--${props => (props.color ? props.color : 'maincolor_text')});
  width:100%;
  display:flex;
  text-align:center;
  justify-content:center;
  align-items:center;
  font-weight:bold;
  gap:0.5rem;
`;

export const DivTitle2 = styled.div<{ open?: boolean }>`
  font-size: 1.25rem;
  color: var(--${props => (props.color ? props.color : 'primary')});
  font-weight:bold;
  width:100%;
`;

export const DivSubtitle = styled.div<{ open?: boolean }>`
  font-size:0.8rem;
  color: var(--${props => (props.color ? props.color : 'maincolor_text')});
  width:100%;
  margin-bottom:1rem;
`;

export const DivLabel = styled.div<{ open?: boolean }>`
  font-size: 0.8rem;
  color: var(--${props => (props.color ? props.color : 'primary')});
  width:100%;
  padding: 0.5rem 1rem;
  text-align:center;
`;


export const DivOutlined = styled.div<{ open?: boolean }>`
  align-items:center;
  border-radius:0.5rem;
  border: 2px solid  var(--${props => (props.color ? props.color : 'error')});
  color: var(--${props => (props.color ? props.color : 'error')});
  cursor:pointer;
  display:${props => props.open?'flex':'none'};
  font-size: 1rem;
  justify-content:center;
  padding:1rem;
  text-align:center;
  width:100%;
`

DivOutlined.defaultProps = {
  open: true
};


export const Container = styled.div`
  align-items: center;
  align-self: center;
  background: var(--${props => (props.color ? props.color+'-gradient-background' : 'maincolor')});
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

export const ContainerItemOLD = styled.div`
  background: white;  
  border-radius:0.5rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  flex:1;
  width:100%;
  padding:1rem;
  font-size:1em;
  color: var(--maincolor_text);
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
  color: var(--maincolor_text);
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

export const ContainerCard2 = styled.div`
  background: white;  
  border-radius:0.5rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  flex:1;
  width:100%;
  padding:1rem;
  text-align: left;
  font-size:1.25rem;
  color: var(--maincolor_text);
  align-items: left;
  align-self: top;
  display: flex;
  gap:0rem;
  flex-direction: column;
  
  & svg{
    width: 3em;
    height: 3em;
    margin: 0 auto 1rem;
  }
`;



export const NavigationBar = styled.div`
  background: var(--${props => (props.color ? props.color+'-gradient-background' : 'maincolor')});
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
cuit
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










export const BOX = styled.div<{ width?: string, height?: string }>`
  width: ${props => props.width?props.width:'100px'};
  height: ${props => props.height?props.height:'100px'};
  background: cyan;
  display:block;
`;


export const Card = styled.div<{ color?: string }>`
  background-color: var(--${props => (props.color ? props.color : 'primary')});
  color: white;
  display: flex;
  flex-direction: column;
  width:100%;
  min-width:150px;
  padding: 1rem;
  border-radius: 0.5rem;
  display:flex;
`;


// Elements

export const SVGPath = styled.path<{ color?: string }>`
  fill: ${props => (props.color ? props.color : 'white')};
  fill-rule:nonzero;
`;