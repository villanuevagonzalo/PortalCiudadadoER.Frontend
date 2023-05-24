import styled from "styled-components";

/// MAIN LAYOUT COMPONENTS

export const LayoutHeader = styled.div<{ mobile?:boolean }>`
  background: var(--maincolor_tint);
  display: flex;
  flex-direction: row;
  height: 64px;
  padding:${props => props.mobile?'1rem':'1rem 2rem'};
  width:100%;
  z-index:100;
  gap:${props => props.mobile?'0.5rem':'1rem'};

  & svg[stroke="currentColor"]{
    color:var(--primary_tint);
    height:28px;
    width:28px;
    cursor:pointer;
  }

  ${props => props.mobile?`
  
  border-bottom: 1px solid var(--disabled);
  
  `:`
    & .button{
      margin-top:2px;
      height:36px;
      padding:4px;
      width:36px;
      border-radius:100%;

      & svg{ color:var(--maincolor_text); }

      &:hover{ background:var(--maincolor); }
    }
  
  `};
`;

export const LayoutHeaderSpacer = styled.div<{  }>`
  min-width: 376px;
  flex:1;
  height:10px;
`;

export const LayoutContainer = styled.div<{  }>`
  display: flex;
  flex: 1;
  min-height: 100%;
`;

export const LayoutSidebar = styled.div<{ collapsable?: boolean, open?: boolean, mobile?:boolean }>`
  align-items: center;
  align-self: top;
  background: var(--maincolor);
  box-shadow: rgba(0, 0, 0, 0.05) 3px 0px 15px;
  z-index:100;
  transition: all .1s ease-in;
  overflow:hidden;
  min-width:360px;

  & .Content{
    max-width:360px;
    margin:0 auto;
    padding:30px;
  }

  @media (min-width: 720px) {
    max-width:400px;
  }

  ${props => props.collapsable?`
    margin-right: ${props.open?'-360px':'0'}!important;
    width: ${props.open?'360px':'0px'}!important;
    min-width: ${props.open?'360px':'0px'};

    & .Content{
      padding:20px;
    }
  `:`
    margin-top:${props.hasOwnProperty('open')?'-64px':'0'};
    min-width: 360px;
  `}
`

export const LayoutSidebarMenu = styled.div<{ match?: boolean }>`
  display: flex;
  flex-direction: column;
  width:100%;
  margin:1rem 0 2rem 0;
  gap:0.25rem;

  & div{
    display:flex;
    padding:0.75rem;
    border-radius:0.5rem;
    align-items: top;
    align-self: top;
    color:var(--maincolor_text);
    transition: background .1s ease-in;

    & span{
      background:white;
      transition: background .1s ease-in;
      color:var(--maincolor_text);
      padding:0.5rem;
      border-radius:0.25rem;
      box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 5px;
      height: 2rem;
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
      align-items: center;
      display:flex;
      height: 2rem;
      border-radius:0.25rem;
      padding: 0.5rem 0.75rem;

      &:hover{
        background:var(--maincolor);
      }

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
      color:black;
      & span{
        background:var(--gray_tint);
        color:var(--gray_text);
      }
    }

    &:has(a.active){
      color:black;
      background:white;
      box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 5px;
      & span{
        background:var(--secondary);
        color:var(--secondary_text);
      }
      & li:has(a.active){
        background:transparent!important;
      }
    }

    
  }
`;

export const LayoutFooter = styled.div<{ }>`
  align-items: center;
  align-self: center;
  background: var(--maincolor_tint);
  color: var(--maincolor_text);
  display: flex;
  font-size:1rem;
  gap: 1rem;
  width:100%;
`;

export const LayoutBreadCrumpWrapper = styled.ul<{ color?:string }>`
  align-items: center;
  align-items: left;
  background: var(--maincolor);  
  border-radius:0.5rem;
  border: 1px solid var(--disabled);
  color: var(--maincolor_text);
  display: flex;
  font-size:1rem;
  width:100%;
  padding:0.5rem;
  gap:0.25rem;

  & li{
    display: flex;
    align-items: center;
    gap:0.25rem;

    & p,a{
      display: flex;
      align-items: center;
      gap:0.75rem;
      padding:0.5rem;
      border-radius:0.5rem;
    }

    & p{
      color:var(--${props => (props.color ? props.color : 'primary')});
      font-weight:600;
    }

    & a{
      &:hover{
        background:var(--maincolor_tint); 
      }
    }
  }
`;

export const LayoutBody = styled.div<{ mobile?: boolean }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap:${props => props.mobile?'1rem':'2rem'};
  padding:${props => props.mobile?'1rem':'2rem'};
`;

export const LayoutAlert = styled.div<{ }>`
  margin-top:-1rem;
  align-items:center;
  border-radius:0.5rem;
  border: 2px solid var(--secondary);
  background: var(--maincolor);
  color: var(--secondary_tint);
  cursor:pointer;
  font-size: 1rem;
  justify-content:center;
  padding:1rem;
  text-align:center;
  width:100%;
`;

export const LayoutOverlay = styled.div<{ visible?: boolean }>`
  display:${props => props.visible?'block':'none'};
  background: rgba(0,0,0,0.5);
  position: absolute;
  transition: all .1s ease-in;
  top:0;
  left:0;  
  width:100%;
  height:100%;
  cursor:pointer;
  z-index:60;
  //backdrop-filter: blur(3px);
