import styled from "styled-components";

/// MAIN LAYOUT COMPONENTS

export const LayoutHeader = styled.div<{ mobile?:boolean }>`
  background: white;
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
      position:relative;

      & svg{ color:var(--maincolor_text); font-size:16px; }

      &:hover {

        & svg {
          color:var(--maincolor_texttint);
        }
        & span {
          background-color: var(--secondary_tint);
        }
       }

      & span {
        position: absolute;
        bottom: -4px;
        right: -4px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 22px;
        height: 22px;
        background-color: var(--secondary);
        border:2px solid var(--maincolor_tint);
        border-radius: 50%;
        color: white;
        font-size: 12px;
        font-weight: bold;
      }
    }

  `};
`;

export const LayoutActorHeader = styled.div<{ mobile?:boolean, secondaryHeader?:boolean }>`
  background: white;
  display: flex;
  flex-direction: row;
  height: 56px;
  padding:0.5rem 2rem;
  width:100%;
  z-index:100;
  gap:1rem;

  ${props => props.secondaryHeader && `
    height: 50px;
    margin-left: 0;
  `}

  border-top: ${props => props.secondaryHeader ? '1px solid var(--disabled)' : 'none'};
  border-bottom: ${props => props.secondaryHeader ? '1px solid var(--disabled)' : 'none'};
  z-index: ${props => props.secondaryHeader ? '10' : 'none'};

  & svg[stroke="currentColor"]{
    color:var(--primary_tint);
    height:28px;
    width:28px;
    cursor:pointer;
  }

  & .button{
    margin-top:2px;
    height:36px;
    padding:4px;
    width:36px;
    border-radius:100%;
    position:relative;

    & svg{ color:var(--maincolor_text); font-size:16px; }

    &:hover {

      & svg {
        color:var(--maincolor_texttint);
      }
      & span {
        background-color: var(--secondary_tint);
      }
      }

    & span {
      position: absolute;
      bottom: -4px;
      right: -4px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      background-color: var(--secondary);
      border:2px solid var(--maincolor_tint);
      border-radius: 50%;
      color: white;
      font-size: 12px;
      font-weight: bold;
    }
  }
`;

export const LayoutHeaderSpacer = styled.div<{  }>`
  min-width: 376px;
  flex:1;
  height:10px;
