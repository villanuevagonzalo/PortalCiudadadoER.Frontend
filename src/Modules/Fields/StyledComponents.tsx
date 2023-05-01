import styled from "styled-components";

export const FieldsBaseMenu = styled.div<{ match?: boolean }>`
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