`;

// COMMON ELEMENTS

export const LayoutStackedPanel = styled.div<{ vertical?:true }>`
  display:flex;
  gap:1rem;
  width:100%;
  flex-direction: ${props => props.hasOwnProperty('vertical')?'column':'row'};
  @media (max-width: 720px) {
    flex-direction: column;
    gap:0;
  }
`;

export const LayoutSpacer = styled.div`
  flex:1;
  @media (max-width: 720px) {
    display:none;
  }
`;


export const LayoutCenterBox = styled.div<{ maxwidth?: string }>`
  margin:0 auto;
  max-width: ${props => props.maxwidth?props.maxwidth:'none'};
`;

export const LayoutColumn = styled.div<{ }>`
  display:flex;
  gap:1rem;
  flex-direction:column;
  min-width:300px;
`;

export const LayoutRow = styled.div<{ }>`
  display:flex;
  gap:1rem;
  flex-direction:row;
  min-width:300px;
`;

export const LayoutSection = styled.div<{ }>`
  background: var(--maincolor);  
  border-radius:0.5rem;
  border: 1px solid var(--disabled);
  width:100%;
  padding:2rem;
  color: var(--maincolor_text);
  align-items: left;
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
    font-weight:600;
    margin-bottom:0.5rem;
  }
  
  & h2,h3{
    display: flex;
    width:100%;
    font-size:1rem;
    flex-direction: row;
    align-items: center;
    font-weight:600;
    margin-bottom:1rem;
  }

  & h2{
    color:var(--primary_tint);
  }

  & h3{
    color:var(--secondary_tint);
  }

  
  & h1 svg{
    width: 2rem;
    height: 2rem;
    margin-right: 0.75rem;
    &.small{
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 0.75rem;
    }
  }

  & button{
    flex:0.1;
  }
`;

export const LayoutGrid = styled.div<{ }>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 1rem;
  grid-auto-rows: minmax(100px, auto);
`;

export const LayoutGridItem = styled.div<{ }>`
  display:flex;
  flex-direction:row;
  background: var(--maincolor);  
  border-radius:0.5rem;
  padding:2rem;
  border: 1px solid var(--disabled);
  justify-items: center;
  align-items: center;
  gap:1rem;
  min-width:250px;

  & h1{
    display: flex;
    width:100%;
    font-size:1.25rem;
    flex-direction: row;
    align-items: center;
    font-weight:600;
    margin-bottom:0.5rem;
  }
  
  & h2{
    display: flex;
    width:100%;
    font-size:1rem;
    flex-direction: row;
    align-items: center;
  }
`;

export const LayoutListItem = styled.div<{ color?:string, disabled?:boolean }>`
  display:flex;
  width:100%;
  background: var(--maincolor);  
  border-radius:0.5rem;
  padding:1.5rem;
  border: 1px solid var(--disabled);
  justify-items: center;
  align-items: top;
  gap:1.5rem;
  cursor:${props => (props.color==='disabled' ? 'default' : 'pointer')};

  & .ListItemIcon{
    color: var(--${props => (props.color ? props.color : 'primary')});
    font-size: 2.25rem;
    line-height: 2.5rem;
    padding-top: 0.5rem;
  }

  & h1{
    width:100%;
    font-size:1.25rem;
    flex-direction: row;
    align-items: center;
    font-weight:600;
    margin-bottom:0.25rem!important;

   
      
    color: var(--${props => (props.color ? props.color : 'primary')});
   
  }
  
  & h2{
    color: var(--${props => (props.color ? props.color : 'primary')});
    display: flex;
    width:100%;
    font-size:1rem;
    flex-direction: row;
    align-items: center;
    margin:0!important;
  }

  &:hover{
    background:var(--${props => (props.color ? props.color : 'primary')}_text);
  }
`;

export const LayoutTitle = styled.h1<{ }>`
  font-size: 2rem;
  line-height: 2.25rem;
  font-weight: 700;
  color: var(--primary);
`;

export const LayoutColumns = styled.div<{ }>`
  display: flex;
  width:100%;
`;

export const FieldGrid = styled.div<{ }>`
  display: flex;
  width:100%;
`;

export const RoundedButton = styled.div<{ }>`
  align-items: center;
  align-self: center;
  border:2px solid var(--gray_tint2);
  display:flex;
  font-size: 0.9rem;
  gap: 0.25rem;
  padding:0.25rem 0.25rem 0.25rem 0.75rem;
  border-radius:0.5rem;
  font-weight:600;
  color:var(--gray_tint);
  margin-right:-0.25rem;

  & svg{
    margin:0px;
    color:var(--gray)!important;
  }

  &:hover{
    background:var(--maincolor);
  }
`;


export const LayoutNote = styled.div<{ color?:string }>`
  width:100%;
  background-color: var(--note-${props => (props.color ? props.color : 'warning')}-bg);
  color: #27272a;
  border: 1px solid  var(--note-${props => (props.color ? props.color : 'warning')}-text);
  width: 100%;
  min-width: 150px;
  font-size: 0.875rem;
  padding: 1rem;
  border-radius: 0.5rem;
`;


export const LayoutText = styled.div`
  font-size:0.8rem;
  color: var(--${props => (props.color ? props.color : 'maincolor_text')});
  width:100%;
`;

/*

  background-color: #eee;
  color: #777;
  border:1px solid #ccc;

  background-color: #def3ff;
  color: #00aff0;
  border:1px solid #75dbff;
  //color: var(--primary_text);


*/