`;

export const LayoutActorHeaderSpacer = styled.div<{  }>`
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

  & .Content2 {
    position: absolute;
    bottom: 45px;
    width: 300px;
    margin: 20px 1rem 0px 0px;
    padding: 0px;
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

    & .Content2{
      max-width: 360px;
      padding:50px 0 0 0;
      position: relative;
      margin: 10px auto;
    }
  `:`
    margin-top:${props.hasOwnProperty('open')?'-64px':'0'};
    min-width: 360px;
  `}
`

export const LayoutActorSidebar = styled.div<{sidebarVisible?:boolean}>`
  position: relative;
  align-items: center;
  // align-self: top;
  background: #799f4f;
  box-shadow: rgba(0, 0, 0, 0.05) 3px 0px 15px;
  z-index:100;
  transition: all .1s ease-in;
  overflow:hidden;
  margin-top:0;
  // min-width: 256px;
  width: ${({ sidebarVisible }) => sidebarVisible ? '256px' : '0'};
  transform: ${({ sidebarVisible }) => sidebarVisible ? 'translateX(0%)' : 'translateX(-100%)'};

  & .Content{
    position: relative;
    top: 0px;
    max-width:360px;
    margin:0 auto;
    // padding:30px;

    .LogoContainer {
      display: flex;
      justify-content: center;
      align-items: center;
      background: #617f43;
      height: 56px;
    }
  }

  @media (min-width: 720px) {
    max-width:400px;
  }
`;

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

export const LayoutActorSidebarMenu = styled.div<{ match?: boolean }>`
  display: flex;
  flex-direction: column;
  width:100%;
  justify-content: center;
  align-items: left;

  & div.active{
    background: rgba(0,0,0,.2);;
    //background: hsla(0,0%,100%,.05);
  }

  & div.HIDE, li.HIDE{
    display:none
  }

  & li:hover{
    
    background:#2e5f46;
  }

  & h2{
    margin: 1rem 0 0.75rem 0;
    padding: 0.75rem 1rem 0rem 1rem;
    color: white;
    font-weight: 700;
    font-size: 70%;
  }

  & ul{
    display:flex;
    align-items: top;
    align-self: top;
    color:white;
    flex-direction: column;
    transition: background .1s ease-in;
  }

  & li{
    align-items: center;
    display:flex;
    height:48px;
    font-size:90%;
    padding:0 1rem;
    gap:0.5rem;
    transition: background .1s ease-in;

    &.children{
      padding-left:3.5rem;
    }
  }

  
  & svg{
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.75rem;
  }

`


export const LayoutActorSidebarMenu2 = styled.div<{ match?: boolean }>`
  display: flex;
  flex-direction: column;
  width:100%;
  justify-content: center;
  align-items: left;

  & h2{
    margin-top: 1rem;
    padding: 0.75rem 1rem 0rem;
    color: white;
    font-weight: 700;
    font-size: 70%;
  }

  & div{
    display:flex;
    align-items: top;
    align-self: top;
    color:white;
    transition: background .1s ease-in;

    & li:hover{
      background:#2e5f46; //cambia color de fondo de los items cuando paso el mouse
      border: 0px solid black;
    }

    & span{
      background:transparent;
      transition: background .1s ease-in;
      color:white;
      padding:0.5rem;
      border-radius:0.25rem;
      // box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 5px;
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
      padding: .8445rem 1rem;

      

      &.title{
        font-weight:350;
        font-size: 94%;


        &.haschildren{
          margin-bottom:0.25rem;
        }
      }

      &.children{
        font-size:0.9rem;
      }

      & a.active{
        color:white;

      }
    }

    &:hover{
      color:white;
      & span{
        background:transparent; //color del icono cuando paso el mouse por encima
        color:var(--gray_text);
      }
    }

    &:has(a.active){
      width: 100%;
      color:white;
      //background:#74a55c; //cambiar tipo de verde de los items cuando estan activos
      background-color: rgba(255, 255, 255, 0.05);
      // box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 5px;
      & span{
        background:transparent;
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
  background: white;
  color: var(--maincolor_text);
  display: flex;
  font-size:0.9rem;
  gap: 1rem;
  width:100%;
  justify-content: flex-end;
  border-top: 1px solid #ccc;
  padding-top: 10px;

  & a{
    color: #799F4F;
    text-decoration: none;
  }
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

export const LayoutActorBreadCrumpWrapper = styled.ul<{ color?:string }>`
  align-items: center;
  align-items: left;
  background: transparent;
  border-radius:0.5rem;
  // border: 1px solid var(--disabled);
  color: var(--maincolor_text);
  display: flex;
  font-size:1rem;
  width:100%;
  // padding:0.5rem 15rem;
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
  background:white;
  flex: 1;
  gap:${props => props.mobile?'1rem':'2rem'};
  padding:${props => props.mobile?'1rem':'2rem'};
  width:100%;
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
  height:auto;
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

  & p{
    maxWidth: 100%;
    whiteSpace: nowrap;
    overflow: hidden;
    textOverflow: ellipsis;
  }

  & button{
    flex:0.1;
  }
`;

export const LayoutSectionCentered = styled.div<{ }>`
  display: flex;
  flex-direction: column;
  background: var(--maincolor);
  border-radius: 0.5rem;
  border: 1px solid var(--disabled);
  width: 100%;
  padding: 1.5rem;
  color: var(--maincolor_text);
  text-align: center; /* Centrar el texto horizontalmente */
  justify-content: center;
  gap: 0.75rem;
  align-items: center; /* Centrar todo verticalmente */

  & h1 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0rem;
    text-align: center;
  }

  & h2, & h3 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--primary_tint); /* Aplicar color a h2 y h3 */
  }

  & h4 {
    font-size: 1rem;
    font-weight: 300;
    margin-bottom: 1rem;
  }

  & h1 svg {
    width: 2rem;
    height: 2rem;
    margin-right: 0.75rem;
  }

  & button {
    flex: 0.1;
  }
`;


export const LayoutSectionProcedureTitle = styled.div<{ }>`
  background: var(--maincolor);
  border-radius:0.5rem;
  border: 1px solid var(--disabled);
  width:100%;
  padding:2rem;
  color: var(--maincolor_text);
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-self: top;
  gap:0.75rem;

  & h1{
    display: flex;
    width:100%;
    font-size:1.25rem;
    flex-direction: row;
    align-items: center;
    text-align: center;
    font-weight:600;
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
`;

export const LayoutActorSection = styled.div<{ }>`
  background: var(--maincolor);
  border-radius:0.5rem;
  border: 1px solid var(--disabled);
  width:100%;
  padding:1rem;
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

  & p{
    justify-content: flex;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
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
  // border: 1px solid var(--disabled);
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
  // cursor:${props => (props.color==='disabled' ? 'default' : 'pointer')};

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

export const RoundedActorButton = styled.div<{ }>`
  align-items: center;
  align-self: center;
  border: 2px solid transparent;
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
    // background:var(--maincolor);
    color: black;
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
