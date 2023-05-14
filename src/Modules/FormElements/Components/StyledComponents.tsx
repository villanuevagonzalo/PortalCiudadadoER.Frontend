import styled from "styled-components";

export const FormElementBasesMenu = styled.div<{ match?: boolean }>`
  display: flex;
  flex-direction: column;
  width:100%;
  gap:0.25rem;

  & div{
    display:flex;
    align-items: center;
    align-self: top;
    border-radius:0.5rem;
    color:var(--maincolor_text);
    transition: background .05s ease-in;
    cursor:pointer;
    gap:0.5rem;
    padding: 0 0.5rem;

    

    & span{
      color:var(--primary_tint);
      font-size:1rem;
      width: 1rem;
      height: 2rem;
      display:flex;
      justify-content: center;
      align-items: center;
      border-radius:0.5rem;
    }

    & ul{
      display: flex;
      flex-direction: column;
      flex:1;
      gap:0rem;
    }

    & a{
      display: flex;
      align-items: center;
      flex:1;
      gap:0.5rem;
    }

    & li{
      font-size:0.9rem;
      align-items: center;
      display:flex;
      height: 2rem;
      font-size:0.8rem;

      &.title{
        font-weight:600;

        &.haschildren{
          margin-bottom:0.25rem;
        }
      }

      &.children{
        font-size:0.9rem;
      }

      & a.active{
        color:var(--secondary);

      }
    }

    &:hover{
      background:var(--disabled);
      color:black;
    }

    
  }
`;

export const ElementWrapper = styled.div<{ }>`
  margin-bottom: 1rem;
  display: flex;
  flex-direction:column;
`;

export const InputWrapper = styled.div<{ error?: boolean, disabled?: boolean, fullwidth?: boolean, focus?: boolean, dummy?: boolean, largeerror?:boolean }>`
background-color: var(--maincolor);
border-radius: 0.5rem;
border: 2px solid var(--${props => props.dummy?'maincolor':(props.error?'error':'disabled')});
position: relative;
min-width:150px;
opacity: ${props => props.disabled?'0.5':'1'};

& > div{
  display:flex;
}

& input{
  position: relative;
  padding: ${props => props.dummy?'0.6rem 0rem 0rem':'0.6rem 0.75rem 0.5rem'};
  background: transparent;
  outline:none;
  width: 100%;
  z-index: 1;
  font-size: 0.9rem;
  color: var(${props => props.error?'--error':'--maincolor_text'});
}

& label{
  background: var(--maincolor);
  border-radius:0.25rem;
  color:var(--${props => props.dummy?'primary':(props.error?'error':'maincolor_text')});
  font-size: ${props => props.focus?'0.75rem':'0.90rem'};
  padding: 0 0.25rem;
  left: ${props => props.dummy?'-0.25rem':'0.5rem'};
  pointer-events: none;
  position: absolute;
  top: ${props => props.focus?'-0.65rem':'0.55rem'};
  transition 0.1s;
  z-index: 2;
}

& .FormIcon{
  padding 0.5rem;
  font-size: 1.5rem;
  color: var(${props => props.error?'--error':'--maincolor_text'});
  cursor: pointer;
}

& .FormDropdown{
  flex-direction:column;
  font-size: 0.75rem;
  margin:0.1rem 0 0.50rem;
  max-height:10rem;
  overflow:auto;

  & div{
    line-height:1.5rem;
    padding:0.25rem 0.75rem;
    border-top: 1px solid var(--disabled);

    &.active{
      background: var(--${props => props.error?'error_text':'primary_text'});
    }
    
    &:hover{
      background: var(--maincolor_tint);
      cursor:pointer;
    }
  }
}
`;


export const ElementError = styled.div<{ error?: boolean }>`
  background: var(--maincolor);
  color:var(--error);
  font-size: 0.75rem;
  margin-top:0.25rem;
  pointer-events: none;
  text-align:right;
  transition 0.1s;
`;








export const BaseWrapperInfo = styled.div<{ }>`
  display: flex;
  flex-direction:column;
  border:1px solid var(--disabled);
  border-radius:0.25rem;
  margin:1rem 0;

  & label{
    
    background-image: linear-gradient(45deg, #aaa 10%, #ffffff 10%, #ffffff 50%, #aaa 50%, #aaa 60%, #ffffff 60%, #ffffff 100%);
    background-size: 5px 5px;
    padding:1rem;
    display: flex;
    flex-direction:row;
    justify-content:left;
    align-items:center;
    gap: 0.5rem;
  }
`;