import styled from "styled-components";

//// FORMS

export const FormWrapper = styled.div<{ dummy?: boolean}>`
  margin-bottom: 1rem;
  display:flex;
  flex-direction:column;
`

export const FormWrapperInput = styled.div<{ error?: boolean, disabled?: boolean, fullwidth?: boolean, focus?: boolean, dummy?: boolean, largeerror?:boolean }>`
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

export const FormError = styled.div<{ error?: boolean }>`
  background: var(--maincolor);
  color:var(--error);
  font-size: 0.75rem;
  margin-top:0.25rem;
  pointer-events: none;
  text-align:right;
  transition 0.1s;
`;

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

export const LogoWrapperButton = styled.button`
  position: relative;
  width: 200px;
  height: 50px;
  background-color: transparent;
  border: none;
  padding: 0;
  `;
  


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


export const CaptchaWrapper = styled.div<{ open?: boolean }>`
    margin-bottom: 1rem;
  display:flex;
  flex-direction:column;

  & > div > div > div{ 
    width:100%!important;
    display:flex;
    text-align:center;
    justify-content:center;
    align-items:center;
  }
`;