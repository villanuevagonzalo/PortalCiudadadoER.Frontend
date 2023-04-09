import styled from "styled-components";

//// Common Elements



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

  & li{
    
    list-style: circle outside;
    padding-left: 0.25rem;

    & span{
      margin-left:-0.25rem;
    }
    
  }
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